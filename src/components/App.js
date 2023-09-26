import { h, Component, createContext  } from "preact";


import Sidebar from "./Layout.Sidebar.js";
import Network from "./Path.Network.js";
import Security from "./Path.Security.js";
import Header from "./Layout.Header.js";
import Status from "./Path.Status.js";
import Websocket16 from "./Path.Websocket16.js";
import Station from "./Path.Station.js";
import Connectors from "./Path.Connectors.js";


const Path = createContext()

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            path : "status"
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
            case "status":
                return (
                    <Status nav={this.navigation()} />
                )
            case "websocket16":
                return (
                    <Websocket16 nav={this.navigation()} />
                )
            case "station":
                return (
                    <Station nav={this.navigation()} />
                )
            case "connectors":
                return (
                    <Connectors nav={this.navigation()} />
                )
            case "network":
                return (
                    <Network nav={this.navigation()} />
                )
            case "security":
                return (
                    <Security nav={this.navigation()} />
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