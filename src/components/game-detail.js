import React, { PureComponent } from "react";
import Axios from "axios";

import GameContext from "../context/games";

class GameDetail extends PureComponent {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  /* eslint-disable */
  componentDidMount() {
    Axios.get(
      `https://hidden-lowlands-59931.herokuapp.com/game/${this.props.id}`
      // `https://hidden-lowlands-59931.herokuapp.com/game/11`
    ).then(res => {
      // Axios.get("localhost:3001/games").then(res => {
      this.setState({
        posts: res.data
      });
    });
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="game-detail">
        {posts.map(post => (
          <div className="post-container" key={post.id}>
            <div className="name">{post.title}</div>

            <div className="price">最低價：${post.price}</div>
          </div>
        ))}
      </div>
    );
  }
}
GameDetail.contextType = GameContext;

export default GameDetail;
