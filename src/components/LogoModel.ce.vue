<template>
    <button type="button" class="w-20 h-20 rounded-full border-gray-300 border m-2 flex items-center justify-center"
        @click="openModal">
        <MyIcon class="w-20 h-20 p-2 inline-block"/>
    </button>

    <div class="fixed inset-0 p-6 flex items-center justify-center z-50" v-show="isModalVisible">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="bg-white rounded-lg shadow-xl z-10 relative w-[80%] pt-4">
            <button @click="closeModal"
                class="absolute top-2 right-2 text-black hover:bg-gray-400 w-10 h-10 hover:text-white rounded-full p-2 transition duration-300">
                ✕
            </button>

            <div v-if="!isSubmitted" class="flex flex-col sm:flex-row gap-10 m-4 mt-8 pb-5 px-2 max-h-[500px] sm:max-h-[680px] overflow-y-auto">
                <div class="sm:col-span-2 lg:col-span-3 flex flex-col justify-start items-start mb-5">
                    <MyIcon class="w-36 h-36 inline-block" />
                    <h2 class="text-5xl font-semibold text-gray-900 mb-8 w-[90%]">
                        Enjoy peace of mind by booking a LULA to your next event
                    </h2>
                    <p class="mb-8 w-[90%]">
                        Business or Leisure. Small parties, large events, we’ve got you covered.
                        Sit back and relax, whilst we get you where you need to be.
                    </p>
                    <b class="text-lg">Move the people. Move the world.</b>
                </div>

                <form @submit.prevent="handleSubmit" class="sm:col-span-2 lg:col-span-3">
                    <div class="space-y-12 mb-6">
                        <div class="grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <input id="first-name" type="text" v-model="firstName" placeholder="First Name"
                                    class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                            </div>

                            <div class="sm:col-span-3">
                                <input id="last-name" type="text" v-model="lastName" placeholder="Last Name"
                                    class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                            </div>

                            <div class="sm:col-span-3">
                                <input id="email-address" type="email" v-model="email" placeholder="Email Address"
                                    class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                            </div>

                            <div class="sm:col-span-3">
                                <input id="contact-number" type="tel" v-model="contact_number" placeholder="Contact Number"
                                    class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                            </div>

                            <div class="sm:col-span-3">
                                <AddressInput id="pick-up-address" @addressSelect="getPickUpAddress"
                                    :mapboxOptions="mapboxOptions" label="Enter your pickup location">
                                </AddressInput>
                            </div>

                            <div class="sm:col-span-3">
                                <AddressInput id="drop-off-address" @addressSelect="getDropOffAddress"
                                    :mapboxOptions="mapboxOptions" label="Enter your destination">
                                </AddressInput>
                            </div>

                            <div class="sm:col-span-3">
                                <input id="passengers" type="number" v-model="passengers" placeholder="No. of Passengers"
                                    class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                            </div>

                            <div class="sm:col-span-3">
                                <select id="vehicle" v-model="vehicle"
                                    class="mt-1 block w-full rounded-md border border-gray-300 py-1.5 pl-3 pr-10 text-gray-900">
                                    <option value="" disabled selected>Please select a vehicle</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Van">Van</option>
                                    <option value="Bus">Bus</option>
                                </select>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="date">Date</label>
                                <input id="date" type="date" v-model="date"
                                    class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                            </div>

                            <div class="sm:col-span-3">
                                <label for="time">Time</label>
                                <input id="time" type="time" v-model="time"
                                    class="block w-full rounded-md border border-gray-300 py-1.5 px-3 mt-1" />
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-10 place-content-between mb-4">
                        <b>Trip Fair:</b>
                        <span class="text-green-600 font-semibold text-right">R 0.00</span>
                    </div>

                    <div class="items-center mb-4">
                        <button type="submit"
                            class="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                            Book Now
                        </button>
                    </div>

                    <div>
                        <p>By submitting this form, I agree that the <b><a href="https://lulaloop.co.za/terms-of-use">Terms of Use</a></b> & 
                        <b><a href="https://lulaloop.co.za/privacy-policy">Privacy Policy</a></b> will govern the use of the services I receive and personal data I provide.</p>
                    </div>
                </form>
            </div>

            <!-- Success Message -->
            <div v-else class="flex flex-col items-center justify-center p-10">
                <SuccussIcon class="w-36 h-36 mb-6"/>
                <h2 class="text-3xl font-semibold text-gray-900">Booking Successful!</h2>
                <p class="text-lg text-gray-600 mt-4 text-center">
                    Thank you for booking with us. You will receive a confirmation email shortly.
                </p>
                <button @click="closeModal"
                    class="mt-6 px-6 py-2 bg-green-600 text-white rounded-md text-lg shadow-md hover:bg-green-500">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import AddressInput from '@/components/AddressInput.vue';
import MyIcon from "@/assets/logo.svg";
import SuccussIcon from "@/assets/success.svg";

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const contact_number = ref('');
const passengers = ref('');
const vehicle = ref('');
const date = ref('');
const time = ref('');
const isSubmitted = ref(false);

const pickUpAddress = reactive({});
const dropOffAddress = reactive({});

const mapboxOptions = reactive({
    access_token: 'pk.eyJ1IjoiYWRtaW4tbHVsYSIsImEiOiJjam9qMHprcmQwMGJnM3B2dzM3aTdsOTVqIn0.XG3rh74zk4imGp2sSvkxFQ',
    limit: 10,
    language: 'en'
});

function getPickUpAddress(address) {
    Object.assign(pickUpAddress, address);
}
function getDropOffAddress(address) {
    Object.assign(dropOffAddress, address);
}

function handleSubmit() {
    isSubmitted.value = true;
}

const isModalVisible = ref(false);
function openModal() {
    isModalVisible.value = true;
    isSubmitted.value = false;
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