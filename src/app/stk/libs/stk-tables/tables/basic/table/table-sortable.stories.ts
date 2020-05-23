import { moduleMetadata } from '@storybook/angular';
import { boolean, number, text, object , withKnobs } from '@storybook/addon-knobs';

import { RowNoResultsComponent, TableConfig, CompoundRowComponent, RowComponent, TheadComponent, TableComponent } from 'stk-tables';

import changelogmd from './../../../../../changelog.md';
import notes from './notes.md';

import { nbgDeal } from './../../../../../../../mocks/nbg-deal';


export default {
  title: 'Tables/Sortable',
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
    },
    // storySource: {
    //   source: RowComponent,
    // }
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


export const SortableTable = () => {

  const tableConfig: TableConfig = {
    ...defaultTableConfig,
    sortable: true,
    sortDefault: 'ApplicationRequestedType'
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
            <strong><span class="blueColor">Sortable table</span></strong>
            <p>Setting <code>{{'{'}} sortable: true {{'}'}}</code> in table config.
            <br>May also set {{'{'}}config.sortDefault: ... {{'}'}} to any of the provided properties.</p>

            <br>
            <div class="pf-c-card">
              <stk-table [items]="data" [config]="config"></stk-table>
            </div>
          </div>
        </div>
        `
  };
};
