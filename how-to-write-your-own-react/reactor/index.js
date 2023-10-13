import { propsEqual, arraySetDifference} from "./util";

export const render = (element, component) =>
    element.appendChild(component);

export const component = (renderer, props) => ({
    type: renderer,
    props: props,
});

const normalizeChildren = (children) => {
    if (children === null || children === undefined)
        return [];

    if (!Array.isArray(children))
        return [children];

    return children;
};

const freshRenderComponent = (component, tree) => {

};

const reconcileComponent = (component, tree) => {
    if (typeof component.type === "function") {
        tree.props = component.props;
        tree.children = renderComponent(component.type(props), tree.children);
        tree.element = tree.children.element;
        return tree;
    }

    const { treeChildren, ...treeProps } = tree.props;
    const { componentChildren, ...componentProps } = component.props;

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

    componentChildren = normalizeChildren(componentChildren);

    let i = 0;
    for (const )
};

const rerenderComponent = (component, tree) => {
    if (tree === null || component.type !== tree.type)
        return freshRenderComponent(component);

    if (propsEqual(component.props, tree.props))
        return tree;

    return reconcileComponent(component, tree);
};

/*
    if (typeof renderer === "string") {
        const { children, ...otherProps } = props;
        const element = document.createElement(renderer, {});
        for (const [key, value] of Object.entries(otherProps)) {
            element.setAttribute(key, value);
        }
        for (const child of children) {
            if (typeof child === "object") {
                element.appendChild(child);
            } else if (typeof child === "string") {
                element.appendChild(document.createTextNode(child));
            }
        }
        return element;
    } else {
        return renderer(props);
    }
}
*/
