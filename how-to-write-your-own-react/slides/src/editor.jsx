import hljs from 'highlight.js';
import { useState } from "reactor";

// thats right, i wrote it myself.
const leftpad = (s, width) => {
    if (s.length < width) {
        return " ".repeat(width - s.length) + s;
    }
    return s
};

const linenum = (n, width) => (
    <span clasName="linenum">{leftpad(""+n, Math.max(width, 2))}</span>
);

const linenums = (n) =>
      n.dotimes((i) => linenum(i+1,(""+n).length));

export const Editor = (props) => {
    const [ tab, setTab ] = useState(props.tabs?.[0] ?? props);

    const syntax = hljs.highlight(tab.content, {language: tab.language});
    const lines = tab.content.split(/\r\n|\r|\n/).length;

    const topcorners = (props.tabs === undefined)? " topcorners" : "";

    return (
        <div className="editor">
            { props.title &&
              <div className="etabcontainer">
                      <div className="etab">
                          {props.title}
                      </div>
              </div> }
            { props.tabs &&
              <div className="etabcontainer">
                  { props.tabs.map(t => (
                      <div className="etab" onclick={() => setTab(t)}>
                          {t.title}
                      </div>)) }
              </div> }
            <div className="pane">
                <div className={"gutter" + topcorners}>
                    {linenums(lines)}
                </div>
                <div className={"content hljs" + topcorners} innerHTML={syntax.value}/>
            </div>
        </div>
    );
};
