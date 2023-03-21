import { h } from "preact";
import IMatthLogo from "./icons/IMatthLogo.svg";
import IMenu from "./icons/IMenu.svg";

export default function Header(props){
    return (
        <header>
            <div class="open-sidebar header-logo" onClick={props.toggleSidebar}>
                <IMenu></IMenu>
            </div>
            <div class="header-logo">
                <IMatthLogo></IMatthLogo>
            </div>
        </header>
    )
}
    