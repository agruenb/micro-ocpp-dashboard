import { h, Component, createContext  } from "preact";


import Sidebar from "./Layout.Sidebar.js";
import Overview from "./Path.Overview.js";
import Network from "./Path.Network.js";
import Security from "./Path.Security.js";
import Ocpp from "./Path.Ocpp.js";
import Header from "./Layout.Header.js";


const Path = createContext()

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            path : "overview"
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
        console.log("done");
        document.querySelector(".sidebar").classList.remove("show-mobile");
    }

    view(path){
        switch(path){
            case "overview":
                return (
                    <Overview nav={this.navigation()} />
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