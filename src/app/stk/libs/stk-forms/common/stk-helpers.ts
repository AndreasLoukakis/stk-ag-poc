import { AbstractControl } from '@angular/forms';

export const StkHelpers = {

  valueOrDefault: <T>(obj, path: string, defaultValue: T): T => {
    if (obj === undefined || typeof obj !== 'object' || path === undefined) {
      return defaultValue;
    }

    if (typeof path !== 'string') {
      throw new Error('Invalid path parameter passed to valueOrDefault');
    }

    const pathArr = path.replace(/\]/g, '').replace(/\[/g, '.').split('.');
    return pathArr.reduce((ob, level) => ob && ob[level] ? ob[level] : defaultValue, obj);
  }

};
