import { h } from "preact";
import { useState } from "preact/hooks";
import DataService from "../DataService";

import WebsocketControlPanel from "./Gui.WebsocketControlPanel";
import StationControlPanel from "./Gui.StationControlPanel";
import FullPage from "./Layout.FullPage";
import IDownload from "./icons/IDownload.svg";
import ICheck from "./icons/ICheck.svg";
import IForbidden from "./icons/IForbidden.svg";
import FetchButton from "./Util.FetchButton";


export default function ControlCenter(props){

    const [fetchStart, setFetchStart] = useState(undefined);
    const [fetchStop, setFetchStop] = useState(undefined);
    const [fetching, setFetching] = useState(false);

    const [fetchError, setFetchError] = useState("");
    const [fetchSuccess, setFetchSuccess] = useState("");

    const [showTabs, setShowTabs] = useState(false);
    const [connectorIds, setConnectorIds] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    function fetchValues(){
        if(fetching) return;
        setFetchStart(new Date());
        setFetchStop(undefined);
        setFetching(true);
        DataService.get("/connectors").then(
            resp => {

                setConnectorIds(resp);

                setFetchError("");
                setFetchSuccess("Successfully fetched connector list (" + (new Date()).toISOString() + ")");//TODO updated ago
                setShowTabs(true);
            }
        ).catch(
            e => {
                setFetchSuccess("");
                setFetchError("Unable to fetch connectors");
            }
        ).finally(
            () => {
                setFetchStop(new Date());
                setFetching(false);
            }
        )
    }

    function _buildConnectorTabs(){
        let connectorTabs = [];
        for(let i = 0; i < connectorIds.length; i++){
            connectorTabs.push(
                <a href="#" onClick={()=>{setSelectedTab(i)}} class={`${(i === selectedTab)?"is-active":""}`}>Connector {connectorIds[i]}</a>
            )
        }
        return <nav class="tabs" data-kube="tabs" data-equal="true">
            {connectorTabs}
        </nav>
    }

    return (
        <FullPage>
            <h2 class="is-stack-40">Control Center</h2>
            <div class="is-col">
                <div class="is-row is-stack-40">
                    <div class="is-col">
                        <button class="button is-secondary pad-icon space-right">
                            <IDownload />
                            Fetch All
                        </button>
                        <button class="button is-tertiary pad-icon">
                            <IDownload />
                            Recover all from localstorage
                        </button>
                    </div>
                </div>
                <WebsocketControlPanel />
                <StationControlPanel />
                <fieldset class="is-col">
                    <legend>Connectors</legend>
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
                    <div class={`is-row ${showTabs?"is-stack-20":""}`}>
                        <div class="is-col">
                            <FetchButton fetching={fetching} fetchSuccess={fetchSuccess} fetchStart={fetchStart} fetchStop={fetchStop} onClick={()=>{fetchValues()}} >
                                Fetch Connectors
                            </FetchButton>
                        </div>
                    </div>
                    {
                        showTabs &&
                        <div class="is-row is-stack-20">
                            <div class="is-col">
                                {_buildConnectorTabs()}
                            </div>
                        </div>
                    }
                </fieldset>
            </div>
        </FullPage>
    )
}