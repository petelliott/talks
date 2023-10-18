import { useState } from "reactor";
import { IconButton } from "./util";


export const SlideShow = (props) => {
    const [slide, setSlide] = useState(0);
    const slides = Array.isArray(props.children)? props.children : props.children;
    return (
        <div className={`fullheight ${props.className??""}`}>
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
    <div className="container">{props.children}</div>
);

export const TitledContainer = (props) => (
    <div className={`fullheight titledcontainer ${props.className??""}`}>
        <h1 className={`title ${props.titleClass??""}`}>{props.title}</h1>
        <div className="container">
            {props.children}
        </div>
    </div>
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
