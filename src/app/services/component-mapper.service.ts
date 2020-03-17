import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class ComponentMapperService {

  constructor() { }

  getComponentName(currie: string) {
    const parts = currie.split(':');
    return parts[1] ? parts[1] : parts[0];
  }
}
