import React from 'react';
import { CellType } from './Constants';

const Cell = ({ type, text, onClick }) => {
  let cellClass =
    type === CellType.NUMBER ? 'number' : type === CellType.BOMB ? 'bomb' : type === CellType.FLAG ? 'flag' : 'cell'; // default is an empty cell

  return (
    <td onClick={onClick} className={cellClass}>
      {text}
    </td>
  );
};

export default Cell;
