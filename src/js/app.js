import Interface from './classes/Interface.js';
import API from './classes/API.js';

export const ui = new Interface(),
  api = new API();

document.addEventListener('DOMContentLoaded', () => {
    ui.showEstablishments();
});

// Search for establishments
const searchInput = document.querySelector('#search-form input');

searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 5) {
        // Send Search
        ui.getSuggestions(searchInput.value);
    } else {
        ui.showEstablishments();
    }
});