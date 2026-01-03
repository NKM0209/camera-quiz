import { useState, useCallback } from 'react';
import { Question, QuizState, GamePhase } from '../types';
import questionsData from '../data/questions.json';

const QUESTIONS_PER_GAME = 10;

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    phase: 'start',
    questions: [],
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    showExplanation: false,
    answers: [],
  });

  const startGame = useCallback(() => {
    const shuffled = shuffleArray(questionsData as Question[]);
    const selected = shuffled.slice(0, QUESTIONS_PER_GAME);
    
    setState({
      phase: 'playing',
      questions: selected,
      currentIndex: 0,
      score: 0,
      selectedAnswer: null,
      showExplanation: false,
      answers: [],
    });
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    setState((prev) => {
      if (prev.selectedAnswer !== null) return prev;
      
      const currentQuestion = prev.questions[prev.currentIndex];
      const isCorrect = answerIndex === currentQuestion.answer;
      
      return {
        ...prev,
        selectedAnswer: answerIndex,
        showExplanation: true,
        score: isCorrect ? prev.score + 1 : prev.score,
        answers: [...prev.answers, { questionId: currentQuestion.id, correct: isCorrect }],
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1;
      
      if (nextIndex >= prev.questions.length) {
        return { ...prev, phase: 'result' as GamePhase };
      }
      
      return {
        ...prev,
        currentIndex: nextIndex,
        selectedAnswer: null,
        showExplanation: false,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState({
      phase: 'start',
      questions: [],
      currentIndex: 0,
      score: 0,
      selectedAnswer: null,
      showExplanation: false,
      answers: [],
    });
  }, []);

  const currentQuestion = state.questions[state.currentIndex] || null;

  return {
    ...state,
    currentQuestion,
    startGame,
    selectAnswer,
    nextQuestion,
    resetGame,
  };
}
