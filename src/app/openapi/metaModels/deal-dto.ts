/* tslint:disable */
import { ApplicationDto } from './../models/application-dto';
export interface DealDto  {
  application: { 
    nullable: true;
    type: null | ApplicationDto;
  };
  id: { 
    format: number;
    type: number;
  };
}
