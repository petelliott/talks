import * as Reactor from "reactor";
import { SlideShow, Slide, TitledContainer, HSplit, VSplit, TitleSlide, TitledSlide } from "./slideshow";
import { MiniBrowser } from "./minibrowser";
import { Editor } from "./editor";
import { HowToWriteYourOwnReact } from "./writeyourownreact";

const ListDemoSlide = (props) => (
    <TitledSlide {...props}>
        <HSplit>
            <ul>
                <li>first point</li>
                <ul>
                    <li>nested 1</li>
                    <li>nested 2</li>
                </ul>
                <li>second point</li>
                <li>third point</li>
            </ul>
            <ul>
                <li>first point</li>
                <ul>
                    <li>nested 1</li>
                    <li>nested 2</li>
                </ul>
                <li>second point</li>
                <li>third point</li>
            </ul>
        </HSplit>
    </TitledSlide>
);

const example_code = `
const Counter = (props) => {
    const [count, setCount] = Reactor.useState(0);
    const incCount = () => setCount(count+1);
    return <div>
        <p>count={count}</p>
        <button onclick={incCount}>
            increment
        </button>
     </div>;
};
`;

const MiniBrowserDemoSlide = (props) => (
    <TitledSlide theme={props.theme} title={props.title}>
        <HSplit>
            <Editor content={example_code} language="jsx"/>
            <Editor tabs={[
                        {content: example_code, title: "some code", language: "jsx"},
                        {content: "asdfsdfsddgsdg\n\n\n\n\n\n\n\nasdfsdf\n\nasdfsdf\n\n\n\n\n\n\n\n\n\n\n\n\n\nasdfsdfsd\nsadfsd\nsdfsdaf", title: "other code", language: "jsx"}
                    ]}/>
        </HSplit>
    </TitledSlide>
);

const App = (props) => (
    <SlideShow>
        <MiniBrowserDemoSlide theme="green" title="Green"/>
        <TitleSlide theme="green" subtitle="By Peter Elliott" title="Green"/>
        <TitleSlide theme="brown" subtitle="By Peter Elliott" title="Brown"/>
        <MiniBrowserDemoSlide theme="brown" title="Brown"/>
        <TitleSlide theme="pink" subtitle="By Peter Elliott" title="Pink"/>
        <MiniBrowserDemoSlide theme="pink" title="Pink"/>
        <TitleSlide theme="purple" subtitle="By Peter Elliott" title="Purple"/>
        <MiniBrowserDemoSlide theme="purple" title="Purple"/>
        <TitleSlide theme="blue" subtitle="By Peter Elliott" title="Blue"/>
        <MiniBrowserDemoSlide theme="blue" title="Blue"/>
    </SlideShow>
);

//Reactor.render(document.getElementById("root"), <App />);
Reactor.render(document.getElementById("root"), <HowToWriteYourOwnReact />);
