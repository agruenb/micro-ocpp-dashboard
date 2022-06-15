import { h, Component } from "preact";
import FullPage from "./Layout.FullPage";

import IArrowRotate from "./icons/IArrorRotate";

export default class Ocpp extends Component{
    
    constructor(){
        super();
    }

    render(){
        return(
            <FullPage>
                <h2 class="is-stack-40">Ocpp</h2>
                <form class="is-stack-40 is-col">
                    <fieldset class="is-col">
                    <legend>Add User</legend>
                        <div class="is-row">
                            <div class="form-item is-col">
                                <label>Username</label>
                                <input type="text" value="company_wifi_ef3c98" />
                            </div>
                            <div class="form-item is-col">
                                <label>Password</label>
                                <input type="password" value="compfi_ef3c98" />
                            </div>
                        </div>
                        <button class="button" type="button">Create</button>
                    </fieldset>
                </form>
                <form class="is-stack-40 is-col">
                    <fieldset class="is-col">
                        <legend>Backend Server</legend>
                        <div class="form-item is-col is-stack-20">
                            <label>Backend URL</label>
                            <textarea rows="4" value="https://localhost:3000/index_dev.html"></textarea>
                        </div>
                        <button class="button is-stack-40" type="button">Save</button>
                        <div class="form-item is-col">
                            <label>Backend URL 2</label>
                            <textarea rows="4" value="https://localhost:3000/index_dev.html"></textarea>
                        </div>
                    </fieldset>
                </form>
            </FullPage>
        )
    }
}