import { h } from "preact"
import { useState } from "preact/hooks"
import DataService from "../DataService"
import ICheck from "./icons/ICheck";
import IForbidden from "./icons/IForbidden";
import InputGroup from "./Layout.InputGroup";

import { API_ENDPOINT_CERTIFICATE } from "../constants";

export default function SetCertificate(props){

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    function apiSetCertificate(){
        onRequestStarted();
        let body = {
            "caCert": document.getElementById("certTA").value
        };
        DataService.post(API_ENDPOINT_CERTIFICATE, body)
        .then(data => {
            setSuccess("Certificate updated");
        })
        .catch( error => {
            setError("Failed to update certificate");
        })
        .finally( () => {
            setLoading(false);
        })
    }

    function apiGetCertificate() {
        DataService.get(API_ENDPOINT_CERTIFICATE)
        .then(data => {
            document.getElementById("certTA").value = data.caCert
        })
        .catch( error => {})
        .finally( () => {})
    }
    apiGetCertificate();

    function onRequestStarted(){
        setSuccess("");
        setError("");
        setLoading(true);
    }

    function updateValue(event){
        setText(event.target.value);
    }

    return (
        <InputGroup name="Root Certificate">
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
            <div class="form-item is-col">
                <label>
                    Update Root Certificate
                    <span class="is-desc"></span>
                </label>
                <textarea id="certTA" rows="4"></textarea>
            </div>
            <button class={(loading)?"button is-loading":"button"} type="button" onClick={apiSetCertificate}>Save</button>
        </InputGroup>
    )
}