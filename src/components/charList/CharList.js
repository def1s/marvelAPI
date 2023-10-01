import './charList.scss';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
    const {getAllCharacters, loading, error} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);


    const onCharsLoaded = (newChars) => {
        setChars(chars => [...chars, ...newChars]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
       
        getAllCharacters(offset).then(res => {onCharsLoaded(res)});
    }

    const charsOnPage = chars.map(({name, thumbnail, id}) => {
        let imgStyle = {'objectFit': 'cover'};
        // if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        //     imgStyle = {'objectFit': 'contain'};
        // }
        return (
                <li className="char__item" key={id} onClick={() => props.onClickChar(id)}>
                    <img src={thumbnail} alt="abyss" style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
                );
    })

    const isLoading = loading && !newItemLoading ? <Spinner/> : null;
    const isError = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {isLoading}
            {isError}
            <ul className="char__grid">
                {charsOnPage}
            </ul>
            <button className="button button__main button__long"
                    disabled={newItemLoading} 
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default CharList;