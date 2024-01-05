import { TitledSlide } from "./slideshow";

export const Ref = (props) => (
    <sup><a style={props.style} href={props.href} title={props.title}>{props.index+1}</a></sup>
);

export const useBibliography = () => {
    const bib = [];
    const ref = (text, link, style) => {
        bib.push({text, link});
        return <Ref index={bib.length-1} text={text} href={`#bibliography.${bib.length-1}`} style={style}/>;
    };
    return [bib, ref];
};

export const Bibliography = (props) => {
    const {bibliography, ...other} = props;
    const highlight = window.location.hash?.split(".")[1];
    return (
        <TitledSlide title="References" {...other}>
            <ol>
                { bibliography.map((entry, index) => (
                    <li className={index==highlight? "bibhighlight" : undefined}>
                        <a href={entry.link}>{entry.text}</a>
                    </li>
                )) }
            </ol>
        </TitledSlide>
    );
};
