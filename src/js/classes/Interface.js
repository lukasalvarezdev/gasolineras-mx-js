import { api } from '../app.js';

class Interface {
	constructor() {
		// Create markers with layerGroup
		this.markers = L.layerGroup();
		// Start the map
		this.map = this.startMap();
	}

	startMap() {
		// Inicializar y obtener la propiedad del mapa
		const map = L.map('map').setView([19.432608, -99.133209], 4);
		const mapUrl = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
		L.tileLayer(
			'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; ' + mapUrl + ' Contributors',
			maxZoom: 18,
			}).addTo(map);
		return map;
	}

	async showEstablishments() {
		const data = await api.getData();
		const dataJSON = await data.dataJSON;

		this.showPins(dataJSON.results);
	}

	showPins(data) {
		// Limpiar los markers
		this.markers.clearLayers();

		// Recorrer los establecimientos
		data.forEach( dato => {
			this.createPopup(dato);
		});
		this.markers.addTo(this.map);
	}

	createPopup(dato) {
		const { calle, regular, premium } = dato;

		const popupOptions = L.popup()
		.setContent(`
			<p><b>Calle:</b> ${calle} </p>
			<p><b>Regular:</b> $ ${regular} </p>
			<p><b>Premium:</b> $ ${premium} </p>
		`);
		this.createMarker(popupOptions, dato);
	}
    
	createMarker(options, dato) {
		const { latitude, longitude } = dato;

		const marker = L.marker([
			parseFloat(latitude),
			parseFloat(longitude)
		]).bindPopup(options);

		this.markers.addLayer(marker);
	}

	async getSuggestions(search) {
		const data = await api.getData();
		const dataJSON = await data.dataJSON;

		// Send JSON and search to filter
		this.filterSuggestions(dataJSON.results, search);
	}

	filterSuggestions(result, search) {
		// Clean markers
		this.markers.clearLayers();

		// Filter results
		const filters = result.filter(filter => filter.calle.indexOf(search) !== -1 );

		// Show pins
		filters.forEach( filter => {
			this.createPopup(filter);
		});

		this.markers.addTo(this.mapa);
	}
}

export default Interface;