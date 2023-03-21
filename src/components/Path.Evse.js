import { h } from "preact";
import EvseController from "./Gui.EvseDemoController";
import FullPage from "./Layout.FullPage";

import ButtonGroup from "./Util.ButtonGroup";

export default function Evse() {

    let evsePlugged1 = [{
        "name": "Plugged",
        "value": 1
    },
    {
        "name": "Unplugged",
        "value": 0
    }]

    let evsePlugged2 = [{
        "name": "Plugged",
        "value": 1
    },
    {
        "name": "Unplugged",
        "value": 0
    }]

    let evseReady1 = [{
        "name": "Ready",
        "value": 1
    },
    {
        "name": "Suspended",
        "value": 0
    }]

    let evseReady2 = [{
        "name": "Ready",
        "value": 1
    },
    {
        "name": "Suspended",
        "value": 0
    }]

    return (
        <FullPage>
            <h2 class="is-stack-40">EVSE Home</h2>
            <div class="is-stack-40 is-row">
                <EvseController connectorId={1} />
                <EvseController connectorId={2} />
            </div>
            <form class="is-stack-40">
                <fieldset>
                    <legend>Configuration</legend>
                    <div class="is-row is-stack-32">
                        <div class="is-col align-center">
                            <label>Options</label>
                        </div>
                        <div class="is-col">
                            <ButtonGroup buttons={evsePlugged1} selected={0}></ButtonGroup>
                        </div>
                    </div>
                    <div class="is-row is-stack-20">
                        <div class="is-col align-center">
                            <label>More Config</label>
                        </div>
                        <div class="is-col">
                            <ButtonGroup buttons={evsePlugged2} selected={1}></ButtonGroup>
                        </div>
                    </div>
                    <div class="is-row is-stack-20">
                        <div class="is-col align-center">
                            <label>More Config</label>
                        </div>
                        <div class="is-col">
                            <ButtonGroup buttons={evseReady1} selected={2}></ButtonGroup>
                        </div>
                    </div>
                    <div class="is-row is-stack-20">
                        <div class="is-col align-center">
                            <label>More Config</label>
                        </div>
                        <div class="is-col">
                            <ButtonGroup buttons={evseReady2} selected={2}></ButtonGroup>
                        </div>
                    </div>
                    <div class="is-row">
                        <div class="is-col">
                            <button class="button" type="button">Save</button>
                        </div>
                    </div>
                </fieldset>
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