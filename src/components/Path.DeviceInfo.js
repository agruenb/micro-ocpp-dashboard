import { h } from "preact";
import FullPage from "./Layout.FullPage";
import RefreshButton from "./Util.RefreshButton";

export default function DeviceInfo(){
    return (
        <FullPage>
            <h2 class="is-stack-40">Controller</h2>
            <form class="is-col is-stack-40">
                <fieldset class="is-col">
                    <legend>About</legend>
                    <table class="is-col">
                        <tbody>
                            <tr>
                                <td><b>Model</b></td>
                                <td>ESP 32</td>
                            </tr>
                            <tr>
                                <td><b>Firmware Version</b></td>
                                <td>1.6</td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </form>
            <form class="is-col">
                <fieldset class="is-col">
                    <legend>Factory Reset</legend>
                    <RefreshButton>Reset</RefreshButton>
                </fieldset>
            </form>
        </FullPage>
    )
}