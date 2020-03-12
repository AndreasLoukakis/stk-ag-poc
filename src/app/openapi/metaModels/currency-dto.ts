/* tslint:disable */
export interface CurrencyDto  {
  id: { 
    format: number;
    type: number;
  };
  name: { 
    nullable: true;
    type: null | string;
  };
}
