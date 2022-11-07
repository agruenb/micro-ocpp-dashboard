import { h } from "preact"

export default function IEvse(props){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke={props.stroke} stroke-linecap="round" stroke-line-join="round">
           <rect x="4" y="3" width="16" height="18" rx="2" ry="2"></rect>
           <rect x="8" y="6" width="8" height="4" rx="0" ry="0"></rect>
           <path d="M 20 14 A 4 3 0 0 1 20 19" fill="#fff"></path>
        </svg>
    )
}