/* tslint:disable */
import { ReferenceOfCurrencyDto } from './reference-of-currency-dto';
import { ReferenceOfProductCategoryDto } from './reference-of-product-category-dto';
export class ProductDto  {
  amount= { 
    format: 'number',
    nullable: true,
    type: 'number',
  };
  currency= { 
    nullable: true,
    type: 'ReferenceOfCurrencyDto',
    get valueProp() { return Object.keys(new ReferenceOfCurrencyDto())[0]; }
  };
  duration = {
    format: 'number',
    nullable: true,
    type: 'number',
  };
  id = { 
    format: 'number',
    type: 'number',
  };
  productCategory = { 
    nullable: true,
    type: 'ReferenceOfProductCategoryDto',
    get valueProp() { return Object.keys(new ReferenceOfProductCategoryDto())[0]; }
  };
}
