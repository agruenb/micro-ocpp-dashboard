import { h } from "preact"

export default function IMonitor(props){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke={props.stroke} stroke-linecap="round" stroke-line-join="round">
           <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
           <line x1="8" y1="21" x2="16" y2="21"></line>
           <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
    )
}