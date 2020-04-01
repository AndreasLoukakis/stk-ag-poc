import * as classes from './';

export class DynamicClass {
    constructor(className, params = {}) {
        return setClassValues(new classes[className](), params);
    }
}

function setClassValues<T>(obj: T, params) {
    return Object.keys(obj).reduce(
        (o, key) => {
            if (params[key]) { o[key].value = params[key]; }
            return o;
        }
    , obj);
}
