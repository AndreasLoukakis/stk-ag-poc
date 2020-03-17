/* tslint:disable */
import { ReferenceOfLoanTypeDto } from './reference-of-loan-type-dto';
export interface ProductCategoryDto {
  code?: null | string;
  description?: null | string;
  disabled?: null | boolean;
  id?: number;
  loanType?: null | ReferenceOfLoanTypeDto;
}
