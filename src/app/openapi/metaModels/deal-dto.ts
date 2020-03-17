/* tslint:disable */
import { ReferenceOfApplicationDto } from './../models/reference-of-application-dto';
export interface DealDto  {
  application: { 
    nullable: true;
    type: null | ReferenceOfApplicationDto;
  };
  id: { 
    format: number;
    type: number;
  };
}
