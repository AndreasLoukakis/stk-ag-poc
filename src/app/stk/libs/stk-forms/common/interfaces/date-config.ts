import { StkDateStruct } from 'stk-datepicker';

export interface DateConfig {
    showButton?: boolean;
    buttonIcon?: string;
    dateFormat?: string;
    minDate?: StkDateStruct | string | Date;
    maxDate?: StkDateStruct | string | Date;
    placement?: 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' |
                'bottom-left' | 'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
    autoClose?: boolean | 'inside' | 'outside';
    container?: null | 'body';
    displayMonths?: number;
    navigation?: 'select' | 'none' | 'arrows';
    markDisabled?: (d: any, c: any, a: any) => boolean;
}

export const dateConfigDefault: DateConfig = {
    showButton: true,
    buttonIcon: 'fa-calendar-alt',
    dateFormat: 'dd-mm-YYYY',
    minDate: null,
    maxDate: null,
    placement: 'auto',
    autoClose: true,
    container: 'body',
    displayMonths: 1,
    navigation: 'select',
    markDisabled: () => false
};
