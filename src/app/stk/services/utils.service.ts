import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  static nameToClass(name: string) {
    return name.split('-').map(item => `${item.charAt(0).toUpperCase()}${item.substr(1)}`).join('');
  }

  static nameToComponentClass(name: string) {
    return `${this.nameToClass(name)}Component`;
  }

  static nameToComponentFolder(name: string) {
    return `${name.split(/(?=[A-Z])/).join('-').toLowerCase()}`;
  }

  static nameToComponentFile(name: string) {
    return `${this.nameToComponentFolder(name)}.component`;
  }

  static toCamelCase(str) {
    str = this.nameToClass(str);
    return `${str.substr( 0, 1 ).toLowerCase()}${str.substr( 1 )}`;
  }
}
