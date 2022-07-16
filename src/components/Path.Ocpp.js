import { h } from "preact";
import SetBackendUrl from "./Gui.SetBackendUrl";
import SetSecondaryUrl from "./Gui.SetSecondaryUrl";
import FullPage from "./Layout.FullPage";

import ButtonGroup from "./Util.ButtonGroup";

export default function Ocpp() {

    let buttonGroup1 = [{
        "name": "Active",
        "value": 0
    },
    {
        "name": "Optional",
        "value": 1
    },
    {
        "name": "Inactive",
        "value": 2
    }]

    let buttonGroup2 = [{
        "name": "Off",
        "value": 0
    },
    {
        "name": "Low",
        "value": 1
    },
    {
        "name": "Medium",
        "value": 2
    },
    {
        "name": "Large",
        "value": 3
    }]

    return (
        <FullPage>
            <h2 class="is-stack-40">Ocpp 1.6</h2>
            <form class="is-stack-40 is-col">
                <SetBackendUrl />
            </form>
            <form class="is-stack-40">
                <fieldset>
                    <legend>Configuration</legend>
                    <div class="is-row is-stack-32">
                        <div class="is-col align-center">
                            <label>Options</label>
                        </div>
                        <div class="is-col">
                            <ButtonGroup buttons={buttonGroup1} selected={0}></ButtonGroup>
                        </div>
                    </div>
                    <div class="is-row is-stack-20">
                        <div class="is-col align-center">
                            <label>More Config</label>
                        </div>
                        <div class="is-col">
                            <ButtonGroup buttons={buttonGroup2} selected={2}></ButtonGroup>
                        </div>
                    </div>
                    <div class="is-row">
                        <div class="is-col">
                            <button class="button" type="button">Save</button>
                        </div>
                    </div>
                </fieldset>
            </form>
            <form class="is-stack-40">
                <SetSecondaryUrl />
            </form>
            <form>
                <fieldset>
                    <legend>EVSE connection</legend>
                    <div class="is-row">
                        <div class="form-item is-col">
                            <label>EVSE Name</label>
                            <input type="text" value="company_wifi_ef3c98" />
                        </div>
                        <div class="form-item is-col">
                            <label>Auth-Key</label>
                            <input type="password" value="compfi_ef3c98" />
                        </div>
                    </div>
                    <button class="button" type="button">Save</button>
                </fieldset>
            </form>
        </FullPage>
    )
}