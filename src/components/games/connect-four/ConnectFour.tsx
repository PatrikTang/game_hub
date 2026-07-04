import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Board,
  COLS,
  ROWS,
  checkWin,
  createBoard,
  dropDisc,
  isDraw,
} from "./logic";

type Player = 1 | 2;

type Status =
  | { kind: "playing" }
  | { kind: "win"; player: Player; line: Array<[number, number]> }
  | { kind: "draw" };

const PLAYER_META: Record<Player, { name: string; color: string; ring: string; glow: string }> = {
  1: {
    name: "Red",
    color: "var(--player-red)",
    ring: "ring-[oklch(0.66_0.23_27_/_0.6)]",
    glow: "shadow-[0_0_30px_oklch(0.66_0.23_27_/_0.7)]",
  },
  2: {
    name: "Yellow",
    color: "var(--player-yellow)",
    ring: "ring-[oklch(0.84_0.18_88_/_0.6)]",
    glow: "shadow-[0_0_30px_oklch(0.84_0.18_88_/_0.7)]",
  },
};

export function ConnectFour() {
  const [board, setBoard] = useState<Board>(() => createBoard());
  const [current, setCurrent] = useState<Player>(1);
  const [status, setStatus] = useState<Status>({ kind: "playing" });
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [lastDrop, setLastDrop] = useState<{ row: number; col: number; player: Player } | null>(null);
  const [scores, setScores] = useState({ 1: 0, 2: 0, draws: 0 });

  const winSet = useMemo(() => {
    if (status.kind !== "win") return new Set<string>();
    return new Set(status.line.map(([r, c]) => `${r}-${c}`));
  }, [status]);

  function handleDrop(col: number) {
    if (status.kind !== "playing") return;
    const result = dropDisc(board, col, current);
    if (!result) return;
    setBoard(result.board);
    setLastDrop({ row: result.row, col, player: current });
    const line = checkWin(result.board, current);
    if (line) {
      setStatus({ kind: "win", player: current, line });
      setScores((s) => ({ ...s, [current]: s[current] + 1 }));
      return;
    }
    if (isDraw(result.board)) {
      setStatus({ kind: "draw" });
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
      return;
    }
    setCurrent(current === 1 ? 2 : 1);
  }

  function reset(keepScores = true) {
    setBoard(createBoard());
    setStatus({ kind: "playing" });
    setCurrent(1);
    setLastDrop(null);
    setHoverCol(null);
    if (!keepScores) setScores({ 1: 0, 2: 0, draws: 0 });
  }

  const turnMeta = PLAYER_META[current];
  const disabled = status.kind !== "playing";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* HUD */}
      <div className="w-full max-w-[560px] grid grid-cols-3 gap-3">
        <PlayerCard player={1} active={current === 1 && !disabled} score={scores[1]} />
        <div className="flex flex-col items-center justify-center rounded-2xl bg-card/60 border border-border backdrop-blur-sm px-3 py-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Draws</span>
          <span className="text-2xl font-bold text-foreground tabular-nums">{scores.draws}</span>
        </div>
        <PlayerCard player={2} active={current === 2 && !disabled} score={scores[2]} />
      </div>

      {/* Status banner */}
      <div className="h-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {status.kind === "playing" && (
            <motion.div
              key={`turn-${current}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: turnMeta.color, boxShadow: `0 0 12px ${turnMeta.color}` }}
              />
              <span className="font-medium text-foreground">{turnMeta.name}</span> to play
            </motion.div>
          )}
          {status.kind === "win" && (
            <motion.div
              key="win"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-base font-semibold"
              style={{ color: PLAYER_META[status.player].color }}
            >
              {PLAYER_META[status.player].name} wins! 🎉
            </motion.div>
          )}
          {status.kind === "draw" && (
            <motion.div
              key="draw"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-base font-semibold text-muted-foreground"
            >
              It's a draw.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Board */}
      <div className="relative">
        {/* Outer frame */}
        <div
          className="relative rounded-3xl p-3 sm:p-4"
          style={{
            background:
              "linear-gradient(160deg, var(--board-blue) 0%, var(--board-blue-dark) 100%)",
            boxShadow:
              "0 25px 60px -20px oklch(0.10 0.10 260 / 0.8), inset 0 1px 0 oklch(1 0 0 / 0.08), 0 0 0 1px oklch(0.40 0.18 260 / 0.4)",
          }}
        >
          {/* Hover indicator above board */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-1 px-1 h-6 sm:h-8">
            {Array.from({ length: COLS }).map((_, c) => (
              <div key={c} className="flex items-end justify-center">
                <AnimatePresence>
                  {hoverCol === c && !disabled && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 0.9, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="w-5 h-5 sm:w-7 sm:h-7 rounded-full"
                      style={{
                        background: turnMeta.color,
                        boxShadow: `0 0 16px ${turnMeta.color}`,
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Cells */}
          <div
            className="relative grid grid-cols-7 gap-1.5 sm:gap-2 rounded-2xl p-1.5 sm:p-2"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.28 0.16 260) 0%, oklch(0.20 0.13 260) 100%)",
              boxShadow: "inset 0 2px 8px oklch(0 0 0 / 0.5)",
            }}
          >
            {Array.from({ length: ROWS * COLS }).map((_, idx) => {
              const r = Math.floor(idx / COLS);
              const c = idx % COLS;
              const cell = board[r][c];
              const isWin = winSet.has(`${r}-${c}`);
              const isLast = lastDrop?.row === r && lastDrop?.col === c;
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Column ${c + 1}, row ${r + 1}`}
                  onMouseEnter={() => setHoverCol(c)}
                  onMouseLeave={() => setHoverCol(null)}
                  onFocus={() => setHoverCol(c)}
                  onBlur={() => setHoverCol(null)}
                  onClick={() => handleDrop(c)}
                  disabled={disabled}
                  className="relative aspect-square w-10 sm:w-14 md:w-16 rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-transform active:scale-95"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, oklch(0.10 0.05 270) 0%, oklch(0.16 0.07 270) 70%, oklch(0.22 0.10 270) 100%)",
                    boxShadow:
                      "inset 0 4px 8px oklch(0 0 0 / 0.7), inset 0 -2px 4px oklch(1 0 0 / 0.05)",
                  }}
                >
                  <AnimatePresence>
                    {cell !== 0 && (
                      <motion.div
                        key={`${r}-${c}-${cell}`}
                        initial={
                          isLast
                            ? { y: `-${(r + 2) * 100}%`, scale: 1 }
                            : { y: 0, scale: 1 }
                        }
                        animate={{ y: 0, scale: 1 }}
                        transition={
                          isLast
                            ? { type: "spring", stiffness: 260, damping: 18, mass: 0.9 }
                            : { duration: 0 }
                        }
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, oklch(1 0 0 / 0.55), ${
                            cell === 1 ? "var(--player-red)" : "var(--player-yellow)"
                          } 55%, oklch(0.20 0.05 30 / 0.6) 100%)`,
                          boxShadow: isWin
                            ? `0 0 24px 4px ${
                                cell === 1 ? "var(--player-red)" : "var(--player-yellow)"
                              }, inset 0 -3px 8px oklch(0 0 0 / 0.4)`
                            : "inset 0 -3px 8px oklch(0 0 0 / 0.4), 0 2px 6px oklch(0 0 0 / 0.4)",
                        }}
                      >
                        {isWin && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.4, repeat: Infinity }}
                            style={{
                              boxShadow: `0 0 30px 8px ${
                                cell === 1 ? "var(--player-red)" : "var(--player-yellow)"
                              }`,
                            }}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Column indicator strip (bottom) */}
          <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2 px-1.5 sm:px-2">
            {Array.from({ length: COLS }).map((_, c) => (
              <div
                key={c}
                className="h-1 rounded-full transition-all"
                style={{
                  background:
                    hoverCol === c && !disabled
                      ? turnMeta.color
                      : "oklch(1 0 0 / 0.08)",
                  boxShadow:
                    hoverCol === c && !disabled
                      ? `0 0 12px ${turnMeta.color}`
                      : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => reset(true)}
          className="px-5 py-2.5 rounded-xl text-sm font-medium bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 transition active:scale-95"
        >
          New round
        </button>
        <button
          onClick={() => reset(false)}
          className="px-5 py-2.5 rounded-xl text-sm font-medium bg-card text-muted-foreground border border-border hover:text-foreground transition active:scale-95"
        >
          Reset scores
        </button>
      </div>
    </div>
  );
}

function PlayerCard({
  player,
  active,
  score,
}: {
  player: Player;
  active: boolean;
  score: number;
}) {
  const meta = PLAYER_META[player];
  return (
    <motion.div
      animate={{
        scale: active ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative rounded-2xl px-3 py-2 border backdrop-blur-sm overflow-hidden ${
        active ? "border-transparent" : "border-border bg-card/50"
      }`}
      style={
        active
          ? {
              background: `linear-gradient(135deg, ${meta.color} -30%, oklch(0.22 0.05 270) 70%)`,
              boxShadow: `0 0 24px -4px ${meta.color}`,
            }
          : undefined
      }
    >
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-full shrink-0"
          style={{
            background: `radial-gradient(circle at 35% 30%, oklch(1 0 0 / 0.55), ${meta.color} 55%, oklch(0.20 0.05 30 / 0.6) 100%)`,
            boxShadow: active
              ? `0 0 14px ${meta.color}`
              : "inset 0 -2px 4px oklch(0 0 0 / 0.4)",
          }}
        />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {meta.name}
          </span>
          <span className="text-2xl font-bold text-foreground leading-none tabular-nums">
            {score}
          </span>
        </div>
      </div>
    </motion.div>
  );
}