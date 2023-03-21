import { h, render, Component } from "preact"
import { useState } from "preact/hooks"
import DataService from "../DataService"
import ICheck from "./icons/ICheck.svg";
import IForbidden from "./icons/IForbidden.svg";

import ButtonGroup from "./Util.ButtonGroup";

import { API_ENDPOINT_EV_STATUS } from "../constants";
import { API_ENDPOINT_EVSE_STATUS } from "../constants";
import { API_ENDPOINT_USER_AUTHORIZATION } from "../constants";

export default class EvseController extends Component {

    shadowState = {
        lastRequestFullfilled: true
    };

    constructor() {
        super();
        this.state = {
            idTag: "",
            transactionId: -1,
            chargePermission: false,
            isCharging: false,
            evPlugged: false,
            evReady: false,
            ocppStatus: "Available"
        };
    }

    // Called whenever our component is created
    componentDidMount() {
        this.apiFetchEvseState();
        this.apiFetchEvState();
        // update time every second
        this.timer = setInterval(() => {
            if(this.shadowState.lastRequestFullfilled){
                this.apiFetchEvseState();
                this.shadowState.lastRequestFullfilled = false;
            }
        }, 1000);
    }

    // Called just before our component will be destroyed
    componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

    apiFetchEvseState() {
        DataService.get(API_ENDPOINT_EVSE_STATUS + "?connectorId=" + this.connectorId)
        .then(data => {
            this.setState({
                idTag: data.idTag,
                transactionId: data.transactionId,
                chargePermission: data.chargePermission,
                isCharging: data.isCharging,
                ocppStatus: data.ocppStatus
            });
            this.shadowState.lastRequestFullfilled = true;
        })
        .catch( error => {
            //setError("Failed to process NFC card");
        })
        .finally( () => {
            //setLoading(false);
        })
    }

    apiFetchEvState() {
        DataService.get(API_ENDPOINT_EV_STATUS + "?connectorId=" + this.connectorId)
        .then(data => {
            this.setState({
                evPlugged: data.evPlugged,
                evReady:   data.evReady
            })
        })
        .catch( error => { })
        .finally( () => { })
    }

    render(props, state) {
        this.connectorId = props.connectorId;

        const [error, setError] = useState("");
        const [success, setSuccess] = useState("");
        const [loading, setLoading] = useState(false);

        const [text, setText] = useState("https://localhost:3000/index.html")

        function apiSetBackendUrl(){
            onRequestStarted();
            let body = {
                "url":text
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

        function onRequestStarted(){
            setSuccess("");
            setError("");
            setLoading(true);
        }

        function apiSetEvState(uPlugged, uChargeReady) {
            let body = {
                "evPlugged":state.evPlugged,
                "evReady":  state.evReady
            };
            DataService.post(API_ENDPOINT_EV_STATUS + "?connectorId=" + props.connectorId, body)
            .then(data => {
                setSuccess("EV status updated");
            })
            .catch( error => {
                setError("Failed to update EV status");
            })
            .finally( () => {
                setLoading(false);
            })
        }

        function apiPresentNfcCard() {
            let body = {
                idTag:"A0000000"
            };
            DataService.post(API_ENDPOINT_USER_AUTHORIZATION + "?connectorId=" + props.connectorId, body)
            .then(data => {
                setSuccess("NFC card processed");
            })
            .catch( error => {
                setError("Failed to process NFC card");
            })
            .finally( () => {
                setLoading(false);
            })
        }

        function updateValue(event){
            setText(event.target.value);
        }

        function updatePlugged(plugged){
            state.evPlugged = plugged;
            apiSetEvState();
        }

        function updateReady(ready){
            state.evReady = ready;
            apiSetEvState();
        }

        let evsePlugged = [{
            "name": "Plugged",
            "value": true
        },
        {
            "name": "Unplugged",
            "value": false
        }]

        let evseReady = [{
            "name": "Ready",
            "value": true
        },
        {
            "name": "Suspended",
            "value": false
        }]

        return (
            <fieldset class="is-col">
                <legend>DE*AO*E9452*00{props.connectorId}</legend>

                {
                    false &&
                    error != ""
                    && 
                    <div class="alert is-error">
                        <IForbidden size="24" stroke="#ee2455" />
                        {error}
                    </div>
                }
                {
                    false &&
                    success != ""
                    && 
                    <div class="alert is-success">
                        <ICheck size="24" stroke="#20bc71" />
                        {success}
                    </div>
                }

                <div class="is-row">
                    <div class="is-col">
                        <svg width="120" height="400" style="background-color:none" viewBox="160 70 5 410" xmlns="http://www.w3.org/2000/svg">

                            <rect x="117" y="74" width="90" height="388" fill="#f8f8f8" stroke="#667"/>
                            <rect x="104" y="462" width="116" height="3" fill="#aaa" stroke="#667"/>
                            

                        </svg>
                    </div>
                    <div class="is-col is-stack-20">
                        <span class="is-row is-stack-8">EV SIMULATOR</span>
                        <div class="is-row is-stack-8">
                            <ButtonGroup buttons={evsePlugged} selected={state.evPlugged} onChange={updatePlugged}></ButtonGroup>
                        </div>
                        <div class="is-row is-stack-20">
                            <ButtonGroup buttons={evseReady} selected={state.evReady} onChange={updateReady}></ButtonGroup>
                        </div>
                        <span class="is-row is-stack-8">NFC READER</span>
                        <div class="is-row is-stack-20">
                            <button class={(loading)?"button is-loading":"button"} type="button" onClick={apiPresentNfcCard}>Present NFC card</button>
                        </div>
                        <span class="is-row is-stack-8">EVSE STATUS</span>
                        <div class="is-row is-stack-8">
                            <div class="alert" style={
                                    "width: 100%; text-align: center; margin-bottom: 0px; " +
                                    (state.ocppStatus == "Available" ? "background: #ddffdd; color: #20bc71;" :
                                    (state.ocppStatus == "Preparing" || state.ocppStatus == "Finishing") ? "background-color: #faf97b; color: #898960;" :
                                    (state.ocppStatus == "Charging" || state.ocppStatus == "SuspendedEV" || state.ocppStatus == "SuspendedEVSE") ? "background-color: #ccfafa;  color: #587076;" :
                                            "background-color: #ffc9ff;  color: #867989;")
                                }>
                                {state.ocppStatus}
                            </div>
                        </div>
                        <span class="is-row is-stack-4"><b>ID tag</b>: {
                            state.idTag != "" ? state.idTag : "-"
                        }</span>
                        <span class="is-row is-stack-8"><b>Transaction ID</b>: {
                            state.transactionId > 0 ? state.transactionId : "-"
                        }</span>
                        { 
                            false &&
                            <div class="is-row is-stack-20">
                            <label>
                                EV {props.connectorId}
                                <span class="is-desc">The URL of the backend server</span>
                            </label>
                            <textarea rows="4" value={text} onChange={updateValue}></textarea>

                            <button class={(loading)?"button is-loading":"button"} type="button" onClick={apiPresentNfcCard}>Save</button>
                            
                            </div>
                        }
                    </div>
                
                </div>
            </fieldset>
        )
    }
}