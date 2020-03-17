/* tslint:disable */
import { MortgageProductDto } from './mortgage-product-dto';
export interface PagedOfMortgageProductDto {
  canGoFirstPage?: boolean;
  canGoLastPage?: boolean;
  canGoNextPage?: boolean;
  canGoPreviousPage?: boolean;
  items?: null | Array<MortgageProductDto>;
  nextPage?: null | number;
  pageIndex?: number;
  pageSize?: number;
  previousPage?: null | number;
  recordCount?: number;
  totalPages?: number;
}
