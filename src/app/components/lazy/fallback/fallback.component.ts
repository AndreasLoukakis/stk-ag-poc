import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererInfo } from './../../../models';

@Component({
  templateUrl: './fallback.component.html',
  styleUrls: ['./fallback.component.scss']
})
export class FallbackComponent implements OnInit {

  @Input() renderInfo: RendererInfo;


  constructor() { }

  ngOnInit(): void {
  }
}

// @NgModule({
//   declarations: [FallbackComponent],
//   imports: [CommonModule]
// })
// class FallbackModule {}

