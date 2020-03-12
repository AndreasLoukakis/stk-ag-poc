/* tslint:disable */
import { ProductDto } from './product-dto';
import { ReferenceOfMortgageFactoryProductDto } from './reference-of-mortgage-factory-product-dto';
export interface MortgageProductDto extends ProductDto {
  discount?: null | number;
  factoryProduct?: null | ReferenceOfMortgageFactoryProductDto;
  gracePeriod?: null | number;
}
