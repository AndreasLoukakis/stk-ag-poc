/* tslint:disable */
export interface IRelationExtensionInformation  {
  description: { 
    nullable: true;
    type: null | string;
  };
  example: { 
    nullable: true;
    type: null | string;
  };
  openApiOperations: { 
    nullable: true;
    items: [object Object];
    type: null | Array<string>;
  };
  relation: { 
    nullable: true;
    type: null | string;
  };
}
