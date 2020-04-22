import { Schema, Property } from './open-api-parser.model';
import { OpenApiProperty } from './open-api-property';

export class OpenApiSchema {

    // tslint:disable:variable-name
    private _name: string;
    private _schemaLookup: (schema: string) => OpenApiSchema = null;

    protected _schema: Schema;
    protected _properties: Map<string, OpenApiProperty> = null; // new Map<string, OpenApiProperty>();


    constructor(name: string, schema: Schema, schemaLookupFunc: (s: string) => OpenApiSchema) {
        this._schema = schema;
        this._name = name;

        this._schemaLookup = schemaLookupFunc;
        // this.initialize(schema);
    }

    get name(): string { return this._name; }

    get schema(): Schema { return this._schema; }


    get properties(): OpenApiProperty[] {
        if (null == this._properties) {
            this.initialize(this._schema);
        }
        return Array.from(this._properties.values());
    }

    property(propName: string): OpenApiProperty {
        if (null == this._properties) {
            this.initialize(this._schema);
        }
        return this._properties.get(propName);
    }

    protected initialize(schema: Schema) {
        this._properties = new Map<string, OpenApiProperty>();
        schema.properties.forEach((property: Property, key: string) =>
            this._properties.set(key, new OpenApiProperty(key, property)));

        for (const allOfSchema of schema.allOf) {
            if (!allOfSchema.SchemaName) {
                // its an embedded, complete schema
                allOfSchema.properties.forEach((property: Property, key: string) =>
                    this._properties.set(key, new OpenApiProperty(key, property)));
            } else {
                // its a schema reference
                const target: OpenApiSchema = this._schemaLookup(allOfSchema.SchemaName);
                target.properties.forEach((property: OpenApiProperty, key: number) =>
                    this._properties.set(property.name, property));
            }
        }
    }
}
