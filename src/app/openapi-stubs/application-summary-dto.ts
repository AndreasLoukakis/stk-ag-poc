/* tslint:disable */
export class ApplicationSummaryDto  {
  ammount = { 
    format: 'number',
    nullable: true,
    type: 'number'
  };
  applicationNo = { 
    nullable: true,
    type: 'string'
  };
  id = { 
    format: 'number',
    type: 'number'
  };
}
