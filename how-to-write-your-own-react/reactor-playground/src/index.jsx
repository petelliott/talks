import * as Reactor from "reactor";

const App = (props) => {
    const[count, setCount] = Reactor.useState(0);
    return <div>
        <p>count={count}</p>
        <button onclick={(e) => setCount(count + 1)}>increment</button>
     </div>;
};

const tree = Reactor.render(document.getElementById("root"), <App />);
