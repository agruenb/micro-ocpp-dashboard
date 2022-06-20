import { h, Component } from "preact";
import FullPage from "./Layout.FullPage";

import IArrowRotate from "./icons/IArrorRotate";

export default class Security extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <FullPage>
                <h2 class="is-stack-40">Security</h2>
                <form class="is-col is-stack-40">
                    <fieldset class="is-col">
                        <legend>Cipher-Suits</legend>
                        <table class="is-col">
                            <tbody>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td>TLS</td>
                                </tr>
                                <tr>
                                    <td><b>Version</b></td>
                                    <td>v2.3.1</td>
                                </tr>
                                <tr>
                                    <td><b>Expiration Date</b></td>
                                    <td>26.12.2026</td>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                </form>
                <form class="is-stack-40 is-col">
                    <fieldset class="is-col">
                        <legend>Root-Certificat</legend>
                        <div class="form-item is-col">
                            <label>Set Certificat</label>
                            <textarea rows="4" value="nfesiobf983hfb9osibfso98i3ebf9owb"></textarea>
                        </div>
                        <button class="button" type="button">Save</button>
                    </fieldset>
                </form>
            </FullPage>
        )
    }
}