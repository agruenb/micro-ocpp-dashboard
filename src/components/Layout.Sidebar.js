import "./component_styles/sidebar.css";

import { h, Component } from "preact";

import SidebarItem from "./Layout.SidebarItem.js";
import IEvse from "./icons/IEvse.svg";
import IWifi from "./icons/IWifi.svg";
import ILock from "./icons/ILock.svg";
import IArrowOut from "./icons/IArrowOut.svg";
import IMatthLogo from "./icons/IMatthLogo.svg";
import IServer from "./icons/IServer.svg";
import IProcessor from "./icons/IProcessor.svg";
import IMonitor from "./icons/IMonitor.svg";
import IControls from "./icons/IControls.svg";
import IPower from "./icons/IPower.svg";


export default class Sidebar extends Component{
    
    constructor() {
        super();
    }

    render(props){
        return (
            <aside class="sidebar">
                <div class="sb-header">
                    <IMatthLogo></IMatthLogo>
                    <div>ArduinoOcpp</div>
                </div>
                <div class="divider" />
                <SidebarItem route="status" nav={props.nav}>
                    <IPower />
                    <span>Status</span>
                </SidebarItem>
                <SidebarItem route="controlcenter" nav={props.nav}>
                    <IControls />
                    <span>Control Center</span>
                </SidebarItem>
                <SidebarItem route="evse" nav={props.nav}>
                    <IEvse />
                    <span>EVSE</span>
                </SidebarItem>
                <SidebarItem route="network" nav={props.nav}>
                    <IWifi />
                    <span>Network</span>
                    <span>Demo</span>
                </SidebarItem>
                <SidebarItem route="ocpp" nav={props.nav}>
                    <IServer />
                    <span>OCPP 1.6</span>
                    <span>Demo</span>
                </SidebarItem>
                <SidebarItem route="security" nav={props.nav}>
                    <ILock size="24" />
                    <span>Security</span>
                    <span>Demo</span>
                </SidebarItem>
                <SidebarItem route="about" nav={props.nav}>
                    <IProcessor />
                    <span>Controller</span>
                    <span>Demo</span>
                </SidebarItem>
                <SidebarItem route="other" nav={props.nav}>
                    <IMonitor />
                    <span>Devices</span>
                    <span>Demo</span>
                </SidebarItem>
                <div class="divider" />
                <SidebarItem route="logout" nav={props.nav}>
                    <IArrowOut/>
                    <span>Logout</span>
                </SidebarItem>
            </aside>
        )
    }
}