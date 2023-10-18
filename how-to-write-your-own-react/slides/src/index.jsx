import * as Reactor from "reactor";
import { SlideShow, Slide, TitledContainer, HSplit, VSplit, TitleSlide, TitledSlide } from "./slideshow";

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

const App = (props) =>
      (<SlideShow>
           <TitleSlide theme="green" subtitle="By Peter Elliott" title="How to Write Your Own React"/>
           <ListDemoSlide theme="green" title="Green"/>
           <TitleSlide theme="brown" subtitle="By Peter Elliott" title="Brown"/>
           <ListDemoSlide theme="brown" title="Brown"/>
           <TitleSlide theme="pink" subtitle="By Peter Elliott" title="Pink"/>
           <ListDemoSlide theme="pink" title="Pink"/>
           <TitleSlide theme="purple" subtitle="By Peter Elliott" title="Purple"/>
           <ListDemoSlide theme="purple" title="Purple"/>
           <TitleSlide theme="blue" subtitle="By Peter Elliott" title="Blue"/>
           <ListDemoSlide theme="blue" title="Blue"/>
       </SlideShow>);

Reactor.render(document.getElementById("root"), <App />);
