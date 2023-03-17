import { h } from "preact";
import { useState } from "preact/hooks";
import DataService from "../DataService";
import StyleBuilder from "../StyleBuilder";

import ICaretDown from "./icons/ICaretDown.svg";
import IDownload from "./icons/IDownload.svg";
import ICheck from "./icons/ICheck.svg";
import ICopy from "./icons/ICopy.svg";
import IForbidden from "./icons/IForbidden.svg";
import ITrash from "./icons/ITrash.svg";
import IUpload from "./icons/IUpload.svg";

export default function WebsocketControlPanel(props) {

    const [fetching, setFetching] = useState(false);

    const [fetchError, setFetchError] = useState("");
    const [fetchSuccess, setFetchSuccess] = useState("");

    const [showTable, setShowTable] = useState(false);
    const [showInputs, setShowInputs] = useState(false);

    const [backendUrl, setBackendUrl] = useState("");
    const [chargeBoxId, setChargeBoxId] = useState("");
    const [authorizationKey, setAuthorizationKey] = useState("");
    const [caCert, setCaCert] = useState("");
    const [pingInterval, setPingInterval] = useState("");
    const [reconnectInterval, setReconnectInterval] = useState("");
    const [dnsUrl, setDnsUrl] = useState("");

    const [_backendUrl, _setBackendUrl] = useState("");
    const [_chargeBoxId, _setChargeBoxId] = useState("");
    const [_authorizationKey, _setAuthorizationKey] = useState("");
    const [_caCert, _setCaCert] = useState("");
    const [_pingInterval, _setPingInterval] = useState("");
    const [_reconnectInterval, _setReconnectInterval] = useState("");
    const [_dnsUrl, _setDnsUrl] = useState("");

    function fetchValues(){
        if(fetching) return;
        setFetching(true);
        DataService.get("/websocket").then(
            resp => {
                setFetchSuccess("Successfully fetched websocket data (" + (new Date()).toISOString() + ")");//TODO updated ago
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
                setFetchError("Could not fetch values");
            }
        ).finally(
            () => {
                setFetching(false);
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
        _setPingInterval("");
        _setReconnectInterval("");
        _setDnsUrl("");
    }

    function _buildCurrentValuesTable() {

        function _row(key, value) {
            return <tr>
                <td class="v-align-mid">
                    {key}
                </td>
                <td class="v-align-mid">
                    <b>{value}</b>
                </td>
            </tr>
        }
        return <table>
            <tbody>
                {
                    [
                        ["Backend URL", backendUrl],
                        ["Chargebox ID", chargeBoxId],
                        ["Authoriztion Key", authorizationKey],
                        ["CA Certificate", caCert],
                        ["Ping Interval", pingInterval],
                        ["Reconnect Interval", reconnectInterval],
                        ["DNS URL", dnsUrl],
                    ].map((el) => { return _row(el[0], el[1]) })
                }
            </tbody>
        </table>
    }

    return <fieldset class="is-col">
        <legend>Websocket</legend>
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
        <div class="is-row is-stack-20">
                <div class="is-col">
                    <button type="button" class={`button ${(fetching)?"is-loading":"pad-icon"}`} onClick={()=>{fetchValues()}}>
                        {
                            !fetching && <IDownload />
                        }
                        Fetch Websocket
                    </button>
                </div>
            </div>
        {
            showTable &&
            _buildCurrentValuesTable()
        }
        {
            showTable &&
            <div class="is-row is-stack-20">
                <div class="is-col">
                    <button type="button" class="button is-tertiary pad-icon" onClick={() => { setShowInputs(!showInputs) }}>
                        <ICaretDown style={`${(showInputs ? "" : StyleBuilder.rotate("-90"))}transition:0.2s;`} />
                        Websocket Options
                    </button>
                </div>
            </div>
        }
        {
            showInputs &&
            <form class="is-col">
                <div class="is-row is-stack-20">
                    <div class="is-col">
                        <button class="button pad-icon space-right" type="button" onClick={()=>duplicateAllValues()}>
                            <IUpload />
                            Update Websocket
                        </button>
                        <button class="button is-tertiary pad-icon space-right" type="button" onClick={()=>clearAllValues()}>
                            <ITrash />
                            Clear all
                        </button>
                        <button class="button is-tertiary pad-icon" type="button" onClick={()=>duplicateAllValues()}>
                            <ICopy />
                            Insert all values 
                        </button>
                    </div>
                </div>
                <div class="is-row is-stack-8">
                    <div class="is-col align-center">
                        <label>Backend URL</label>
                    </div>
                    <div class="is-col">
                        <input type="text" placeholder="backendUrl" value={_backendUrl} />
                    </div>
                </div>
                <div class="is-row is-stack-8">
                    <div class="is-col align-center">
                        <label>Chargebox ID</label>
                    </div>
                    <div class="is-col">
                        <input type="text" placeholder="chargeBoxId" value={_chargeBoxId}/>
                    </div>
                </div>
                <div class="is-row is-stack-8">
                    <div class="is-col align-center">
                        <label>Authoriztion Key</label>
                    </div>
                    <div class="is-col">
                        <input type="text" placeholder="authorizationKey" value={_authorizationKey}/>
                    </div>
                </div>
                <div class="is-row is-stack-8">
                    <div class="is-col align-center">
                        <label>CA Certificate</label>
                    </div>
                    <div class="is-col">
                        <input type="text" placeholder="caCert" value={_caCert}/>
                    </div>
                </div>
                <div class="is-row is-stack-8">
                    <div class="is-col align-center">
                        <label>Ping Interval</label>
                    </div>
                    <div class="is-col">
                        <input type="text" placeholder="pingInterval" value={_pingInterval}/>
                    </div>
                </div>
                <div class="is-row is-stack-8">
                    <div class="is-col align-center">
                        <label>Reconnect Interval</label>
                    </div>
                    <div class="is-col">
                        <input type="text" placeholder="reconnectInterval" value={_reconnectInterval}/>
                    </div>
                </div>
                <div class="is-row is-stack-8">
                    <div class="is-col align-center">
                        <label>DNS URL</label>
                    </div>
                    <div class="is-col">
                        <input type="text" placeholder="dnsUrl" value={_dnsUrl}/>
                    </div>
                </div>
            </form>
        }
    </fieldset>;
}