/* tslint:disable */
import { ReferenceOfCurrencyDto } from './../models/reference-of-currency-dto';
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
  productCategory: { 
    nullable: true;
    type: null | ReferenceOfProductCategoryDto;
  };
}
