import { h } from "preact";
import IArrowLeave from "./icons/IArrowLeave";


export default function LinkButton(props){
    function redirect(e){
        e.preventDefault();
        props.nav.setPath(props.route);
    }
    return (
        <a href="#" class="button is-tertiary" onClick={e=>{redirect(e)}}>
            <IArrowLeave size="20" stroke="#0c3dd7"></IArrowLeave>
            {props.children}
        </a>
    )
}