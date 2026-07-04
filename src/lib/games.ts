export type Game = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  players: string;
  accent: string; // tailwind gradient classes
  emoji: string;
  path: string;
  available: boolean;
};

export const GAMES: Game[] = [
  {
    id: "connect-four",
    name: "Four in a Row",
    tagline: "Classic strategy. Drop. Connect. Win.",
    description:
      "Outsmart your opponent by lining up four discs in a row — horizontally, vertically, or diagonally.",
    players: "2 players",
    accent: "from-amber-400 via-rose-500 to-fuchsia-600",
    emoji: "🟡",
    path: "/games/connect-four",
    available: true,
  },
  {
    id: "tic-tac-toe",
    name: "Tic Tac Toe",
    tagline: "The original three-in-a-row.",
    description: "A timeless duel of Xs and Os. Coming soon to the arcade.",
    players: "2 players",
    accent: "from-sky-400 via-indigo-500 to-purple-600",
    emoji: "❌",
    path: "#",
    available: false,
  },
  {
    id: "memory",
    name: "Memory Match",
    tagline: "Flip, remember, match.",
    description: "Test your memory with a satisfying card-flipping challenge.",
    players: "1 player",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    emoji: "🧠",
    path: "#",
    available: false,
  },
];