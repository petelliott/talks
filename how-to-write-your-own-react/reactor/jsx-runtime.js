import { renderComponent } from ".";

export const jsx = (renderer, props) => {
    const {children, ...otherProps} = props;
    return renderComponent(renderer, {children: [children], ...otherProps});
}
export const jsxs = (renderer, props) => renderComponent(renderer, props);

export const Fragment = (props) => {
    console.log("TODO: fragment");
}
