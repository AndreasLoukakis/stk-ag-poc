import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComplexBaseComponent } from './../../../../stk/abstract/complex-base-component';
import { ApiService } from './../../../../stk/services/api.service';
import { ResourceInfo } from 'src/app/stk/interfaces';
import { DealApiService } from './../../services/deal-api.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  providers: [{provide: ComplexBaseComponent, useExisting: ApplicationComponent}]
})
export class ApplicationComponent extends ComplexBaseComponent implements AfterViewInit {

  formgroup: FormGroup = new FormGroup({});
  formStatus$: Observable<string> = this.formgroup.statusChanges;
  formDirty$: Observable<boolean> = this.formgroup.valueChanges.pipe(map(_ => this.formgroup.pristine));

  constructor(
    protected api: ApiService,
    private router: Router,
    private service: DealApiService
  ) {
    super(api);
    this.renderInfo = this.router.getCurrentNavigation().extras.state as ResourceInfo;
    this.setContext();
  }

  ngAfterViewInit(): void {
    // this.formData$ = this.formgroup.statusChanges;
  }

  createApplication() {
    this.service.createApplication(this.renderInfo.dealId).subscribe(
      _ => {
        this.renderInfo.id = 100;
        this.setContext();
      }
    );
  }


}
