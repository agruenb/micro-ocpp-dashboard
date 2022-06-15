import {h, Component} from "preact";

export default class FullPage extends Component{
    constructor(){
        super();
    }
    render(props){
        return (
            <div class="is-col main-container">
                {props.children}
            </div>
        )
    }
}