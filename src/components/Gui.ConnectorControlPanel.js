import { h } from "preact";

import { useState } from "preact/hooks";
import EvseControlPanel from "./Gui.Connector.EvseControlPanel";
import MeterControlPanel from "./Gui.Connector.MeterControlPanel";
import SmartChargingControlPanel from "./Gui.Connector.SmartChargingControlPanel";
import TransactionControlPanel from "./Gui.Connector.TransactionControlPanel";

export default function ConnectorControlPanel(props){

    return <div class={`is-row is-stack-20 ${props.display?"":"hide"}`}>
        <div class="is-col">
            <EvseControlPanel connectorId={props.connectorId} />
            <MeterControlPanel connectorId={props.connectorId} />
            <TransactionControlPanel connectorId={props.connectorId} />
            <SmartChargingControlPanel connectorId={props.connectorId} />
        </div>
    </div>
}