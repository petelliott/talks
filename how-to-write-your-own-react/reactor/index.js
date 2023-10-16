import { withHookContext, useState } from "./hooks";
import { renderVdom, renderDom } from "./vdom";
export { useState } from "./hooks";


export const render = (element, component) => {
    const vdom = renderVdom(component, null);
    element.appendChild(renderDom(vdom, null));
    return vdom;
}

export const component = (renderer, props) => ({
    type: renderer,
    props: props,
});
