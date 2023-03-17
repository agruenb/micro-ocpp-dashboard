import { h } from "preact";
import WebsocketControlPanel from "./Gui.WebsocketControlPanel";
import FullPage from "./Layout.FullPage";
import IDownload from "./icons/IDownload.svg";

export default function ControlCenter(props){
    return (
        <FullPage>
            <h2 class="is-stack-40">Control Center</h2>
            <div class="is-col">
                <div class="is-row is-stack-40">
                    <div class="is-col">
                        <button class="button is-secondary pad-icon">
                            <IDownload />
                            Fetch All
                        </button>
                    </div>
                </div>
                <WebsocketControlPanel />
            </div>
        </FullPage>
    )
}