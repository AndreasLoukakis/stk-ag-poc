
import { FormGroup } from '@angular/forms';

export interface ResourceInfo {
  id?: number;
  propertyName?: string;
  currieName?: string;
  classRef?: string;
  valueProp?: string;
  href: string;
  formgroup?: FormGroup;
  meta?: { [prop: string]: any }; // subresource meta.
  values?: {
    propertyName?: string;
    href: string;
    currieName: string;
  };
}
