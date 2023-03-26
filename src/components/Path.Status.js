import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import EvseLiveDisplay from "./Gui.EvseLiveDisplay";
import DataService from "../DataService";

import FullPage from "./Layout.FullPage";

export default function Status() {

    const [fetching, setFetching] = useState(false);
    const [connectorIds, setConnectorIds] = useState([]);

    useEffect(()=>{
        fetchConnnectors();
    },[]);

    function fetchConnnectors(){
        if(fetching) return;
        setFetching(true);
        DataService.get("/connectors").then(
            resp => {
                setConnectorIds(resp);
            }
        ).catch(
        ).finally(
            ()=>{
                setFetching(false);
            }
        )
    }

    function _buildLiveCards(){
        let cards = [];
        for(let i = 0; i < connectorIds.length; i++){
            cards.push(<div class="is-row is-stack-20">
                <div class="is-col">
                    <EvseLiveDisplay connectorId={connectorIds[i]} />
                </div>
            </div>);
        }
        return cards;
    }

    return <FullPage>
        <h2 class="is-stack-40">Status</h2>
        <div class="is-col">
            {
                _buildLiveCards()
            }
        </div>
    </FullPage>
}