import { Directive, ElementRef, OnInit } from '@angular/core';
import { UiStateService } from './../services/ui-state.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[debug]'
})
export class DebugDirective implements OnInit {

  constructor(
    private el: ElementRef<HTMLDivElement>,
    private uiState: UiStateService
  ) { }

  ngOnInit() {
    this.uiState.debug$.subscribe(state => {
      this.el.nativeElement.style.display = state ? 'block' : 'none';
    });
  }


}
