import { Path } from './open-api-parser.model';
import { OpenApiSchema } from './open-api-schema';
import { OpenApiOperation } from './open-api-operation';

export class OpenApiPath {

    get get(): OpenApiOperation { return this._get; }
    get post(): OpenApiOperation { return this._post; }
    get put(): OpenApiOperation { return this._put; }
    get patch(): OpenApiOperation { return this._patch; }
    get delete(): OpenApiOperation { return this._delete; }


    // tslint:disable:variable-name
    protected _template: string = null;
    protected _docPath: Path = null;

    protected _get: OpenApiOperation = null;
    protected _post: OpenApiOperation = null;
    protected _put: OpenApiOperation = null;
    protected _patch: OpenApiOperation = null;
    protected _delete: OpenApiOperation = null;

    protected _operations: Map<string, OpenApiOperation> = new Map<string, OpenApiOperation>();

    constructor(template: string, docPath: Path, schemaLookupFunc: (schema: string) => OpenApiSchema) {
        this._template = template;
        this._docPath = docPath;

        this._schemaLookup = schemaLookupFunc;

        this.initialize(docPath);
    }

    // tslint:disable-next-line:variable-name
    private _schemaLookup: (schema: string) => OpenApiSchema = null;

    get path(): string { return this._template; }

    get schema(): OpenApiSchema {
        if (null == this.get) {
            return null;
        }

        return this.get.schema;
    }

    static isMatch(path: string, template: string): boolean {
      if (!template) { return false; }
      if (template && !path) { return false; }
      if (path === template) { return true; }

      const pathParts = path.split('/');
      const templateParts = template.split('/');

      if (pathParts.length !== templateParts.length) {
          return false;
      }

      for (let i = 0; i < pathParts.length; i++) {
          const pathPart = pathParts[i];
          const tmplPart = templateParts[i];

          if (tmplPart.startsWith('{') && tmplPart.endsWith('}')) {
              continue;
          }

          if (pathPart !== tmplPart) {
              return false;
          }
      }

      return true;
  }


    protected initialize(docPath: Path) {
        if (docPath.get) {
            this._get = new OpenApiOperation(docPath.get, this._schemaLookup);
            this._operations.set(this._get.operationId, this._get);
        }
        if (docPath.post) {
            this._post = new OpenApiOperation(docPath.post, this._schemaLookup);
            this._operations.set(this._post.operationId, this._post);
        }
        if (docPath.put) {
            this._put = new OpenApiOperation(docPath.put, this._schemaLookup);
            this._operations.set(this._put.operationId, this._put);
        }
        if (docPath.patch) {
            this._patch = new OpenApiOperation(docPath.patch, this._schemaLookup);
            this._operations.set(this._patch.operationId, this._patch);
        }
        if (docPath.delete) {
            this._delete = new OpenApiOperation(docPath.delete, this._schemaLookup);
            this._operations.set(this._delete.operationId, this._delete);
        }
    }

}
