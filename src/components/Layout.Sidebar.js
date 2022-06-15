import { h, Component } from "preact";

import SidebarItem from "./Layout.SidebarItem.js";
import IHome from "./icons/IHome.js";
import IWifi from "./icons/IWifi.js";
import ILock from "./icons/ILock.js";
import IArrowOut from "./icons/IArrowOut.js";
import IMatthLogo from "./icons/IMatthLogo.js";

export default class Sidebar extends Component{
    
    constructor() {
        super();
    }

    render(props){
        return (
            <aside class="sidebar">
                <div class="sb-header">
                    <IMatthLogo size="50"></IMatthLogo>
                    <div>Arduino Ocpp</div>
                </div>
                <div class="divider" />
                <SidebarItem route="overview" nav={props.nav}>
                    <IHome size="24" />
                    Overview
                </SidebarItem>
                <SidebarItem route="network" nav={props.nav}>
                    <IWifi size="24" />
                    Network
                </SidebarItem>
                <SidebarItem route="security" nav={props.nav}>
                    <ILock size="24" />
                    Security
                    {props.nav.path}
                </SidebarItem>
                <SidebarItem route="ocpp" nav={props.nav}>
                    <ILock size="24" />
                    OCCP 1.6
                    {props.nav.path}
                </SidebarItem>
                <div class="divider" />
                <SidebarItem route="logout" nav={props.nav}>
                    <IArrowOut size="24" />
                    Logout
                </SidebarItem>
            </aside>
        )
    }
}