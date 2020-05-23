import { moduleMetadata } from '@storybook/angular';
import { boolean, number, text, object , withKnobs } from '@storybook/addon-knobs';
import { } from '@storybook/addon-storysource';

import {
  RowNoResultsComponent, TableConfig, TheadComponent, CompoundRowComponent, TableComponent, RowComponent
} from 'stk-tables';
import changelogmd from './../../../../../changelog.md';
import notes from './notes.md';

import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';

import { nbgDeal } from './../../../../../../../mocks/nbg-deal';


export default {
  title: 'Tables/Templated',
  component: TableComponent,
  decorators: [
    withKnobs,
    moduleMetadata({
      declarations: [
        RowComponent, RowNoResultsComponent, TableComponent, TheadComponent, CompoundRowComponent
      ],
      imports: []
    })
  ],
  parameters: {
    notes: {
      Usage: notes,
      Changelog: changelogmd,
    }
  }
};

const defaultTableConfig: TableConfig = {
  columns: {
    Id: 'Id',
    OriginationBranchDescription: 'Origination Branch',
    ApplicationRequestedType: 'Type',
    BranchRecommendation: 'Branch Recommendation',
    BusinessStatus: 'Status'
  }
};

export const CustomCellTemplate = () => {

  const tableConfig: TableConfig = defaultTableConfig;

  return {
    component: TableComponent,
    props: {
      data: nbgDeal.Loans,
      config: tableConfig,
      combine: (a, b) =>  {
        return {...a, ...b};
      }
    },
    template: `
        <div class="stories-wrap">
          <div class="story-wrap-full">
            <strong><span class="blueColor">Custom cell (td) template</span></strong>
            <p>Passing an inline template as a cell template, via config.tdTemplate. Can be inline, component reference or a function</p>
            <br>
            <div class="pf-c-card">
              <stk-table [items]="data" [config]="combine(config, {tdTemplate: tdTpl})"></stk-table>
              <ng-template #tdTpl let-item="item" let-columns="config.columns" let-col="col">
                <td>
                  <div style="background: #f0f0f0;padding: 12px;">
                  {{item[col.key]}}
                  </div>
                </td>
              </ng-template>
            </div>
          </div>
        </div>
        `
  };
};

export const CustomCellAndColumn = () => {

  const tableConfig: TableConfig = {
    ...defaultTableConfig,
    compact: true,
    columns: {
      Id: 'Id',
      OriginationBranchDescription: 'Origination Branch',
      ApplicationRequestedType: {
        label: 'Type',
        template: (item: any) => `This is <strong>${item.ApplicationRequestedType}</strong>`
      },
      BranchRecommendation: 'Branch Recommendation',
      BusinessStatus: {
        label: 'Status', template: (item: any) => new Date(item.BusinessStatus).toDateString()
      }
    }
  };

  return {
    component: TableComponent,
    props: {
      data: nbgDeal.Loans,
      config: tableConfig,
      combine: (a, b) =>  {
        return {...a, ...b};
      },
      getContent(item, config, col) {
        return config.columns[col.key].template ? config.columns[col.key].template(item) : item[col.key];
      }
    },
    template: `
        <div class="stories-wrap">
          <div class="story-wrap-full">
            <strong><span class="blueColor">Using both td template and column function</span></strong>
            <p>Passing a function for column data manipulation and a custom td template</p>

            <br>
            <div class="pf-c-card">
              <stk-table [items]="data" [config]="combine(config, {tdTemplate: tdTpl})"></stk-table>
              <ng-template #tdTpl let-item="item" let-columns="config.columns" let-col="col">
                <td>
                  <div
                    style="background: #f0f0f0;padding: 12px;"
                    [innerHTML]="getContent(item, config, col)"
                  >
                  </div>
                </td>
              </ng-template>
            </div>
          </div>
        </div>
        `
  };
};

export const ExtraCustomColumn = () => {

    const tableConfig: TableConfig = {
      ...defaultTableConfig,
      compact: true,
      columns: {
        OriginationBranch: 'Amount',
        ApplicationID: 'Indicative Amount',
        BusinessStatus: 'Status',
        Total: {
            label: 'Total',
            template: (item: any) => `All together sums to <strong>
                ${parseInt(item.OriginationBranch, 10) +
                parseInt(item.ApplicationID, 10) +
                parseInt(item.BusinessStatus, 10)}</strong>`
        }
      }
    };

    return {
      component: TableComponent,
      props: {
        data: nbgDeal.Loans,
        config: tableConfig,
        combine: (a, b) =>  {
          return {...a, ...b};
        },
        getContent(item, config, col) {
          return config.columns[col.key].template ? config.columns[col.key].template(item) : item[col.key];
        }
      },
      template: `
          <div class="stories-wrap">
            <div class="story-wrap-full">
              <strong><span class="blueColor">Addin a custom column</span></strong>
              <p>A custom column, rendering content from a function. Having the whole row as context, it's useful for totals etc.</p>
              <br>
              <div class="pf-c-card">
                <stk-table [items]="data" [config]="combine(config, {tdTemplate: tdTpl})"></stk-table>
                <ng-template #tdTpl let-item="item" let-columns="config.columns" let-col="col">
                  <td>
                    <div
                      style="background: blue;color: white;padding: 12px;"
                      [innerHTML]="getContent(item, config, col)"
                    >
                    </div>
                  </td>
                </ng-template>
              </div>
            </div>
          </div>
          `
    };
  };

