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


export default function StationControlPanel(props) {

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

    const [chargePointModel, setChargePointModel] = useState();
    const [chargePointSerialNumber, setChargePointSerialNumber] = useState();
    const [chargePointVendor, setChargePointVendor] = useState();
    const [firmwareVersion, setFirmwareVersion] = useState();

    const [_chargePointModel, _setChargePointModel] = useState();
    const [_chargePointSerialNumber, _setChargePointSerialNumber] = useState();
    const [_chargePointVendor, _setChargePointVendor] = useState();
    const [_firmwareVersion, _setFirmwareVersion] = useState();

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
        DataService.get("/station").then(
            resp => {
                setChargePointModel(resp.chargePointModel);
                setChargePointSerialNumber(resp.chargePointSerialNumber);
                setChargePointVendor(resp.chargePointVendor);
                setFirmwareVersion(resp.firmwareVersion);

                setFetchError("");
                setFetchSuccess("Successfully fetched station data (" + (new Date()).toISOString() + ")");//TODO updated ago
                setShowTable(true);
            }
        ).catch(
            e => {
                setFetchSuccess("");
                setFetchError("Unable to fetch station");
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
        DataService.post("/station", {
            chargePointModel: _chargePointModel,
            chargePointSerialNumber: _chargePointSerialNumber,
            chargePointVendor: _chargePointVendor,
            firmwareVersion: _firmwareVersion
        }).then(
            resp => {
                if(
                    resp.chargePointModel === _chargePointModel &&
                    resp.chargePointSerialNumber === _chargePointSerialNumber &&
                    resp.chargePointVendor === _chargePointVendor &&
                    resp.firmwareVersion === _firmwareVersion
                ){
                    setPostSuccess("Station update confirmed by the server (" + (new Date()).toISOString() + ")");
                    setPostError("");
                }else{
                    setPostSuccess("");
                    setPostError("Error while confirming update - You should re-fetch the station");
                }
            }
        ).catch(
            e => {
                setPostSuccess("");
                setPostError("Unable to fetch station");
            }
        ).finally(
            () => {
                setPosting(false);
            }
        )
    }

    function duplicateAllValues(){
        _setChargePointModel(chargePointModel);
        _setChargePointSerialNumber(chargePointSerialNumber);
        _setChargePointVendor(chargePointVendor);
        _setFirmwareVersion(firmwareVersion);
    }
    function clearAllValues(){
        _setChargePointModel("");
        _setChargePointSerialNumber("");
        _setChargePointVendor("");
        _setFirmwareVersion("");
    }

    return <fieldset class="is-col">
        <legend>Station</legend>
        <div class={`is-row ${showTable?"is-stack-20":""}`}>
            <div class="is-col">
                <FetchButton fetching={fetching} fetchSuccess={fetchSuccess} fetchStart={fetchStart} fetchStop={fetchStop} onClick={()=>{fetchValues()}} >
                    Fetch Station
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
                ["Charge Point Model", <b>{chargePointModel}</b>],
                ["Charge Point Serial Number", <b>{chargePointSerialNumber}</b>],
                ["Charge Point Vendor", <b>{chargePointVendor}</b>],
                ["Firmware Version", <b>{firmwareVersion}</b>]
            ])
        }
        {
            showTable &&
            <div class={`is-row ${showInputs?"is-stack-20":""}`}>
                <div class="is-col">
                    <OpenButton isOpen={showInputs} onClick={() => { setShowInputs(!showInputs) }}>
                        Station Options
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
                            <button class={`button space-right ${(posting)?"is-loading":"pad-icon"}`} type="button" onClick={()=>postValues()}>
                                {
                                    !posting && <IUpload />
                                }
                                Update Station
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
                            <label>Charge Point Model</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="chargePointModel" value={_chargePointModel} onChange={e=>_setChargePointModel(e.target.value)} />
                        </div>
                    </div>
                    <div class="is-row is-stack-8">
                        <div class="is-col align-center">
                            <label>Charge Point Serial Number</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="chargePointSerialNumber" value={_chargePointSerialNumber} onChange={e=>_setChargePointSerialNumber(e.target.value)} />
                        </div>
                    </div>
                    <div class="is-row is-stack-8">
                        <div class="is-col align-center">
                            <label>Charge Point Vendor</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="chargePointVendor" value={_chargePointVendor} onChange={e=>_setChargePointVendor(e.target.value)}/>
                        </div>
                    </div>
                    <div class="is-row">
                        <div class="is-col align-center">
                            <label>Firmware Version</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="firmwareVersion" value={_firmwareVersion} onChange={e=>_setFirmwareVersion(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
        }
    </fieldset>;
}