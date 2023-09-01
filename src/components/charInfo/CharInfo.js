import './charInfo.scss';

import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {

    marvelService = new MarvelService();

    state = {
        char: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) { //предыдущие пропсы, предыдущее состояние
        if (this.props.currentChar !== prevProps.currentChar) { //сравниваем, чтобы обновлять карточку только если новый персонаж
            this.updateChar(); //если этого не сделать, то можно войти в бесконечный цикл
        }
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false, error: false});
    }

    onCharLoading = () => {
        this.setState({loading: true});
    }

    updateChar = () => {
        const {currentChar} = this.props;

        if (!currentChar) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(currentChar)
            .then(res => {
                this.onCharLoaded(res);
            })
            .catch(this.onError);
    }

    render() {
        const {loading, error, char} = this.state;

        const skeleton = loading || error || char ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || spinner || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit': 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length >= 0 ? null : 'No one comics was be find'
                }

                {
                    comics.map((item, i) => {
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        );
                    })
                }
                <li className="char__comics-item">
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
            </ul>
        </>
    );
}

export default CharInfo;