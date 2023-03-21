import { h } from "preact";

export default class HtmlBuilder{
    static simpleTable(values) {

        function _row(key, value) {
            return <tr>
                <td class="v-align-mid">
                    {key}
                </td>
                <td class="v-align-mid">
                    {value}
                </td>
            </tr>
        }
        return <table>
            <tbody>
                {
                    values.map((el) => { return _row(el[0], el[1]) })
                }
            </tbody>
        </table>
    }
}