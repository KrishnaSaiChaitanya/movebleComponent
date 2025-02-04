import "./assets/main.css";

import { defineCustomElement } from "vue";
import LogoModel from "./components/LogoModel.ce.vue";

const element = defineCustomElement(LogoModel);
customElements.define("custom-logo", element);
