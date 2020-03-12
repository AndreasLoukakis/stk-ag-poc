/* tslint:disable */
export interface ProblemDetails  {
  detail: { 
    nullable: true;
    type: null | string;
  };
  extensions: { 
    nullable: true;
    additionalProperties: [object Object];
    type: null | { [key: string]: any };
  };
  instance: { 
    nullable: true;
    type: null | string;
  };
  status: { 
    format: number;
    nullable: true;
    type: null | number;
  };
  title: { 
    nullable: true;
    type: null | string;
  };
  type: { 
    nullable: true;
    type: null | string;
  };
}
