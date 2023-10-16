import { withHookContext, useState } from "./hooks";
import { renderVdom, renderDom, renderInitial } from "./vdom";
export { useState, useEffect } from "./hooks";


export const render = renderInitial;

export const component = (renderer, props) => ({
    type: renderer,
    props: props,
});
