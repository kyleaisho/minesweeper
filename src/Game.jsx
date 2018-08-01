import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 8,
      width: 8,
      mines: 10
    };
  }

  getBoardProps() {
    return Object.assign({}, this.state);
  }

  render() {
    return (
      <div className="game">
        <Board {...this.getBoardProps()} />
      </div>
    );
  }
}

export default Game;
