/* tslint:disable */
import { ProductDto } from './product-dto';
import { ReferenceOfMortgageFactoryProductDto } from './reference-of-mortgage-factory-product-dto';
export class MortgageProductDto extends ProductDto {
  discount = { 
    format: 'number',
    nullable: true,
    type: 'number'
  };
  factoryProduct = { 
    nullable: true,
    type: 'ReferenceOfMortgageFactoryProductDto',
    get valueProp() { return Object.keys(new ReferenceOfMortgageFactoryProductDto())[0]; }
  };
  gracePeriod = { 
    format: 'number',
    nullable: true,
    type: 'number'
  };
}
