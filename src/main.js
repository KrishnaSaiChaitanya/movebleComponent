import "./assets/main.css";

import { createApp, defineCustomElement } from "vue";
import LogoModel from "./components/LogoModel.ce.vue";

const element = defineCustomElement(LogoModel);
customElements.define("movable-div", element);
