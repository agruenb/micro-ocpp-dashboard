import { h } from "preact";

import { useEffect } from "preact/hooks";
import EvseControlPanel from "./Gui.Connector.EvseControlPanel";
import MeterControlPanel from "./Gui.Connector.MeterControlPanel";
import SmartChargingControlPanel from "./Gui.Connector.SmartChargingControlPanel";
import TransactionControlPanel from "./Gui.Connector.TransactionControlPanel";

export default function ConnectorControlPanel(props){

    useEffect(()=>{
        void(0);
    },
    [props.autofetch]);

    return <div class={`is-row is-stack-20 ${props.display?"":"hide"}`}>
        <div class="is-col">
            <EvseControlPanel autofetch={props.autofetch} connectorId={props.connectorId}  />
            <MeterControlPanel autofetch={props.autofetch} connectorId={props.connectorId} />
            <TransactionControlPanel autofetch={props.autofetch} connectorId={props.connectorId} />
            <SmartChargingControlPanel autofetch={props.autofetch} connectorId={props.connectorId} />
        </div>
    </div>
}