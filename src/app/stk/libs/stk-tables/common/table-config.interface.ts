import { ElementRef } from '@angular/core';

export type templateFn = (x: any[] | {any}) => string;

export enum TableTypes {
    default = 'default'
}

export enum BreakPoints {
    xl = 'xl',
    lg = 'lg',
    md = 'md',
    sm = 'sm',
    xs = 'xs'
}

export interface ColumnConfig {
    label: string;
    icon?: string;
    template?: ElementRef | null | templateFn;
    config?: TableConfig;
}

/**
 * NOTE: if trTemplate is a component, it MUST have :host {display:content} to display tr properly w/o host element
 *
 * @template context
 * trTemplate context: item: the current iteration item
 * expandItemTemplate context: item: the current iteration item
 * tdTemplate context: item: the current iteration item, col: key / value of current column, columns: all available columns
 * In tdTemplate, current column may have (if defined in config) a custom template function.
 *
 * example: <strong>{{item[col.key]}}</strong> should print the current iteration item in bold
 *
 * Other than config.XXXtemplate which is for all rows or all td,
 * you may use cell specific template via config.colums[PROPERTY_NAME].template
 * and pass elementRef or function (the context of the function is the row item)
 */
export interface TableConfig {
    tableType?: TableTypes;
    breakpoint?: BreakPoints;
    columns?: { [prop: string]: string | ColumnConfig } | null;
    expandable?: boolean;
    compact?: boolean;
    compound?: boolean;
    sortable?: boolean;
    autoColumns?: boolean;
    sortDefault?: string | null;
    trTemplate?: ElementRef | null | templateFn;
    tdTemplate?: ElementRef | null;
    expandItemTemplate?: ElementRef | null | templateFn;
    noResultsTemplate?: ElementRef | null | templateFn;
}

export const defaultTableConfig: TableConfig = {
    tableType: TableTypes.default,
    breakpoint: BreakPoints.md,
    expandable: false,
    compact: false,
    compound: false,
    sortable: false,
    autoColumns: false,
    sortDefault: null,
    columns: null,
    trTemplate: null,
    tdTemplate: null,
    expandItemTemplate: null,
    noResultsTemplate: null
};
