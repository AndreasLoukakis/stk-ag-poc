/* tslint:disable */
import { ReferenceOfCurrencyDto } from './reference-of-currency-dto';
import { ReferenceOfLoanTypeDto } from './reference-of-loan-type-dto';
import { ReferenceOfProductCategoryDto } from './reference-of-product-category-dto';
export interface ProductDto {
  amount?: null | number;
  currency?: null | ReferenceOfCurrencyDto;
  duration?: null | number;
  id?: number;
  loanType?: null | ReferenceOfLoanTypeDto;
  productCategory?: null | ReferenceOfProductCategoryDto;
}
