import { TextBehavior } from '../interfaces';
import { StkHelpers as h } from '../stk-helpers';


export function WithBehavior(): ClassDecorator {
  return (target: any) => {

    target.prototype.noBehavior = () => {
      return (!target.prototype.config || !target.prototype.config.x_behavior) && !target.prototype.behavior;
    };

    target.prototype.getBehavior = (which: TextBehavior) => {
      return h.valueOrDefault(target, 'prototype.config.x_behavior', [])
        .find(b => b.includes(which)) || h.valueOrDefault(target, 'prototype.behavior', [])
        .find(b => b.includes(which)) || null;
    };

    target.prototype.behave = (callback) => {
      return !callback ? null : target.prototype.noBehavior() ? null : callback();
    };

    target.prototype.asChangeCase = () => {
      return target.prototype.getBehavior(TextBehavior.lowercase) ?
        'lower' : target.prototype.getBehavior(TextBehavior.uppercase) ?
        'upper' : target.prototype.getBehavior(TextBehavior.firstUp) ?
        'firstUp' : null;
    };

    target.prototype.asTranslate = () => {
      return  target.prototype.getBehavior(TextBehavior.EN_EL) ?
        'EN_EL' : target.prototype.getBehavior(TextBehavior.EL_EN) ?
        'EL_EN' : null;
    };

    target.prototype.asMath = () => {
      return target.prototype.getBehavior(TextBehavior.math);
    };

    target.prototype.asAppend = () => {
      const append = target.prototype.getBehavior(TextBehavior.append);
      if (append) {
        const appendArr = append.split(':');
        if (appendArr[1]) {
          return appendArr[1];
        }
      }
      return  null;
    };

    target.prototype.asPrepend = () => {
      const prepend = target.prototype.getBehavior(TextBehavior.prepend);
      if (prepend) {
        const prependArr = prepend.split(':');
        if (prependArr[1]) {
          return prependArr[1];
        }
      }
      return  null;
    };

    target.prototype.initBehavior = () => {
      target.prototype.behave(target.prototype.asChangeCase);
      target.prototype.behave(target.prototype.asTranslate);
      target.prototype.behave(target.prototype.asMath);
      target.prototype.behave(target.prototype.asAppend);
      target.prototype.behave(target.prototype.asPrepend);
    };

  };
}
