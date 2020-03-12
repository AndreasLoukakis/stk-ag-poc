/* tslint:disable */
import { BranchDto } from './branch-dto';
export interface PagedOfBranchDto {
  canGoFirstPage?: boolean;
  canGoLastPage?: boolean;
  canGoNextPage?: boolean;
  canGoPreviousPage?: boolean;
  items?: null | Array<BranchDto>;
  nextPage?: null | number;
  pageIndex?: number;
  pageSize?: number;
  previousPage?: null | number;
  recordCount?: number;
  totalPages?: number;
}
