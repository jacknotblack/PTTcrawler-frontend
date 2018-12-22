import React, { Component } from "react";
import { Router } from "@reach/router";

import GameList from "./components/game-list";
// import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <GameList path="/" />
          {/* <GameDetail path="/game/:id" /> */}
        </Router>
      </div>
    );
  }
}

export default App;
