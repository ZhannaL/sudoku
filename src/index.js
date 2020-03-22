const canPutToGrid = (matr, indI, indJ, num) => {
  const row = Math.floor(indI / 3) * 3;
  const column = Math.floor(indJ / 3) * 3;
  for (let i = row; i < row + 3; i += 1) {
    for (let j = column; j < column + 3; j += 1) {
      if (matr[i][j] === num) return false;
    }
  }
  return true;
};
const canPutToRow = (matr, i, num) => {
  return !matr[i].includes(num);
};
const canPutToColumn = (matr, j, num) => {
  return !matr.find(el => el[j] === num);
};

const findZeroIndex = matr => {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (matr[i][j] === 0) return [i, j];
    }
  }
  return false;
};

const canAddNum = (matr, i, j, num) => {
  if (
    canPutToGrid(matr, i, j, num) &&
    canPutToRow(matr, i, num) &&
    canPutToColumn(matr, j, num)
  ) {
    return true;
  }
  return false;
};

const addToStack = (matr, stack) => {
  const [i, j] = findZeroIndex(matr);
  for (let k = 1; k <= 9; k += 1) {
    if (canAddNum(matr, i, j, k)) {
      stack.push({ i, j, value: k });
      matr[i][j] = k;
      return true;
    }
  }
  return false;
};

const stepBackStack = (matr, stack) => {
  const last = stack[stack.length - 1];
  for (let k = last.value + 1; k <= 9; k += 1) {
    if (canAddNum(matr, last.i, last.j, k)) {
      stack[stack.length - 1].value = k;
      matr[last.i][last.j] = k;
      return true;
    }
  }
  stack.pop();
  matr[last.i][last.j] = 0;
  stepBackStack(matr, stack);
};

module.exports = function solveSudoku(matrix) {
  const stack = [];
  if (!findZeroIndex(matrix)) return matrix;

  while (findZeroIndex(matrix)) {
    if (!addToStack(matrix, stack)) {
      stepBackStack(matrix, stack);
    }
  }

  return matrix;
};
