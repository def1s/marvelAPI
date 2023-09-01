import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import { Component } from "react";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        currentChar: null
    }

    onClickChar = (id) => {
        this.setState({currentChar: id})
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onClickChar={this.onClickChar}/>
                        <CharInfo currentChar={this.state.currentChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;