/* tslint:disable */
import { FactoryProductDto } from './factory-product-dto';
import { RangeDtoOfDecimal } from './range-dto-of-decimal';
import { RangeDtoOfInteger } from './range-dto-of-integer';
export interface MortgageFactoryProductDto extends FactoryProductDto {
  discount?: null | RangeDtoOfDecimal;
  gracePeriod?: null | RangeDtoOfInteger;
}
