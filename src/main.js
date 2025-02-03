import "./assets/main.css";

import { createApp, defineCustomElement } from "vue";
import LogoModel from "./components/LogoModel.ce.vue";
// import Draggable from './components/draggableComponent.ce.vue'

const element = defineCustomElement(LogoModel);
customElements.define("custom-logo", element);
