/* tslint:disable */
import { ReferenceOfCurrencyDto } from './reference-of-currency-dto';
import { ReferenceOfProductCategoryDto } from './reference-of-product-category-dto';
export interface ProductDto {
  amount?: null | number;
  currency?: null | ReferenceOfCurrencyDto;
  duration?: null | number;
  id?: number;
  productCategory?: null | ReferenceOfProductCategoryDto;
}
