import "./component_styles/sidebar.css";

import { h, Component } from "preact";

import SidebarItem from "./Layout.SidebarItem.js";
import IWifi from "./icons/IWifi.svg";
import ILock from "./icons/ILock.svg";
import IMatthLogo from "./icons/IMatthLogo.svg";
import IServer from "./icons/IServer.svg";
import IControls from "./icons/IControls.svg";
import IPower from "./icons/IPower.svg";
import ILocation from "./icons/ILocation.svg"


export default class Sidebar extends Component{
    
    constructor() {
        super();
    }

    render(props){
        return (
            <aside class="sidebar">
                <div class="sb-header">
                    <IMatthLogo></IMatthLogo>
                    <div>MicroOcpp</div>
                </div>
                <div class="divider" />
                <SidebarItem route="status" nav={props.nav}>
                    <IControls />
                    <span>Status</span>
                </SidebarItem>
                <SidebarItem route="websocket16" nav={props.nav}>
                    <IServer />
                    <span>OCPP 1.6 Connection</span>
                </SidebarItem>
                <SidebarItem route="station" nav={props.nav}>
                    <ILocation />
                    <span>Station</span>
                </SidebarItem>
                <SidebarItem route="connectors" nav={props.nav}>
                    <IPower />
                    <span>Connectors</span>
                </SidebarItem>
                <div class="divider" />
                <SidebarItem route="network" nav={props.nav}>
                    <IWifi />
                    <span>Network</span>
                    <span>Demo</span>
                </SidebarItem>
                <SidebarItem route="security" nav={props.nav}>
                    <ILock size="24" />
                    <span>Security</span>
                    <span>Demo</span>
                </SidebarItem>
            </aside>
        )
    }
}