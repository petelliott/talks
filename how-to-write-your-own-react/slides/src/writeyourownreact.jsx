import { SlideShow, Slide, TitledContainer, HSplit, VSplit, TitleSlide, TitledSlide } from "./slideshow";
import { MiniBrowser } from "./minibrowser";
import { Editor } from "./editor";
import { useBibliography, Bibliography } from "./bibliography";
import { useState } from "reactor";

const TalkDemo = (props) => {
    return (
        <TitledSlide theme={props.theme} title="This Talk">
            <MiniBrowser title="How To Write Your Own React" src="https://localhost">
                <HowToWriteYourOwnReact bindFragment={false}/>
            </MiniBrowser>
        </TitledSlide>
    );
};

const Counter = (props) => {
    const [count, setCount] = useState(0);
    return (
        <div style="padding-left:1rem">
            <p>count={count}</p>
            <button onclick={() => setCount(count+1)}>increment</button>
        </div>
    );
};

const Counters = (props) => {
    const [counters, setCounters] = useState(0);
    return (
        <div style="padding-left:1rem;padding-top:1rem">
            <button onclick={() => setCounters(counters+1)}>add counter</button>
            <button onclick={() => setCounters(counters-1)}>remove counter</button>
            <div> { counters.dotimes(() => (<Counter/>))} </div>
        </div>
    );
};

const CountersPrepend = (props) => {
    const [counters, setCounters] = useState(0);
    return (
        <div style="padding-left:1rem;padding-top:1rem">
            <button onclick={() => setCounters(counters+1)}>add counter</button>
            <button onclick={() => setCounters(counters-1)}>remove counter</button>
            <div> { counters.dotimes((i) => (<Counter key={counters-i}/>))} </div>
        </div>
    );
};
const ASlideShow = (props) => {console.log("hey"); return (
    <SlideShow bindFragment={false}>
        <TitleSlide theme="green" title="SlideShow"/>
        <TitledSlide theme="green" title="Points">
            <ul>
                <li>item 1</li>
                <li>item 2</li>
            </ul>
        </TitledSlide>
    </SlideShow>
)};

export const HowToWriteYourOwnReact = (props) => {
    const [bib, ref] = useBibliography();
    return (
        <SlideShow {...props}>
            <TitleSlide theme="grey" title="How To Write Your Own React" subtitle="Peter Elliott"/>
            <TitleSlide theme="blue" title="React" subtitle="Part 1"/>

            <TitledSlide theme="blue" title="What is React?">
                <ul>
                    <li>
                        The most popular javascript UI library
                        {ref("Stack Overflow Developer Survey", "https://survey.stackoverflow.co/2023/#section-most-popular-technologies-web-frameworks-and-technologies")}
                    </li>
                    <li>Declarative</li>
                    <li>Consise</li>
                    <li>Full of pitfalls</li>
                    <li>Feels like magic</li>
                </ul>
            </TitledSlide>
            <TitledSlide theme="blue" title="Hello World">
                <HSplit>
                    <Editor
                        tabs={[
                            {
                                language: "js",
                                title: "functions",
                                content:
`import React from "react";
import { createRoot } from "react-dom/client";

const App = (props) =>
  React.createElement("div", null, [
    React.createElement("h1", null, props.title),
    React.createElement("p", null, props.content)
  ]);

const root = createRoot(
  document.getElementById("root"));

root.render(React.createElement(App, {
  title: "Hello world",
  content: "Hello from react."
}, null));
`
                            },
                            {
                                language: "js",
                                title: "classes",
                                content:
`import React from "react";
import { createRoot } from "react-dom/client";

class App extends React.Component {
  render(props) {
    return React.createElement("div", null, [
      React.createElement("h1", null, props.title),
      React.createElement("p", null, props.content)
    ]);
   }
}

const root = createRoot(
  document.getElementById("root"));

root.render(React.createElement(App, {
  title: "Hello world",
  content: "Hello from react."
}, null));
`
                            }
                        ]}/>
                    <MiniBrowser title="Hello World" src="https://hello.world">
                        <div>
                            <h1>Hello World</h1>
                            <p>Hello from react.</p>
                        </div>
                    </MiniBrowser>
                </HSplit>
            </TitledSlide>
            <TitledSlide theme="blue" title="JSX">
                <HSplit>
                    <Editor language="jsx" content={
`import { createRoot } from "react-dom/client";

const App = (props) => (
  <div>
    <h1>{props.title}</h1>
    <p>{props.content}</p>
  </div>
);

const root = createRoot(
    document.getElementById("root"));

root.render(
  <App
    title="Hello world"
    content="Hello from react"
  />);
`
                            }/>
                    <Editor language="js" content={
`import { createRoot } from "react-dom/client";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const App = props => _jsxs("div", {
  children: [
    _jsx("h1", {
      children: props.title
    }),
    _jsx("p", {
      children: props.content
    })
  ]
});

const root = createRoot(
  document.getElementById("root"));

root.render(_jsx(App, {
  title: "Hello world",
  content: "Hello from react"
}));`
                            }/>
                </HSplit>
            </TitledSlide>
                    <TitledSlide theme="blue" title={["State", ref("Using the State Hook", "https://legacy.reactjs.org/docs/hooks-state.html", "color:white")]}>
                <HSplit>
                    <Editor tabs={[
                        {
                            language: "jsx",
                            title: "functions",
                            content:
`const Counter = (props) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>count={count}</p>
      <button
        onClick={() => setCount(count+1)}
      >
        increment
      </button>
    </div>
  );
};
`
                        },
                        {
                            language: "jsx",
                            title: "classes",
                            content:
`class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render(props) {
    return (
      <div>
        <p>count={this.state.count}</p>
        <button onClick={() => this.setState(
          { count: this.state.count + 1 }
        )}>
          increment
        </button>
      </div>
    );
  }
}`
                        }
                            ]} />
                    <MiniBrowser title="Counter" src="https://count.er">
                        <Counter/>
                    </MiniBrowser>
                </HSplit>
            </TitledSlide>
        <TitledSlide theme="blue" title="Everything we Need">
            <ul>
                <li>We can describe content concisely (JSX)</li>
                <li>We can respond to inputs (regular js callbacks)</li>
                <li>We can rerender (react state)</li>
            </ul>
        </TitledSlide>

        <TitleSlide theme="purple" title="Rewriting React" subtitle="Part 2"/>
        <TitledSlide theme="purple" title="Types">
            <Editor language="tsx"
                    content={
`type Component<T> = (props: T) => Element<T>;

type Element<T> = string | {
  type: string | Component
  props: T,
  key: string | number,
};

type VdomNode<T> = {
  type: string | Symbol | Component
  props: T,
  children: { [key: string | number]: VdomNode },
  state: { [key: string | number]: any }
  element: Node,
};`
                    } />
        </TitledSlide>
        <TitledSlide theme="purple" title="Setting up JSX">
            <HSplit>
                <Editor language="tsx" title="jsx-runtime.js" content={
`// import { element } from ".";
export const element = (renderer, props, key) => ({
    type: renderer,
    props: props,
    key: key
});

export const jsx = element;
export const jsxs = element;`
                        } />
                <Editor language="json" title="babel.config.json" content={
`{
    "presets": ["@babel/preset-env"],
    "plugins": [
        [
            "@babel/plugin-transform-react-jsx",
            {
                "importSource": "my-react"
            }
        ]
    ]
}`
                        } />
            </HSplit>
        </TitledSlide>
        <TitledSlide theme="purple" title="Setting up JSX">
            <HSplit>
                <Editor language="tsx" content={
                            `const Section = (props) => (
  <div>
    <h2>{props.title}</h2>
    <p>{props.children}</p>
  </div>
);

const page = <div>
  <h1 className="title1">main title</h1>
  <Section title="section1" key="s1">
    section 1 body.
  </Section>
</div>;

console.log(page);`
                        } />
                <Editor language="js" content={
`{
  type: "div",
  key: null,
  props: {
    children: [
      {
        type: "h1",
        key: null,
        props: {
          children: "main title"
        }
      },
      {
        type: Section,
        key: "s1",
        props: {
          title: "section1"
          children: "section 1 body."
        }
    ]
  }
}`
                        } />
            </HSplit>
        </TitledSlide>
        <TitledSlide theme="purple" title="Rendering static HTML">
            <Editor language="tsx" content={
`const render = (element) => {
  if (typeof element === "string") {
    return document.createTextNode(element);

  } else if (typeof element.type === "function") {
    return render(element.type(element.props));

  } else {
    const domElement = document.createElement(element.type);
    const {children, ...props} = element.props;

    for (const propKey in Object.keys(children)) {
      domElement.setAttribute(propKey, props[propKey]);
    }

    for (const child in normalizeChildren(children)) {
      domElement.appendChild(render(child));
    }

    return domElement;
  }
};`
                    } />
        </TitledSlide>
        <TitledSlide theme="purple" title="This is not Useful">
            <ul>
                <li>Where do we keep State?</li>
                <li>How do we react to state changes?</li>
            </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title="Declarative State">
            <ul>
                <li>Every Render produces new objects.</li>
                <li>Need to preserve previous renders for their state.</li>
                <li><b>Need to associate the right nodes of previous and current render.</b></li>
            </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title={["Reconciliation", ref("Reconciliation", "https://legacy.reactjs.org/docs/reconciliation.html", "color:white")]}>
                <ul>
                    <li>Keep state in the render tree</li>
                    <li>Same component, same position <ul><li>preserve state</li></ul></li>
                    <li>Different component => <ul><li>throw away entire subtree</li></ul></li>
                </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title="Reconciliation">
                <HSplit>
                    <Editor language="jsx" content={
`const Counters = (props) => {
    const [counters, setCounters] = useState(0);
    return (
        <div>
            <button onclick={
              () => setCounters(counters+1)
            }>
              add counter
            </button>
            <button onclick={
              () => setCounters(counters-1)
            }>
              remove counter
            </button>
            <div> {
              counters.dotimes(() => (<Counter/>))
            } </div>
        </div>
    );
};`}/>
                    <MiniBrowser title="Counter" src="https://count.er">
                        <Counters/>
                    </MiniBrowser>
        </HSplit>
        </TitledSlide>
        <TitledSlide theme="purple" title="⚠ Pitfalls">
            <ul>
                <li>Rendering logically distinct components in the same position</li>
                <li>Prepending an element, moving components out of position</li>
            </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title="Reconciliation: With Keys">
                <ul>
                    <li>Keep state in the render tree</li>
                    <li>Same component, <b>same parent, same key</b> <ul><li>preserve state</li></ul></li>
                    <li>Different component => <ul><li>throw away entire subtree</li></ul></li>
                </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title="Reconciliation: With Keys">
                <HSplit>
                    <Editor language="jsx" content={
`const CountersPrepend = (props) => {
    const [counters, setCounters] = useState(0);
    return (
        <div>
            <button onclick={
              () => setCounters(counters+1)
            }>
              add counter
            </button>
            <button onclick={
              () => setCounters(counters-1)
            }>
              remove counter
            </button>
            <div> {
              counters.dotimes((i) => (
                <Counter key={counters-i}/>)
              )
            } </div>
        </div>
    );
};`}/>
                    <MiniBrowser title="Counter" src="https://count.er">
                        <CountersPrepend/>
                    </MiniBrowser>
        </HSplit>
        </TitledSlide>
        <TitledSlide theme="purple" title="The useState Hook">
            <HSplit>
                <Editor language="tsx" title="hooks.js" content={
`let useStateCounter;
let useEffectCounter;
let hookNode;

// bind values dynamically for every component run.
export const withHookContext = (node, proc) => {
    useStateCounter = 0;
    useEffectCounter = 0;
    hookNode = node;
    return proc();
};`
                        } />
                <Editor language="tsx" title="useState.js" content={
`export const useState = (initialState) => {
    // Make sure closures capture these.
    const node = hookNode;
    const index = useStateCounter;

    const state = node.state;
    if (!state.hasOwnProperty(index)) {
        state[index] = [
            initialState,
            (value) => {
                if (state[index][0] !== value) {
                    state[index][0] = value;
                    scheduleRerender(node);
                }
            },
        ];
    }
    ++useStateCounter;
    return state[index];
};`
                        } />
            </HSplit>
        </TitledSlide>
        <TitledSlide theme="purple" title="⚠ Pitfalls">
            <ul>
                <li>Every hook needs to be called ever time in the same order</li>
                <li>No hooks in loops or if statements<ul><li>But eslint will check this for you</li></ul></li>
                <li>Don't mutate state objects</li>
            </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title="Optimizing">
            <ul>
                <li>Technically, we have a working react</li>
                <li>But, we create a new dom from scratch on every state change</li>
                <li>Dom changes are aledgedly expensive{ref("virtual DOM: Wikipedia", "https://en.wikipedia.org/wiki/Virtual_DOM")}</li>
            </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title="Opt #1: Render below State Change">
            <ul>
                <li>State can only affect the rendering of elements beneath that state change</li>
                <li>Replace the element from the last render with the new one</li>
            </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title="Opt #2: Don't re-render needlessly">
            <ul>
                <li>If a component has the same props and state</li>
                <li>Replace the element from the last render with the new one</li>
                <li>⚠ Pitfall: Don't just update objects in props, create new ones</li>
            </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title="Opt #3: Only Render Diff to DOM">
            <ul>
                <li>Prevents unnecessary reflows from the browser</li>
                <li>Most of a component's layout is static</li>
                <li>We already have a vDOM anyway for state and optimization #2</li>
                <li>Tree diffing is O(n<sup>3</sup>){ref("Reconciliation motivation", "https://legacy.reactjs.org/docs/reconciliation.html#motivation")} but reconciliation is good enough and O(n)</li>
            </ul>
        </TitledSlide>
        <TitledSlide theme="purple" title="End Result">
            <ul>
                <li>A usable, efficent react in 269 LOC instead of 380k LOC</li>
                <li>A mental model to use react efficently</li>
            </ul>
        </TitledSlide>


        <TitleSlide theme="green" title="An Example" subtitle="Part 3"/>
        <TalkDemo theme="green"/>
        <TitledSlide theme="green" title="SlideShow">
            <Editor language="jsx" content={
`export const SlideShow = (props) => {
  const slides = Array.isArray(props.children)? props.children : [props.children];

  let [fragment, setFragment] = useFragment(props.bindFragment);
  fragment = fragment.toString().split(".")[0];
  let slide = slides.findIndex((s) => s?.props?.fragment === fragment);

  const nextSlide = () => {...};
  const previousSlide = () => {...};

  const theme = slides[slide]?.props?.theme ?? "grey";
  const onkeydown = (event) => {...};

  return (
    <div className={\`fullheight \${theme} \${props.className??""}\`} onkeydown={onkeydown} tabindex="0">
      <div className="fullheight" key={slide}>{slides[slide]}</div>
      <div className="controls">
        <IconButton onclick={previousSlide} ... />
        <IconButton onclick={nextSlide} ... />
      </div>
    </div>
  );
};`
                    }/>
        </TitledSlide>
        <TitledSlide theme="green" title="SlideShow">
            <HSplit>
                <Editor language="jsx" content={
                            `const ASlideShow = (props) => (
  <SlideShow>
    <TitleSlide theme="green" title="SlideShow"/>
    <TitledSlide theme="green" title="Points">
      <ul>
        <li>item 1</li>
        <li>item 2</li>
      </ul>
    </TitledSlide>
  </SlideShow>
);`
                        }/>
                <MiniBrowser title="SlideShow" src="https://slideshow">
                    <ASlideShow/>
                </MiniBrowser>
        </HSplit>
            </TitledSlide>

            <TitleSlide theme="brown" title="Concluding Remarks" subtitle="Part 4"/>
            <TitledSlide theme="brown" title="Concluding Remarks">
                <ul>
                    <li>Find this presentation at <a href="https://github.com/petelliott/talks">github.com/petelliott/talks</a></li>
                    <li>Why make your own react?
                        <ul>
                            <li>It's fun!</li>
                            <li>Knowing how reacts internals work is useful.</li>
                            <li>Replicating software is the best way to learn how it works.</li>
                        </ul>
                    </li>
                </ul>
            </TitledSlide>
        <Bibliography theme="brown" bibliography={bib} fragment="bibliography"/>
        <TitledSlide theme="brown" title="Edmonton Computer Club">
            <HSplit>
                <ul>
                    <li>Inaugural meeting!</li>
                    <li>Right here, January 24th</li>
                    <li>Demo anything and everything</li>
                </ul>
                <img src="/qr.svg"/>
            </HSplit>
        </TitledSlide>
        </SlideShow>
    );
};
