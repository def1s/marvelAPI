class MarvelService {

	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=8007a3e8652d9b3c3af3efb9b72f6bd0';

	getResource = async (url) => {
		let res = await fetch(url);
	
		if (!res.ok) {
			throw new Error('Could not fetch!');
		}
	
		return await res.json();
	}

	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
		return res.data.results.map(this._transformCharacter);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	}

	_transformCharacter = (char) => {
		if (char.description.length > 200) { //длинное решение, можно сделать просто slice(0, 200)
			const newCharDescr = char.description.split('').slice(0, 200).join('') + '...';
			char.description = newCharDescr;
		} else if (!char.description.length) {char.description = 'Not found'};

		

		return {
			name: char.name,
			description: char.description,
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items.slice(0, 9)
		}
	}
}

export default MarvelService;

// async function postData(url, data) {
// 	const res = await fetch(url, {
// 		method: 'POST',
// 		headers: {
// 			'Content-type': 'application/json'
// 		},
// 		body: data
// 	});
// 	return await res.json();
// }