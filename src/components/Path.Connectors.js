import { h } from "preact";

import FullPage from "./Layout.FullPage";
import { useEffect, useState } from "preact/hooks";
import ConnectorControlPanel from "./Gui.ConnectorControlPanel";
import FetchButton from "./Util.FetchButton";

import IDownload from "./icons/IDownload.svg";
import IForbidden from "./icons/IForbidden.svg";
import ICheck from "./icons/ICheck.svg";

import DataService from "../DataService";
import DateFormatter from "../DateFormatter";


export default function Connectors(props) {

    const [fetchAll, setFetchAll] = useState(0);

    const [fetchStart, setFetchStart] = useState(undefined);
    const [fetchStop, setFetchStop] = useState(undefined);
    const [fetching, setFetching] = useState(false);

    const [fetchError, setFetchError] = useState("");
    const [fetchSuccess, setFetchSuccess] = useState("");

    const [showTabs, setShowTabs] = useState(false);
    const [connectorIds, setConnectorIds] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        fetchValues();
    },[fetchAll]);

    function fetchValues() {
        if (fetching) return;
        setFetchStart(new Date());
        setFetchStop(undefined);
        setFetching(true);
        DataService.get("/connectors").then(
            resp => {

                setConnectorIds(resp);

                setFetchError("");
                setFetchSuccess(`Successfully fetched connector list - ${DateFormatter.fullDate(new Date())}`);
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

    function _buildConnectorTabs() {
        let connectorTabs = [];
        for (let i = 0; i < connectorIds.length; i++) {
            connectorTabs.push(
                <a href="#" onClick={() => { setSelectedTab(i) }} class={`${(i === selectedTab) ? "is-active" : ""}`}>Connector {connectorIds[i]}</a>
            )
        }
        return <nav class="tabs" data-kube="tabs" data-equal="true">
            {connectorTabs}
        </nav>
    }

    function _buildConnectorPanels() {
        let connectorPanels = [];
        for (let i = 0; i < connectorIds.length; i++) {
            connectorPanels.push(
                <ConnectorControlPanel connectorId={connectorIds[i]} display={(i === selectedTab)} autofetch={fetchAll} />
            )
        }
        return connectorPanels
    }

    return <FullPage>
        <h2>Connectors</h2>
        <div class="is-col">
            <div class="is-row is-stack-40">
                <div class="is-col">
                    <button class="button is-tertiary pad-icon space-right" onClick={() => { setFetchAll(fetchAll + 1) }}>
                        <IDownload />
                        Fetch All
                    </button>
                </div>
            </div>
            <fieldset class="is-col">
                <legend>Connectors</legend>
                <div class={`is-row ${(showTabs || fetchError !== "") ? "is-stack-20" : ""}`}>
                    <div class="is-col">
                        <FetchButton fetching={fetching} fetchSuccess={fetchSuccess} fetchStart={fetchStart} fetchStop={fetchStop} onClick={() => { fetchValues() }} >
                            Connectors
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
                    showTabs &&
                    <div class="is-row is-stack-4">
                        <div class="is-col">
                            {_buildConnectorTabs()}
                        </div>
                    </div>
                }
                {
                    showTabs &&
                    _buildConnectorPanels()
                }
            </fieldset>
        </div>
    </FullPage>
}