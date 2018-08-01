import React from 'react';
import { CellType } from './Constants';

const Cell = ({ type, numOfNeighbors }) => {
  let cellClass = Number.isInteger(numOfNeighbors)
    ? 'number'
    : type === CellType.BOMB
      ? 'bomb'
      : type === CellType.FLAG
        ? 'flag'
        : 'empty'; // default is an empty cell

  return <div className={cellClass}>numOfNeighbors</div>;
};
