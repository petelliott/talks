import * as Reactor from "reactor";
import { SlideShow, Slide, TitledContainer, HSplit, VSplit } from "./slideshow";

const App = (props) =>
      (<SlideShow>
           <Slide>
               <TitledContainer title="Slide 1" titleClass="testTitle">
                   <VSplit>
                   <span>left</span>
                   <span>right</span>
                   </VSplit>
               </TitledContainer>
           </Slide>
           <Slide>slide 2</Slide>
           <Slide>slide 3</Slide>
           <Slide>slide 4</Slide>
       </SlideShow>);

Reactor.render(document.getElementById("root"), <App />);
