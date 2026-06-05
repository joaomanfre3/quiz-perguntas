"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { QuizQuestion } from "@/lib/quiz";

interface QuestionViewProps {
  question: QuizQuestion;
  index: number;
  total: number;
  score: number;
  /** Índice escolhido (null = ainda não respondeu). */
  selected: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
}

const LETTERS = ["A", "B", "C", "D"];

export function QuestionView({
  question,
  index,
  total,
  score,
  selected,
  onSelect,
  onNext,
}: QuestionViewProps) {
  const answered = selected !== null;
  const progress = ((index) / total) * 100;

  // Define a cor de cada alternativa após a resposta.
  function optionStyle(i: number) {
    if (!answered) return "bg-card ring-white/10 hover:ring-white/30";
    if (i === question.correctIndex) return "bg-emerald-500/15 ring-emerald-500 text-emerald-200";
    if (i === selected) return "bg-red-500/15 ring-red-500 text-red-200";
    return "bg-card ring-white/5 opacity-50";
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Topo: progresso + placar */}
      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-white/60">
          <span>Pergunta {index + 1} de {total}</span>
          <span className="tnum font-semibold">{score} ✓</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      {/* Pergunta */}
      <motion.h2
        key={question.q}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold leading-snug sm:text-2xl"
      >
        {question.q}
      </motion.h2>

      {/* Alternativas */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((opt, i) => (
          <button
            key={i}
            disabled={answered}
            onClick={() => onSelect(i)}
            className={`flex items-center gap-3 rounded-2xl p-4 text-left font-medium ring-1 transition ${optionStyle(i)}`}
            style={!answered ? { backgroundColor: "var(--color-card)" } : undefined}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">
              {LETTERS[i]}
            </span>
            <span className="flex-1">{opt}</span>
            {answered && i === question.correctIndex && <Check size={20} className="text-emerald-400" />}
            {answered && i === selected && i !== question.correctIndex && <X size={20} className="text-red-400" />}
          </button>
        ))}
      </div>

      {/* Avançar */}
      {answered && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNext}
          className="rounded-2xl py-4 text-base font-bold text-white shadow-lg transition active:scale-95"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          {index + 1 === total ? "Ver resultado" : "Próxima pergunta"}
        </motion.button>
      )}
    </div>
  );
}
