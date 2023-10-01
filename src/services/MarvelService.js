import {useHttp} from '../hooks/http.hook';


const useMarvelService = () => {
	const {loading, request, error, clearError} = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=8007a3e8652d9b3c3af3efb9b72f6bd0';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	}

	const _transformCharacter = (char) => {
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

	return {getAllCharacters, getCharacter, loading, error, clearError};
}

export default useMarvelService;

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