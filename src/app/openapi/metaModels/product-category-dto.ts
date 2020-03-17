/* tslint:disable */
import { ReferenceOfLoanTypeDto } from './../models/reference-of-loan-type-dto';
export interface ProductCategoryDto  {
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
  loanType: { 
    nullable: true;
    type: null | ReferenceOfLoanTypeDto;
  };
}
