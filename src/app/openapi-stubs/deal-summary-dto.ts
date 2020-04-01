/* tslint:disable */
import { ApplicationSummaryDto } from './application-summary-dto';
export class DealSummaryDto  {
  application = { 
    nullable: true,
    type: 'ApplicationSummaryDto',
    get valueProp() { return Object.keys(new ApplicationSummaryDto())[0]; }
    
  };
  id = { 
    format: 'number',
    type: 'number'
  };
}
