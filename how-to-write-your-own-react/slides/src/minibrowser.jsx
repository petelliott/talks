import { useState } from "reactor";
import { IconButton } from "./util";

export const MiniBrowser = (props) => {
    console.log(props);
    return (
        <div className="minibrowser">
            <div className="mbtabcontainer">
                <div className="mbtab">
                    {props.title}
                    <span className="material-symbols-outlined">close</span>
                </div>
                <div className="mbnewtab">
                    <IconButton icon="add" enabled={true}/>
                </div>
            </div>
            <div className="mbbar">
                <div className="mbcontrols">
                    <IconButton icon="arrow_back" enabled={true}/>
                    <IconButton icon="arrow_forward"/>
                    <IconButton icon="refresh" enabled={true}/>
                </div>
                <div className="mbaddress">
                    <span class="material-symbols-outlined mbshield">shield</span>
                    {props.src}
                </div>
            </div>
            <div className="mbcontent">
                {props.children}
            </div>
        </div>
    );
};
