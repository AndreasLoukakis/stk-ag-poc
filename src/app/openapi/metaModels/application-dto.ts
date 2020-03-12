/* tslint:disable */
import { ReferenceOfBranchDto } from './../models/reference-of-branch-dto';
import { ReferenceOfChannelDto } from './../models/reference-of-channel-dto';
import { ReferenceOfConsumerProductDto } from './../models/reference-of-consumer-product-dto';
import { ReferenceOfLoanTypeDto } from './../models/reference-of-loan-type-dto';
import { ReferenceOfMortgageProductDto } from './../models/reference-of-mortgage-product-dto';
export interface ApplicationDto  {
  applicationNo: { 
    nullable: true;
    type: null | string;
  };
  branch: { 
    nullable: true;
    type: null | ReferenceOfBranchDto;
  };
  branchOther: { 
    nullable: true;
    type: null | ReferenceOfBranchDto;
  };
  channel: { 
    nullable: true;
    type: null | ReferenceOfChannelDto;
  };
  consumerProduct: { 
    nullable: true;
    type: null | ReferenceOfConsumerProductDto;
  };
  id: { 
    format: number;
    type: number;
  };
  loanType: { 
    nullable: true;
    x_state_changer: true;
    type: null | ReferenceOfLoanTypeDto;
  };
  mortgageProduct: { 
    nullable: true;
    type: null | ReferenceOfMortgageProductDto;
  };
}
