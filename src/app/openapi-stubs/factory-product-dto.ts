/* tslint:disable */
import { RangeDtoOfDecimal } from './range-dto-of-decimal';
import { RangeDtoOfInteger } from './range-dto-of-integer';
import { ReferenceOfCurrencyDto } from './reference-of-currency-dto';
import { ReferenceOfLoanTypeDto } from './reference-of-loan-type-dto';
export class FactoryProductDto  {
  amount = { 
    nullable: true,
    type: 'RangeDtoOfDecimal',
    get valueProp() { return Object.keys(new RangeDtoOfDecimal())[0]; }
  };
  code = { 
    nullable: true,
    type: 'string'
  };
  currency = { 
    nullable: true,
    type: 'ReferenceOfCurrencyDto',
    get valueProp() { return Object.keys(new ReferenceOfCurrencyDto())[0]; }
  };
  description = { 
    nullable: true,
    type: 'string'
  };
  disabled = { 
    nullable: true,
    type: 'boolean'
  };
  duration = { 
    nullable: true,
    type: 'RangeDtoOfInteger',
    get valueProp() { return Object.keys(new RangeDtoOfInteger())[0]; }
  };
  id = { 
    format: 'number',
    type: 'number'
  };
  loanType = { 
    nullable: true,
    type: 'ReferenceOfLoanTypeDto',
    get valueProp() { return Object.keys(new ReferenceOfLoanTypeDto())[0]; }
  };
}
