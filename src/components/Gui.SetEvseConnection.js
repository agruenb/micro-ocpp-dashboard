import { h } from "preact"
import { useState } from "preact/hooks"
import DataService from "../DataService"
import ICheck from "./icons/ICheck";
import IForbidden from "./icons/IForbidden";
import InputGroup from "./Layout.InputGroup";

import { API_ENDPOINT_BACKEND_URL } from "../constants";

export default function SetEvseConnectionDetails(props){

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [chargeBoxId, setCbId] = useState("")
    const [authToken, setAuthToken] = useState("")

    function apiGetEvseCredentials() {
        DataService.get(API_ENDPOINT_BACKEND_URL)
        .then(data => {
            setCbId(data.chargeBoxId);
            setAuthToken(data.authToken);
        })
        .catch( error => {})
        .finally( () => {})
    }
    apiGetEvseCredentials();

    function apiSetEvseCredentials(){
        onRequestStarted();
        let body = {
            "chargeBoxId":chargeBoxId,
            "authToken":authToken
        };
        DataService.post(API_ENDPOINT_BACKEND_URL, body)
        .then(data => {
            setSuccess("EVSE credentials updated");
        })
        .catch( error => {
            setError("Failed to update EVSE credentials");
        })
        .finally( () => {
            setLoading(false);
        })
    }

    function onRequestStarted(){
        setSuccess("");
        setError("");
        setLoading(true);
    }

    function updateValue(event){
        setText(event.target.value);
    }

    return (
        <InputGroup name="EVSE Credentials">
            {
                error != ""
                && 
                <div class="alert is-error">
                    <IForbidden size="24" stroke="#ee2455" />
                    {error}
                </div>
            }
            {
                success != ""
                && 
                <div class="alert is-success">
                    <ICheck size="24" stroke="#20bc71" />
                    {success}
                </div>
            }
            <div class="is-row">
                <div class="form-item is-col">
                    <label>EVSE Name</label>
                    <input type="text" value={chargeBoxId} onChange={(event) => {setCbId(event.target.value)}} />
                </div>
                <div class="form-item is-col">
                    <label>Auth-Key</label>
                    <input type="text" value={authToken} onChange={(event) => {setAuthToken(event.target.value)}} />
                </div>
            </div>
            <button class={(loading)?"button is-loading":"button"} type="button" onClick={apiSetEvseCredentials}>Save</button>
        </InputGroup>
    )
}