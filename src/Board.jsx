import React, { Component } from 'react';
import Cell from './Cell';
import { CellType } from './Constants';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      boardLayout: getInitialState(props),
      revealed: []
    };
    this.bindEvents();
  }

  bindEvents() {
    this.onCellClick = this.onCellClick.bind(this);
  }

  componentDidUpdate() {
    const { gameOver } = this.state;
    if (gameOver) {
      setTimeout(() => alert('Game Over bub!'), 60);
    }
  }

  onCellClick({ row, col }) {
    const { boardLayout, gameOver } = this.state;

    if (gameOver) {
      return;
    }

    const { type } = boardLayout[row][col];

    if (type === CellType.BOMB) {
      this.revealCell({ row, col });
      this.setState(Object.assign({}, this.state, { gameOver: true }));

      return;
    }

    this.cascadeReveal([{ row, col }]);
  }

  revealCell({ row, col }) {
    const { boardLayout } = this.state;
    boardLayout[row][col].revealed = true;
    this.setState(
      Object.assign({}, this.state, {
        boardLayout: boardLayout
      })
    );
  }

  getNeighbors({ row, col }) {
    const top = { row: row - 1, col: col };
    const bottom = { row: row + 1, col: col };
    const left = { row: row, col: col - 1 };
    const right = { row: row, col: col + 1 };

    return [top, bottom, left, right];
  }

  cascadeReveal(coords) {
    const { boardLayout } = this.state;
    coords.forEach(({ row, col }) => {
      const r = boardLayout[row];
      const cell = r && r[col];
      if (cell && !cell.revealed) {
        this.revealCell({ row, col });
        if (cell.type === CellType.EMPTY) {
          // cascade on neighbours
          const neighbours = this.getNeighbors({ row, col });
          this.cascadeReveal(neighbours);
        }
      }
    });
  }

  render() {
    const { boardLayout } = this.state;
    const board = boardLayout.map((row, i) => (
      <tr className="row">
        {row.map((_, j) => {
          const coord = { row: i, col: j };
          const cellProps = boardLayout[i][j];
          return (
            <Cell
              type={cellProps.type}
              onClick={() => this.onCellClick(coord)}
              text={cellProps.count}
              revealed={cellProps.revealed}
            />
          );
        })}
      </tr>
    ));
    return (
      <table>
        <tbody>{board}</tbody>
      </table>
    );
  }
}

const getRandomInt = max => Math.floor(Math.random() * max);
const isMineAtCoord = (boardLayout, { row, col }) => boardLayout[row][col] === CellType.BOMB;

const getSurroundingBombs = (boardLayout, row, col) => {
  let count = 0;

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      const row = boardLayout[i];
      const cell = row && row[j];
      if (cell && cell.type === CellType.BOMB) {
        count++;
      }
    }
  }

  return count;
};
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
      boardLayout[row][col] = {
        type: CellType.BOMB,
        revealed: false,
        count: 0
      };
      mines--;
    }
  }

  for (let i = 0; i < boardLayout.length; i++) {
    for (let j = 0; j < width; j++) {
      const cell = boardLayout[i][j];
      if (!cell) {
        const number = getSurroundingBombs(boardLayout, i, j);
        boardLayout[i][j] = {
          revealed: false,
          type: number ? CellType.NUMBER : CellType.EMPTY,
          count: number
        };
      }
    }
  }

  return boardLayout;
};

export default Board;
