import "./component_styles/sidebar.css";

import { h, Component } from "preact";

import SidebarItem from "./Layout.SidebarItem.js";
import IWifi from "./icons/IWifi.js";
import ILock from "./icons/ILock.js";
import IArrowOut from "./icons/IArrowOut.js";
import IMatthLogo from "./icons/IMatthLogo.js";
import IServer from "./icons/IServer.js";
import IProcessor from "./icons/IProcessor.js";
import IMonitor from "./icons/IMonitor.js";

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
                <SidebarItem route="network" nav={props.nav}>
                    <IWifi size="24" stroke="#ffffff" />
                    Network
                </SidebarItem>
                <SidebarItem route="ocpp" nav={props.nav}>
                    <IServer size="24" stroke="#ffffff" />
                    OCPP 1.6
                    {props.nav.path}
                </SidebarItem>
                <SidebarItem route="security" nav={props.nav}>
                    <ILock size="24" />
                    Security
                </SidebarItem>
                <SidebarItem route="about" nav={props.nav}>
                    <IProcessor size="24" stroke="#ffffff" />
                    Controller
                </SidebarItem>
                <SidebarItem route="other" nav={props.nav}>
                    <IMonitor size="24" stroke="#ffffff" />
                    Devices
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