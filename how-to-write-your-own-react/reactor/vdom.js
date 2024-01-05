import { propsEqual, arraySetDifference } from "./util";
import { withHookContext, withEffectsRun } from "./hooks";

const textnode = Symbol("textnode");

// vdom helpers

const normalizeChildren = (children) => {
    if (children === null || children === undefined)
        return [];

    if (!Array.isArray(children))
        return [children];

    return children.map(normalizeChildren).reduce((a, b) => a.concat(b), []);
};

const willRenderAsText = (element) =>
    typeof element !== "function" && typeof element !== "object";

// vdom rendering

const runElement = (element, vdom) =>
      withHookContext(vdom, () => element.type(element.props));

const renderVdom = (element, vdom) => {
    // convert undefined to null for consistency
    vdom ??= null;
    if ((willRenderAsText(element) && vdom?.type !== textnode) ||
        element.type !== vdom?.type) {
        // Fresh render when the element type is different
        vdom = null;
    }

    if (willRenderAsText(element)) {
        if (vdom?.value === element) {
            return vdom;
        }

        return {
            type: textnode,
            value: element,
        };
    }

    if (propsEqual(element.props, vdom?.props)) {
        return vdom;
    }

    if (typeof element.type === "function") {
        const new_vdom = {
            type: element.type,
            props: element.props,
            children: null,
            state: vdom?.state ?? {},
        };
        new_vdom.children = renderVdom(
            runElement(element, new_vdom),
            vdom?.children
        );
        return new_vdom;
    }

    const new_children = Object.fromEntries(
        normalizeChildren(element.props.children)
            .map((element, i) => {
                // "$" and "_" prevent number like keys from getting reordered when itterating over a list
                // and also prevents automatic keys being mistaken for regular keys.
                const key = (element.key === undefined)? "$"+i : "_" + element.key;
                return [key, renderVdom(element, vdom?.children?.[key])];
            }));

    return {
        type: element.type,
        props: element.props,
        children: new_children,
    };
};

// vdom reconciliation and dom rendering

const setPropAttribute = (element, name, value) => {
    if (element[name] !== undefined) {
        element[name] = value;
    } else {
        element.setAttribute(name, value);
    }
};

const removePropAttribute = (element, name) => {
    if (element[name] !== undefined) {
        element[name] = null;
    } else {
        element.removeAttribute(name);
    }
};

const renderDom = (newvdom, current) => {
    if (current === newvdom) {
    } else if (current != null && current.type !== newvdom.type) {
        renderDom(newvdom, null);
    } else if (newvdom.type === textnode) {
        newvdom.element = current?.element ?? document.createTextNode(newvdom.value);
        if (current?.value !== newvdom.value) {
            newvdom.element.nodeValue = newvdom.value;
        }
    } else if (typeof newvdom.type === "function") {
        renderDom(newvdom.children, current?.children);
        newvdom.element = newvdom.children.element;
    } else {
        const { children: _3, key: _1, ...currentProps } = current?.props ?? {};
        const { children: _4, key: _2, ...newProps } = newvdom.props;

        const currentkeys = Object.keys(currentProps);
        const newkeys = Object.keys(newProps);

        newvdom.element = current?.element ?? document.createElement(newvdom.type);

        // props that have been removed
        for (const attr of arraySetDifference(currentkeys, newkeys)) {
            removePropAttribute(newvdom.element, attr);
        }

        for (const attr of newkeys) {
            if (newProps[attr] !== currentProps[attr]) {
                setPropAttribute(newvdom.element, attr, newProps[attr]);
            }
        }

        const currentChildren = Object.keys(current?.children ?? {});
        const newChildren = Object.keys(newvdom.children);

        for (const attr of arraySetDifference(currentChildren, newChildren)) {
            current?.children[attr].element.remove();
        }

        let curri = 0;
        let newi = 0;
        const seen = new Set();
        while (newi < newChildren.length) {
            let ckey = currentChildren[curri];
            for (ckey = currentChildren[curri];
                 curri < currentChildren.length && (!newChildren.includes(ckey) || seen.has(ckey));
                 ckey = currentChildren[++curri]) {
            }

            const nkey = newChildren[newi];
            seen.add(nkey);
            const currentelement = current?.children[ckey]?.element;
            const element = renderDom(newvdom.children[nkey], current?.children[nkey]);
            if (nkey === ckey) {
                if (element !== currentelement) {
                    currentelement.replaceWith(element);
                }
                ++curri;
                ++newi;
            } else {
                if (currentelement === undefined) {
                    newvdom.element.appendChild(element);
                } else {
                    newvdom.element.insertBefore(element, currentelement);
                }
                ++newi;
            }
        }
    }
    return newvdom.element;
};

export const renderInitial = (domElement, reactorElement) => {
    return withEffectsRun(() => {
        const vdom = renderVdom(reactorElement, null);
        domElement.appendChild(renderDom(vdom, null));
        return vdom;
    });
};

// TODO make this per render().
let inrender = false;
const renderQueue = [];
export const scheduleRerender = (vdom) => {
    renderQueue.push(vdom);
    if (!inrender) {
        inrender = true;
        withEffectsRun(() => {
            while (renderQueue.length > 0) {
                const node = renderQueue.shift();
                const oldvdom = node.children;
                node.children = renderVdom(runElement(node, node), node.children);
                node.element = renderDom(node.children, oldvdom);
            }
        });
        // TODO coalesce renders
        inrender = false;
    }
}
