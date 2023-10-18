import { useState } from "reactor";

export const SlideShow = (props) => {
    const [slide, setSlide] = useState(0);
    const slides = Array.isArray(props.children)? props.children : props.children;
    return <div className="fullheight">
        <div className="fullheight" key={slide}>{slides[slide]}</div>
        <button className="previous-slide" onclick={() => setSlide(slide-1)}>previous</button>
        <button className="next-slide" onclick={() => setSlide(slide+1)}>next</button>
    </div>;
};

export const Slide = (props) => (
    <main className="slide fullheight">{props.children}</main>
);

export const Container = (props) => (
    <div className="container">{props.children}</div>
);

export const TitledContainer = (props) => (
    <div className="fullheight titledcontainer">
        <h1 className={`title ${props.titleClass}`}>{props.title}</h1>
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
