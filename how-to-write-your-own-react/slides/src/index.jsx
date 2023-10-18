import * as Reactor from "reactor";
import { SlideShow, Slide, TitledContainer, HSplit, VSplit } from "./slideshow";

const App = (props) =>
      (<SlideShow className="grey">
           <Slide><TitledContainer title="Slide 1"/></Slide>
           <Slide><TitledContainer title="Slide 2"/></Slide>
           <Slide><TitledContainer title="Slide 3"/></Slide>
           <Slide><TitledContainer title="Slide 4"/></Slide>
       </SlideShow>);

Reactor.render(document.getElementById("root"), <App />);
