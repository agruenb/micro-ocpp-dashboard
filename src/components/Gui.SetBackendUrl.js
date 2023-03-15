import { h } from "preact"
import { useState } from "preact/hooks"
import DataService from "../DataService"
import ICheck from "./icons/ICheck.svg";
import IForbidden from "./icons/IForbidden.svg";
import InputGroup from "./Layout.InputGroup";

import { API_ENDPOINT_BACKEND_URL } from "../constants";

export default function SetBackendUrl(props){

    const [error, setError] = useState("fofo");
    const [success, setSuccess] = useState("fefe");
    const [loading, setLoading] = useState(false);

    const [text, setText] = useState("")

    function apiSetBackendUrl(){
        onRequestStarted();
        let body = {
            "backendUrl":text
        };
        DataService.post(API_ENDPOINT_BACKEND_URL, body)
        .then(data => {
            setSuccess("Backend URL updated");
        })
        .catch( error => {
            setError("Failed to update backend URL");
        })
        .finally( () => {
            setLoading(false);
        })
    }

    function apiGetBackendUrl() {
        DataService.get(API_ENDPOINT_BACKEND_URL)
        .then(data => {
            setText(data.backendUrl)
        })
        .catch( error => {})
        .finally( () => {})
    }
    apiGetBackendUrl();

    function onRequestStarted(){
        setSuccess("");
        setError("");
        setLoading(true);
    }

    function updateValue(event){
        setText(event.target.value);
    }

    return (
        <InputGroup name="Backend">
            {
                error != ""
                && 
                <div class="alert is-error">
                    <IForbidden />
                    {error}
                </div>
            }
            {
                success != ""
                && 
                <div class="alert is-success">
                    <ICheck />
                    {success}
                </div>
            }
            <div class="form-item is-col">
                <label>
                    Backend URL
                    <span class="is-desc">The URL of the backend server</span>
                </label>
                <input type="text" value={text} onChange={updateValue}></input>
            </div>
            <button class={(loading)?"button is-loading":"button"} type="button" onClick={apiSetBackendUrl}>Save</button>
        </InputGroup>
    )
}