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

export default function StationControlPanel(props) {

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

    function fetchValues(){
        if(fetching) return;
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
                        ["Charge Point Model", chargePointModel],
                        ["Charge Point Serial Number", chargePointSerialNumber],
                        ["Charge Point Vendor", chargePointVendor],
                        ["Firmware Version", firmwareVersion]
                    ].map((el) => { return _row(el[0], el[1]) })
                }
            </tbody>
        </table>
    }

    return <fieldset class="is-col">
        <legend>Station</legend>
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
        <div class={`is-row ${showTable?"is-stack-20":""}`}>
                <div class="is-col">
                    <button type="button" class={`button ${(fetching)?"is-loading":"pad-icon"}`} onClick={()=>{fetchValues()}}>
                        {
                            !fetching && <IDownload />
                        }
                        Fetch Station
                    </button>
                </div>
            </div>
        {
            showTable &&
            _buildCurrentValuesTable()
        }
        {
            showTable &&
            <div class={`is-row ${showInputs?"is-stack-20":""}`}>
                <div class="is-col">
                    <button type="button" class="button is-tertiary pad-icon" onClick={() => { setShowInputs(!showInputs) }}>
                        <ICaretDown style={`${(showInputs ? "" : StyleBuilder.rotate("-90"))}transition:0.2s;`} />
                        Station Options
                    </button>
                </div>
            </div>
        }
        {
            showInputs &&
            <div>
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