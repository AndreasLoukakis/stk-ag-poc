import { ComponentFactoryResolver, ComponentRef, Directive, Input,
  OnChanges, OnInit, ViewContainerRef, OnDestroy, Type
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputCheckboxComponent } from '../../elements/input-checkbox/input-checkbox.component';
import { InputRadioComponent } from '../../elements/input-radio/input-radio.component';
import { InputTextComponent } from '../../elements/input-text/input-text.component';
import { PlainTextComponent } from '../../elements/plain-text/plain-text.component';
import { SimpleSelectComponent } from '../../elements/simple-select/simple-select.component';

import { FormElement } from '../../elements/form-elements-base';
import { FieldConfig } from '../interfaces/field-config';

const components: {[type: string]: Type<FormElement>} = {
  'input.text': InputTextComponent,
  'input.number': InputTextComponent,
  'input.email': InputTextComponent,
  'input.password': InputTextComponent,
  'input.checkbox': InputCheckboxComponent,
  'input.radio': InputRadioComponent,
  select: SimpleSelectComponent,
  text: PlainTextComponent
};

@Directive({
  selector: '[stkDField]'
})
export class DFieldDirective implements OnChanges, OnInit, OnDestroy {

  @Input()
  config: FieldConfig;

  @Input()
  layoutCols: number;

  @Input()
  group: FormGroup;

  @Input()
  readonly = false;

  @Input()
  formFnToCallUpdateState: (p: any) => void;

  component: ComponentRef<FormElement>;
  subscriptions: Subscription[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.x_fieldType]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}). Supported types: ${supportedTypes}`
      );
    }
    const component = this.readonly ?
      this.resolver.resolveComponentFactory<FormElement>(PlainTextComponent) :
      this.resolver.resolveComponentFactory<FormElement>(components[this.config.x_fieldType]);

    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.subscriptions.push(
      this.component.instance.stateChanger
        .subscribe(
          val => this.formFnToCallUpdateState(val)
        )
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }

}
