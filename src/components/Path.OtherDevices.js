import { h } from "preact";
import FullPage from "./Layout.FullPage";
import IMonitor from "./icons/IMonitor";
import RefreshButton from "./Util.RefreshButton";

export default function OtherDevices(){
    return (
        <FullPage>
            <h2 class="is-stack-40">Devices</h2>
            <form class="is-stack-40">
                <fieldset>
                    <legend>Connected Devices</legend>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Serial #
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <IMonitor size="22" stroke="#000"></IMonitor>
                                    SR-090832383
                                </td>
                                <td>
                                    297039420938402830948
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <IMonitor size="22" stroke="#000"></IMonitor>
                                    Smart_device_029
                                </td>
                                <td>
                                    0832mfen832nj34324
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <IMonitor size="22" stroke="#000"></IMonitor>
                                    IOT_machine_923
                                </td>
                                <td>
                                    0980239u032m403290923
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <RefreshButton>Refresh</RefreshButton>
                </fieldset>
            </form>
            <form>
                <fieldset>
                    <legend>HW-Diagnose</legend>
                    <div class="is-row is-stack-20">
                        <div class="is-col">
                            <span>22.03.2022 16:13</span>
                            <span class="is-outset-x-8"><span class="label is-error">Not passed</span></span>
                        </div>
                    </div>
                    <RefreshButton>Run Again</RefreshButton>
                </fieldset>
            </form>
        </FullPage>
    )
}