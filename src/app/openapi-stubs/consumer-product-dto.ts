/* tslint:disable */
import { ProductDto } from './product-dto';
import { ReferenceOfConsumerFactoryProductDto } from './reference-of-consumer-factory-product-dto';
export class ConsumerProductDto extends ProductDto {
  factoryProduct = { 
    nullable: true,
    type: 'ReferenceOfConsumerFactoryProductDto',
    get valueProp() { return Object.keys(new ReferenceOfConsumerFactoryProductDto())[0]; }
  };
}
