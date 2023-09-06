import "./assets/main.css";

import { createApp, defineCustomElement } from "vue";
import Draggable from "./components/draggableComponent.ce.vue";

const element = defineCustomElement(Draggable);
customElements.define("movable-div", element);
