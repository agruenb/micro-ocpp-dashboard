import { h } from "preact";
import IMatthLogo from "./icons/IMatthLogo";
import IMenu from "./icons/IMenu";

export default function Header(props){
    return (
        <header>
            <div class="open-sidebar header-logo" onClick={props.toggleSidebar}>
                <IMenu size="30" stroke="#ffffff"></IMenu>
            </div>
            <div class="header-logo">
                <IMatthLogo size="30"></IMatthLogo>
            </div>
        </header>
    )
}
    