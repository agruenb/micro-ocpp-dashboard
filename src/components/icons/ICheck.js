import { h } from "preact"

export default function ICheck(props){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={props.size} height={props.size} fill="none" stroke={props.stroke} stroke-width="2" stroke-linecap="round" stroke-line-join="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    )
}