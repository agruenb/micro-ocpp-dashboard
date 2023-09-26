import { h } from "preact";

import DataService from "../DataService";

import { useEffect, useState } from "preact/hooks";
import FetchButton from "./Util.FetchButton";
import HtmlBuilder from "../HtmlBuilder.js";
import OpenButton from "./Util.OpenButton";
import DateFormatter from "../DateFormatter";

import ICheck from "./icons/ICheck.svg";
import IForbidden from "./icons/IForbidden.svg";
import IUpload from "./icons/IUpload.svg";
import ICopy from "./icons/ICopy.svg";

export default function TransactionControlPanel(props){

    const [fetchStart, setFetchStart] = useState(undefined);
    const [fetchStop, setFetchStop] = useState(undefined);
    const [fetching, setFetching] = useState(false);
    const [fetchSuccess, setFetchSuccess] = useState("");
    const [fetchError, setFetchError] = useState("");

    const [showTable, setShowTable] = useState(false);
    const [showInputs, setShowInputs] = useState(false);

    const [posting, setPosting] = useState(false);
    const [postError, setPostError] = useState("");
    const [postSuccess, setPostSuccess] = useState("");

    const [idTag, setIdTag] = useState("");
    const [transactionId, setTransactionId] = useState(-1);
    const [authorizationStatus, setAuthorizationStatus] = useState("");

    const [_idTag, _setIdTag] = useState("");

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
        DataService.get("/connector/" + props.connectorId +  "/transaction").then(
            resp => {
                setIdTag(resp.idTag);
                setTransactionId(resp.transactionId);
                setAuthorizationStatus(resp.authorizationStatus);

                setFetchError("");
                setFetchSuccess(`Successfully fetched transaction data - ${DateFormatter.fullDate(new Date())}`);
                setShowTable(true);
            }
        ).catch(
            e => {
                setFetchSuccess("");
                setFetchError("Unable to fetch transaction");
            }
        ).finally(
            () => {
                setFetchStop(new Date());
                setFetching(false);
            }
        );
    }

    function postValues(){
        if(posting) return;
        setPosting(true);
        DataService.post("/connector/" + props.connectorId + "/transaction", {
            idTag: _idTag
        }).then(
            resp => {
                if(
                    resp.idTag === _idTag
                ){
                    setPostSuccess(`Transaction update confirmed by the server - ${DateFormatter.fullDate(new Date())}`);
                    setPostError("");
                }else{
                    setPostSuccess("");
                    setPostError("Error while confirming update - You should re-fetch the transaction");
                }
            }
        ).catch(
            e => {
                setPostSuccess("");
                setPostError("Unable to fetch transaction");
            }
        ).finally(
            () => {
                setPosting(false);
            }
        )
    }

    function duplicateAllValues(){
        _setIdTag(idTag);
    }

    return <div>
        <div class={`is-row is-stack-20`} >
            <div class="is-col">
                <FetchButton fetching={fetching} fetchSuccess={fetchSuccess} fetchStart={fetchStart} fetchStop={fetchStop} onClick={()=>{fetchValues()}} >
                    Transaction
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
                ["Tag ID", <b>{idTag}</b>],
                ["Transaction ID", <b>{transactionId}</b>],
                ["Authorization Status", <div class="label">{authorizationStatus}</div>]
            ])
        }
        {
            showTable &&
            <div class={`is-row is-stack-20`}>
                <div class="is-col">
                    <OpenButton isOpen={showInputs} onClick={() => { setShowInputs(!showInputs) }}>
                        Transaction Options
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
                    <div class="is-row is-stack-20">
                        <div class="is-col align-center">
                            <label>Tag ID</label>
                        </div>
                        <div class="is-col">
                            <input type="text" placeholder="idTag" value={_idTag} onChange={e=>_setIdTag(e.target.value)} />
                        </div>
                    </div>
                    <div class="is-row is-stack-20">
                        <div class="is-col">
                            <button class={`button space-right ${(posting)?"is-loading":"pad-icon"}`} type="button" onClick={()=>postValues()}>
                                {
                                    !posting && <IUpload />
                                }
                                Update Transaction
                            </button>
                            <button class="button is-tertiary pad-icon space-right" type="button" onClick={()=>duplicateAllValues()}>
                                <ICopy />
                                Insert Tag ID
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}