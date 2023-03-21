import { h } from "preact";

import DataService from "../DataService";

import { useEffect, useState } from "preact/hooks";
import FetchButton from "./Util.FetchButton";
import HtmlBuilder from "../HtmlBuilder.js";
import DateFormatter from "../DateFormatter";

import ICheck from "./icons/ICheck.svg";
import IForbidden from "./icons/IForbidden.svg";

export default function SmartChargingControlPanel(props){

    const [fetchStart, setFetchStart] = useState(undefined);
    const [fetchStop, setFetchStop] = useState(undefined);
    const [fetching, setFetching] = useState(false);
    const [fetchSuccess, setFetchSuccess] = useState("");
    const [fetchError, setFetchError] = useState("");

    const [showTable, setShowTable] = useState(false);

    const [maxPower, setMaxPower] = useState(-1);
    const [maxCurrent, setMaxCurrent] = useState(-1);

    useEffect(()=>{
        if(props.autofetch){
            fetchValues();
        }
    },
    [props.autofetch]);

    function fetchValues(){
        if(fetching) return;
        setFetchStart(new Date());
        setFetchStop(undefined);
        setFetching(true);
        DataService.get("/connector/" + props.connectorId +  "/smartcharging").then(
            resp => {
                setMaxPower(resp.maxPower);
                setMaxCurrent(resp.maxCurrent);

                setFetchError("");
                setFetchSuccess(`Successfully fetched smartcharging data - ${DateFormatter.fullDate(new Date())}`);
                setShowTable(true);
            }
        ).catch(
            e => {
                setFetchSuccess("");
                setFetchError("Unable to fetch smartcharging");
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
                    Smartcharging
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
                ["Max. Power", <b>{`${maxPower} W`}</b>],
                ["Max. Current", <b>{`${maxCurrent} A`}</b>]
            ])
        }
    </div>
}