'use client';

import { useState, useCallback, useEffect } from 'react';
import type { QuizState, Question } from '@/lib/types';
import { useLocalStorage } from './useLocalStorage';
import { EXAM_TIME_SECONDS } from '@/config/constants';

export function useQuiz() {
  const [savedState, setSavedState, clearSavedState] = useLocalStorage<QuizState | null>(
    'aws_quiz_state',
    null
  );
  
  // Initialize state based on savedState if it exists, otherwise empty state
  const [state, setState] = useState<QuizState>(() => {
    if (savedState) return savedState;
    return {
      domain: 0,
      count: 25,
      mode: 'practice',
      questions: [],
      currentIndex: 0,
      userAnswers: {},
      flagged: {},
      examTimeLeft: EXAM_TIME_SECONDS,
    };
  });

  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Sync state changes back to local storage
  useEffect(() => {
    if (isReady && state.questions.length > 0) {
      setSavedState({ ...state, timestamp: Date.now() });
    }
  }, [state, isReady, setSavedState]);

  const initQuiz = useCallback((config: Omit<QuizState, 'currentIndex' | 'userAnswers' | 'flagged' | 'examTimeLeft'>) => {
    setState({
      ...config,
      currentIndex: 0,
      userAnswers: {},
      flagged: {},
      examTimeLeft: EXAM_TIME_SECONDS,
    });
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    setState((prev) => {
      const q = prev.questions[prev.currentIndex];
      const isMulti = q && (q.multiSelect || Array.isArray(q.answer) || (q.requiredSelections && q.requiredSelections > 1));

      if (isMulti) {
        const required = q.requiredSelections || (Array.isArray(q.answer) ? q.answer.length : 2);
        const currentAns = prev.userAnswers[prev.currentIndex];
        const currentList: number[] = Array.isArray(currentAns)
          ? [...currentAns]
          : currentAns !== undefined
          ? [currentAns as number]
          : [];

        let nextList: number[];
        if (currentList.includes(answerIndex)) {
          nextList = currentList.filter((idx) => idx !== answerIndex);
        } else {
          if (currentList.length >= required) {
            nextList = [...currentList.slice(1), answerIndex];
          } else {
            nextList = [...currentList, answerIndex];
          }
        }

        const newUserAnswers = { ...prev.userAnswers };
        if (nextList.length > 0) {
          newUserAnswers[prev.currentIndex] = nextList;
        } else {
          delete newUserAnswers[prev.currentIndex];
        }

        return {
          ...prev,
          userAnswers: newUserAnswers,
        };
      }

      return {
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [prev.currentIndex]: answerIndex,
        },
      };
    });
  }, []);

  const toggleFlag = useCallback(() => {
    setState((prev) => {
      const currentFlag = prev.flagged[prev.currentIndex];
      const newFlagged = { ...prev.flagged };
      if (currentFlag) {
        delete newFlagged[prev.currentIndex];
      } else {
        newFlagged[prev.currentIndex] = true;
      }
      return { ...prev, flagged: newFlagged };
    });
  }, []);

  const goToQuestion = useCallback((index: number) => {
    setState((prev) => {
      if (index >= 0 && index < prev.questions.length) {
        return { ...prev, currentIndex: index };
      }
      return prev;
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex < prev.questions.length - 1) {
        return { ...prev, currentIndex: prev.currentIndex + 1 };
      }
      return prev;
    });
  }, []);

  const prevQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex > 0) {
        return { ...prev, currentIndex: prev.currentIndex - 1 };
      }
      return prev;
    });
  }, []);

  const updateTimeLeft = useCallback((timeLeft: number) => {
    setState((prev) => ({ ...prev, examTimeLeft: timeLeft }));
  }, []);

  return {
    state,
    isReady,
    initQuiz,
    selectAnswer,
    toggleFlag,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    updateTimeLeft,
    clearSavedState,
    currentQuestion: state.questions[state.currentIndex] as Question | undefined,
    isAnswered: state.userAnswers[state.currentIndex] !== undefined && (Array.isArray(state.userAnswers[state.currentIndex]) ? (state.userAnswers[state.currentIndex] as number[]).length > 0 : true),
    isFlagged: !!state.flagged[state.currentIndex],
  };
}
