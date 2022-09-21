import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  user_answer: string;
}

interface QuizState {
  questions: Question[];
  score: number;
  lastQuestion: number;
  loading: boolean;
  error: boolean;
  expiredTime: number;
  startDateTime: number;
  isStarted: boolean;
  fetchQuestions: () => Promise<void>;
  startQuiz: () => void;
  setAnswer: (answer: "False" | "True") => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateScore: () => void;
  resetQuiz: () => void;
}

export const useQuiz = create<QuizState>()(
  persist(
    (set) => ({
      questions: [],
      userAnswers: [],
      score: 0,
      lastQuestion: 0,
      startDateTime: 0,
      expiredTime: 0,
      loading: false,
      error: false,
      timer: 0,
      isStarted: false,
      fetchQuestions: async () => {
        try {
          set({ loading: true });
          const { data } = await axios.get(
            `https://opentdb.com/api.php?amount=10&category=22&type=boolean`,
          );

          const questions = data.results.map((question: Question) => ({
            ...question,
            user_answer: "",
          }));

          set({ questions, loading: false });
        } catch (error) {
          set({ error: true, loading: false, expiredTime: 0 });
        }
      },
      startQuiz: () => {
        set({
          startDateTime: Date.now(),
          expiredTime: Date.now() + 1000 * 60 * 1,
          isStarted: true,
        });
      },
      setAnswer: (answer) => {
        set((state) => {
          const questions = [...state.questions];
          questions[state.lastQuestion].user_answer = answer;
          return { questions };
        });
      },
      nextQuestion: () => {
        set((state) => {
          const lastQuestion = Math.min(
            state.lastQuestion + 1,
            state.questions.length - 1,
          );
          return { lastQuestion };
        });
      },
      prevQuestion: () => {
        set((state) => {
          const lastQuestion = Math.max(state.lastQuestion - 1, 0);
          return { lastQuestion };
        });
      },
      calculateScore: () => {
        set((state) => {
          const score = state.questions.reduce((acc, curr) => {
            if (curr.user_answer === curr.correct_answer) {
              return acc + 1 * 10;
            }
            return acc;
          }, 0);
          return { score };
        });
      },
      resetQuiz: () => {
        set({
          questions: [],
          score: 0,
          lastQuestion: 0,
          startDateTime: 0,
          expiredTime: 0,
          loading: false,
          error: false,
          isStarted: false,
        });
      },
    }),
    {
      name: "quiz",
      getStorage: () => localStorage,
    },
  ),
);
