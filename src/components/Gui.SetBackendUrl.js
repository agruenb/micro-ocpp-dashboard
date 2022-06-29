import { h } from "preact"
import { useState } from "preact/hooks"
import DataService from "../DataService"
import ICheck from "./icons/ICheck";
import IForbidden from "./icons/IForbidden";
import InputGroup from "./Layout.InputGroup"

export default function SetBackendUrl(props){

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const [text, setText] = useState("https://localhost:3000/index.html")

    function apiSetBackendUrl(){
        setSuccess("");
        setError("");
        setLoading(true);
        DataService.post("/hello_world.php",{"url":text})
        .then(data => {
            setSuccess("Backend URL updated")
        })
        .catch( error => {
            setError("Failed to connect to controller");
        })
        .finally( () => {
            setLoading(false);
        })
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
            <button class={(loading)?"button is-loading":"button"} type="button" onClick={apiSetBackendUrl}>Save</button>
        </InputGroup>
    )
}