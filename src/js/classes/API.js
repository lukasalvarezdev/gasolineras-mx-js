class API {
	async getData() {
		const data = await fetch('https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=500');
		const dataJSON = await data.json();

		return {
			dataJSON
		}
	}
}

export default API;