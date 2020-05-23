import { moduleMetadata } from '@storybook/angular';
import { boolean, number, text, object , withKnobs } from '@storybook/addon-knobs';
import { } from '@storybook/addon-storysource';

import {
  RowNoResultsComponent, TableConfig, CompoundRowComponent, TheadComponent, RowComponent, TableComponent
} from 'stk-tables';

import changelogmd from './../../../../../changelog.md';
import notes from './notes.md';
import { nbgDeal } from './../../../../../../../mocks/nbg-deal';


export default {
  title: 'Tables/Basic',
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

export const BasicTable = () => {


  return {
    component: TableComponent,
    props: {
      data: nbgDeal.Loans,
      config: defaultTableConfig,
    },
    template: `
        <div class="stories-wrap">
          <div class="story-wrap-full">
          <strong><span class="blueColor">Simple table</span></strong>
          <p>Passing key - value pairs, to define property name and title. Using default config.</p>
          <br>
            <div class="pf-c-card">
              <stk-table [items]="data" [config]="config"></stk-table>
            </div>
          </div>
        </div>
        `
  };
};

export const CompactTable = () => {

  const tableConfig: TableConfig = {
    ...defaultTableConfig,
    compact: true
  };

  return {
    component: TableComponent,
    props: {
      data: nbgDeal.Loans,
      config: tableConfig,
    },
    template: `
        <div class="stories-wrap">
          <div class="story-wrap-full">
          <strong><span class="blueColor">Compact table</span></strong>
          <p>Setting <code>{{'{'}} compact: true {{'}'}}</code> in table config</p>
          <br>
            <div class="pf-c-card">
              <stk-table [items]="data" [config]="config"></stk-table>
            </div>
          </div>
        </div>
        `
  };
};

