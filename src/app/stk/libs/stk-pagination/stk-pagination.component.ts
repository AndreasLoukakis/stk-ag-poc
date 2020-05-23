import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stk-pagination',
  template: `
  <div class="pf-c-pagination" [ngClass]="{'pf-m-footer': config.isFooter}">
    <div class="pf-c-pagination__total-items">
      <b>1 - 10</b>of
      <b>37</b>
    </div>
    <div class="pf-c-options-menu">
      <div class="pf-c-options-menu__toggle pf-m-text pf-m-plain">
        <span class="pf-c-options-menu__toggle-text">
          <b>1 - 10</b>of
          <b>37</b>
        </span>
        <button class="pf-c-options-menu__toggle-button" aria-haspopup="listbox" aria-expanded="false" aria-label="Items per page">
          <i class="fas fa-caret-down" aria-hidden="true"></i>
        </button>
      </div>
      <ul class="pf-c-options-menu__menu" aria-labelledby="pagination-options-menu-top-example-toggle" hidden>
        <li>
          <button class="pf-c-options-menu__menu-item">5
            <span class="pf-c-pagination__menu-text">per page</span>
          </button>
        </li>
        <li>
          <button class="pf-c-options-menu__menu-item">10
            <span class="pf-c-pagination__menu-text">per page</span>
            <i class="fas fa-check pf-c-options-menu__menu-item-icon" aria-hidden="true"></i>
          </button>
        </li>
        <li>
          <button class="pf-c-options-menu__menu-item">20
            <span class="pf-c-pagination__menu-text">per page</span>
          </button>
        </li>
      </ul>
    </div>
    <nav class="pf-c-pagination__nav" aria-label="Pagination">
      <button class="pf-c-button pf-m-plain" type="button" disabled aria-label="Go to first page">
        <i class="fas fa-angle-double-left" aria-hidden="true"></i>
      </button>
      <button class="pf-c-button pf-m-plain" type="button" disabled aria-label="Go to previous page">
        <i class="fas fa-angle-left" aria-hidden="true"></i>
      </button>
      <div class="pf-c-pagination__nav-page-select">
        <input class="pf-c-form-control" aria-label="Current page" type="number" min="1" max="4" value="1" />
        <span aria-hidden="true">of 4</span>
      </div>
      <button class="pf-c-button pf-m-plain" type="button" aria-label="Go to next page">
        <i class="fas fa-angle-right" aria-hidden="true"></i>
      </button>
      <button class="pf-c-button pf-m-plain" type="button" aria-label="Go to last page">
        <i class="fas fa-angle-double-right" aria-hidden="true"></i>
      </button>
    </nav>
  </div>
  `,
  styles: [':host {margin-left: auto;}']
})
export class StkPaginationComponent implements OnInit {

  @Input() config: PaginationConfig;

  constructor() { }

  ngOnInit() {
    this.config = { ...defaultPaginationconfig, ...this.config };
  }

}

export interface PaginationConfig {
  isHeader: boolean;
  isFooter: boolean;
}

export const defaultPaginationconfig = {
  isHeader: false,
  isFooter: false
};
