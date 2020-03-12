/* tslint:disable */
export interface BranchDto  {
  code: { 
    nullable: true;
    type: null | string;
  };
  description: { 
    nullable: true;
    type: null | string;
  };
  disabled: { 
    nullable: true;
    type: null | boolean;
  };
  id: { 
    format: number;
    type: number;
  };
}
