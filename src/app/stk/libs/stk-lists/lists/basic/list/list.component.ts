import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ListConfig, defaultConfig, listTypes } from '../../../common/interfaces/listconfig.interface';

@Component({
  selector: 'stk-list',
  template: `
  <ul [ngClass]="listType">
    <ng-container *ngFor="let item of iterable;">
      <ng-container *ngIf="config.listType === 'data'">
        <stk-data-list-item [item]="item" [config]="config"></stk-data-list-item>
      </ng-container>
      <ng-container  *ngIf="config.itemTemplate === null && config.listType !== 'data'">
        <ng-container *ngIf="isIterable(item) && !config.shallow">
            <stk-list [iterable]="item" [config]="config"></stk-list>
        </ng-container>
        <ng-container *ngIf="!isIterable(item)">
          <li> {{item}}</li>
        </ng-container>
      </ng-container>
      <ng-container *ngIf="config.itemTemplate !== null && config.listType !== 'data'">
        <ng-container *ngIf="isTemplateRef(config.itemTemplate)">
          <li>
            <ng-container *ngTemplateOutlet="config.itemTemplate;context:{item: item}"></ng-container>
          </li>
        </ng-container>
        <ng-container *ngIf="isFunction(config.itemTemplate)">
          <li>{{ parseTemplate(config.itemTemplate, item) }}</li>
        </ng-container>
      </ng-container>
    </ng-container>
  </ul>
  `,
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  /**
   * An iterable object (Array, Object, Set or Map)
   */
  @Input() iterable: any[] | {any} | Map<any, any> | Set<any>;

  @Input() config: ListConfig;

  listType: string;

  private listTypeToListClass = {
    ul: 'pf-c-list',
    data: 'pf-c-data-list',
    il: 'pf-c-list pf-m-inline',
    ol: 'pf-c-list is-ol'
  };

  constructor() { }

  ngOnInit() {
    this.config = { ...defaultConfig, ...this.config };
    this.listType = this.listTypeToListClass[this.config.listType];

    // flatten the array up to n levels, default is 0
    if (this.config.flattenLevel > 0 && Array.isArray(this.iterable)) {
      this.iterable = this.flatDeep(this.iterable, this.config.flattenLevel);
    }

    if (this.isObject(this.iterable) && this.config.itemTemplate === null) {
      const newIterable = [];
      for (const prop in this.iterable) {
        if (this.iterable[prop]) {
          newIterable.push(`${prop}: ${this.iterable[prop]}`);
        }
      }
      this.iterable = newIterable;
    }

    if (this.iterable instanceof Map && this.config.itemTemplate === null) {
      const newIterable = [];
      this.iterable.forEach((val, prop) => {
        newIterable.push(`${prop}: ${val}`);
      });

      this.iterable = newIterable;
    }
  }

  parseTemplate(fn, item: any[] | {any}) {
    if (fn instanceof Function) {
      return fn(item);
    }
  }

  /**
   *
   * @param arr : array to flatten
   * @param d : number, depth of nested levels
   */
  flatDeep(arr, d = 1) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val)
      ? this.flatDeep(val, d - 1) : val), [])
      : arr.slice();
  }

  isIterable(it) {
    return Array.isArray(it) || this.isObject(it) || it instanceof Map || it instanceof Set;
  }

  isArray(arr) {
    return Array.isArray(arr);
  }

  isObject(obj) {
    return typeof obj === 'object' &&
      obj !== null && !(obj instanceof Date) &&
      !Array.isArray(obj) && !(obj instanceof Set) &&
      !(obj instanceof Map);
  }

  isMap(obj) {
    return obj instanceof Map;
  }

  isTemplateRef(param) {
    return this.config.itemTemplate instanceof TemplateRef;
  }

  isFunction(param) {
    return this.config.itemTemplate instanceof Function;
  }

}
