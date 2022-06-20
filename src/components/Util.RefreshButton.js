import { h } from "preact";
import IArrowRotate from "./icons/IArrorRotate";


export default function RefreshButton(props){

    function doAction(e){
        e.preventDefault();
    }

    return (
        <button class="button is-tertiary" onClick={e=>{doAction(e)}}>
            <div class="pad-icon">
                <IArrowRotate size="20" stroke="#0c3dd7"></IArrowRotate>
            </div>
            {props.children}
        </button>
    )
}