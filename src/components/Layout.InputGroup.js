import { h } from "preact"

export default function InputGroup(props){
    return(
        <fieldset class="is-col">
            <legend>{props.name}</legend>
            {props.children}
        </fieldset>
    )
}