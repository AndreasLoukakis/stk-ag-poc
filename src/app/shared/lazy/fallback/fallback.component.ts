import { Component, OnInit, NgModule, Input } from '@angular/core';
import { ResourceInfo } from '../../../stk/interfaces';

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



