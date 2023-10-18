import * as Reactor from "reactor";
import { SlideShow, Slide, TitledContainer, HSplit, VSplit, TitleSlide, TitledSlide } from "./slideshow";
import { MiniBrowser } from "./minibrowser";

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

const MiniBrowserDemoSlide = (props) => (
    <TitledSlide theme={props.theme} title={props.title}>
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
            <MiniBrowser src="https://example.com" title="Example Domain"/>
        </HSplit>
    </TitledSlide>
);


const App = (props) => (
    <SlideShow>
        <TitleSlide theme="green" subtitle="By Peter Elliott" title="Green"/>
        <MiniBrowserDemoSlide theme="green" title="Green"/>
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

Reactor.render(document.getElementById("root"), <App />);
