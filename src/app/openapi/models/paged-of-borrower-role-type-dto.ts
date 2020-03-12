/* tslint:disable */
import { BorrowerRoleTypeDto } from './borrower-role-type-dto';
export interface PagedOfBorrowerRoleTypeDto {
  canGoFirstPage?: boolean;
  canGoLastPage?: boolean;
  canGoNextPage?: boolean;
  canGoPreviousPage?: boolean;
  items?: null | Array<BorrowerRoleTypeDto>;
  nextPage?: null | number;
  pageIndex?: number;
  pageSize?: number;
  previousPage?: null | number;
  recordCount?: number;
  totalPages?: number;
}
