import React from 'react';
import { CellType } from './Constants';

const Cell = ({ type, text, onClick, revealed }) => {
  let cellClass = !revealed ? 'cell' : type === CellType.BOMB ? 'bomb' : type === CellType.NUMBER ? 'number' : 'cell';
  return (
    <td onClick={onClick} className={`${cellClass} ${revealed && 'revealed'}`}>
      {text && revealed ? text : null}
    </td>
  );
};

export default Cell;
