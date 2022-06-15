import { h, Component } from "preact";
import FullPage from "./Layout.FullPage";

import IArrowRotate from "./icons/IArrorRotate";

export default class Security extends Component{
    
    constructor(){
        super();
    }

    render(){
        return(
            <FullPage>
                <h2 class="is-stack-40">Security</h2>
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
                <form class="is-col is-stack-40">
                    <fieldset class="is-col">
                        <legend>Users</legend>
                        <table class="is-col">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Saved</th>
                                    <th>Last Login</th>
                                    <th>Priviledge</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>root</td>
                                    <td>10.10.2021</td>
                                    <td>06.06.2022</td>
                                    <td><span class="label is-warning">root</span></td>
                                </tr>
                                <tr>
                                    <td>factory_config</td>
                                    <td>10.10.2021</td>
                                    <td>01.02.2022</td>
                                    <td><span class="label is-focus">user</span></td>
                                </tr>
                                <tr>
                                    <td>on_site_login</td>
                                    <td>10.10.2021</td>
                                    <td>12.03.2022</td>
                                    <td><span class="label is-focus">user</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="button is-tertiary" type="button">
                            <IArrowRotate size="20" stroke="#0c3dd7"></IArrowRotate>
                            Refresh
                        </button>
                    </fieldset>
                </form>
            </FullPage>
        )
    }
}