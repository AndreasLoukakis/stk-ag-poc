/* tslint:disable */
import { RangeDtoOfDecimal } from './range-dto-of-decimal';
import { RangeDtoOfInteger } from './range-dto-of-integer';
import { ReferenceOfCurrencyDto } from './reference-of-currency-dto';
import { ReferenceOfLoanTypeDto } from './reference-of-loan-type-dto';
export interface FactoryProductDto {
  amount?: null | RangeDtoOfDecimal;
  code?: null | string;
  currency?: null | ReferenceOfCurrencyDto;
  description?: null | string;
  disabled?: null | boolean;
  duration?: null | RangeDtoOfInteger;
  id?: number;
  loanType?: null | ReferenceOfLoanTypeDto;
}
