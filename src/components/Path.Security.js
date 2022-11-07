import { h, Component } from "preact";
import FullPage from "./Layout.FullPage";
import SetCertificate from "./Gui.SetCertificate";

import IArrowRotate from "./icons/IArrorRotate";

export default class Security extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <FullPage>
                <h2 class="is-stack-40">Security</h2>
                <form class="is-stack-40 is-col">
                    <SetCertificate />
                </form>
                <form class="is-col is-stack-40">
                    <fieldset class="is-col">
                        <legend>Cipher Suites</legend>
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
            </FullPage>
        )
    }
}