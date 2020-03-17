/* tslint:disable */
import { ConsumerProductDto } from './consumer-product-dto';
export interface PagedOfConsumerProductDto {
  canGoFirstPage?: boolean;
  canGoLastPage?: boolean;
  canGoNextPage?: boolean;
  canGoPreviousPage?: boolean;
  items?: null | Array<ConsumerProductDto>;
  nextPage?: null | number;
  pageIndex?: number;
  pageSize?: number;
  previousPage?: null | number;
  recordCount?: number;
  totalPages?: number;
}
