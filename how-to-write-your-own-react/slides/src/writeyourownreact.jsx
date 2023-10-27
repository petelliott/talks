import { SlideShow, Slide, TitledContainer, HSplit, VSplit, TitleSlide, TitledSlide } from "./slideshow";
import { MiniBrowser } from "./minibrowser";
import { useEffect } from "reactor";
import * as Reactor from "reactor";

const Test = () => (<p>hello world</p>);

const TalkDemo = (props) => {
    return (
        <TitledSlide theme={props.theme} title="This Talk">
            <MiniBrowser title="How To Write Your Own React" src="https://localhost">
                <HowToWriteYourOwnReact/>
            </MiniBrowser>
        </TitledSlide>
    );
};

export const HowToWriteYourOwnReact = () => (
    <SlideShow start={0}>
        <TitleSlide theme="grey" title="How To Write Your Own React" subtitle="Peter Elliott"/>
        <TitleSlide theme="blue" title="What is React?" subtitle="Part 1"/>
        <TitleSlide theme="purple" title="Rewriting React" subtitle="Part 2"/>
        <TitleSlide theme="green" title="A Demo" subtitle="Part 3"/>
        <TalkDemo theme="green"/>
        <TitleSlide theme="brown" title="Concluding Remarks" subtitle="Part 4"/>
    </SlideShow>
);
