import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[stkCC]'
})
export class CreditCardDirective {

  defaultFormat = /(\d{1,4})/g;
  cards = [
    {
      type: 'maestro',
      patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
      format: this.defaultFormat,
      length: [12, 13, 14, 15, 16, 17, 18, 19],
      cvvLength: [3],
      luhn: true
    }, {
      type: 'visa',
      patterns: [4],
      format: this.defaultFormat,
      length: [13, 16, 19],
      cvvLength: [3],
      luhn: true
    }, {
      type: 'mastercard',
      patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
      format: this.defaultFormat,
      length: [16],
      cvvLength: [3],
      luhn: true
    }, {
      type: 'amex',
      patterns: [34, 37],
      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      length: [15],
      cvvLength: [3, 4],
      luhn: true
    }, {
      type: 'dinersclub',
      patterns: [30, 36, 38, 39],
      format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
      length: [14],
      cvvLength: [3],
      luhn: true
    }, {
      type: 'discover',
      patterns: [60, 64, 65, 622],
      format: this.defaultFormat,
      length: [16],
      cvvLength: [3],
      luhn: true
    }
  ];

  get formControl() {
    return this.ngControl.control;
  }

  constructor(
    private ngControl: NgControl,
    private el: ElementRef<HTMLInputElement>
  ) { }

  // @HostListener('keypress', ['$event']) onKeyPress(e) {

  //   const digit = String.fromCharCode(e.which);
  //   if (!/^\d+$/.test(digit)) {
  //     return;
  //   }

  //   const value = e.target.value;
  //   const card = this.cardFromNumber(value + digit);
  //   const length = (value.replace(/\D/g, '') + digit).length;
  //   let upperLength = 19;

  //   if (card) {
  //     upperLength = card.length[card.length.length - 1];
  //   }

  //   if (length >= upperLength) {
  //     return;
  //   }

  // }

  @HostListener('input') onInputChange(e) {
    this.reFormatCardNumber(e);
    this.setCardType(e);
  }

  private cardFromNumber(num) {

    let card;
    let ref;
    let pattern;
    let p;

    num = (num + '').replace(/\D/g, '');

    for (let i = 0, len = this.cards.length; i < len; i++) {
      card = this.cards[i];
      ref = card.patterns;

      for (let j = 0, len1 = ref.length; j < len1; j++) {
        pattern = ref[j];
        p = pattern + '';

        if (num.substr(0, p.length) === p) {
          return card;
        }
      }
    }
  }

  private replaceFullWidthChars(str) {
    if (str === null) {
      str = '';
    }

    let chr;
    let idx;
    const fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
    const halfWidth = '0123456789';
    let value = '';
    const chars = str.split('');

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < chars.length; i++) {
      chr = chars[i];
      idx = fullWidth.indexOf(chr);
      if (idx > -1) {
        chr = halfWidth[idx];
      }
      value += chr;
    }
    return value;
  }

  private reFormatCardNumber(e) {
    setTimeout(() => {
      let value = this.replaceFullWidthChars(this.formControl.value);
      value = this.formatCardNumber(value);
      const oldValue = this.formControl.value;
      if (value !== oldValue) {
        this.el.nativeElement.selectionStart = this.el.nativeElement.selectionEnd = this.safeVal(value, this.formControl, (safeVal => {
          this.updateValue(safeVal);
        }));
      }
    });
  }

  private formatCardNumber(num) {
    let card;
    let groups;
    let upperLength;

    num = num.replace(/\D/g, '');
    card = this.cardFromNumber(num);

    if (!card) {
      return num;
    }

    upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);

    if (card.format.global) {
      const matches = num.match(card.format);
      if (matches != null) {
        return matches.join(' ');
      }
    } else {
      groups = card.format.exec(num);
      if (groups == null) {
        return;
      }
      groups.shift();
      return groups.filter(Boolean).join(' ');
    }
  }

  private safeVal(value: string, target: any, updateValue: (value: string) => void) {
    let cursor = null;
    const last   = target.value;
    let result: any = null;

    try {
      cursor = target.selectionStart;
    } catch (error) {}

    updateValue(value);

    if (cursor !== null && target === document.activeElement) {
      if (cursor === last.length) {
        cursor = value.length;
      }

      if (last !== value) {
        const prevPair = last.slice(cursor - 1, +cursor + 1 || 9e9);
        const currPair = value.slice(cursor - 1, +cursor + 1 || 9e9);
        const digit = value[cursor];

        if (/\d/.test(digit) && prevPair === (`${digit} `) && currPair === (` ${digit}`)) {
          cursor = cursor + 1;
        }
      }

      result = cursor;

    }
    return result;
  }

  private setCardType(e) {
    let card;
    const val = this.formControl.value;
    const cardType = this.cardType(val) || 'unknown';

    if (!this.el.nativeElement.classList.contains(cardType)) {

      for (let i = 0, len = this.cards.length; i < len; i++) {
        card = this.cards[i];
        this.el.nativeElement.classList.remove(card.type);
      }

      this.el.nativeElement.classList.remove('unknown');
      this.el.nativeElement.classList.add(cardType);
      this.el.nativeElement.classList.toggle('identified', cardType !== 'unknown');
    }
  }

  private cardType(num) {
    if (!num) {
      return num;
    }

    const card = this.cardFromNumber(num);

    if (card !== null && typeof card !== 'undefined') {
      return card.type;
    } else {
      return null;
    }
  }

  private updateValue(value: string) {
    if (this.formControl) {
      this.formControl.setValue(value);
    }
  }

}
