import { propsEqual, arraySetDifference } from "./util";
import { withHookContext } from "./hooks";

const textnode = Symbol("textnode");

const normalizeChildren = (children) => {
    if (children === null || children === undefined)
        return [];

    if (!Array.isArray(children))
        return [children];

    return children;
};

const runComponent = (component, vdom) =>
      withHookContext(vdom, () => component.type(component.props));

const setPropAttribute = (element, name, value) => {
    if (element[name] !== undefined) {
        element[name] = value;
    } else {
        element.setAttribute(name, value);
    }
}

const removePropAttribute = (element, name) => {
    if (element[name] !== undefined) {
        element[name] = null;
    } else {
        element.removeAttribute(name);
    }
}

const willRenderAsText = (component) =>
    typeof component !== "function" && typeof component !== "object";


export const freshRenderComponent = (component) => {
    if (willRenderAsText(component)) {
        return {
            typ: textnode,
            element: document.createTextNode(component),
            value: component,
        };
    }

    if (typeof component.type === "function") {
        const vdom = {
            type: component.type,
            props: component.props,
            element: null,
            children: null,
            state: {},
        };
        const child = freshRenderComponent(runComponent(component, vdom));
        vdom.element = child.element;
        vdom.children = child;
        return vdom;
    }

    const { children, ...otherProps } = component.props;
    const element = document.createElement(component.type);
    for (const [key, value] of Object.entries(otherProps)) {
        setPropAttribute(element, key, value);
    }

    const childnodes = normalizeChildren(children).map(freshRenderComponent);
    for (const child of childnodes) {
        element.appendChild(child.element);
    }

    return {
        type: component.type,
        props: component.props,
        element: element,
        children: childnodes,
    };
};

const reconcileComponent = (component, vdom) => {
    if (willRenderAsText(component)) {
        if (vdom.value !== component) {
            vdom.element.nodeValue = component;
            vdom.value = component;
        }
        return vdom;
    }

    if (typeof component.type === "function") {
        vdom.props = component.props;
        vdom.children = rerenderComponent(runComponent(component, vdom), vdom.children);
        vdom.element = vdom.children.element;
        return vdom;
    }

    const { children: _, ...vdomProps } = vdom.props;
    let { children: componentChildren, ...componentProps } = component.props;

    // reconcile props
    const oldkeys = Object.keys(vdomProps);
    const newkeys = Object.keys(componentProps);

    // props that have been removed
    for (const attr of arraySetDifference(oldkeys, newkeys)) {
        removePropAttribute(vdom.element, attr);
    }

    // props that have been added or changed
    for (const attr of newkeys) {
        if (vdomProps[attr] !== componentProps[attr]) {
            setPropAttribute(vdom.element, attr, componentProps[attr]);
        }
    }
    vdom.props = component.props;

    // reconcile children
    componentChildren = normalizeChildren(componentChildren);

    const newchildren = [];
    let i;
    for (i = 0; i < vdom.children.length && i < componentChildren.length; ++i) {
        newchildren.push(rerenderComponent(componentChildren[i], vdom.children[i]));
    }

    // remove excess vdom children from the dom
    for (; i < vdom.children.length; ++i) {
        vdom.children[i].element.remove();
    }

    // add extra new children
    for (; i < componentChildren[i]; ++i) {
        newchildren.push(freshRenderComponent(componentChildren[i]));
    }
    vdom.children = newchildren;
    return vdom;
};

const rerenderComponent = (component, vdom) => {
    if (vdom === null || (willRenderAsText(component) && vdom.typ !== textnode) || component.type !== vdom.type)
        return freshRenderComponent(component);

    if (!willRenderAsText(component) && propsEqual(component.props, vdom.props))
        return vdom;

    return reconcileComponent(component, vdom);
};

// TODO make this per render().
let inrender = false;
const renderQueue = [];
export const scheduleRerender = (vdom) => {
    renderQueue.push(vdom);
    if (!inrender) {
        inrender = true;
        while (renderQueue.length > 0) {
            let node = renderQueue.shift();
            node.children = rerenderComponent(runComponent(node, node), node.children);
            node.element = vdom.children.element;
        }
        inrender = false;
    }
}
