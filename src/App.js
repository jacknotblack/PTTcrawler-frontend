import React, { Component } from "react";
import Axios from "axios";

import GameList from "./components/game-list";
import "./App.scss";

import GameContext from "./context/games";

class App extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      installButton: false
    };
  }

  componentDidMount() {
    window.addEventListener("beforeinstallprompt", e => {
      // For older browsers
      e.preventDefault();
      this.installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if (
        (window.matchMedia &&
          window.matchMedia("(display-mode: standalone)").matches) ||
        window.navigator.standalone === true
      ) {
        return false;
      }
      // Set the state variable to make button visible
      this.setState({
        installButton: true
      });
    });
    Axios.get("https://hidden-lowlands-59931.herokuapp.com/games").then(res => {
      this.setState({
        games: res.data
      });
    });
  }

  installPrompt = null;

  installApp = async () => {
    this.setState({
      installButton: false
    });
    console.log(this.installPrompt);
    if (this.installPrompt === null) alert(1);
    if (!this.installPrompt) return false;
    this.installPrompt.prompt();
    let outcome = await this.installPrompt.userChoice;
    if (outcome.outcome === "accepted") {
      console.log("App Installed");
    } else {
      console.log("App not installed");
    }
    // Remove the event reference
    this.installPrompt = null;
    // Hide the button
    this.setState({
      installButton: false
    });
  };

  render() {
    const { games, installButton } = this.state;
    return (
      <div className="App">
        <GameContext.Provider value={games}>
            <GameList />
        </GameContext.Provider>
        {installButton && (
          <div className="install-btn" onClick={this.installApp}>
            <div className="overlay" />
            <button>安裝</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
