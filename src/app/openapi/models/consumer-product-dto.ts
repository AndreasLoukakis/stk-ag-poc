/* tslint:disable */
import { ProductDto } from './product-dto';
import { ReferenceOfConsumerFactoryProductDto } from './reference-of-consumer-factory-product-dto';
export interface ConsumerProductDto extends ProductDto {
  factoryProduct?: null | ReferenceOfConsumerFactoryProductDto;
}
