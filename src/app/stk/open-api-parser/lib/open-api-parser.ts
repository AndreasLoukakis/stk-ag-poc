import { Document, Schema, Path } from './open-api-parser.model';
import { OpenApiSchema } from './open-api-schema';
import { OpenApiPath } from './open-api-path';
import { OpenApiResource } from './open-api-resource';

export class OpenApiParser {

    // tslint:disable:variable-name
    protected _document: Document;
    protected _schemas: Map<string, OpenApiSchema> = new Map<string, OpenApiSchema>();
    protected _paths: Map<string, OpenApiPath> = new Map<string, OpenApiPath>();

    constructor(document: Document) {
        this.initialize(document);
    }

    public static fromResponse(uri: string): Promise<any> {
        // this should use angular httpclient but this is a static mehthod
        // and httpclient needs injection and constructor... alternatives?
        // fetch is ok (until it's not)
        // Note: Using the static method, after calling http from open api service
        return window.fetch(uri).then((data) => {
            return new Document().Deserialize(data); // Deserialize here !!!
            // callback(new OpenApiParser(document));
        })
        .catch(err => { throw new Error('Unable to load open api json data'); });
    }

    public static fromObject(data: any): OpenApiParser {
        const document = new Document().Deserialize(data); // Deserialize here !!!
        return new OpenApiParser(document);
    }

    schema(schemaName: string): OpenApiSchema {
        return this._schemas.get(schemaName);
    }

    get schemas(): OpenApiSchema[] {
        return Array.from(this._schemas.values());
    }

    path(path: string): OpenApiPath {
        if (this._paths.has(path)) {
            return this._paths.get(path);
        } else {
            for (const key of Array.from(this._paths.keys())) {
                if (OpenApiPath.isMatch(path, key)) {
                    return this._paths.get(key);
                }
            }
            return null;
        }
    }

    get paths(): OpenApiPath[] {
        return Array.from(this._paths.values());
    }

    getByPath(path: string): OpenApiResource {
        throw new Error('Not Implemented');
    }

    getBySchema(schemaName: string): OpenApiResource {
        throw new Error('Not Implemented');
    }

    protected initialize(document: Document): void {
        this._document = document;

        // create an OpenApiNode by enumerating the schemas first, ascociate with the
        // paths afters that - because there's more than one paths per Schema most probably
        // for (let key of document.components.schemas.keys())
        document.components.schemas.forEach((docSchema: Schema, key: string) => {
            const schema = new OpenApiSchema(key, docSchema);
            this._schemas.set(key, schema);
        });

        document.paths.forEach((docPath: Path, key: string) => {
            const path = new OpenApiPath(key, docPath, k => this._schemas.get(k));
            this._paths.set(key, path);
        });
    }
}
