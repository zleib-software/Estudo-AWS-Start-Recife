'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResultBanner from '@/components/ResultBanner';
import DomainBreakdown from '@/components/DomainBreakdown';
import ReviewList from '@/components/ReviewList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useHistory } from '@/hooks/useHistory';
import { calculateScaledScore, calculatePercentage, isPassing } from '@/lib/scoring';
import { isAnswerCorrect } from '@/lib/quizUtils';
import { PASS_SCORE } from '@/config/constants';
import type { QuizState, DomainStats } from '@/lib/types';

function ResultsContent() {
  const router = useRouter();
  const [savedState, , clearSavedState] = useLocalStorage<QuizState | null>('aws_quiz_state', null);
  const { addRecord } = useHistory();
  
  // Guardamos o estado final localmente para poder limpar o localStorage
  // sem perder os dados na tela atual.
  const [finalState, setFinalState] = useState<QuizState | null>(null);
  
  // Stats calculation
  const [stats, setStats] = useState({
    correct: 0,
    total: 0,
    scoreScaled: 0,
    percentage: 0,
    isPassed: false,
    statsByDomain: {} as Record<number, DomainStats>,
  });

  useEffect(() => {
    // Só processa se tivermos um savedState no mount e ainda não tivermos finalState
    if (savedState && !finalState) {
      const { questions, userAnswers, domain, mode } = savedState;
      const total = questions.length;
      let correct = 0;
      const statsByDomain: Record<number, DomainStats> = {};

      questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = isAnswerCorrect(q, userAnswer);
        
        if (isCorrect) correct++;

        if (!statsByDomain[q.domainId]) {
          statsByDomain[q.domainId] = { total: 0, correct: 0 };
        }
        statsByDomain[q.domainId].total++;
        if (isCorrect) statsByDomain[q.domainId].correct++;
      });

      const scoreScaled = calculateScaledScore(correct, total);
      const percentage = calculatePercentage(correct, total);
      const passed = isPassing(scoreScaled);

      setStats({
        correct,
        total,
        scoreScaled,
        percentage,
        isPassed: passed,
        statsByDomain,
      });

      // Save to history
      addRecord({
        id: Date.now(),
        date: new Date().toISOString(),
        scoreScaled,
        percentage,
        correct,
        total,
        mode,
        domain,
        isPassed: passed,
      });

      // Salva na ref local e limpa o localStorage
      setFinalState(savedState);
      clearSavedState();
    }
  }, [savedState, finalState, addRecord, clearSavedState]);

  if (!finalState && !savedState) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md border border-gray-100">
          <svg className="w-16 h-16 fill-gray-400 mx-auto mb-4" viewBox="0 0 24 24">
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <h2 className="text-xl font-bold text-aws-navy mb-2">Nenhum resultado</h2>
          <p className="text-gray-600 mb-6">Não há nenhum simulado recém finalizado para exibir.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-aws-orange text-aws-navy font-bold rounded-lg hover:bg-aws-orange-hover transition-colors cursor-pointer"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  // Enquanto processa
  if (!finalState) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-aws-orange rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-aws-navy">
            Resumo do Simulado
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-white text-aws-navy font-bold text-sm rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Voltar ao Início
          </button>
        </div>

        <ResultBanner
          scoreScaled={stats.scoreScaled}
          percentage={stats.percentage}
          correct={stats.correct}
          total={stats.total}
          isPassed={stats.isPassed}
          passScore={PASS_SCORE}
        />

        <DomainBreakdown statsByDomain={stats.statsByDomain} />

        <ReviewList
          questions={finalState.questions}
          userAnswers={finalState.userAnswers}
          flagged={finalState.flagged}
        />

        <div className="mt-8 text-center">
           <button
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-aws-orange text-aws-navy font-bold rounded-full hover:bg-aws-orange-hover transition-colors shadow-sm cursor-pointer"
          >
            Fazer Novo Simulado
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-4">Carregando...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
