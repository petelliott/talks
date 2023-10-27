import { useState, useEffect } from "reactor";
import { IconButton } from "./util";



export const SlideShow = (props) => {
    const slides = Array.isArray(props.children)? props.children : [props.children];

    const hash = window.location.hash?.substr(1);
    let startslide = slides.findIndex((s) => s?.props?.fragment === hash);
    if (startslide === -1) {
        startslide = Number(hash); // Number("") === 0
    }

    const [slide, setSlide] = useState(startslide);
    const theme = slides[slide]?.props?.theme ?? "grey";
    const onkeydown = (event) => {
        if (event.key === "ArrowRight" || event.key === " ")
            setSlide(Math.min(slide+1, slides.length-1));
        if (event.key === "ArrowLeft")
            setSlide(Math.max(slide-1, 0));
    };

    const fragment = slides[slide]?.props?.fragment ?? slide;
    useEffect(() => {
        window.location.hash = fragment;
    }, [fragment]);

    return (
        <div className={`fullheight ${theme} ${props.className??""}`} onkeydown={onkeydown} tabindex="0">
            <div className="fullheight" >{slides[slide]}</div>
            <div className="controls">
                <IconButton
                    icon="arrow_back"
                    className="previous-slide slide-nav-button"
                    onclick={() => setSlide(slide-1)}
                    enabled={slide != 0} />
                <IconButton
                    icon="arrow_forward "
                    className="next-slide slide-nav-button"
                    onclick={() => setSlide(slide+1)}
                    enabled={slide+1 < slides.length} />
            </div>
        </div>
    );
};

export const Slide = (props) => (
    <main className="slide fullheight">{props.children}</main>
);

export const Container = (props) => (
    <div className={`container ${props.className??""}`}>{props.children}</div>
);

export const TitledContainer = (props) => (
    <div className={`fullheight titledcontainer ${props.className??""}`}>
        <h1>{props.title}</h1>
        <div className="container">
            {props.children}
        </div>
    </div>
);

export const TitledSlide = (props) => (
    <Slide>
        <TitledContainer {...props}/>
    </Slide>
);

export const TitleSlide = (props) => (
    <Slide>
        <div className="titleslide fullheight">
            <div>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
        </div>
    </Slide>
);

export const HSplit = (props) => (
    <div className="container hsplit">
        {props.children.map((child) => <div className="container">{child}</div>)}
    </div>
);

export const VSplit = (props) => (
    <div className="container vsplit">
        {props.children.map((child) => <div className="container">{child}</div>)}
    </div>
);
