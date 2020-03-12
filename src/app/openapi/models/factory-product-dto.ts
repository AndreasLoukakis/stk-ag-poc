/* tslint:disable */
import { RangeDtoOfDecimal } from './range-dto-of-decimal';
import { RangeDtoOfInteger } from './range-dto-of-integer';
import { ReferenceOfCurrency } from './reference-of-currency';
import { ReferenceOfLoanTypeDto } from './reference-of-loan-type-dto';
export interface FactoryProductDto {
  amount?: null | RangeDtoOfDecimal;
  code?: null | string;
  currency?: null | ReferenceOfCurrency;
  description?: null | string;
  disabled?: null | boolean;
  duration?: null | RangeDtoOfInteger;
  id?: number;
  loanType?: null | ReferenceOfLoanTypeDto;
}
