import * as Reactor from "reactor";
import { SlideShow, Slide, TitledContainer, HSplit, VSplit, TitleSlide } from "./slideshow";

const App = (props) =>
      (<SlideShow>
           <TitleSlide theme="green" subtitle="By Peter Elliott" title="Green"/>
           <Slide theme="green"> <TitledContainer title="Green"/></Slide>
           <TitleSlide theme="brown" subtitle="By Peter Elliott" title="Brown"/>
           <Slide theme="brown"> <TitledContainer title="Brown"/></Slide>
           <TitleSlide theme="pink" subtitle="By Peter Elliott" title="Pink"/>
           <Slide theme="pink">  <TitledContainer title="Pink"/></Slide>
           <TitleSlide theme="purple" subtitle="By Peter Elliott" title="Purple"/>
           <Slide theme="purple"><TitledContainer title="Purple"/></Slide>
           <TitleSlide theme="blue" subtitle="By Peter Elliott" title="Blue"/>
           <Slide theme="blue">  <TitledContainer title="Blue"/></Slide>
       </SlideShow>);

Reactor.render(document.getElementById("root"), <App />);
