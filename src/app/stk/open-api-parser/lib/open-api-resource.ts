
import { OpenApiSchema } from './open-api-schema';
import { OpenApiPath } from './open-api-path';
import { OpenApiOperation } from './open-api-operation';

export class OpenApiResource {

    // tslint:disable:variable-name
    protected _path: OpenApiPath = null;
    protected _schema: OpenApiSchema = null;
    protected _operations: Map<string, OpenApiOperation> = new Map<string, OpenApiOperation>();


    operations(): OpenApiOperation[] {
        return null;
    }

    get schema(): OpenApiSchema {
        return this._schema;
    }

    // TODO: All I should need here is the Path !
    constructor(schema: OpenApiSchema, path: OpenApiPath) {
        this._schema = schema;
        this._path = path;
    }

}
