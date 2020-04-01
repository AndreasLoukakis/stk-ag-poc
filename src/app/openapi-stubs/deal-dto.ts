/* tslint:disable */
import { ApplicationDto } from './application-dto';
export class DealDto  {
  application = { 
    nullable: true,
    type: 'ApplicationDto',
    get valueProp() { return Object.keys(new ApplicationDto())[0]; }
  };
  id = { 
    format: 'number',
    type: 'number'
  };
}
