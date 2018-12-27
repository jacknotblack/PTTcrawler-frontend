import React, { PureComponent } from "react";
// import Axios from "axios";
import GameContext from "../context/games";
import GameDetail from "./game-detail";

// import "./game-list.scss";

// export const GameContext = React.createContext();

class GameList extends PureComponent {
  state = {
    expandedGame: null,
    expandedGameIndex: null
  };

  toggleGame = (gameID, index) => {
    this.setState({
      expandedGame: gameID === this.state.expandedGame ? null : gameID,
      expandedGameIndex: gameID === this.state.expandedGame ? null : index
    });
    document
      .querySelectorAll(".game")
      [index].scrollIntoView({ behavior: "smooth", block: "start" });
  };

  render() {
    const games = this.context;
    const { expandedGame } = this.state;

    return (
      <div className="game-list" 
    //   style={
    //     {
    //     position: expandedGame!==null?'fixed':''
    //   }
    // }
    >
        {games.map((game, index) => (
          <GameDetail
            key={game.id}
            game={game}
            toggleGame={this.toggleGame}
            index={index}
            expanded={expandedGame === game.id}
          />
        ))}
      </div>
    );
  }
}
GameList.contextType = GameContext;

export default GameList;
