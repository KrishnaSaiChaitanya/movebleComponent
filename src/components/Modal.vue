<!-- Modal.vue -->
<template>
    <div class="fixed inset-0 p-6 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="bg-white rounded-lg shadow-xl z-10 relative w-[80%] pt-4" >
        <button @click="$emit('close')"
          class="absolute top-2 right-2 text-black hover:bg-gray-400 w-10 h-10 hover:text-white rounded-full p-2 transition duration-300">
          ✕
        </button>
        <slot ></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>


<style scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;


</style>