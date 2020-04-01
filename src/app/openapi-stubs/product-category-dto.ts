/* tslint:disable */
import { ReferenceOfLoanTypeDto } from './reference-of-loan-type-dto';
export class ProductCategoryDto  {
  code = {
    nullable: true,
    type: 'string',
  };
  description = {
    nullable: true,
    type: 'string',
  };
  disabled = {
    nullable: true,
    type: 'boolean'
  };
  id = {
    format: 'number',
    type: 'number'
  };
  loanType = { 
    nullable: true,
    type: 'ReferenceOfLoanTypeDto',
    get valueProp() { return Object.keys(new ReferenceOfLoanTypeDto())[0]; }
  };
}
