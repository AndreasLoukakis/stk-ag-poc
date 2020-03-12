/* tslint:disable */
import { MortgageFactoryProductDto } from './mortgage-factory-product-dto';
export interface PagedOfMortgageFactoryProductDto {
  canGoFirstPage?: boolean;
  canGoLastPage?: boolean;
  canGoNextPage?: boolean;
  canGoPreviousPage?: boolean;
  items?: null | Array<MortgageFactoryProductDto>;
  nextPage?: null | number;
  pageIndex?: number;
  pageSize?: number;
  previousPage?: null | number;
  recordCount?: number;
  totalPages?: number;
}
