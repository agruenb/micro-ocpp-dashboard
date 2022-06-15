import { h } from "preact";
import IMatthLogo from "./icons/IMatthLogo";

export default function Header(props){
    return (
        <header>
            <div class="open-sidebar" onClick={props.toggleSidebar}>
                X
            </div>
            <div class="header-logo">
                <IMatthLogo size="30"></IMatthLogo>
            </div>
        </header>
    )
}
    