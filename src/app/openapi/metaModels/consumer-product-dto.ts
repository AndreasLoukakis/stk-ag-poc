/* tslint:disable */
import { ProductDto } from './../models/product-dto';
import { ReferenceOfConsumerFactoryProductDto } from './../models/reference-of-consumer-factory-product-dto';
export interface ConsumerProductDto extends ProductDto {
  factoryProduct: { 
    nullable: true;
    type: null | ReferenceOfConsumerFactoryProductDto;
  };
}
