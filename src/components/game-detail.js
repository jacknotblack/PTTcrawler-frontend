import React, { PureComponent } from "react";
import Axios from "axios";
import posed, { PoseGroup } from "react-pose";

import GameContext from "../context/games";

import "./game-detail.scss";

const PostList = posed.div({
  enter: {
    maxHeight: 'calc(100vh - 161px)',
    height: 'auto',
    transition: {
      duration: 500
    }
  },
  exit: {
    height: '0px',
    transition: {
        duration: 500
    }
  }
});

class GameDetail extends PureComponent {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  clickHandler = () => {
    const { game, index, toggleGame, expanded } = this.props;
    const { posts } = this.state;
    if (!expanded) {
      Axios.get(
        `https://hidden-lowlands-59931.herokuapp.com/game/${game.id}`
        // `https://hidden-lowlands-59931.herokuapp.com/game/11`
      ).then(res => {
        // Axios.get("localhost:3001/games").then(res => {
        this.setState({
          posts: res.data
        });
      });
    }
    toggleGame(game.id, index);
  };

  render() {
    const { posts } = this.state;
    const { game, expanded } = this.props;
    return (
      <div className="game">
        <div className="game-detail" onClick={this.clickHandler}>
          <img src={game.img} alt="" />
          <div className="info">
            <div className="name">{game.name}</div>
            <div className="price">最低價：${game.lowest_price}</div>
          </div>
        </div>
        <PoseGroup>
          {expanded && posts.length > 0 && (
            <PostList key="post">
              <div className="posts">
                {posts.map(post => (
                  <div className="post-container" key={post.id}>
                    <a href={post.link} className="name">
                      {post.title}
                    </a>

                    <div className="price">${post.price}</div>
                  </div>
                ))}
              </div>
            </PostList>
          )}
        </PoseGroup>
      </div>
    );
  }
}
GameDetail.contextType = GameContext;

export default GameDetail;
