import './charList.scss';

import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
    const marvelService = new MarvelService();

    useEffect(() => {
        updateAllChar();
    }, []);

    const [loading, setLoading] = useState(true);
    const [chars, setChars] = useState([]);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const onCharLoading = () => {
        setNewItemLoading(true);
    }

    const onCharsLoaded = (newChars) => {
        setChars(chars => [...chars, ...newChars]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
    }


    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateAllChar = () => {
        onRequest();
    }

    const onRequest = (offset) => {
        onCharLoading();
        marvelService
            .getAllCharacters(offset)
            .then(res => {onCharsLoaded(res)})
            .catch(onError);
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

    const isLoading = loading ? <Spinner/> : null;
    const isError = error ? <ErrorMessage/> : null;
    const content = !(loading || error) ? charsOnPage : null;

    return (
        <div className="char__list">
            {isLoading}
            {isError}
            <ul className="char__grid">
                {content}
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