/* tslint:disable */
import { ReferenceOfBranchDto } from './reference-of-branch-dto';
import { ReferenceOfChannelDto } from './reference-of-channel-dto';
import { ReferenceOfConsumerProductDto } from './reference-of-consumer-product-dto';
import { ReferenceOfLoanTypeDto } from './reference-of-loan-type-dto';
import { ReferenceOfMortgageProductDto } from './reference-of-mortgage-product-dto';
export interface ApplicationDto {
  applicationNo?: null | string;
  branch?: null | ReferenceOfBranchDto;
  branchOther?: null | ReferenceOfBranchDto;
  channel?: null | ReferenceOfChannelDto;
  consumerProduct?: null | ReferenceOfConsumerProductDto;
  id?: number;
  loanType?: null | ReferenceOfLoanTypeDto;
  mortgageProduct?: null | ReferenceOfMortgageProductDto;
}
