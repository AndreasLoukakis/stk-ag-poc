/* tslint:disable */
export interface LoanTypeDto  {
  id: { 
    format: number;
    type: number;
  };
  name: { 
    nullable: true;
    type: null | string;
  };
}
