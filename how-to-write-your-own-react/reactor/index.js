import { propsEqual, arraySetDifference } from "./util";

export const render = (element, component) =>
    element.appendChild(freshRenderComponent(component).element);

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

const freshRenderComponent = (component) => {
    if (typeof component == "string") {
        return {
            typ: textnode,
            element: document.createTextNode(component),
            value: component,
        };
    }

    if (typeof component.type === "function") {
        const child = freshRenderComponent(component.type(component.props));
        return {
            type: component.type,
            props: component.props,
            element: child.element,
            children: child,
        };
    }

    const { children, ...otherProps } = component.props;
    const element = document.createElement(component.type);
    for (const [key, value] of Object.entries(otherProps)) {
        element.setAttribute(key, value);
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
    if (typeof component === "string") {
        if (tree.value !== component) {
            tree.element.nodeValue = component;
            tree.value = component;
        }
        return tree;
    }

    if (typeof component.type === "function") {
        tree.props = component.props;
        tree.children = rerenderComponent(component.type(props), tree.children);
        tree.element = tree.children.element;
        return tree;
    }

    const { treeChildren, ...treeProps } = tree.props;
    const { componentChildren, ...componentProps } = component.props;

    // reconcile props
    const oldkeys = Object.keys(treeProps);
    const newkeys = Object.keys(componentProps);

    // props that have been removed
    for (const attr of arraySetDifference(oldkeys, newkeys)) {
        tree.element.removeAttribute(attr);
    }

    // props that have been added or changed
    for (const attr of newkeys) {
        if (treeProps[attr] !== componentProps[attr]) {
            tree.element.setAttribute(attr, componentProps[attr]);
        }
    }
    tree.props = component.props;

    // reconcile children
    componentChildren = normalizeChildren(componentChildren);

    const newchildren = [];
    let i;
    for (i = 0; i < treeChildren.length && i < componentChildren.length; ++i) {
        newchildren.push(rerenderComponent(componentChildren[i], treeChildren[i]));
    }

    // remove excess tree children from the dom
    for (; i < treeChildren.length; ++i) {
        treeChildren[i].element.remove();
    }

    // add extra new children
    for (; i < componentChildren[i]; ++i) {
        newchildren.push(freshRenderComponent(componentChildren[i]));
    }
    tree.children = newchildren;
    return tree;
};

const rerenderComponent = (component, tree) => {
    if (tree === null || (typeof component === "string" && tree.typ !== textnode) || component.type !== tree.type)
        return freshRenderComponent(component);

    if (propsEqual(component.props, tree.props))
        return tree;

    return reconcileComponent(component, tree);
};
