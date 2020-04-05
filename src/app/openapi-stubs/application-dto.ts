/* tslint:disable */
import { ReferenceOfBranchDto } from './reference-of-branch-dto';
import { ReferenceOfChannelDto } from './reference-of-channel-dto';
import { ReferenceOfConsumerProductDto } from './reference-of-consumer-product-dto';
import { ReferenceOfLoanTypeDto } from './reference-of-loan-type-dto';
import { ReferenceOfMortgageProductDto } from './reference-of-mortgage-product-dto';

export class ApplicationDto  {
  applicationNo = { 
    nullable: true,
    type: 'string'
  };
  branch = { 
    nullable: true,
    type: 'ReferenceOfBranchDto',
    get valueProp() { return Object.keys(new ReferenceOfBranchDto())[0]; }
  };
  branchOther = { 
    nullable: true,
    type: 'ReferenceOfBranchDto',
    get valueProp() { return Object.keys(new ReferenceOfBranchDto())[0]; }
  };
  channel = {
    required: true,
    nullable: true,
    type: 'ReferenceOfChannelDto',
    get valueProp() { return Object.keys(new ReferenceOfChannelDto())[0]; }
  };
  consumerProduct = { 
    nullable: true,
    type: 'ReferenceOfConsumerProductDto',
    get valueProp() { return Object.keys(new ReferenceOfConsumerProductDto())[0]; }
  };
  id = { 
    format: 'number',
    type: 'number'
  };
  loanType = { 
    nullable: true,
    x_state_changer: true,
    type: 'ReferenceOfLoanTypeDto',
    get valueProp() { return Object.keys(new ReferenceOfLoanTypeDto())[0]; }
  };
  mortgageProduct = { 
    nullable: true,
    type: 'ReferenceOfMortgageProductDto',
    get valueProp() { return Object.keys(new ReferenceOfMortgageProductDto())[0]; }
  };
}
