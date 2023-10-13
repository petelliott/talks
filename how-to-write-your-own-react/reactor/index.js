import { propsEqual, arraySetDifference } from "./util";
import { withHookContext, useState } from "./hooks";
export { useState } from "./hooks";

export const render = (element, component) => {
    const tree = freshRenderComponent(component);
    element.appendChild(tree.element);
    return tree;
}

export const component = (renderer, props) => ({
    type: renderer,
    props: props,
});

const textnode = Symbol("textnode");

const normalizeChildren = (children) => {
    if (children === null || children === undefined)
        return [];

    if (!Array.isArray(children))
        return [children];

    return children;
};

const runComponent = (component, tree) =>
      withHookContext(tree, () => component.type(component.props));

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


const freshRenderComponent = (component) => {
    if (willRenderAsText(component)) {
        return {
            typ: textnode,
            element: document.createTextNode(component),
            value: component,
        };
    }

    if (typeof component.type === "function") {
        const tree = {
            type: component.type,
            props: component.props,
            element: null,
            children: null,
            state: {},
        };
        const child = freshRenderComponent(runComponent(component, tree));
        tree.element = child.element;
        tree.children = child;
        return tree;
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

const reconcileComponent = (component, tree) => {
    if (willRenderAsText(component)) {
        if (tree.value !== component) {
            tree.element.nodeValue = component;
            tree.value = component;
        }
        return tree;
    }

    if (typeof component.type === "function") {
        tree.props = component.props;
        tree.children = rerenderComponent(runComponent(component, tree), tree.children);
        tree.element = tree.children.element;
        return tree;
    }

    const { children: _, ...treeProps } = tree.props;
    let { children: componentChildren, ...componentProps } = component.props;

    // reconcile props
    const oldkeys = Object.keys(treeProps);
    const newkeys = Object.keys(componentProps);

    // props that have been removed
    for (const attr of arraySetDifference(oldkeys, newkeys)) {
        removePropAttribute(tree.element, attr);
    }

    // props that have been added or changed
    for (const attr of newkeys) {
        if (treeProps[attr] !== componentProps[attr]) {
            setPropAttribute(tree.element, attr, componentProps[attr]);
        }
    }
    tree.props = component.props;

    // reconcile children
    componentChildren = normalizeChildren(componentChildren);

    const newchildren = [];
    let i;
    for (i = 0; i < tree.children.length && i < componentChildren.length; ++i) {
        newchildren.push(rerenderComponent(componentChildren[i], tree.children[i]));
    }

    // remove excess tree children from the dom
    for (; i < tree.children.length; ++i) {
        tree.children[i].element.remove();
    }

    // add extra new children
    for (; i < componentChildren[i]; ++i) {
        newchildren.push(freshRenderComponent(componentChildren[i]));
    }
    tree.children = newchildren;
    return tree;
};

export const rerenderComponent = (component, tree) => {
    if (tree === null || (willRenderAsText(component) && tree.typ !== textnode) || component.type !== tree.type)
        return freshRenderComponent(component);

    if (!willRenderAsText(component) && propsEqual(component.props, tree.props))
        return tree;

    return reconcileComponent(component, tree);
};

// TODO make this per render().
let inrender = false;
const renderQueue = [];
export const scheduleRerender = (tree) => {
    renderQueue.push(tree);
    if (!inrender) {
        inrender = true;
        while (renderQueue.length > 0) {
            let node = renderQueue.shift();
            node.children = rerenderComponent(runComponent(node, node), node.children);
            node.element = tree.children.element;
        }
        inrender = false;
    }
}
