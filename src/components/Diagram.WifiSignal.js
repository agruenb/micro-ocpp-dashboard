import { h } from "preact"

export default function WifiSignal(props) {
    
    function displayColor(){
        switch (props.type) {
            case "success":
                return "#20bc71";
            case "warning":
                return "#ff6951";
            case "error":
                return "#ee2455";
            default:
                return "#020202";
        }
    }

    let color = displayColor();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 512 512" stroke={color} fill={color} stroke-width="0" stroke-linecap="round">
            <path d="M 188 324 A 22.627416997969522 22.627416997969522 0 0 1 156 292 Q 160 288 172 280 Q 256 224 340 280 Q 352 288 356 292 A 22.627416997969522 22.627416997969522 0 0 1 324 324 Q 320 320 308 311 Q 256 272 204 311 Q 192 320 188 324 Z" />
            <path d="M 124 260 A 22.627416997969522 22.627416997969522 0 0 1 92 228 Q 96 224 108 215 Q 256 96 404 215 Q 416 224 420 228 A 22.627416997969522 22.627416997969522 0 0 1 388 260 Q 384 256 373 246 Q 256 144 139 246 Q 128 256 124 260 Z" />
            <path d="M 60 196 A 22.627416997969522 22.627416997969522 0 0 1 28 164 Q 32 160 44 151 Q 256 -16 468 151 Q 480 160 484 164 A 22.627416997969522 22.627416997969522 0 0 1 452 196 Q 448 192 436 182 Q 256 32 76 182 Q 64 192 60 196 Z" />
            <circle cx="256" cy="384" r="32" />
        </svg>
    )
}
/*
<line x1="400" y1="128" x2="400" y2="416" />
<line x1="304" y1="256" x2="304" y2="416" />
<line x1="208" y1="352" x2="208" y2="416" />
<circle cx="112" cy="416" r={strokeRadius} stroke-width="0" />
*/