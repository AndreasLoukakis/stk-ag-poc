import { Component, OnInit, NgModule, Input } from '@angular/core';
import { ResourceInfo } from './../../../models';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  templateUrl: './fallback.component.html',
  styleUrls: ['./fallback.component.scss']
})
export class FallbackComponent implements OnInit {

  @Input() renderInfo: ResourceInfo;


  constructor() { }

  ngOnInit(): void {
  }
}



