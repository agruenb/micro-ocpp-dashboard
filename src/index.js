import App from "./components/App.js"

import "./css/kube.css";
import "./css/custom.css";
import "./css/layout.css";

import "./css/vars.css";

import { h, render } from "preact";

render(<App />, document.getElementById("app"));