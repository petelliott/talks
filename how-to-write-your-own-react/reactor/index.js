
export const render = (element, component) => {
    element.appendChild(component);
}

export const renderComponent = (renderer, props) => {
    if (typeof renderer === "string") {
        const { children, ...otherProps } = props;
        const element = document.createElement(renderer, {});
        for (const [key, value] of Object.entries(otherProps)) {
            element.setAttribute(key, value);
        }
        for (const child of children) {
            if (typeof child === "object") {
                element.appendChild(child);
            } else if (typeof child === "string"){
                element.appendChild(document.createTextNode(child));
            }
        }
        return element;
    } else {
        return renderer(props);
    }
}
