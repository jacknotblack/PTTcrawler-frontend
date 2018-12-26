import React, { PureComponent } from "react";
// import Axios from "axios";
import { Link } from "@reach/router";
import GameContext from "../context/games";

import "./game-list.scss";

// export const GameContext = React.createContext();

class GameList extends PureComponent {
  render() {
    const games = this.context;

    return (
      <div className="game-list">
        {games.map(game => (
          <Link key={game.id} to={`game/${game.id}`}>
            <div className="game-container">
              <img src={game.img} alt="" />
              <div className="info">
                <div className="name">{game.name}</div>
                <div className="price">最低價：${game.lowest_price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}
GameList.contextType = GameContext;

export default GameList;
