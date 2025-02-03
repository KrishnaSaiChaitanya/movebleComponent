<!-- MyComponent.vue -->
<template>
    <button type="button" class="w-20 h-20 rounded-full border-gray-300 border m-2 flex items-center justify-center"
        @click="openModal">
        <MyIcon class="w-20 h-20 p-2 inline-block"/>
    </button>

    <div class="fixed inset-0 p-6 flex items-center justify-center z-50" v-show="isModalVisible" >
      <div class="fixed inset-0 bg-black opacity-50"></div>
      <div class="bg-white rounded-lg shadow-xl z-10 relative w-[80%] pt-4" >
        <button @click="closeModal"
          class="absolute top-2 right-2 text-black hover:bg-gray-400 w-10 h-10 hover:text-white rounded-full p-2 transition duration-300">
          ✕
        </button>
        <div class="flex flex-col sm:flex-row gap-10 m-4 mt-8 px-2 max-h-[500px] sm:max-h-[680px] overflow-y-auto">
            <div class="text-center sm:col-span-2 lg:col-span-3 flex flex-col justify-center items-center mb-5">
                <MyIcon class="w-20 h-20 inline-block" />
                <h2 class="text-2xl font-semibold text-gray-900 mb-4 w-[80%]">
                    Enjoy peace of mind by booking a LULA to your next event
                </h2>
                <p class="mb-4 w-[85%]">
                    Business or Leisure. Small parties, large events, we’ve got you covered.
                    Sit back and relax, whilst we get you where you need to be.
                </p>
                <b class="text-lg">Move the people. Move the world.</b>
            </div>
            <form class="sm:col-span-2 lg:col-span-3">
                <div class="space-y-12 mb-6">
                    <div class="grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-6">

                        <div class="sm:col-span-3">
                            <label for="first-name">First Name</label>
                            <input id="first-name" type="text" name="first-name" placeholder="First Name"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="last-name">Last Name</label>
                            <input id="last-name" type="text" name="last-name" placeholder="Last Name"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="email-address">Email Address</label>
                            <input id="email-address" type="email" name="email-address" placeholder="Email Address"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="contact-number">Contact Number</label>
                            <input id="contact-number" type="tel" name="contact-number" placeholder="Contact Number"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="pick-up-address">Pickup Location</label>
                            <AddressInput id="pick-up-address" @addressSelect="getPickUpAddress"
                                :mapboxOptions="mapboxOptions">
                            </AddressInput>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="drop-off-address">Drop off Location</label>
                            <AddressInput id="drop-off-address" @addressSelect="getDropOffAddress"
                                :mapboxOptions="mapboxOptions">
                            </AddressInput>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="passengers">Passengers</label>
                            <input id="passengers" type="number" name="passengers" placeholder="No. of Passengers"
                                class="block w-full mt-1 rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="vehicle">Vehicle</label>
                            <select id="vehicle" name="vehicle"
                                class="mt-1 block w-full rounded-md border border-gray-300 py-1.5 pl-3 pr-10 text-gray-900">
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Van">Van</option>
                                <option value="Bus">Bus</option>
                            </select>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="date">Date</label>
                            <input id="date" type="date" name="date"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="time">Time</label>
                            <input id="time" type="time" name="time"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-2 gap-6 place-content-between mb-4">
                    <b>Trip Fair:</b>
                    <span class="text-green-600 font-semibold">R 0.00</span>
                </div>

                <!-- <div class="items-center mb-4">
                    <button type="submit"
                        class="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Book
                        Now</button>
                </div>

                <div>
                    <p>By submitting this form, I agree that the <b><a href="https://lulaloop.co.za/terms-of-use">Terms
                                of
                                Use</a></b> & <b><a href="https://lulaloop.co.za/privacy-policy">Privacy Policy</a></b>
                        will govern the
                        use of the services I receive and personal data I provide.</p>
                </div> -->
            </form>
        </div>
      </div>
    </div>

    <!-- <Modal v-show="isModalVisible" @close="closeModal">
        <div class="flex flex-col sm:flex-row gap-10 m-4 mt-8 px-2 max-h-[500px] sm:max-h-[680px] overflow-y-auto">
            <div class="text-center sm:col-span-2 lg:col-span-3 flex flex-col justify-center items-center mb-5">
                <img src="@/assets/logo.svg" alt="Charter" class="w-20 h-20 inline-block mb-4" />
                <h2 class="text-2xl font-semibold text-gray-900 mb-4 w-[80%]">
                    Enjoy peace of mind by booking a LULA to your next event
                </h2>
                <p class="mb-4 w-[85%]">
                    Business or Leisure. Small parties, large events, we’ve got you covered.
                    Sit back and relax, whilst we get you where you need to be.
                </p>
                <b class="text-lg">Move the people. Move the world.</b>
            </div>
            <form class="sm:col-span-2 lg:col-span-3">
                <div class="space-y-12 mb-6">
                    <div class="grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-6">

                        <div class="sm:col-span-3">
                            <label for="first-name">First Name</label>
                            <input id="first-name" type="text" name="first-name" placeholder="First Name"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="last-name">Last Name</label>
                            <input id="last-name" type="text" name="last-name" placeholder="Last Name"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="email-address">Email Address</label>
                            <input id="email-address" type="email" name="email-address" placeholder="Email Address"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="contact-number">Contact Number</label>
                            <input id="contact-number" type="tel" name="contact-number" placeholder="Contact Number"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="pick-up-address">Pickup Location</label>
                            <AddressInput id="pick-up-address" @addressSelect="getPickUpAddress"
                                :mapboxOptions="mapboxOptions">
                            </AddressInput>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="drop-off-address">Drop off Location</label>
                            <AddressInput id="drop-off-address" @addressSelect="getDropOffAddress"
                                :mapboxOptions="mapboxOptions">
                            </AddressInput>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="passengers">Passengers</label>
                            <input id="passengers" type="number" name="passengers" placeholder="No. of Passengers"
                                class="block w-full mt-1 rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="vehicle">Vehicle</label>
                            <select id="vehicle" name="vehicle"
                                class="mt-1 block w-full rounded-md border border-gray-300 py-1.5 pl-3 pr-10 text-gray-900">
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Van">Van</option>
                                <option value="Bus">Bus</option>
                            </select>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="date">Date</label>
                            <input id="date" type="date" name="date"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>

                        <div class="sm:col-span-3">
                            <label for="time">Time</label>
                            <input id="time" type="time" name="time"
                                class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                        </div>
                    </div>

                </div>

                <div class="grid grid-cols-2 gap-6 place-content-between mb-4">
                    <b>Trip Fair:</b>
                    <span class="text-green-600 font-semibold">R 0.00</span>
                </div>

                <div class="items-center mb-4">
                    <button type="submit"
                        class="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Book
                        Now</button>
                </div>

                <div>
                    <p>By submitting this form, I agree that the <b><a href="https://lulaloop.co.za/terms-of-use">Terms
                                of
                                Use</a></b> & <b><a href="https://lulaloop.co.za/privacy-policy">Privacy Policy</a></b>
                        will govern the
                        use of the services I receive and personal data I provide.</p>
                </div>
            </form>
        </div>
    </Modal> -->
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import { ref } from 'vue';
import AddressInput from '@/components/AddressInput.vue';
import {  reactive } from "vue";
import MyIcon from "@/assets/logo.svg";

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const contact_number = ref('');
const passengers = ref('');
const vehicle = ref('');
const date = ref('');
const time = ref('');

const pickUpAddress = reactive({})
const dropOffAddress = reactive({})

// mapbox options as per https://docs.mapbox.com/api/search/geocoding
const mapboxOptions = reactive({
    access_token: 'pk.eyJ1IjoiYWRtaW4tbHVsYSIsImEiOiJjam9qMHprcmQwMGJnM3B2dzM3aTdsOTVqIn0.XG3rh74zk4imGp2sSvkxFQ',
    limit: 10,
    language: 'en'
})

function getPickUpAddress(address) {
    Object.assign(pickUpAddress, address)
}
function getDropOffAddress(address) {
    Object.assign(dropOffAddress, address)
}

const handleSubmit = () => {
    // Add form submission logic here
    console.log({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        contact_number: contact_number.value,
        passengers: passengers.value,
        vehicle: vehicle.value,
        date: date.value,
        time: time.value,
    });

};
const isModalVisible = ref(false);
function openModal() {
    isModalVisible.value = true;
}
function closeModal() {
    isModalVisible.value = false;
}


</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.dropdown-menu {
    position: absolute;
    z-index: 1000;
    display: none;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 0.375rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 5px;
    padding: 0;
}

.dropdown-menu.show {
    display: block;
}

.dropdown-item {
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    display: block;
    text-decoration: none;
    color: #333;
}

.dropdown-item:hover {
    background-color: #f8f9fa;
}

.dropdown-item span.text-primary {
    color: #007bff;
}

</style>
