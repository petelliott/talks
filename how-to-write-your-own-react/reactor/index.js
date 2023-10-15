import { withHookContext, useState } from "./hooks";
import { freshRenderComponent } from "./vdom";
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
