import { h } from "preact";

import FullPage from "./Layout.FullPage";
import StationControlPanel from "./Gui.StationControlPanel";

export default function Station(props){
    return <FullPage>
            <h2 class="is-stack-40">Station</h2>
            <div class="is-col">
                <StationControlPanel autoFetch={0} />
            </div>
    </FullPage>
}