/* tslint:disable */
import { ProductCategoryDto } from './product-category-dto';
export interface PagedOfProductCategoryDto {
  canGoFirstPage?: boolean;
  canGoLastPage?: boolean;
  canGoNextPage?: boolean;
  canGoPreviousPage?: boolean;
  items?: null | Array<ProductCategoryDto>;
  nextPage?: null | number;
  pageIndex?: number;
  pageSize?: number;
  previousPage?: null | number;
  recordCount?: number;
  totalPages?: number;
}
