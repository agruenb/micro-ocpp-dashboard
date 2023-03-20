import { h } from "preact";

import DataService from "../DataService";

import { useState } from "preact/hooks";
import FetchButton from "./Util.FetchButton";
import HtmlBuilder from "../HtmlBuilder.js";

import ICheck from "./icons/ICheck.svg";
import IForbidden from "./icons/IForbidden.svg";

export default function MeterControlPanel(props){

    const [fetchStart, setFetchStart] = useState(undefined);
    const [fetchStop, setFetchStop] = useState(undefined);
    const [fetching, setFetching] = useState(false);
    const [fetchSuccess, setFetchSuccess] = useState("");

    const [fetchError, setFetchError] = useState("");

    const [showTable, setShowTable] = useState(false);

    const [energy, setEnergy] = useState(-1);
    const [power, setPower] = useState(-1);
    const [current, setCurrent] = useState(-1);
    const [voltage, setVoltage] = useState(-1);

    function fetchValues(){
        if(fetching) return;
        setFetchStart(new Date());
        setFetchStop(undefined);
        setFetching(true);
        DataService.get("/connector/" + props.connectorId +  "/meter").then(
            resp => {
                setEnergy(resp.energy);
                setPower(resp.power);
                setCurrent(resp.current);
                setVoltage(resp.voltage);

                setFetchError("");
                setFetchSuccess("Successfully fetched meter data (" + (new Date()).toISOString() + ")");//TODO updated ago
                setShowTable(true);
            }
        ).catch(
            e => {
                setFetchSuccess("");
                setFetchError("Unable to fetch meter");
            }
        ).finally(
            () => {
                setFetchStop(new Date());
                setFetching(false);
            }
        );
    }

    return <div>
        <div class={`is-row is-stack-20`} >
            <div class="is-col">
                <FetchButton fetching={fetching} fetchSuccess={fetchSuccess} fetchStart={fetchStart} fetchStop={fetchStop} onClick={()=>{fetchValues()}} >
                    Meter
                </FetchButton>
            </div>
        </div>
        {
            fetchError != ""
            && 
            <div class="alert is-error">
                <IForbidden />
                {fetchError}
            </div>
        }
        {
            fetchSuccess != ""
            && 
            <div class="alert is-success">
                <ICheck />
                {fetchSuccess}
            </div>
        }
        {
            showTable &&
            HtmlBuilder.simpleTable([
                ["Energy", <b>{`${energy} Wh`}</b>],
                ["Power", <b>{`${power} W`}</b>],
                ["Current", <b>{`${current} A`}</b>],
                ["Voltage", <b>{`${voltage} V`}</b>]
            ])
        }
    </div>
}