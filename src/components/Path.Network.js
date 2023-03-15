import { h, Component } from "preact";
import WifiSignal from "./Diagram.WifiSignal";
import IWifi from "./icons/IWifi.svg";
import FullPage from "./Layout.FullPage";
import RefreshButton from "./Util.RefreshButton";

export default class Network extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <FullPage>
                <h2 class="is-stack-40">Network</h2>
                <form class="is-col">
                    <fieldset class="is-col">
                        <legend>Wifi</legend>
                        <div class="is-row is-stack-40">
                            <div class="is-col label is-success is-large">
                                <WifiSignal type="success" size="28"></WifiSignal>
                                <span class="is-outset-x-12">Local_Network_Point (Connected)</span>
                            </div>
                        </div>
                        <div class="is-row is-stack-40">
                            <div class="is-col">
                                <h6>Nearby Networks</h6>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td class="v-align-mid">
                                                <IWifi></IWifi>
                                                Local_Network_Point
                                            </td>
                                            <td class="v-align-mid">
                                                <span class="label is-success">Connected</span>
                                            </td>
                                            <td>
                                                <button class="button is-tertiary is-error">
                                                    Disconnect
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-mid">
                                                <IWifi></IWifi>
                                                Close_by_Wifi_0293
                                            </td>
                                            <td class="v-align-mid">
                                                <span class="label is-focus">Available</span>
                                            </td>
                                            <td>
                                                <button class="button is-tertiary">
                                                    Connect
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="v-align-mid">
                                                <IWifi></IWifi>
                                                Wifi-9079378
                                            </td>
                                            <td class="v-align-mid">
                                                <span class="label is-warning">Not Nearby</span>
                                            </td>
                                            <td>
                                                <button class="button is-tertiary">
                                                    Connect
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <RefreshButton>Refresh</RefreshButton>
                            </div>
                        </div>
                        <h6 class="is-stack-20">Connect to Wifi</h6>
                        <div class="is-row is-stack-40">
                            <div class="form-item is-col">
                                <label>Wifi Name</label>
                                <input type="text" value="company_wifi_ef3c98" />
                            </div>
                            <div class="form-item is-col">
                                <label>Wifi Password</label>
                                <input type="password" value="compfi_ef3c98" />
                            </div>
                        </div>
                        <h6 class="is-stack-20">Wifi + Ethernet</h6>
                        <div class="is-row is-stack-40">
                            <div class="form-item is-col">
                                <label class="is-checkbox">
                                    <input type="checkbox" />
                                    Enable
                                </label>
                            </div>
                        </div>
                        <div class="is-row">
                            <div class="is-col">
                                <button class="button" type="button">Save</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </FullPage>
        )
    }
}