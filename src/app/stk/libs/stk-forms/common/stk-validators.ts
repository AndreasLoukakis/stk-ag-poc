import { AbstractControl } from '@angular/forms';

export const StkValidators = {

  // TODO: defer actual message to translation service
  greekVat: (control: AbstractControl) => {

    const invalidResponse = {
      greekVat: {
        invalid: true,
        message: (title) => `${title} should be a valid VAT number`
      }
    };

    let afm = control.value !== undefined ? String(control.value) : control.value;

    if (!afm || !afm.length || afm.length !== 9 || typeof afm !== 'string') {
      return invalidResponse;
    }

    afm = afm.split('').reverse().join('');

    let Num1 = 0;
    for (let iDigit = 1; iDigit <= 8; iDigit++) {
        // tslint:disable-next-line:no-bitwise
        Num1 += afm.charAt(iDigit) << iDigit;
        if (isNaN(Num1)) { return invalidResponse; }
    }

    if (String((Num1 % 11) % 10) === String(afm.charAt(0))) {
      return null;
    }

    return invalidResponse;

  },

  greekOnly: (control: AbstractControl) => {

    const invalidResponse = {
      greekOnly: {
        invalid: true,
        message: (title) => `Only greek characters allowed`
      }
    };

    const greekReg = /^[\u0391-\u03C9\s]*$/;
    return control && control.value && !greekReg.test(control.value) ? invalidResponse : null;

  },

  latinOnly: (control: AbstractControl) => {

    const invalidResponse = {
      latinOnly: {
        invalid: true,
        message: (title) => `Only latin characters allowed`
      }
    };

    const latinReg = /^[a-zA-Z\s]*$/;
    return control && control.value && !latinReg.test(control.value) ? invalidResponse : null;

  },

  alpha: (control: AbstractControl) => {

    const invalidResponse = {
      alpha: {
        invalid: true,
        message: (title) => `Only greek or latin characters allowed`
      }
    };

    const alphaReg = /^[a-zA-Z\u0391-\u03C9\s]*$/;
    return control && control.value && !alphaReg.test(control.value) ? invalidResponse : null;

  },

  alphaNumeric: (control: AbstractControl) => {

    const invalidResponse = {
      alphaNumeric: {
        invalid: true,
        message: (title) => `No special characters allowed`
      }
    };

    const alphanumReg = /^[0-9a-zA-Z\u0391-\u03C9\s]*$/;
    return control && control.value && !alphanumReg.test(control.value) ? invalidResponse : null;
  },

};
