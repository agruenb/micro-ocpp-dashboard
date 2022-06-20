import { h } from "preact"

export default function ButtonGroup(props) {

    function buttons() {
        let btnElements = [];
        console.log(props.buttons);
        for (let i = 0; i < props.buttons.length; i++) {
            let buttonItem = props.buttons[i];
            //if button is not selected add secondary class
            let className = `button is-small ${(props.selected == buttonItem.value)?"":"is-secondary"}`;
            //construct button element
            btnElements.push(
                <button class={className} type="button">
                    {buttonItem.name}
                </button>
            );
        }
        return btnElements;
    }

    return (
        <div class="btn-group">
            {buttons()}
        </div>
    )
}