import { h } from "preact"

export default function IForbidden(props){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={props.size} height={props.size} fill="none" stroke={props.stroke} stroke-width="2" stroke-linecap="round" stroke-line-join="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
    )
}