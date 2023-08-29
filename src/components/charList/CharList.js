import './charList.scss';

import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateAllChar();
    }

    state = {
        loading: true,
        chars: [],
        error: false
    }

    onCharsLoaded = (chars) => {
        this.setState({chars, loading: false});
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateAllChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(res => {this.onCharsLoaded(res)})
            .catch(this.onError);
    }

    render() {
        const {chars, loading, error} = this.state;
        const charsOnPage = chars.map(({name, thumbnail}) => {
            return (
                     <li className="char__item">
                        <img src={thumbnail} alt="abyss"/>
                         <div className="char__name">{name}</div>
                    </li>
                    );
        })

        const isLoading = loading ? <Spinner/> : null;
        const isError = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? charsOnPage : null;
        // const content = !isLoading ? <View charsOnPage={charsOnPage}/> : null;

        return (
            <div className="char__list">
                {isLoading}
                {isError}
                <ul className="char__grid">
                    {content}
                </ul>
                {/* <ul className="char__grid">
                    <li className="char__item">
                        <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li>;
                </ul> */}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;