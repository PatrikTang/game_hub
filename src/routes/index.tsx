import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gamepad2, Play, Sparkles, Trophy, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GAMES } from "../lib/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Game Hub - Polished Browser Games" },
      {
        name: "description",
        content:
          "A polished collection of fast, thoughtful browser games with refined interaction design.",
      },
      { property: "og:title", content: "Game Hub - Polished Browser Games" },
      {
        property: "og:description",
        content:
          "Play polished browser games with refined visuals, smooth motion, and instant access.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const railY = useTransform(scrollYProgress, [0, 1], [0, -92]);
  const chipRotate = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const tileRotate = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const chipScale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1.08, 0.96]);
  const trophyY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const tableY = useTransform(scrollYProgress, [0, 1], [0, 76]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.9, 0.55, 0.1]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section ref={heroRef} className="relative min-h-[92vh] px-5 pt-5 sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,oklch(0.99_0.01_95),oklch(0.98_0.02_185)_48%,oklch(0.98_0.02_35))]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-[linear-gradient(180deg,oklch(0.94_0.04_185_/_0.78),transparent)]" />
        <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-border/80 pb-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold">
            <span className="grid size-9 place-items-center rounded-md bg-foreground text-background shadow-sm">
              <Gamepad2 className="size-4" />
            </span>
            Game Hub
          </Link>
          <a
            href="#games"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            <Play className="size-4" />
            Games
          </a>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 py-12 sm:py-16 lg:min-h-[calc(92vh-86px)] lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary"
            >
              <Sparkles className="size-3.5" />
              Browser arcade, refined
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="max-w-3xl text-5xl font-black leading-[0.96] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Strategic games with a brighter touch.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
            >
              A crisp, lightweight game collection built around quick rounds, clean interaction, and
              motion that makes every move feel intentional.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/games/connect-four"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_14px_34px_-18px_oklch(0.54_0.15_185)] transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Play className="size-4 fill-current" />
                Play Four in a Row
              </Link>
              <a
                href="#games"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-input bg-card px-5 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
              >
                Browse collection
                <ArrowRight className="size-4" />
              </a>
            </motion.div>
          </div>

          <motion.div style={{ y: visualY }} className="relative min-h-[460px] lg:min-h-[610px]">
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute left-1/2 top-1/2 h-[70%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(circle,oklch(0.82_0.12_185_/_0.42),transparent_68%)] blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="hero-stage relative mx-auto aspect-[5/4] w-full max-w-[720px]"
            >
              <motion.div style={{ y: railY }} className="game-rail game-rail-a" />
              <motion.div style={{ y: railY }} className="game-rail game-rail-b" />
              <motion.div style={{ y: railY }} className="game-rail game-rail-c" />
              <motion.div
                style={{ rotate: chipRotate, scale: chipScale }}
                className="absolute left-[12%] top-[14%] size-24 rounded-full bg-[radial-gradient(circle_at_34%_28%,oklch(1_0_0_/_0.9),oklch(0.82_0.17_79)_42%,oklch(0.65_0.18_58))] shadow-[0_26px_44px_-24px_oklch(0.62_0.16_70)] sm:size-28"
              />
              <motion.div
                style={{ rotate: tileRotate }}
                className="absolute right-[15%] top-[10%] size-16 rounded-md bg-[linear-gradient(135deg,oklch(0.74_0.14_25),oklch(0.92_0.08_39))] shadow-[0_24px_38px_-22px_oklch(0.68_0.14_25)] sm:size-20"
              />
              <motion.div
                style={{ y: trophyY }}
                className="absolute bottom-[14%] right-[10%] grid size-28 place-items-center rounded-md border border-foreground/10 bg-card/90 shadow-[0_22px_46px_-28px_oklch(0.28_0.04_220)] backdrop-blur sm:size-36"
              >
                <Trophy className="size-12 text-accent sm:size-16" strokeWidth={1.5} />
              </motion.div>
              <motion.div
                style={{ y: tableY }}
                className="absolute bottom-[7%] left-[6%] w-44 rounded-md border border-border bg-card/95 p-3 shadow-[0_20px_44px_-30px_oklch(0.28_0.04_220)] backdrop-blur"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">Live table</span>
                  <Users className="size-4 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 rounded-full bg-primary/80" />
                  <div className="h-2.5 w-3/4 rounded-full bg-accent/80" />
                  <div className="h-2.5 w-1/2 rounded-full bg-foreground/25" />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="games" className="relative bg-card px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-border" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Collection
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Pick a table.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Fast-loading games with compact sessions, tactile feedback, and a clean interface.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GameCard game={game} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function GameCard({ game, index }: { game: (typeof GAMES)[number]; index: number }) {
  const availableClasses = game.available
    ? "cursor-pointer hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_50px_-34px_oklch(0.28_0.05_220)]"
    : "opacity-70";

  const content = (
    <div
      className={`group relative h-full overflow-hidden rounded-lg border border-border bg-background p-5 transition duration-300 ${availableClasses}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-[oklch(0.78_0.13_78)]" />
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="grid size-12 place-items-center rounded-md bg-secondary text-2xl shadow-inner">
          <span aria-hidden="true">{game.emoji}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            {game.players}
          </span>
          {!game.available && (
            <span className="rounded-md bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
              Soon
            </span>
          )}
        </div>
      </div>
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        <span className="size-1.5 rounded-full bg-primary" />
        Table {index + 1}
      </div>
      <h3 className="text-xl font-black tracking-tight text-foreground">{game.name}</h3>
      <p className="mt-2 text-sm font-medium text-accent">{game.tagline}</p>
      <p className="mt-4 min-h-16 text-sm leading-6 text-muted-foreground">{game.description}</p>
      <div className="mt-7 flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {game.available ? "Ready" : "Queued"}
        </span>
        {game.available && (
          <span className="inline-flex items-center gap-1 text-sm font-bold text-primary transition group-hover:translate-x-1">
            Play
            <ArrowRight className="size-4" />
          </span>
        )}
      </div>
    </div>
  );

  if (!game.available) return content;

  return (
    <Link to={game.path} className="block h-full">
      {content}
    </Link>
  );
}
