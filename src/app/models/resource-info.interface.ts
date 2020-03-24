
import { FormGroup } from '@angular/forms';

export interface ResourceInfo {
  id?: number;
  propertyName?: string;
  currieName?: string;
  href: string;
  formgroup?: FormGroup;
  hasValues?: boolean;
  values?: {
    propertyName?: string;
    href: string;
    currieName: string;
  };
}
