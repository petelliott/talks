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

const willRenderAsText = (component) =>
    typeof component !== "function" && typeof component !== "object";

// vdom rendering

const runComponent = (component, vdom) =>
      withHookContext(vdom, () => component.type(component.props));

const renderVdom = (component, vdom) => {
    // convert undefined to null for consistency
    vdom ??= null;
    if ((willRenderAsText(component) && vdom?.type !== textnode) ||
        component.type !== vdom?.type) {
        // Fresh render when the component type is different
        vdom = null;
    }

    if (willRenderAsText(component)) {
        if (vdom?.value === component) {
            return vdom;
        }

        return {
            type: textnode,
            value: component,
        };
    }

    if (propsEqual(component.props, vdom?.props)) {
        return vdom;
    }

    if (typeof component.type === "function") {
        const new_vdom = {
            type: component.type,
            props: component.props,
            children: null,
            state: vdom?.state ?? {},
        };
        new_vdom.children = renderVdom(
            runComponent(component, new_vdom),
            vdom?.children
        );
        return new_vdom;
    }

    const new_children = Object.fromEntries(
        normalizeChildren(component.props.children)
            .map((component, i) => {
                // "$" and "_" prevent number like keys from getting reordered when itterating over a list
                // and also prevents automatic keys being mistaken for regular keys.
                const key = (component.key === undefined)? "$"+i : "_" + component.key;
                return [key, renderVdom(component, vdom?.children?.[key])];
            }));

    return {
        type: component.type,
        props: component.props,
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

export const renderInitial = (element, component) => {
    return withEffectsRun(() => {
        const vdom = renderVdom(component, null);
        element.appendChild(renderDom(vdom, null));
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
                node.children = renderVdom(runComponent(node, node), node.children);
                node.element = renderDom(node.children, oldvdom);
            }
        });
        // TODO coalesce renders
        inrender = false;
    }
}
