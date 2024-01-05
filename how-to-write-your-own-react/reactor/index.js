import { withHookContext, useState } from "./hooks";
import { renderVdom, renderDom, renderInitial } from "./vdom";
export { useState, useEffect, useRef } from "./hooks";

export const render = renderInitial;

export const element = (renderer, props, key) => ({
    type: renderer,
    props: props,
    key: key
});
