export abstract class XContainer implements Serializable<XContainer> {

    // tslint:disable-next-line:variable-name
    protected _x: XAttributes = null;

    get x(): XAttributes { return this._x; }

    Deserialize(json: any): XContainer {
      this._x = new XAttributes().Deserialize(json);
      return this;
    }
}

export class XAttributes implements Serializable<XAttributes> {

  // tslint:disable-next-line:variable-name
  private _map: Map<string, any> = new Map<string, any>();

  Deserialize(json: any): XAttributes {
    for (const prop in json) {
      if (!prop.startsWith('x-')) {
        continue;
      }
      this.set(prop.replace(/-/g, '_'), json[prop]);
    }
    return this;
  }

  get(key: string): any {
      return this._map.get(key);
  }

  set(key: string, value: any) {
      this._map.set(key, value);
  }

  as<TOutType>(key: string): TOutType {
      return this.get(key) as TOutType;
  }

  is(key: string): boolean {
      return this.as<boolean>(key);
  }

  all() {
    const res = {};
    this._map.forEach((value, key) => res[key] = value);
    return res;
  }

}

interface Serializable<TClassType> {
    Deserialize(json: any): TClassType;
}

export class Document implements Serializable<Document> {

    paths: Map<string, Path> = new Map<string, Path>();
    components: Components = new Components();

    Deserialize(json: any): Document {
        this.components = new Components().Deserialize(json.components);
        if (json.paths) {
            const paths = json.paths;
            for (const path in paths) {
              if (paths[path]) {
                this.paths.set(path, new Path(path).Deserialize(paths[path]));
              }
            }
        }

        return this;
    }

}

export class Path implements Serializable<Path> {

    // tslint:disable-next-line:variable-name
    protected _path: string = null;

    get: Operation = null;
    put: Operation = null;
    post: Operation = null;
    patch: Operation = null;
    delete: Operation = null;
    Deserialize(json: any): Path {
        if (json.get) {
            this.get = new Operation().Deserialize(json.get);
        }
        if (json.put) {
            this.put = new Operation().Deserialize(json.put);
        }
        if (json.post) {
            this.post = new Operation().Deserialize(json.post);
        }
        if (json.patch) {
            this.patch = new Operation().Deserialize(json.patch);
        }
        if (json.delete) {
            this.delete = new Operation().Deserialize(json.delete);
        }

        return this;
    }

    constructor(path: string) {
        this._path = path;
    }

}

export class Components implements Serializable<Components> {

    schemas: Map<string, Schema> = new Map<string, Schema> ();

    Deserialize(json: any): Components {
        if (!json.schemas) {
            return this;
        }

        for (const prop in json.schemas) {
          if (json.schemas[prop]) {
            const schema = (new Schema()).Deserialize(json.schemas[prop]);

            this.schemas.set(prop, schema);
          }
        }

        return this;
    }

}

export class Operation implements Serializable<Operation> {

    operationId: string;
    responses: Map<string, Response> = new Map<string, Response>();
    requestBody: RequestBody = null;

    Deserialize(json: any): Operation {
        this.operationId = json.operationId ?? null;
        if (json.responses) {
            for (const resCode in json.responses) {
              if (json.responses[resCode]) {
                const response = new Response().Deserialize(json.responses[resCode]);
                this.responses.set(resCode, response);
              }
            }
        }
        if (json.requestBody) {
            this.requestBody = new RequestBody().Deserialize(json.requestBody);
        }
        return this;
    }

}

export class Parameter implements Serializable<Parameter> {

  // tslint:disable-next-line:variable-name
  x_position: number;

  name: string;
  in: string; // enum
  schema: TypeInfo;

  Deserialize(json: any): Parameter {
      return this;
  }

}

export class TypeInfo {
    type: string;   // enum
    format: string; // enum
}

export class RequestBody extends XContainer implements Serializable<RequestBody> {

  content: Map<string, ContentType> = new Map<string, ContentType>();
  required: boolean;

  Deserialize(json: any): RequestBody {
      this.required = json.required ?? false;
      if (json.content) {
          for (const cType in json.content) {
            if (json.content[cType]) {
              const contentType = new ContentType().Deserialize(json.content[cType]);
              this.content.set(cType, contentType);
            }

          }
      }
      super.Deserialize(json);
      return this;
  }
}

export class Response implements Serializable<Response> {

  description: string;
  content: Map<string, ContentType> = new Map<string, ContentType>();

  Deserialize(json: any): Response {
      this.description = json.description ?? '';
      if (json.content) {
          for (const cType in json.content) {
            if (json.content[cType]) {
              const contentType = new ContentType().Deserialize(json.content[cType]);
              this.content.set(cType, contentType);
            }
          }
      }
      return this;
  }
}

export class ContentType implements Serializable<ContentType> {

  schema: SchemaRef;

  Deserialize(json: any): ContentType {
      if (json.schema) {
        this.schema = new SchemaRef().Deserialize(json.schema);
      }

      return this;
  }

}

export class Schema extends XContainer implements Serializable<Schema> {

  // tslint:disable-next-line:variable-name
  x_abstract: boolean;

  type: string; // enum
  additionalProperties: boolean;
  properties: Map<string, Property> = new Map<string, Property>();

  allOf: Schema[] = []; // should be a class implementing Schema itself
  get SchemaName(): string {
    return null;
  }

  Deserialize(json: any): Schema {
      if (json.properties) {
          for (const propName in json.properties) {
            if (json.properties[propName]) {
              const docProp = json.properties[propName];
              this.properties.set(propName, new Property().Deserialize(docProp));
            }
          }
      }

      if (json.allOf) {
        for (const jObject of json.allOf) {
            if (SchemaRef.IsSchemaRef(jObject)) {
                const instance = new SchemaRef().Deserialize(jObject);
                this.allOf.push(instance);
            } else {
                const instance = new Schema().Deserialize(jObject);
                this.allOf.push(instance);
            }
        }
    }
      super.Deserialize(json);
      return this;
  }

}

export class SchemaRef extends Schema implements Serializable<SchemaRef> {

  get SchemaName(): string {
    return this.$ref.replace('#/components/schemas/', '');
  }

  $ref: string;
  static IsSchemaRef(object: any): boolean {
    return object.$ref ? true : false;
  }

  Deserialize(json: any): SchemaRef {
      this.$ref = json.$ref || null;
      return this;
  }

}

export class Property extends XContainer implements Serializable<Property> {

  type: string; // enum, to xw ksanadei ayto sto allo arxeio
  format: string;
  nullable: boolean;
  items: SchemaRef = null;

  oneOf: Schema[] = [];

  Deserialize(json: any): Property {
      this.nullable = json.nullable || false;

      this.type = json.type || null;
      this.format = json.format || null;

      if (json.oneOf) {
          this.type = 'object';
          this.format = null;

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < json.oneOf.length; i++) {
              const element = json.oneOf[i];

              this.oneOf.push(SchemaRef.IsSchemaRef(element) ?
                  new SchemaRef().Deserialize(element) :
                  new Schema().Deserialize(element)
              );
          }
      }

      if (json.items) {
          this.items = new SchemaRef().Deserialize(json.items);
      }

      super.Deserialize(json);

      return this;
    }

    get SchemaName(): string {
        return this.items.SchemaName;
    }

}

export class ItemType {
    type: string; // enum, des pio panw
}
