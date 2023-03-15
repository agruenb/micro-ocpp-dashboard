import "./component_styles/sidebar.css";

import { h, Component } from "preact";

import SidebarItem from "./Layout.SidebarItem.js";
import IEvse from "./icons/IEvse.js";
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
                    <div>ArduinoOcpp</div>
                </div>
                <div class="divider" />
                <SidebarItem route="evse" nav={props.nav}>
                    <IEvse size="24" stroke="#ffffff" />
                    <span>EVSE</span>
                </SidebarItem>
                <SidebarItem route="network" nav={props.nav}>
                    <IWifi size="24" stroke="#ffffff" />
                    <span>Network</span>
                    <span>Demo</span>
                </SidebarItem>
                <SidebarItem route="ocpp" nav={props.nav}>
                    <IServer size="24" stroke="#ffffff" />
                    <span>OCPP 1.6</span>
                    <span>Demo</span>
                </SidebarItem>
                <SidebarItem route="security" nav={props.nav}>
                    <ILock size="24" />
                    <span>Security</span>
                    <span>Demo</span>
                </SidebarItem>
                <SidebarItem route="about" nav={props.nav}>
                    <IProcessor size="24" stroke="#ffffff" />
                    <span>Controller</span>
                    <span>Demo</span>
                </SidebarItem>
                <SidebarItem route="other" nav={props.nav}>
                    <IMonitor size="24" stroke="#ffffff" />
                    <span>Devices</span>
                    <span>Demo</span>
                </SidebarItem>
                <div class="divider" />
                <SidebarItem route="logout" nav={props.nav}>
                    <IArrowOut size="24" />
                    <span>Logout</span>
                </SidebarItem>
            </aside>
        )
    }
}