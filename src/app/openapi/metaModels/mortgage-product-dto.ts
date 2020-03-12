/* tslint:disable */
import { ProductDto } from './../models/product-dto';
import { ReferenceOfMortgageFactoryProductDto } from './../models/reference-of-mortgage-factory-product-dto';
export interface MortgageProductDto extends ProductDto {
  discount: { 
    format: number;
    nullable: true;
    type: null | number;
  };
  factoryProduct: { 
    nullable: true;
    type: null | ReferenceOfMortgageFactoryProductDto;
  };
  gracePeriod: { 
    format: number;
    nullable: true;
    type: null | number;
  };
}
