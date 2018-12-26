import React, { Component } from "react";
import { Router } from "@reach/router";
import Axios from "axios";

import GameList from "./components/game-list";
import GameDetail from "./components/game-detail";
import "./App.scss";

import GameContext from "./context/games";

class App extends Component {
  constructor() {
    super();
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    Axios.get("https://hidden-lowlands-59931.herokuapp.com/games").then(res => {
      this.setState({
        games: res.data
      });
    });
  }
  render() {
    const { games } = this.state;
    return (
      <div className="App">
        <GameContext.Provider value={this.state.games}>
          <Router>
            <GameList path="/" games={games} />
            <GameDetail path="/game/:id" games={games} />
          </Router>
        </GameContext.Provider>
      </div>
    );
  }
}

export default App;
