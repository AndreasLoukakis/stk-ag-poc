/* tslint:disable */
import { ReferenceOfCurrencyDto } from './../models/reference-of-currency-dto';
import { ReferenceOfLoanTypeDto } from './../models/reference-of-loan-type-dto';
import { ReferenceOfProductCategoryDto } from './../models/reference-of-product-category-dto';
export interface ProductDto  {
  amount: { 
    format: number;
    nullable: true;
    type: null | number;
  };
  currency: { 
    nullable: true;
    type: null | ReferenceOfCurrencyDto;
  };
  duration: { 
    format: number;
    nullable: true;
    type: null | number;
  };
  id: { 
    format: number;
    type: number;
  };
  loanType: { 
    nullable: true;
    type: null | ReferenceOfLoanTypeDto;
  };
  productCategory: { 
    nullable: true;
    type: null | ReferenceOfProductCategoryDto;
  };
}
