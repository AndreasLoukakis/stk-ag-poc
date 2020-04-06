export function OnChange<T>(callback: (val: T, msg: OnChangeMsg<T>) => any): PropertyDecorator {

  const privateVar = Symbol();
  const isFirstChange = Symbol();

  return (target: object, key: string): void => {
    Object.defineProperty(target, key, {
      set(val) {
        this[isFirstChange] = this[isFirstChange] === undefined;
        if (val === this[privateVar] && !this[isFirstChange]) { return; }

        const msg = new OnChangeMsg<T>(this[privateVar], val, this[isFirstChange]);
        this[privateVar] = val;
        callback.call(this, this[privateVar], msg);
      },
      get() {
        return this[privateVar];
      }
    });
  };
}

export class OnChangeMsg<T> {
  firstChange: boolean;
  previeousValue: T;
  currentValue: T;

  constructor(prev: T, current: T, isFirstChange: boolean) {
    this.previeousValue = prev;
    this.currentValue = current;
    this.firstChange = isFirstChange;
  }
}
