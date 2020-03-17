/* tslint:disable */
import { RangeDtoOfDecimal } from './../models/range-dto-of-decimal';
import { RangeDtoOfInteger } from './../models/range-dto-of-integer';
import { ReferenceOfCurrencyDto } from './../models/reference-of-currency-dto';
import { ReferenceOfLoanTypeDto } from './../models/reference-of-loan-type-dto';
export interface FactoryProductDto  {
  amount: { 
    nullable: true;
    type: null | RangeDtoOfDecimal;
  };
  code: { 
    nullable: true;
    type: null | string;
  };
  currency: { 
    nullable: true;
    type: null | ReferenceOfCurrencyDto;
  };
  description: { 
    nullable: true;
    type: null | string;
  };
  disabled: { 
    nullable: true;
    type: null | boolean;
  };
  duration: { 
    nullable: true;
    type: null | RangeDtoOfInteger;
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
