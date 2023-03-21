import { h } from "preact";

export default class DateFormatter{
    static fullDate(date){
        const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
        return date.toLocaleDateString("de-DE", options);
    }
}