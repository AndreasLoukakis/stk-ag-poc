import { Property, XAttributes } from './open-api-parser.model';

export class OpenApiProperty {

    // tslint:disable:variable-name
    protected _name: string;
    protected _property: Property;

    constructor(name: string, property: Property) {
        this._name = name;
        this._property = property;
    }

    get name(): string { return this._name; }

    get type(): string { return this._property.type; }

    get types(): string[] {
        if (0 === this._property.oneOf.length) {
            return [];
        }

        const retVal: string[] = [];

        for (const type of this._property.oneOf) {
            retVal.push(type.SchemaName);
        }

        return retVal;
    }

    get itemType(): string {
        return this._property.items.SchemaName;
    }

    get x(): XAttributes { return this._property.x; }

    get format(): string { return this._property.format; }
}
