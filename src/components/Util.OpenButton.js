import { h } from "preact";

import ICaretDown from "./icons/ICaretDown.svg";
import StyleBuilder from "../StyleBuilder";

export default function OpenButton(props){
    return <button type="button" class="button is-tertiary pad-icon" onClick={props.onClick}>
        <ICaretDown style={`${(props.isOpen ? "" : StyleBuilder.rotate("-90"))}transition:0.2s;`} />
        {props.children}
    </button>
}