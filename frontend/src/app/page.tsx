'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DomainSelector from '@/components/DomainSelector';
import QuestionCountPicker from '@/components/QuestionCountPicker';
import ModePicker from '@/components/ModePicker';
import ResumeBanner from '@/components/ResumeBanner';
import ConfirmModal from '@/components/ConfirmModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { QuizState } from '@/lib/types';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [savedState, setSavedState, removeSavedState] = useLocalStorage<QuizState | null>(
    'aws_quiz_state',
    null
  );

  const [domain, setDomain] = useState<number>(0);
  const [count, setCount] = useState<number | 'all'>(25);
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleStart = () => {
    if (savedState) {
      setIsConfirmOpen(true);
    } else {
      startNewQuiz();
    }
  };

  const startNewQuiz = () => {
    // Clear any previous state
    removeSavedState();

    const searchParams = new URLSearchParams();
    searchParams.set('domainId', domain.toString());
    searchParams.set('count', count.toString());
    searchParams.set('mode', mode);

    router.push(`/quiz?${searchParams.toString()}`);
  };

  const handleResume = () => {
    router.push('/quiz');
  };

  const handleDiscard = () => {
    removeSavedState();
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 py-8">
        <ResumeBanner
          savedState={savedState}
          onResume={handleResume}
          onDiscard={() => setIsConfirmOpen(true)}
        />

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6 border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold text-aws-navy mb-2">
            Simulador CLF-C02
          </h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            Configure seu simulado abaixo. As questões são baseadas no guia
            oficial do exame AWS Certified Cloud Practitioner.
          </p>

          <div className="space-y-8">
            <DomainSelector selected={domain} onChange={setDomain} />
            <QuestionCountPicker
              selected={count}
              onChange={setCount}
              domainSelected={domain}
            />
            <ModePicker selected={mode} onChange={setMode} />
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/history"
              className="text-sm font-bold text-aws-blue hover:underline cursor-pointer"
            >
              Ver Histórico de Tentativas
            </Link>
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-3 bg-aws-orange text-aws-navy font-bold rounded-full hover:bg-aws-orange-hover transition-colors shadow-sm cursor-pointer"
            >
              Iniciar Simulado
            </button>
          </div>
        </div>
      </main>
      <Footer />

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Descartar simulado atual?"
        message="Iniciar um novo simulado fará com que o seu progresso salvo atual seja perdido. Deseja continuar?"
        onConfirm={startNewQuiz}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
