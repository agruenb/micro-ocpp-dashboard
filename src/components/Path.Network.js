import { h, Component } from "preact";
import IArrowRotate from "./icons/IArrorRotate";
import FullPage from "./Layout.FullPage";

export default class Network extends Component{
    
    constructor(){
        super();
    }

    render(){
        return(
            <FullPage>
                <h2 class="is-stack-40">Network</h2>
                <form class="is-stack-40 is-col">
                    <fieldset class="is-col">
                    <legend>Wifi Connection</legend>
                        <div class="is-row">
                            <div class="form-item is-col">
                                <label>Wifi Name</label>
                                <input type="text" value="company_wifi_ef3c98" />
                            </div>
                            <div class="form-item is-col">
                                <label>Wifi Password</label>
                                <input type="password" value="compfi_ef3c98" />
                            </div>
                        </div>
                        <button class="button" type="button">Connect</button>
                    </fieldset>
                </form>
                <form class="is-col is-stack-40">
                    <fieldset class="is-col">
                        <legend>Connected Devices</legend>
                        <table class="is-col">
                            <thead>
                                <tr>
                                    <th>Port</th>
                                    <th>User</th>
                                    <th>Connection</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>8000</td>
                                    <td>Mongoose Server</td>
                                    <td><span class="label is-success">Stable</span></td>
                                </tr>
                                <tr>
                                    <td>2088</td>
                                    <td>CMS socket</td>
                                    <td><span class="label is-success">Stable</span></td>
                                </tr>
                                <tr>
                                    <td>12052</td>
                                    <td>Input Scanner</td>
                                    <td><span class="label is-error">Pending</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="button is-tertiary" type="button">
                            <IArrowRotate size="20" stroke="#0c3dd7"></IArrowRotate>
                            Refresh
                        </button>
                    </fieldset>
                </form>
                <form class="is-stack-40 is-col">
                    <fieldset class="is-col">
                        <legend>Backend Server</legend>
                        <div class="form-item is-col">
                            <label>Backend URL</label>
                            <textarea rows="4" value="https://localhost:3000/index_dev.html"></textarea>
                        </div>
                        <button class="button" type="button">Save</button>
                    </fieldset>
                </form>
            </FullPage>
        )
    }
}