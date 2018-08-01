import React, { Component } from 'react';
import Cell from './Cell';
import { CellType } from './Constants';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardLayout: getInitialState(props)
    };
  }

  render() {
    const { boardLayout } = this.state;
    const board = boardLayout.map(row => <tr className="row">{row.map(() => <td className="cell" />)}</tr>);
    return (
      <table>
        <tbody>{board}</tbody>
      </table>
    );
  }
}

const getRandomInt = max => Math.floor(Math.random() * max);
const isMineAtCoord = (boardLayout, { row, col }) => boardLayout[row][col] === CellType.BOMB;

const getInitialState = ({ height, width, mines }) => {
  const boardLayout = [];

  for (let i = 0; i < height; i++) {
    // create a row
    boardLayout.push(new Array(width).fill(null));
  }

  while (mines) {
    const row = getRandomInt(width);
    const col = getRandomInt(height);
    const coord = { row, col };

    if (!isMineAtCoord(boardLayout, coord)) {
      boardLayout[row][col] = CellType.BOMB;
      mines--;
    }
  }

  return boardLayout;
};

export default Board;
