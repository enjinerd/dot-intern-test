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
  selected_answer?: string;
}

interface QuizState {
  questions: Question[];
  userAnswers: string[];
  score: number;
  lastQuestion: number;
  loading: boolean;
  error: boolean;
  expiredTime: number;
  startDateTime: number;
  fetchQuestions: () => Promise<void>;
  startQuiz: () => void;
  setAnswer: (answer: "False" | "True") => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateScore: () => void;
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
      fetchQuestions: async () => {
        try {
          set({ loading: true });
          const { data } = await axios.get(
            `https://opentdb.com/api.php?amount=10&category=22&type=boolean`,
          );
          console.log(data);
          set({
            questions: data.results,
            userAnswers: new Array(data.results.length).fill(false),
            loading: false,
          });
        } catch (error) {
          set({ error: true, loading: false });
        }
      },
      startQuiz: () => {
        set({ startDateTime: Date.now(), expiredTime: Date.now() + 1000 * 60 * 15 });
      },
      setAnswer: (answer) => {
        set((state) => {
          const userAnswers = [...state.userAnswers];
          userAnswers[state.lastQuestion] = answer;
          return { userAnswers };
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
          const score = state.questions.reduce((acc, curr, i) => {
            if (curr.correct_answer === "True") {
              return state.userAnswers[i] ? acc + 1 : acc;
            } else {
              return !state.userAnswers[i] ? acc + 1 : acc;
            }
          }, 0);
          return { score };
        });
      },
    }),
    {
      name: "quiz",
      getStorage: () => localStorage,
    },
  ),
);
