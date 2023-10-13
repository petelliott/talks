
export const propsEqual = (a, b) => {
    if (a === b)
        return true;

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

export const arraySetDifference = (a, b) =>
    a.filter(i => !b.includes(i));
