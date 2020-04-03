import { Component, OnInit } from '@angular/core';
import { UiStateService } from './../../../../common/services/ui-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  debugState = false;
  constructor(private uiState: UiStateService) { }

  ngOnInit(): void {
  }

  toggleDebug() {
    console.log('clicked, ', this.debugState)
    this.debugState = !this.debugState;
    this.uiState.setDebugMode(this.debugState);
  }

}
