import { ElementRef } from '@angular/core';

export type templateFn = (x: any[] | {any}) => string;

export enum listTypes {
    ul = 'ul',
    ol = 'ol',
    il = 'il',
    data = 'data'
}

export interface ListConfig {
    listType?: listTypes;
    shallow?: boolean;
    flattenLevel?: number;
    itemTemplate?: ElementRef | null | templateFn;
    expandItemTemplate?: ElementRef | null | templateFn;
    controlItemTemplate?: ElementRef | null | templateFn;
    actionsItemTemplate?: ElementRef | null | templateFn;
    expandable?: boolean;
}

export const defaultConfig: ListConfig = {
    listType: listTypes.ul,
    shallow: false,
    flattenLevel: 0,
    itemTemplate: null,
    expandItemTemplate: null,
    controlItemTemplate: null,
    actionsItemTemplate: null,
    expandable: false,
};
