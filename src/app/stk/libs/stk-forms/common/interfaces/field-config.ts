import { Observable } from 'rxjs';
import { Lookup } from './lookup';
import { TextBehavior } from './text-behavior';

export interface FieldConfig {
  type?: string;
  format?: string;
  title?: string; // label
  required?: boolean;
  default?: any;
  value?: any;
  name: string;
  x_isLookup?: boolean;
  x_lookupValue?: string;
  x_lookupItems$?: Observable<Lookup[]>;
  x_isLookupTemplated?: boolean;
  x_cascadeFrom?: string;
  x_disabled?: boolean; // disabled
  x_readonly?: boolean; // becomes plain text component
  x_placeholder?: string; // placeholder
  x_validation?: string[];
  x_behavior?: TextBehavior[];
  x_fieldType?: string;
  x_state_changer?: boolean;
}
