import { propsEqual, arraySetDifference } from "./util";
import { withHookContext } from "./hooks";

const textnode = Symbol("textnode");

// vdom helpers

const normalizeChildren = (children) => {
    if (children === null || children === undefined)
        return [];

    if (!Array.isArray(children))
        return [children];

    return children;
};

const willRenderAsText = (component) =>
    typeof component !== "function" && typeof component !== "object";

// vdom rendering

const runComponent = (component, vdom) =>
      withHookContext(vdom, () => component.type(component.props));

export const renderVdom = (component, vdom) => {
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

    const new_children = normalizeChildren(component.props.children)
          .map((component, i) => renderVdom(component, vdom?.children?.[i]));

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

export const renderDom = (newvdom, current) => {
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
        const { children: _1, ...currentProps } = current?.props ?? {};
        const { children: _2, ...newProps } = newvdom.props;

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

        let i;
        for (i = 0; i < current?.children.length && i < newvdom.children.length; ++i) {
            renderDom(newvdom.children[i], current?.children[i]);
        }

        // remove excess vdom children from the dom
        for (; i < current?.children.length; ++i) {
            current.children[i].element.remove();
        }

        // add extra new children
        for (; i < newvdom.children.length; ++i) {
            newvdom.element.appendChild(renderDom(newvdom.children[i], null));
        }
    }
    return newvdom.element;
};

// TODO make this per render().
let inrender = false;
const renderQueue = [];
export const scheduleRerender = (vdom) => {
    renderQueue.push(vdom);
    if (!inrender) {
        inrender = true;
        while (renderQueue.length > 0) {
            const node = renderQueue.shift();
            const oldvdom = node.children;
            node.children = renderVdom(runComponent(node, node), node.children);
            node.element = renderDom(node.children, oldvdom);
        }
        inrender = false;
    }
}
