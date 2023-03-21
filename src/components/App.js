import { h, Component, createContext  } from "preact";


import Sidebar from "./Layout.Sidebar.js";
import Evse from "./Path.Evse.js";
import Network from "./Path.Network.js";
import Security from "./Path.Security.js";
import Ocpp from "./Path.Ocpp.js";
import Header from "./Layout.Header.js";
import DeviceInfo from "./Path.DeviceInfo.js";
import OtherDevices from "./Path.OtherDevices.js";
import ControlCenter from "./Path.ControlCenter.js";


const Path = createContext()

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            path : "controlcenter"
        }
    }
    navigation(){
        return {
            setPath:(newPath)=>{
                this.setState({path:newPath});
            },
            path:this.state.path,
            closeSidebarMobile:()=>{
                this.closeSidebarMobile()
            }
        }
    }

    currentView(){
        return this.view(this.state.path)
    }

    toggleSidebar(){
        document.querySelector(".sidebar").classList.toggle("show-mobile");
    }

    closeSidebarMobile(){
        document.querySelector(".sidebar").classList.remove("show-mobile");
    }

    view(path){
        switch(path){
            case "controlcenter":
                return (
                    <ControlCenter nav={this.navigation()} />
                )
            case "evse":
                return (
                    <Evse nav={this.navigation()} />
                )
            case "network":
                return (
                    <Network nav={this.navigation()} />
                )
            case "security":
                return (
                    <Security nav={this.navigation()} />
                )
            case "ocpp":
                return (
                    <Ocpp nav={this.navigation()} />
                )
            case "about":
                return (
                    <DeviceInfo nav={this.navigation()} />
                )
            case "other":
                return (
                    <OtherDevices nav={this.navigation()} />
                )
        }  
    }

    render(){
        return (
            <div class="app">
                <Header toggleSidebar={this.toggleSidebar}></Header>
                <Sidebar nav={this.navigation()}></Sidebar>
                <main>
                    {this.currentView()}
                </main>
            </div>
        )
    }
}