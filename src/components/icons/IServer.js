import { h } from "preact"

export default function IServer(props){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke={props.stroke} stroke-linecap="round" stroke-line-join="round">
           <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
           <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
           <circle cx="6" cy="6" r="0.4" fill={props.stroke} />
           <circle cx="6" cy="18" r="0.4" fill={props.stroke} />
        </svg>
    )
}