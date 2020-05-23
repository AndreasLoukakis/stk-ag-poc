import { Directive, Input, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[stkMapLanguage]'
})
export class MapLanguageDirective implements AfterViewInit {

  @Input() stkMapLanguage: string; // en:el

  get formControl() {
    return this.ngControl.control;
  }

  fromLang: string;
  toLang: string;

  constructor(
    private ngControl: NgControl,
    private el: ElementRef<HTMLInputElement>
  ) { }

  ngAfterViewInit() {
    this.setContext(this.stkMapLanguage);
    this.onInputChange();
  }

  @HostListener('input') onInputChange() {
    if (this.stkMapLanguage) {
      if (this.fromLang && this.toLang) {
        const cp = this.el.nativeElement?.selectionStart;
        this.formControl.setValue( this.translate(this.formControl.value, this.fromLang, this.toLang));
        this.el.nativeElement?.setSelectionRange(cp, cp);
      }
    }
  }

  private setContext(input: string): void {
    if (input) {
      [this.fromLang, this.toLang] = input.split('_');
    }
  }


  private translate(str: string, from, to) {
    if (!str) { return; }
    const translations: any = {
      EN_EL: {
        a : 'α',
        b : 'β',
        c : 'ψ',
        d : 'δ',
        e : 'ε',
        f : 'φ',
        g : 'γ',
        h : 'η',
        i : 'ι',
        j : 'ξ',
        k : 'κ',
        l : 'λ',
        m : 'μ',
        n : 'ν',
        o : 'ο',
        p : 'π',
        q : 'κ',
        r : 'ρ',
        s : 'σ',
        t : 'τ',
        u : 'θ',
        v : 'ω',
        w : 'ς',
        x : 'χ',
        y : 'υ',
        z : 'ζ',
        A : 'Α',
        B : 'Β',
        C : 'Ψ',
        D : 'Δ',
        E : 'Ε',
        F : 'Φ',
        G : 'Γ',
        H : 'Η',
        I : 'Ι',
        J : 'Ξ',
        K : 'Κ',
        L : 'Λ',
        M : 'Μ',
        N : 'Ν',
        O : 'Ο',
        P : 'Π',
        Q : 'Κ',
        R : 'Ρ',
        S : 'Σ',
        T : 'Τ',
        U : 'Θ',
        V : 'Ω',
        W : 'Σ',
        X : 'Χ',
        Y : 'Υ',
        Z : 'Ζ'
      },
      EL_EN: {
        α: 'a',
        β: 'v',
        γ: 'g',
        δ: 'd',
        ε: 'e',
        ζ: 'z',
        η: 'e',
        θ: 'th',
        ι: 'i',
        κ: 'k',
        λ: 'l',
        μ: 'm',
        ν: 'n',
        ξ: 'x',
        ο: 'o',
        π: 'p',
        ρ: 'r',
        σ: 's',
        ς: 's',
        τ: 't',
        υ: 'u',
        φ: 'f',
        χ: 'h',
        ψ: 'ps',
        ω: 'o',
        ά: 'a',
        έ: 'e',
        ί: 'i',
        ό: 'o',
        ύ: 'u',
        ή: 'e',
        ώ: 'o',
        ϊ: 'i',
        ϋ: 'u',
        ΰ: 'u',
        ΐ: 'i',
        Α: 'A',
        Β: 'V',
        Γ: 'G',
        Δ: 'D',
        Ε: 'E',
        Ζ: 'Z',
        Η: 'E',
        Θ: 'Th',
        Ι: 'I',
        Κ: 'K',
        Λ: 'L',
        Μ: 'M',
        Ν: 'N',
        Ξ: 'X',
        Ο: 'O',
        Π: 'P',
        Ρ: 'R',
        Σ: 'S',
        Τ: 'T',
        Υ: 'U',
        Φ: 'F',
        Χ: 'H',
        Ψ: 'Ps',
        Ω: 'O',
        Ά: 'A',
        Έ: 'E',
        Ί: 'I',
        Ό: 'O',
        Ύ: 'U',
        Ή: 'E',
        Ώ: 'O',
        Ϊ: 'I',
        Ϋ: 'U',
      }
    };

    const map = `${from}_${to}`;
    if (!translations[map]) { return str; }

    let result = '';
    for (let i = 0; i <= str.length - 1; i++) {
      result += translations[map][str.charAt(i)] || str.charAt(i);
    }
    return result;
  }

}
