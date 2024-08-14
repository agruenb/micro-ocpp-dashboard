import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import DataService from "../DataService";
import FetchButton from "./Util.FetchButton";
import HtmlBuilder from "../HtmlBuilder";

import ICheck from "./icons/ICheck.svg";
import ICopy from "./icons/ICopy.svg";
import IForbidden from "./icons/IForbidden.svg";
import ITrash from "./icons/ITrash.svg";
import IUpload from "./icons/IUpload.svg";
import OpenButton from "./Util.OpenButton";
import DateFormatter from "../DateFormatter";

export default function WebsocketControlPanel(props) {

    const [fetchStart, setFetchStart] = useState(undefined);
    const [fetchStop, setFetchStop] = useState(undefined);
    const [fetching, setFetching] = useState(false);
    const [posting, setPosting] = useState(false);

    const [fetchError, setFetchError] = useState("");
    const [fetchSuccess, setFetchSuccess] = useState("");

    const [postError, setPostError] = useState("");
    const [postSuccess, setPostSuccess] = useState("");

    const [showTable, setShowTable] = useState(false);
    const [showInputs, setShowInputs] = useState(false);

    const [backendUrl, setBackendUrl] = useState("");
    const [chargeBoxId, setChargeBoxId] = useState("");
    const [authorizationKey, setAuthorizationKey] = useState("");
    const [caCert, setCaCert] = useState("");
    const [pingInterval, setPingInterval] = useState(0);
    const [reconnectInterval, setReconnectInterval] = useState(0);
    const [dnsUrl, setDnsUrl] = useState("");

    const [_backendUrl, _setBackendUrl] = useState("");
    const [_chargeBoxId, _setChargeBoxId] = useState("");
    const [_authorizationKey, _setAuthorizationKey] = useState("");
    const [_caCert, _setCaCert] = useState("");
    const [_pingInterval, _setPingInterval] = useState(-1);
    const [_reconnectInterval, _setReconnectInterval] = useState(-1);
    const [_dnsUrl, _setDnsUrl] = useState("");

    useEffect(()=>{
        fetchValues();
    },
    [props.autofetch]);

    function fetchValues(){
        if(fetching) return;
        setFetchStart(new Date());
        setFetchStop(undefined);
        setFetching(true);
        DataService.get("/websocket").then(
            resp => {
                setFetchError("");
                setFetchSuccess(`Successfully fetched websocket data - ${DateFormatter.fullDate(new Date())}`);
                setBackendUrl(resp.backendUrl);
                setChargeBoxId(resp.chargeBoxId);
                setAuthorizationKey(resp.authorizationKey);
                setCaCert(resp.caCert);
                setPingInterval(resp.pingInterval);
                setReconnectInterval(resp.reconnectInterval);
                setDnsUrl(resp.dnsUrl);
                setShowTable(true);
            }
        ).catch(
            e => {
                setFetchSuccess("");
                setFetchError("Unable to fetch websocket");
            }
        ).finally(
            () => {
                setFetchStop(new Date());
                setFetching(false);
            }
        )
    }

    function postValues(){
        if(posting) return;
        setPosting(true);
        DataService.post("/websocket", {
            backendUrl: _backendUrl,
            chargeBoxId: _chargeBoxId,
            authorizationKey: _authorizationKey,
            caCert: _caCert,
            pingInterval: _pingInterval,
            reconnectingInterval: _reconnectInterval,
            dnsUrl: _dnsUrl
        }).then(
            resp => {
                if(
                    resp.backendUrl === _backendUrl &&
                    resp.chargeBoxId === _chargeBoxId &&
                    resp.authorizationKey === _authorizationKey &&
                    resp.caCert === _caCert &&
                    resp.pingInterval === _pingInterval &&
                    resp.reconnectingInterval === _reconnectInterval &&
                    resp.dnsUrl === _dnsUrl
                ){
                    setPostSuccess(`Websocket update confirmed by the server - ${DateFormatter.fullDate(new Date())}`);
                    setPostError("");
                }else{
                    setPostSuccess("");
                    setPostError("Error while confirming update - You should re-fetch the websocket");
                }
            }
        ).catch(
            e => {
                setPostSuccess("");
                setPostError("Unable to fetch websocket");
            }
        ).finally(
            () => {
                setPosting(false);
            }
        )
    }

    function duplicateAllValues(){
        _setBackendUrl(backendUrl);
        _setChargeBoxId(chargeBoxId);
        _setAuthorizationKey(authorizationKey);
        _setCaCert(caCert);
        _setPingInterval(pingInterval);
        _setReconnectInterval(reconnectInterval);
        _setDnsUrl(dnsUrl);
    }
    function clearAllValues(){
        _setBackendUrl("");
        _setChargeBoxId("");
        _setAuthorizationKey("");
        _setCaCert("");
        _setPingInterval(-1);
        _setReconnectInterval(-1);
        _setDnsUrl("");
    }

    return <fieldset class="is-col">
        <legend>Websocket</legend>
        <div class={`is-row ${(showTable || fetchError !== "")?"is-stack-20":""}`}>
            <div class="is-col">
                <FetchButton fetching={fetching} fetchSuccess={fetchSuccess} fetchStart={fetchStart} fetchStop={fetchStop} onClick={()=>{fetchValues()}} >
                    Websocket
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
                ["Backend URL", <b>{backendUrl}</b>],
                ["Chargebox ID", <b>{chargeBoxId}</b>],
                ["Authorization Key", <b>{authorizationKey}</b>],
                ["CA Certificate", <b>{caCert}</b>],
                ["Ping Interval", <b>{pingInterval}</b>],
                ["Reconnect Interval", <b>{reconnectInterval}</b>],
                ["DNS URL", <b>{dnsUrl}</b>],
            ])
        }
        {
            showTable &&
            <div class={`is-row ${showInputs?"is-stack-20":""}`}>
                <div class="is-col">
                    <OpenButton isOpen={showInputs} onClick={() => { setShowInputs(!showInputs) }}>
                        Websocket Options
                    </OpenButton>
                </div>
            </div>
        }
        {
            showInputs &&
            <div>
                <div class="is-col">
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
                    <div class="is-row is-stack-8">
                        <div class="is-col align-center">
                            <label>Backend URL</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="backendUrl" value={_backendUrl} onChange={e=>_setBackendUrl(e.target.value)} />
                        </div>
                    </div>
                    <div class="is-row is-stack-8">
                        <div class="is-col align-center">
                            <label>Chargebox ID</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="chargeBoxId" value={_chargeBoxId} onChange={e=>_setChargeBoxId(e.target.value)} />
                        </div>
                    </div>
                    <div class="is-row is-stack-8">
                        <div class="is-col align-center">
                            <label>Authorization Key</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="authorizationKey" value={_authorizationKey} onChange={e=>_setAuthorizationKey(e.target.value)} />
                        </div>
                    </div>
                    <div class="is-row is-stack-8">
                        <div class="is-col align-center">
                            <label>CA Certificate</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="caCert" value={_caCert} onChange={e=>_setCaCert(e.target.value)}/>
                        </div>
                    </div>
                    <div class="is-row is-stack-8">
                        <div class="is-col align-center">
                            <label>Ping Interval</label>
                        </div>
                        <div class="is-col">
                            <input type="number" placeholder="pingInterval" value={_pingInterval} onChange={e=>_setPingInterval(e.target.value)}/>
                        </div>
                    </div>
                    <div class="is-row is-stack-8">
                        <div class="is-col align-center">
                            <label>Reconnect Interval</label>
                        </div>
                        <div class="is-col">
                            <input type="number" placeholder="reconnectInterval" value={_reconnectInterval} onChange={e=>_setReconnectInterval(e.target.value)} />
                        </div>
                    </div>
                    <div class="is-row is-stack-20">
                        <div class="is-col align-center">
                            <label>DNS URL</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="dnsUrl" value={_dnsUrl} onChange={e=>_setDnsUrl(e.target.value)}/>
                        </div>
                    </div>
                    <div class="is-row">
                        <div class="is-col">
                            <button class={`button space-right ${(posting)?"is-loading":"pad-icon"}`} type="button" onClick={()=>postValues()}>
                                {
                                    !posting && <IUpload />
                                }
                                Update Websocket
                            </button>
                            <button class="button is-tertiary pad-icon space-right" type="button" onClick={()=>clearAllValues()}>
                                <ITrash />
                                Clear all
                            </button>
                            <button class="button is-tertiary pad-icon space-right" type="button" onClick={()=>duplicateAllValues()}>
                                <ICopy />
                                Insert all values 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </fieldset>;
}