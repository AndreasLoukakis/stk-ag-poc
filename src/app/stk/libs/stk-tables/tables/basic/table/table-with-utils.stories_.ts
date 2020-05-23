import { moduleMetadata } from '@storybook/angular';
import { boolean, number, text, object , withKnobs } from '@storybook/addon-knobs';
import { } from '@storybook/addon-storysource';

import { RowNoResultsComponent, TableConfig } from 'stk-tables';
import { TableComponent } from './table.component';
import { RowComponent } from '../row/row.component';
import { CompoundRowComponent } from '../compound-row/compound-row.component';
import { TheadComponent } from '../thead/thead.component';

import { StkUtilsService } from '../../../../../../stk-utils/src/lib/stk-utils.service';

import changelogmd from './../../../../../changelog.md';
import notes from './notes.md';

import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-addons.css';

import { tst as data } from '../../../../../../../mocks/clean-deal';


export default {
  title: 'Tables/Utils',
  component: TableComponent,
  decorators: [
    withKnobs,
    moduleMetadata({
      declarations: [
        RowComponent, RowNoResultsComponent, TableComponent, CompoundRowComponent, TheadComponent
      ],
      providers: [StkUtilsService],
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

export const AutoConfig = () => {

  return {
    component: TableComponent,
    props: {
      data,
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
          <strong><span class="blueColor">Auto Config</span></strong>
          <p>Using an stk-util function to generate configuration straight from data structure.</p>
          <br>
            <div class="pf-c-card">
              <stk-table [items]="data" [config]="{compound: true, columns: columns}"></stk-table>
            </div>
          </div>
        </div>
        `
  };
};
