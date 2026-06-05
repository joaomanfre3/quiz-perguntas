"use client";

import { motion } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";
import { scoreMessage } from "@/lib/quiz";

interface ResultScreenProps {
  score: number;
  total: number;
  isRecord: boolean;
  onRestart: () => void;
}

export function ResultScreen({ score, total, isRecord, onRestart }: ResultScreenProps) {
  const ratio = total > 0 ? score / total : 0;
  const percent = Math.round(ratio * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-5 text-center"
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        <Trophy size={40} className="text-white" />
      </div>

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
          {isRecord ? "Novo recorde!" : "Resultado"}
        </p>
        <p className="tnum mt-1 text-5xl font-extrabold">
          {score}<span className="text-2xl text-white/40">/{total}</span>
        </p>
        <p className="mt-1 text-lg font-bold" style={{ color: "var(--color-accent)" }}>
          {percent}% de acerto
        </p>
      </div>

      <p className="text-white/70">{scoreMessage(ratio)}</p>

      <button
        onClick={onRestart}
        className="mt-2 flex items-center gap-2 rounded-full px-8 py-3 text-base font-bold text-white shadow-lg transition active:scale-95"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        <RotateCcw size={18} /> Jogar de novo
      </button>
    </motion.div>
  );
}
