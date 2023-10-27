import { SlideShow, Slide, TitledContainer, HSplit, VSplit, TitleSlide, TitledSlide } from "./slideshow";
import { MiniBrowser } from "./minibrowser";
import { useBibliography, Bibliography } from "./bibliography";

const TalkDemo = (props) => {
    return (
        <TitledSlide theme={props.theme} title="This Talk">
            <MiniBrowser title="How To Write Your Own React" src="https://localhost">
                <HowToWriteYourOwnReact bindFragment={false}/>
            </MiniBrowser>
        </TitledSlide>
    );
};

export const HowToWriteYourOwnReact = (props) => {
    const [bib, ref] = useBibliography();
    return (
        <SlideShow {...props}>
            <TitleSlide theme="grey" title="How To Write Your Own React" subtitle="Peter Elliott"/>
            <TitleSlide theme="blue" title="React" subtitle="Part 1"/>
            <TitledSlide theme="blue" title="What is React?">
                <ul>
                    <li>some claim{ref("text", "link")}</li>
                    <li>some other claim{ref("text2", "link2")}</li>
                </ul>
            </TitledSlide>
            <TitleSlide theme="purple" title="Rewriting React" subtitle="Part 2"/>
            <TitleSlide theme="green" title="A Demo" subtitle="Part 3"/>
            <TalkDemo theme="green"/>
            <TitleSlide theme="brown" title="Concluding Remarks" subtitle="Part 4"/>
            <Bibliography theme="brown" bibliography={bib} fragment="bibliography"/>
        </SlideShow>
    );
};
