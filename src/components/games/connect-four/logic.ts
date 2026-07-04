export type Cell = 0 | 1 | 2; // 0 empty, 1 red, 2 yellow
export type Board = Cell[][]; // rows[6] x cols[7]

export const ROWS = 6;
export const COLS = 7;

export function createBoard(): Board {
  return Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(0));
}

export function dropDisc(board: Board, col: number, player: 1 | 2): { board: Board; row: number } | null {
  if (col < 0 || col >= COLS) return null;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === 0) {
      const next = board.map((row) => row.slice()) as Board;
      next[r][col] = player;
      return { board: next, row: r };
    }
  }
  return null;
}

export function checkWin(board: Board, player: 1 | 2): Array<[number, number]> | null {
  const dirs: Array<[number, number]> = [
    [0, 1], [1, 0], [1, 1], [1, -1],
  ];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== player) continue;
      for (const [dr, dc] of dirs) {
        const cells: Array<[number, number]> = [[r, c]];
        for (let k = 1; k < 4; k++) {
          const nr = r + dr * k;
          const nc = c + dc * k;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) break;
          if (board[nr][nc] !== player) break;
          cells.push([nr, nc]);
        }
        if (cells.length === 4) return cells;
      }
    }
  }
  return null;
}

export function isDraw(board: Board): boolean {
  return board[0].every((c) => c !== 0);
}