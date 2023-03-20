import { h } from "preact";

import DataService from "../DataService";

import { useEffect, useState } from "preact/hooks";
import FetchButton from "./Util.FetchButton";
import HtmlBuilder from "../HtmlBuilder.js";
import OpenButton from "./Util.OpenButton";
import DateFormatter from "../DateFormatter";
import { Fragment } from "preact";

import ICheck from "./icons/ICheck.svg";
import IForbidden from "./icons/IForbidden.svg";
import IUpload from "./icons/IUpload.svg";
import ICopy from "./icons/ICopy.svg";
import ButtonGroup from "./Util.ButtonGroup";

export default function EvseControlPanel(props) {

    const [fetchStart, setFetchStart] = useState(undefined);
    const [fetchStop, setFetchStop] = useState(undefined);
    const [fetching, setFetching] = useState(false);
    const [fetchSuccess, setFetchSuccess] = useState("");
    const [fetchError, setFetchError] = useState("");

    const [showTable, setShowTable] = useState(false);
    const [showInputs, setShowInputs] = useState(false);

    const [posting, setPosting] = useState(false);
    const [postError, setPostError] = useState("");
    const [postSuccess, setPostSuccess] = useState("");

    const [evPlugged, setEvPlugged] = useState(false);
    const [evReady, setEvReady] = useState(false);
    const [evseReady, setEvseReady] = useState(false);
    const [chargePointStatus, setChargePointStatus] = useState("");

    const [_evPlugged, _setEvPlugged] = useState(false);
    const [_evReady, _setEvReady] = useState(false);
    const [_evseReady, _setEvseReady] = useState(false);

    useEffect(() => {
        if (props.autofetch) {
            fetchValues();
        }
    },
        [props.autofetch]);

    function fetchValues() {
        if (fetching) return;
        setFetchStart(new Date());
        setFetchStop(undefined);
        setFetching(true);
        DataService.get("/connector/" + props.connectorId + "/evse").then(
            resp => {
                setEvPlugged(resp.evPlugged);
                setEvReady(resp.evReady);
                setEvseReady(resp.evseReady);
                setChargePointStatus(resp.chargePointStatus);

                setFetchError("");
                setFetchSuccess(`Successfully fetched evse data - ${DateFormatter.fullDate(new Date())}`);
                setShowTable(true);
            }
        ).catch(
            e => {
                setFetchSuccess("");
                setFetchError("Unable to fetch evse");
            }
        ).finally(
            () => {
                setFetchStop(new Date());
                setFetching(false);
            }
        );
    }

    function postValues() {
        if (posting) return;
        setPosting(true);
        DataService.post("/connector/" + props.connectorId + "/evse", {
            evPlugged: _evPlugged,
            evReady: _evReady,
            evseReady: _evseReady
        }).then(
            resp => {
                if (
                    resp.evPlugged === _evPlugged &&
                    resp.evReady === _evReady &&
                    resp.evseReady === _evseReady
                ) {
                    setPostSuccess(`Evse update confirmed by the server - ${DateFormatter.fullDate(new Date())}`);
                    setPostError("");
                } else {
                    setPostSuccess("");
                    setPostError("Error while confirming update - You should re-fetch the evse");
                }
            }
        ).catch(
            e => {
                setPostSuccess("");
                setPostError("Unable to fetch evse");
            }
        ).finally(
            () => {
                setPosting(false);
            }
        )
    }

    function duplicateAllValues() {
        _setEvPlugged(evPlugged);
        _setEvReady(evReady);
        _setEvseReady(evseReady);
    }

    return <div>
        <div class={`is-row is-stack-20`} >
            <div class="is-col">
                <FetchButton fetching={fetching} fetchSuccess={fetchSuccess} fetchStart={fetchStart} fetchStop={fetchStop} onClick={() => { fetchValues() }} >
                    Evse
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
                ["EV Plugged", <div class={`label ${evPlugged ? "is-focus" : "is-warning"}`}>{evPlugged ? "True" : "False"}</div>],
                ["EV Ready", <div class={`label ${evReady ? "is-focus" : "is-warning"}`}>{evReady ? "True" : "False"}</div>],
                ["EVSE Ready", <div class={`label ${evseReady ? "is-focus" : "is-warning"}`}>{evseReady ? "True" : "False"}</div>],
                ["Charge Point Status", <div class="label">{chargePointStatus}</div>]
            ])
        }
        {
            showTable &&
            <div class={`is-row is-stack-20`}>
                <div class="is-col">
                    <OpenButton isOpen={showInputs} onClick={() => { setShowInputs(!showInputs) }}>
                        EVSE Options
                    </OpenButton>
                </div>
            </div>
        }
        {
            showInputs &&
            <div>
                <div class="is-col">
                    <div class="is-row is-stack-20">
                        <div class="is-col">
                            <button class={`button space-right ${(posting) ? "is-loading" : "pad-icon"}`} type="button" onClick={() => postValues()}>
                                {
                                    !posting && <IUpload />
                                }
                                Update Evse
                            </button>
                            <button class="button is-tertiary pad-icon" type="button" onClick={() => duplicateAllValues()}>
                                <ICopy />
                                Insert all values
                            </button>
                        </div>
                    </div>
                    {
                        postError != ""
                        &&
                        <div class="alert is-error">
                            <IForbidden />
                            {postError}
                        </div>
                    }
                    {
                        postSuccess != ""
                        &&
                        <div class="alert is-success">
                            <ICheck />
                            {postSuccess}
                        </div>
                    }
                    <div class="is-row is-stack-12">
                        <div class="is-col align-center">
                            <label>EV Plugged</label>
                        </div>
                        <div class="is-col">
                            <ButtonGroup buttons={[{
                                "name": <Fragment><ICheck/>EV plugged</Fragment>,
                                "value": true
                            },
                            {
                                "name": <Fragment><IForbidden />EV not plugged</Fragment>,
                                "value": false
                            }]} selected={_evPlugged} onChange={value => _setEvPlugged(value)} />
                        </div>
                    </div>
                    <div class="is-row is-stack-12">
                        <div class="is-col align-center">
                            <label>EV Ready</label>
                        </div>
                        <div class="is-col">
                            <ButtonGroup buttons={[{
                                "name": <Fragment><ICheck />EV ready</Fragment>,
                                "value": true
                            },
                            {
                                "name": <Fragment><IForbidden />EV not ready</Fragment>,
                                "value": false
                            }]} selected={_evReady} onChange={value => _setEvReady(value)} />
                        </div>
                    </div>
                    <div class="is-row is-stack-12">
                        <div class="is-col align-center">
                            <label>EVSE Ready</label>
                        </div>
                        <div class="is-col">
                            <ButtonGroup buttons={[{
                                "name": <Fragment><ICheck/>EVSE ready</Fragment>,
                                "value": true
                            },
                            {
                                "name": <Fragment><IForbidden />EVSE not ready</Fragment>,
                                "value": false
                            }]} selected={_evseReady} onChange={value => _setEvseReady(value)} />
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}