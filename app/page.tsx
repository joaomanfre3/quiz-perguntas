"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  type QuizQuestion,
  availableCount,
  buildQuiz,
} from "@/lib/quiz";
import { StartScreen } from "@/components/StartScreen";
import { QuestionView } from "@/components/QuestionView";
import { ResultScreen } from "@/components/ResultScreen";

const STORAGE_KEY = "quiz-perguntas:recorde";
const PER_GAME = 8;

type Phase = "start" | "playing" | "result";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("start");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [isRecord, setIsRecord] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Carrega o recorde salvo.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) setBestScore(Number(raw));
    } catch {
      /* localStorage indisponível */
    }
    setHydrated(true);
  }, []);

  function start(categoryId: string) {
    const count = Math.min(PER_GAME, availableCount(categoryId));
    setQuestions(buildQuiz(categoryId, count));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setIsRecord(false);
    setPhase("playing");
  }

  function select(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[index].correctIndex) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= questions.length) finish();
    else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function finish() {
    const percent = Math.round((score / questions.length) * 100);
    if (bestScore === null || percent > bestScore) {
      setBestScore(percent);
      setIsRecord(true);
      try {
        localStorage.setItem(STORAGE_KEY, String(percent));
      } catch {
        /* ignora */
      }
    }
    setPhase("result");
  }

  if (!hydrated) return null;

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-4 py-10">
      <AnimatePresence mode="wait">
        {phase === "start" && (
          <motion.div key="start" exit={{ opacity: 0 }}>
            <StartScreen bestScore={bestScore} onStart={start} />
          </motion.div>
        )}

        {phase === "playing" && questions[index] && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <QuestionView
              question={questions[index]}
              index={index}
              total={questions.length}
              score={score}
              selected={selected}
              onSelect={select}
              onNext={next}
            />
          </motion.div>
        )}

        {phase === "result" && (
          <motion.div key="result">
            <ResultScreen
              score={score}
              total={questions.length}
              isRecord={isRecord}
              onRestart={() => setPhase("start")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
