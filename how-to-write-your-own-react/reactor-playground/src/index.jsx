import * as Reactor from "reactor";

const Counter = (props) => {
    const [count, setCount] = Reactor.useState(0);
    return <div>
        <p>count={count}</p>
        <button onclick={(e) => setCount(count + 1)}>increment</button>
     </div>;
};

const App = (props) => {
    const [count, setCount] = Reactor.useState(0);
    console.log(tree);

    return <div>
        {count.dotimes(() => <Counter/>)}
        <button onclick={(e) => setCount(count + 1)}>add counter</button>
        <button onclick={(e) => setCount(count - 1)}>remove counter</button>
    </div>
};

const tree = Reactor.render(document.getElementById("root"), <App />);
