/* tslint:disable */
import { FactoryProductDto } from './factory-product-dto';
import { RangeDtoOfDecimal } from './range-dto-of-decimal';
import { RangeDtoOfInteger } from './range-dto-of-integer';
export class MortgageFactoryProductDto extends FactoryProductDto {
  discount = { 
    nullable: true,
    type: 'RangeDtoOfDecimal',
    get valueProp() { return Object.keys(new RangeDtoOfDecimal())[0]; }
  };
  gracePeriod = { 
    nullable: true,
    type: 'RangeDtoOfInteger',
    get valueProp() { return Object.keys(new RangeDtoOfInteger())[0]; }
  };
}
