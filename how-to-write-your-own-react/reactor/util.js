
export const propsEqual = (a, b) => {
    if (a === b)
        return true;

    if (a == null || b == null)
        return false;

    var keysa = Object.keys(a);
    var keysb = Object.keys(b);

    if (keysa.length !== keysb.length)
        return false;

    for (const k of keysa) {
        if (a[k] !== b[k])
            return false;
    }

    return true;
};

export const dependenciesEqual = (a, b) => {
    if (a === b)
        return true;

    if (a === null || b === null || a === undefined || b === undefined)
        return false;


    if (a.length !== b.length)
        return false;

    for (const k in a) {
        if (a[k] !== b[k])
            return false;
    }

    return true;
};

export const arraySetDifference = (a, b) =>
    a.filter(i => !b.includes(i));

export const flattenRecursive = (l) => {
    if (!Array.isArray(l))
        return [l];

    return l.map(flattenRecursive).reduce((a, b) => a.concat(b), []);
};

Number.prototype.dotimes = function (f) {
    var l = new Array(this);
    for (let i = 0; i < this; ++i) {
        l[i] = f(i);
    }
    return l;
};
