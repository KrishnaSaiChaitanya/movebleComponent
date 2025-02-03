<template>
    <input type="text" class="form-control rounded-md border border-gray-300 py-1.5 px-3 mt-1 block w-full" v-model="searchText"
        @input="searchAddress" />
    <ul ref="dropdownMenu" class="dropdown-menu">
        <li v-for="suggestion in suggestions">
            <a class="dropdown-item" href="#" @click="selectAddress(suggestion)">
                {{ formatLabel(suggestion.label, 'start') }}<span
                    class="text-primary">{{ formatLabel(suggestion.label, 'middle') }}</span>{{ formatLabel(suggestion.label,
                'end')}}
            </a>
        </li>
    </ul>
</template>

<script setup>
import { reactive, ref } from 'vue'
// mapbox options as per https://docs.mapbox.com/api/search/geocoding/
const mapboxOptions = {
    api: 'https://api.mapbox.com/geocoding/v5/',
    endpoint: 'mapbox.places',
    access_token: '',
    limit: 5,
    types: 'address',
    proximity: 'ip',
    autocomplete: true,
    fuzzyMatch: true,
    language: 'en',
    country: 'ZA'
}
const dropdownMenu = ref()
const searchText = ref('')
const suggestions = reactive([])

const emit = defineEmits(['addressSelect'])
const props = defineProps({
    mapboxOptions: Object
})
Object.assign(mapboxOptions, props.mapboxOptions)


function formatLabel(label, part) {
    let index = label.toLowerCase().indexOf(searchText.value.toLowerCase())
    if (index >= 0) {
        let text = ''
        switch (part) {
            case 'start':
                text = label.substring(0, index)
                break
            case 'middle':
                text = label.substring(index, index + searchText.value.length)
                break
            case 'end':
                text = label.substring(index + searchText.value.length)
                break
        }
        // console.log(Found ${searchtext.value} in ${label} at pos ${index} and ${part} part is ${text});
        return text
    } else if (part === 'start') {
        return label
    } else {
        return ''
    }
}

async function searchAddress() {
    if (searchText.value.length >= 2) {
        suggestions.length = 0
        Object.assign(suggestions, await geoCode(searchText.value))
        dropdownMenu.value.classList.add('show')
    } else {
        dropdownMenu.value.classList.remove('show')
    }
}

function selectAddress(address) {
    // hide dropdown menu
    dropdownMenu.value.classList.remove('show')
    // update the value of the input field to what was selected
    searchText.value = address.label
    console.log(address)
    // send address to parent component
    emit('addressSelect', address)
}

async function geoCode(street) {
    if (street.length >= 2) {
        let searchText = encodeURIComponent(street)
        let { api, endpoint, ...query } = mapboxOptions
        let queryString = new URLSearchParams(query).toString()
        let request = new Request(`${api + endpoint}/${searchText}.json?${queryString}`)
        let response = await fetch(request)
        let data = await response.json()
        if (data.features) {
            return data.features.map(address => {
                let label = address.place_name
                let location = label.split(', ')[1]
                return {
                    label: label,
                    street: label.split(', ')[0],
                    postcode: location.slice(0, location.indexOf(' ')),
                    city: location.slice(1 + location.indexOf(' ')),
                    state: address.context.at(-2).text,
                    country: address.context.at(-1).text
                }
            })
        } else {
            console.log(data.message)
        }
    }
}


</script>

