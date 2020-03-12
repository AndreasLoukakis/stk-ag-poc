/* tslint:disable */
export interface ApplicationSummaryDto  {
  ammount: { 
    format: number;
    nullable: true;
    type: null | number;
  };
  applicationNo: { 
    nullable: true;
    type: null | string;
  };
  id: { 
    format: number;
    type: number;
  };
}
