import { FieldConfig } from 'stk-forms';

export interface ExtendedFieldConfig extends FieldConfig {
    valueProp?: string;
    descriptionProp?: string;
    properties?: string[];
    resources?: string[];
    classRef?: string[];
}
