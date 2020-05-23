import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsComponent } from './stk-forms.component';
import { InputTextComponent } from './elements/input-text/input-text.component';
import { ErrorContainerComponent } from './common/components/error-container/error-container.component';
import { InputRadioComponent } from './elements/input-radio/input-radio.component';
import { InputCheckboxComponent } from './elements/input-checkbox/input-checkbox.component';
import { SimpleSelectComponent } from './elements/simple-select/simple-select.component';
import { PlainTextComponent } from './elements/plain-text/plain-text.component';
import { DFormComponent } from './form-containers/dform/dform.component';
import { InputDateComponent } from './elements/input-date/input-date.component';

import { DFieldDirective } from './common/directives/dfield.directive';
import { ChangeCaseDirective } from './common/directives/change-case.directive';
import { MapLanguageDirective } from './common/directives/map-language.directive';

import { StkDatepickerModule} from 'stk-datepicker';
import { MathDirective } from './common/directives/math.directive';
import { ValidationsDirective } from './common/directives/validations.directive';
import { AppendDirective } from './common/directives/append.directive';
import { PrependDirective } from './common/directives/prepend.directive';
import { CreditCardDirective } from './common/directives/credit-card.directive';

const entryCmp = [
  InputTextComponent, InputRadioComponent,
  InputCheckboxComponent, SimpleSelectComponent, PlainTextComponent,
  InputDateComponent
];

const nonExportsCmp = [
  FormsComponent
];

const ExportsCmp = [
  ErrorContainerComponent, DFormComponent, DFieldDirective, ChangeCaseDirective, MapLanguageDirective,
  MathDirective, ValidationsDirective, AppendDirective, PrependDirective
];

@NgModule({
  declarations: [
   ...nonExportsCmp, ...ExportsCmp, ...entryCmp, CreditCardDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StkDatepickerModule
  ],
  exports: [
    ...ExportsCmp, ...entryCmp
  ],
  entryComponents: [
    ...entryCmp
  ]
})
export class StkFormsModule { }
