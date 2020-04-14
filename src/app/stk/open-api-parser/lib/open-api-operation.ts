import { Operation } from './open-api-parser.model';
import { OpenApiSchema } from './open-api-schema';

export class OpenApiOperation {

    constructor(operation: Operation, schemaLookup: (schema: string) => OpenApiSchema) {
        this._operation = operation;
        this._schemaLookup = schemaLookup;
    }

    // tslint:disable:variable-name
    private _schemaLookup: (schema: string) => OpenApiSchema = null;
    protected _operation: Operation = null;

    get schemaName(): string {
        if (this._operation.requestBody) {
            return this._operation.requestBody
                        .content.get('application/json')
                        .schema.SchemaName;
        } else {
           return this._operation.responses.get('200')
            .content.get('application/json')
            .schema.SchemaName;
        }

    }

    get schema(): OpenApiSchema {
        return this._schemaLookup(this.schemaName);
    }

    get operationId(): string { return this._operation.operationId; }
}
