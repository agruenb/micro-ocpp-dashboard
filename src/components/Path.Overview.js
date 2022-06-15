import { h, Component } from "preact";
import FullPage from "./Layout.FullPage";
import LinkButton from "./Util.LinkButton";

export default class Overview extends Component{
    
    constructor(){
        super();
    }

    render(){
        return(
            <FullPage>
                <h2 class="is-stack-40">Overview</h2>
                <form class="is-col is-stack-40">
                    <fieldset class="is-col">
                        <legend>Network</legend>
                        <table class="is-col">
                            <thead>
                                <tr>
                                    <th>Port</th>
                                    <th>User</th>
                                    <th>Connection</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>8000</td>
                                    <td>Mongoose Server</td>
                                    <td><span class="label is-success">Stable</span></td>
                                </tr>
                                <tr>
                                    <td>2088</td>
                                    <td>CMS socket</td>
                                    <td><span class="label is-success">Stable</span></td>
                                </tr>
                                <tr>
                                    <td>12052</td>
                                    <td>Input Scanner</td>
                                    <td><span class="label is-error">Pending</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <LinkButton nav={this.props.nav} route="network">Network</LinkButton>
                    </fieldset>
                </form>
                <form class="is-col is-stack-40">
                    <fieldset class="is-col">
                        <legend>Security</legend>
                        <div class="is-stack-12">
                            <b>Last Login:</b><br/>
                            08.06.2022 16:24:12
                        </div>
                        <div class="is-stack-12">
                            <b>Registered Users:</b><br/>
                            12 <span class="label is-warning">New</span>
                        </div>
                        <LinkButton nav={this.props.nav} route="security">Security</LinkButton>
                    </fieldset>
                </form>
                <form class="is-col is-stack-40">
                    <fieldset class="is-col">
                        <legend>Controller</legend>
                        <table class="is-col">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Runtime</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mongoose Server</td>
                                    <td>13:20:18:14</td>
                                    <td><span class="label is-success">Running</span></td>
                                </tr>
                                <tr>
                                    <td>CMS socket</td>
                                    <td>13:20:18:14</td>
                                    <td><span class="label is-success">Running</span></td>
                                </tr>
                                <tr>
                                    <td>Input Scanner</td>
                                    <td>00:00:00:00</td>
                                    <td><span class="label is-error">Inactive</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <LinkButton nav={this.props.nav} route="overview">Controller</LinkButton>
                    </fieldset>
                </form>
            </FullPage>
        )
    }
}