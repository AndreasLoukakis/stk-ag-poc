import { ExtendedFieldConfig } from './extended-field-config.interface';

export interface RenderData {
    formElements?: {
        [key: string]: ExtendedFieldConfig | FormElement
    };
    instance?: any;
}

export interface FormElement {
    [key: string]: ExtendedFieldConfig;
}
