import { createFileRoute, Link } from "@tanstack/react-router";
import { ConnectFour } from "../../components/games/connect-four/ConnectFour";

export const Route = createFileRoute("/games/connect-four")({
  head: () => ({
    meta: [
      { title: "Four in a Row — Arcade" },
      {
        name: "description",
        content: "Play Four in a Row — a beautifully animated, premium twist on the classic connect-four game.",
      },
    ],
  }),
  component: ConnectFourPage,
});

function ConnectFourPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Arcade
          </Link>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Four in a Row
          </div>
        </nav>

        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-shimmer">
            Four in a Row
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Drop your discs. Connect four in any direction to win.
          </p>
        </header>

        <ConnectFour />
      </div>
    </main>
  );
}