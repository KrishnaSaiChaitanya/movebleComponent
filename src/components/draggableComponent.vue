<template>
  <div ref="draggableContainer" id="draggable-container">
    <div id="draggable-header" @mousedown="dragMouseDown"
      style="border: 1px solid black; padding: 4px;display: flex; flex-direction: column; border-radius: 15px; background-color: #000000;">
      <div
        style="height: 24px; width: 168px; border-radius: 9px; border: 1px solid black; background-color: blue;"
      >
      </div>
      <div style="display: flex; border-radius: 9px; padding: 3px;margin-top: 3px; ">
        <div
          id="colorToFil"
          style="height: 48px; width: 49px; border-radius: 50%; margin-left: 5px;"  :style="{ 'background-color': bgColor }">
        </div>
        <div class="button-1" @click="changeTextColor('Button 1')"
          style="height: 48px; width: 49px; margin-left: 5px ;">
          <img src="@/assets/button-1.svg" width="49" height="48" />
        </div>
        <div class="button-2" @click="changeBackgroundColor('Button 2')" 
          style="height: 48px; width: 49px; margin-left: 5px; ">
          <img src="@/assets/button-2.svg" width="49" height="48" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted , watch } from 'vue';

const bgColor = ref(JSON.stringify(localStorage.getItem('colorToFill'))); 
console.log(bgColor);
const draggableContainer = ref(null);
const positions = {
  clientX: undefined,
  clientY: undefined,
  movementX: 0,
  movementY: 0,
};
watch(localStorage.getItem('colorToFill'), (newColor, oldColor) => {
  document.getElementById("colorToFil").style.backgroundColor = newColor;
});
onMounted(() => {
  const bgColor = 'rgb(171, 136, 90)';
  localStorage.setItem('colorToFill', bgColor);
  document.getElementById("colorToFil").style.backgroundColor = bgColor;
});
const dragMouseDown = (event) => {
  event.preventDefault();
  positions.clientX = event.clientX;
  positions.clientY = event.clientY;
  document.onmousemove = elementDrag;
  document.onmouseup = closeDragElement;
};

const elementDrag = (event) => {
  event.preventDefault();
  positions.movementX = positions.clientX - event.clientX;
  positions.movementY = positions.clientY - event.clientY;
  positions.clientX = event.clientX;
  positions.clientY = event.clientY;

  draggableContainer.value.style.top =
    draggableContainer.value.offsetTop - positions.movementY + 'px';
  draggableContainer.value.style.left =
    draggableContainer.value.offsetLeft - positions.movementX + 'px';
};

const closeDragElement = () => {
  document.onmouseup = null;
  document.onmousemove = null;
};


const changeBackgroundColor = (buttonName) => {
  console.log("Button1 is clicked");
};


const changeTextColor = (buttonName) => {
   console.log("Button2 is clicked");
};
</script>

<style scoped>
#draggable-container {
  position: absolute;
  z-index: 9;
}

#draggable-header {
  z-index: 10;
}
</style>
