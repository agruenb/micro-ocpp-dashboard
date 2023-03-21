import { h } from "preact";
import StopWatch from "./Gui.StopWatch";
import IDownload from "./icons/IDownload.svg";
import IClock from "./icons/IClock.svg";

export default function FetchButton(props){
    return <div>
        <button type="button" class={`button space-right ${props.fetching?"is-loading":"pad-icon"}`} onClick={props.onClick}>
            {
                !props.fetching && <IDownload />
            }
            {props.children}
        </button>
        {
            props.fetching &&
            <span class="label">
                <IClock />
                <StopWatch startTime={props.fetchStart} stopTime={props.fetchStop} />
            </span>
        }
        {
            !props.fetching && props.fetchSuccess &&
            <span class="label">
                <IClock />
                <span>Request duration: </span>
                <StopWatch startTime={props.fetchStart} stopTime={props.fetchStop} />
            </span>
        }
    </div>;
}