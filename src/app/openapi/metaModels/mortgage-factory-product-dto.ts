/* tslint:disable */
import { FactoryProductDto } from './../models/factory-product-dto';
import { RangeDtoOfDecimal } from './../models/range-dto-of-decimal';
import { RangeDtoOfInteger } from './../models/range-dto-of-integer';
export interface MortgageFactoryProductDto extends FactoryProductDto {
  discount: { 
    nullable: true;
    type: null | RangeDtoOfDecimal;
  };
  gracePeriod: { 
    nullable: true;
    type: null | RangeDtoOfInteger;
  };
}
