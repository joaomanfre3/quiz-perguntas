"use client";

import { motion } from "framer-motion";
import { Brain, Trophy } from "lucide-react";
import { CATEGORIES } from "@/lib/quiz";

interface StartScreenProps {
  bestScore: number | null;
  onStart: (categoryId: string) => void;
}

export function StartScreen({ bestScore, onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col gap-6">
      <header className="text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          <Brain size={32} className="text-white" />
        </motion.div>
        <h1 className="text-3xl font-extrabold tracking-tight">Quiz</h1>
        <p className="mt-1 text-white/60">Escolha uma categoria e teste seus conhecimentos.</p>
        {bestScore !== null && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm">
            <Trophy size={14} className="text-amber-400" /> Recorde: {bestScore}%
          </p>
        )}
      </header>

      {/* Categorias */}
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((c) => (
          <motion.button
            key={c.id}
            whileTap={{ scale: 0.96 }}
            onClick={() => onStart(c.id)}
            className="flex flex-col items-start gap-2 rounded-2xl bg-card p-4 text-left ring-1 ring-white/10 transition hover:ring-white/30"
            style={{ backgroundColor: "var(--color-card)" }}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
              style={{ backgroundColor: c.color + "33" }}
            >
              {c.emoji}
            </span>
            <span className="text-sm font-bold leading-tight">{c.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Todas */}
      <button
        onClick={() => onStart("todas")}
        className="rounded-2xl py-4 text-base font-bold text-white shadow-lg transition active:scale-95"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        🎲 Misturar todas as categorias
      </button>
    </div>
  );
}
