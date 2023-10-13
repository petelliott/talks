import * as Reactor from "reactor";

const App = (props) =>
<div style="color:green"><h1>hey</h1><p>paragraph</p></div>;

Reactor.render(document.getElementById("root"), <App/>);
