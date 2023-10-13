import * as Reactor from "reactor";

const App = (props) =>
<div style="color:green" title={props.title}><h1>{props.title}</h1><p>{props.paragraph}</p></div>;

const tree = Reactor.render(document.getElementById("root"), <App title="title" paragraph="paragraph"/>);
console.log(tree);
Reactor.rerenderComponent(<App title="title2" paragraph="paragraph2"/>, tree);
console.log(tree);
