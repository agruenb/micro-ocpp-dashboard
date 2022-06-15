import { h } from "preact"

export default function IMatthLogo(props){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={props.size} width={props.size} viewBox="0 0 512 512">
            <path d="M 272 95 L 272 129 Q 272 144 287 144 L 289 144 Q 304 144 319 147 Q 384 160 384 241 Q 384 256 384 271 Q 384 352 319 365 Q 304 368 289 368 L 287 368 Q 272 368 272 383 L 272 417 Q 272 432 287 432 L 321 432 Q 336 432 350 428 Q 448 400 448 271 Q 448 256 448 241 Q 448 112 350 84 Q 336 80 321 80 L 287 80 Q 272 80 272 95 Z" fill="#ffffff" />
            <ellipse cx="291" cy="256" rx="50" ry="57" fill="#ffffff" />
            <path d="M 63 432 L 97 432 Q 112 432 117 418 L 235 94 Q 240 80 225 80 L 191 80 Q 176 80 171 94 L 53 418 Q 48 432 63 432 Z" fill="#ffffff" />
        </svg>
    )
}