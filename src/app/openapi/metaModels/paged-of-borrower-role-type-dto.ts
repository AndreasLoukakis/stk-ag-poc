/* tslint:disable */
import { BorrowerRoleTypeDto } from './../models/borrower-role-type-dto';
export interface PagedOfBorrowerRoleTypeDto  {
  canGoFirstPage: { 
    type: boolean;
  };
  canGoLastPage: { 
    type: boolean;
  };
  canGoNextPage: { 
    type: boolean;
  };
  canGoPreviousPage: { 
    type: boolean;
  };
  items: { 
    nullable: true;
    items: [object Object];
    type: null | Array<BorrowerRoleTypeDto>;
  };
  nextPage: { 
    format: number;
    nullable: true;
    type: null | number;
  };
  pageIndex: { 
    format: number;
    type: number;
  };
  pageSize: { 
    format: number;
    type: number;
  };
  previousPage: { 
    format: number;
    nullable: true;
    type: null | number;
  };
  recordCount: { 
    format: number;
    type: number;
  };
  totalPages: { 
    format: number;
    type: number;
  };
}