import { Schema, Property } from './open-api-parser.model';
import { OpenApiProperty } from './open-api-property';

export class OpenApiSchema {

    // tslint:disable:variable-name
    private _name: string;

    protected _schema: Schema;

    constructor(name: string, schema: Schema) {
        this._schema = schema;
        this._name = name;

        this.initialize(schema);
    }

    get name(): string { return this._name; }

    get schema(): Schema { return this._schema; }


    protected _properties: Map<string, OpenApiProperty> = new Map<string, OpenApiProperty>();

    get properties(): OpenApiProperty[] {
        return Array.from(this._properties.values());
    }

    property(propName: string): OpenApiProperty {
        return this._properties.get(propName);
    }

    protected initialize(schema: Schema) {
        schema.properties.forEach((property: Property, key: string) =>
            this._properties.set(key, new OpenApiProperty(key, property)));
    }
}
