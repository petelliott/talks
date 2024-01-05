import { useState, useEffect } from "reactor";
import { IconButton } from "./util";
import { useFragment } from "./nav";

export const SlideShow = (props) => {
    const slides = Array.isArray(props.children)? props.children : [props.children];

    let [fragment, setFragment] = useFragment(props.bindFragment);
    fragment = fragment.toString().split(".")[0];
    let slide = slides.findIndex((s) => s?.props?.fragment === fragment);
    if (slide === -1) {
        slide = Number(fragment); // Number("") === 0
    }

    const nextSlide = () => {
        if (slide+1 < slides.length) {
            setFragment(slides[slide+1].props.fragment ?? (slide+1))
        }
    };

    const previousSlide = () => {
        if (slide > 0 ) {
            setFragment(slides[slide-1].props.fragment ?? (slide-1));
        }
    };

    const theme = slides[slide]?.props?.theme ?? "grey";
    const onkeydown = (event) => {
        if (event.key === "ArrowRight" || event.key === " ")
            nextSlide();
        if (event.key === "ArrowLeft")
            previousSlide();
    };

    return (
        <div className={`fullheight ${theme} ${props.className??""}`} onkeydown={onkeydown} tabindex="0">
            <div className="fullheight" key={slide}>{slides[slide]}</div>
            <div className="controls">
                <IconButton
                    icon="arrow_back"
                    className="previous-slide slide-nav-button"
                    onclick={previousSlide}
                    enabled={slide > 0} />
                <IconButton
                    icon="arrow_forward "
                    className="next-slide slide-nav-button"
                    onclick={nextSlide}
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
