import { h } from "preact";
import { useState } from "preact/hooks";

import InputGroup from "./Layout.InputGroup";
import ICheck from "./icons/ICheck";
import IForbidden from "./icons/IForbidden";

import DataService from "../DataService";

export default function SetSecondaryUrl(){

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [text, setText] = useState("https://localhost:3000/index.html");

    function apiSetSecondaryUrl(){
        onRequestStarted();
        let body = {
            "sec_url":text
        };
        DataService.post("/secondary_url", body)
        .then(data => {
            setSuccess("Updated secondary URL");
        })
        .catch( error => {
            setError("Failed to update secondary URL");
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
        <InputGroup name="Secondary">
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
                    Backend URL
                    <span class="is-desc">The URL of the backend server</span>
                </label>
                <textarea rows="4" value={text} onChange={updateValue}></textarea>
            </div>
            <button class={(loading)?"button is-loading":"button"} onClick={apiSetSecondaryUrl} type="button">Save</button>
        </InputGroup>
    )
}