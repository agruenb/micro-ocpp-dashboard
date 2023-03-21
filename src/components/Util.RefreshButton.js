import { h } from "preact";
import IArrowRotate from "./icons/IArrorRotate.svg";


export default function RefreshButton(props){

    function doAction(e){
        e.preventDefault();
    }

    return (
        <button class="button is-tertiary" onClick={e=>{doAction(e)}}>
            <div class="pad-icon">
                <IArrowRotate></IArrowRotate>
            </div>
            {props.children}
        </button>
    )
}