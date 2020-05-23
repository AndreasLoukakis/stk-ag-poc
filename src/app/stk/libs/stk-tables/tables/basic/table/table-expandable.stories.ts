import { moduleMetadata } from '@storybook/angular';
import { boolean, number, text, object , withKnobs } from '@storybook/addon-knobs';

import { RowNoResultsComponent, TableConfig, RowComponent, CompoundRowComponent, TheadComponent, TableComponent } from 'stk-tables';

import changelogmd from './../../../../../changelog.md';
import notes from './notes.md';

import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';

import { nbgDeal } from './../../../../../../../mocks/nbg-deal';


export default {
  title: 'Tables/Expandable',
  component: TableComponent,
  decorators: [
    withKnobs,
    moduleMetadata({
      declarations: [
        RowComponent, RowNoResultsComponent, TableComponent, CompoundRowComponent, TheadComponent
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

export const Expandable = () => {

  return {
    component: TableComponent,
    props: {
      data: nbgDeal.Loans,
      columns: defaultTableConfig.columns,
      expandTableConfig: {
        BankCode: 'Bank Code',
        AccountNumber: 'Account Number',
        Type: 'Type',
        CoreAccountCategory: 'Account Category'
      }
    },
    template: `
        <div class="stories-wrap">
          <div class="story-wrap-full">
          <strong><span class="blueColor">Expandable table</span></strong>
          <p>Table expansion area provides a full width container, may used with a list,
           other table or any other non-grid content layout. In this example, we use another
           instance of the same component (stk-table) to display an additional item collection.</p>
          <br>
            <div class="pf-c-card">
              <stk-table [items]="data" [config]="{columns: columns, expandable: true, expandItemTemplate: myExpandedTpl}"></stk-table>
              <ng-template #myExpandedTpl let-item="item">
                <section class="pf-c-data-list__expandable-content">
                  <h3 class="pf-u-text-align-center pf-c-title pf-m-2xl">Balance Transfer Products</h3>
                  <div class="pf-c-data-list__expandable-content-body pf-m-no-padding">
                    <stk-table [config]="{compact: true, columns: expandTableConfig}" [items]="item.BalanceTransferProducts"></stk-table>
                  </div>
                </section>
              </ng-template>
            </div>
          </div>
        </div>
        `
  };
};

export const Compound = () => {

  return {
    component: TableComponent,
    props: {
      data: nbgDeal.Loans,
      columns: {
        ApplicationRequestedType: 'Type',
        NecessaryDocuments: {
          label: 'Necessary documents',
          config: {
            columns: {
              NecessaryDocumentCode: 'Code',
              StatusType: 'Status Type',
              ConfirmType: 'Confirm Type'
            }
          }
        },
        RelatedBorrowers: {
          label: 'Related Borrowers',
          config: {
            columns: {
              Id: 'Id',
              ClassificationType: 'Classification Type'
            }
          }
        },
        ApplicationID: 'Application ID'
      }
    },
    template: `
        <div class="stories-wrap">
          <div class="story-wrap-full">
          <strong><span class="blueColor">Compound table</span></strong>
          <p>Compound tables are great for displaying nested structures - collections or objects.
           You may mix displaying simple key - value config for primitive values and complex config for collections.</p>
          <br>
            <div class="pf-c-card">
              <stk-table [items]="data" [config]="{compound: true, columns: columns}"></stk-table>
            </div>
          </div>
        </div>
        `
  };
};
