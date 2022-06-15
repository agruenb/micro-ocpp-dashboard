import { h, Component } from "preact";

export default class SidebarItem extends Component{
    constructor(){
        super();
    }
    setPath(event, props){
        event.preventDefault();
        props.nav.closeSidebarMobile();
        props.nav.setPath(this.props.route);
    }
    class(){
        let c = "sb-item interact";
        let add = (this.props.route == this.props.nav.path)?" act":"";
        return c + add;
    }
    render(props, state){
        return(
            <a href="#" class={this.class()} onClick={(e)=>{this.setPath(e, props)}}>
                <div class="sb-content">
                    <div class="icon">
                        {props.children[0]}
                    </div>
                    <div class="txt">
                        {props.children[1]}
                    </div>
                </div>
            </a>
        )
    }
}