import React, { PureComponent } from "react";
import Axios from "axios";

import "./game-list.scss";

class GameList extends PureComponent {
  constructor() {
    super();
    this.state = {
      games: []
    };
  }
  componentDidMount() {
    Axios.get("https://hidden-lowlands-59931.herokuapp.com/games").then(res => {
      console.log(res.data);
      this.setState({
        games: res.data
      });
    });
  }

  render() {
    const { games } = this.state;
    return (
      <div className="game-list">
        {games.map(game => (
          <div className="game-container" key={game.id}>
            <img src={game.img} alt="" />
            <div className="info">
              <div>{game.name}</div>
              <div>最低價：${game.lowest_price}</div>
              <a href={game.lp_link}>link</a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default GameList;
