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

    return (
        <div class={`is-border-radius is-shadow-1 is-padded-16 ${props.display?"":"hide"}`}>
            <h3 class="is-stack-20">Connector {props.connectorId}</h3>
            <div class={`is-row`}>
                <div class="is-col">
                    <EvseControlPanel autofetch={props.autofetch} connectorId={props.connectorId} class="is-border-top" />
                    <div class="is-border-top is-stack-20" />
                    <MeterControlPanel autofetch={props.autofetch} connectorId={props.connectorId} />
                    <div class="is-border-top is-stack-20" />
                    <TransactionControlPanel autofetch={props.autofetch} connectorId={props.connectorId} />
                    <div class="is-border-top is-stack-20" />
                    <SmartChargingControlPanel autofetch={props.autofetch} connectorId={props.connectorId} />
                </div>
            </div>
        </div>
    )
    
}