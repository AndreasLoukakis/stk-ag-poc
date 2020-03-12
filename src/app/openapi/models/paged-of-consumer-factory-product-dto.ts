/* tslint:disable */
import { ConsumerFactoryProductDto } from './consumer-factory-product-dto';
export interface PagedOfConsumerFactoryProductDto {
  canGoFirstPage?: boolean;
  canGoLastPage?: boolean;
  canGoNextPage?: boolean;
  canGoPreviousPage?: boolean;
  items?: null | Array<ConsumerFactoryProductDto>;
  nextPage?: null | number;
  pageIndex?: number;
  pageSize?: number;
  previousPage?: null | number;
  recordCount?: number;
  totalPages?: number;
}
