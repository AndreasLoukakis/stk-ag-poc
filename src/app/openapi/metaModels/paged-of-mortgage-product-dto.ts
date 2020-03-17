/* tslint:disable */
import { MortgageProductDto } from './../models/mortgage-product-dto';
export interface PagedOfMortgageProductDto  {
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
    type: null | Array<MortgageProductDto>;
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
