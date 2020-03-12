/* tslint:disable */
import { ApplicationSummaryDto } from './../models/application-summary-dto';
export interface DealSummaryDto  {
  application: { 
    nullable: true;
    type: null | ApplicationSummaryDto;
  };
  id: { 
    format: number;
    type: number;
  };
}
