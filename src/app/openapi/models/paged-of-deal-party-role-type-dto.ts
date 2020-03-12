/* tslint:disable */
import { DealPartyRoleTypeDto } from './deal-party-role-type-dto';
export interface PagedOfDealPartyRoleTypeDto {
  canGoFirstPage?: boolean;
  canGoLastPage?: boolean;
  canGoNextPage?: boolean;
  canGoPreviousPage?: boolean;
  items?: null | Array<DealPartyRoleTypeDto>;
  nextPage?: null | number;
  pageIndex?: number;
  pageSize?: number;
  previousPage?: null | number;
  recordCount?: number;
  totalPages?: number;
}
