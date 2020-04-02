import { Component } from '@angular/core';
import { ComplexBaseComponent } from './../../../../stk/abstract/complex-base-component';
import { ApiService } from './../../../../stk/services/api.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: ApplicationComponent}]
})
export class ApplicationComponent extends ComplexBaseComponent {


  buttonToggled = false;

  constructor(
    protected api: ApiService
  ) { super(api); }

  toggleButtonClass() {
    this.buttonToggled = !this.buttonToggled;
  }

}
