'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuestionCard from '@/components/QuestionCard';
import QuizNavigation from '@/components/QuizNavigation';
import QuestionGrid from '@/components/QuestionGrid';
import ConfirmModal from '@/components/ConfirmModal';
import { useQuiz } from '@/hooks/useQuiz';
import { useTimer } from '@/hooks/useTimer';
import { fetchQuestions } from '@/lib/api';
import { DOMAIN_NAMES, DOMAIN_SHORT_NAMES } from '@/config/constants';
import type { Question } from '@/lib/types';

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    state,
    isReady,
    initQuiz,
    selectAnswer,
    toggleFlag,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    updateTimeLeft,
    currentQuestion,
    isAnswered,
    isFlagged,
  } = useQuiz();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isHomeConfirmOpen, setIsHomeConfirmOpen] = useState(false);

  const isExamMode = state.mode === 'exam';

  // Timer hook
  const { timeLeft, formatted, isExpired, stop } = useTimer(
    isExamMode && isReady && state.questions.length > 0 && isLoading === false,
    state.examTimeLeft
  );

  // Auto-finish on timer expiry
  useEffect(() => {
    if (isExpired && isExamMode) {
      handleFinish();
    }
  }, [isExpired, isExamMode]);

  // Sync timer to state periodically
  useEffect(() => {
    if (isExamMode && timeLeft % 10 === 0) { // Sync every 10s to avoid too many writes
      updateTimeLeft(timeLeft);
    }
  }, [timeLeft, isExamMode, updateTimeLeft]);

  // Load questions if not resuming
  useEffect(() => {
    async function load() {
      if (!isReady) return;

      // If state already has questions, we are resuming
      if (state.questions.length > 0) {
        setIsLoading(false);
        return;
      }

      // Otherwise fetch new questions
      try {
        setIsLoading(true);
        const domainIdParam = searchParams.get('domainId');
        const countParam = searchParams.get('count');
        const modeParam = searchParams.get('mode') as 'practice' | 'exam' | null;

        const domainId = domainIdParam ? parseInt(domainIdParam, 10) : 0;
        const count = countParam === 'all' ? 'all' : (countParam ? parseInt(countParam, 10) : 25);
        const mode = modeParam || 'practice';

        const questionsParams: any = {};
        if (domainId > 0) questionsParams.domainId = domainId;
        if (count !== 'all') questionsParams.count = count;

        const fetchedQuestions = await fetchQuestions(questionsParams);
        
        if (fetchedQuestions.length === 0) {
          setError('Nenhuma questão encontrada para os filtros selecionados.');
          setIsLoading(false);
          return;
        }

        initQuiz({
          domain: domainId,
          count,
          mode,
          questions: fetchedQuestions,
        });
        
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar questões.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [isReady, state.questions.length, searchParams, initQuiz]);

  const handleFinish = () => {
    stop();
    router.push('/results');
  };

  const handleHomeClick = () => {
    setIsHomeConfirmOpen(true);
  };

  const confirmGoHome = () => {
    stop();
    // We don't clear local storage here, so it can be resumed
    router.push('/');
  };

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md border border-gray-100">
          <svg className="w-16 h-16 fill-red-500 mx-auto mb-4" viewBox="0 0 24 24">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <h2 className="text-xl font-bold text-aws-navy mb-2">Erro ao carregar</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-aws-orange text-aws-navy font-bold rounded-lg hover:bg-aws-orange-hover transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !currentQuestion) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-aws-orange rounded-full animate-spin"></div>
          <p className="text-aws-navy font-semibold">Carregando simulado...</p>
        </div>
      </div>
    );
  }

  const domainLabel = DOMAIN_SHORT_NAMES[state.domain] || 'Simulado';
  const modeLabel = state.mode === 'exam' ? 'Modo Exame' : 'Modo Prática';
  const progress = `${state.currentIndex + 1}/${state.questions.length}`;
  const isLastQuestion = state.currentIndex === state.questions.length - 1;

  return (
    <>
      <Header
        quizInfo={{ domainLabel, modeLabel, progress }}
        timerDisplay={formatted}
        isExamMode={isExamMode}
        showHomeConfirm={true}
        onHomeClick={handleHomeClick}
      />
      
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 py-8">
        <QuestionCard
          question={currentQuestion}
          currentIndex={state.currentIndex}
          totalQuestions={state.questions.length}
          mode={state.mode}
          selectedAnswer={state.userAnswers[state.currentIndex]}
          onSelectAnswer={selectAnswer}
          domainName={DOMAIN_NAMES[currentQuestion.domainId]}
        />

        <QuestionGrid
          isOpen={isGridOpen}
          totalQuestions={state.questions.length}
          currentIndex={state.currentIndex}
          userAnswers={state.userAnswers}
          flagged={state.flagged}
          onSelect={goToQuestion}
          onClose={() => setIsGridOpen(false)}
        />

        <QuizNavigation
          onPrev={prevQuestion}
          onNext={nextQuestion}
          onFinish={() => setIsConfirmOpen(true)}
          onToggleFlag={toggleFlag}
          onToggleGrid={() => setIsGridOpen(!isGridOpen)}
          canPrev={state.currentIndex > 0}
          canNext={!isLastQuestion}
          isFlagged={isFlagged}
          isGridOpen={isGridOpen}
        />
      </main>
      
      <Footer />

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Finalizar Simulado?"
        message={
          Object.keys(state.userAnswers).length < state.questions.length
            ? `Você respondeu ${Object.keys(state.userAnswers).length} de ${state.questions.length} questões. Tem certeza que deseja finalizar e ver o resultado?`
            : "Você concluiu todas as questões! Deseja finalizar e ver o resultado?"
        }
        onConfirm={handleFinish}
        onCancel={() => setIsConfirmOpen(false)}
      />

      <ConfirmModal
        isOpen={isHomeConfirmOpen}
        title="Pausar e Voltar?"
        message="Seu progresso será salvo automaticamente e você poderá retomar este simulado depois. Deseja voltar à tela inicial?"
        onConfirm={confirmGoHome}
        onCancel={() => setIsHomeConfirmOpen(false)}
      />
    </>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-4">Carregando...</div>}>
      <QuizContent />
    </Suspense>
  );
}
