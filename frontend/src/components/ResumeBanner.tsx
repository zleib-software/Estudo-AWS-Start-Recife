'use client';

import type { QuizState } from '@/lib/types';
import { DOMAIN_SHORT_NAMES } from '@/config/constants';

interface ResumeBannerProps {
  savedState: QuizState | null;
  onResume: () => void;
  onDiscard: () => void;
}

export default function ResumeBanner({
  savedState,
  onResume,
  onDiscard,
}: ResumeBannerProps) {
  if (!savedState || savedState.questions.length === 0) return null;

  const answeredCount = Object.keys(savedState.userAnswers).length;
  const totalCount = savedState.questions.length;
  const domainName = DOMAIN_SHORT_NAMES[savedState.domain];
  const modeName = savedState.mode === 'exam' ? 'Exame' : 'Prática';

  return (
    <div className="bg-aws-navy border-l-4 border-aws-orange text-white p-4 rounded-r-lg mb-6 shadow-md animate-fadeIn flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
          <svg className="w-5 h-5 fill-aws-orange" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          Simulado em andamento
        </h3>
        <p className="text-sm text-gray-300">
          Você tem um simulado não finalizado salvo no seu navegador.
          <br className="hidden md:block" />
          <span className="font-semibold text-aws-orange">
            {domainName} ({modeName})
          </span>{' '}
          • Respondidas: {answeredCount} de {totalCount}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onDiscard}
          className="px-4 py-2 text-xs font-bold bg-transparent text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
        >
          Descartar
        </button>
        <button
          onClick={onResume}
          className="px-6 py-2 text-xs font-bold bg-aws-orange text-aws-navy hover:bg-aws-orange-hover rounded-md transition-colors cursor-pointer whitespace-nowrap"
        >
          Retomar agora
        </button>
      </div>
    </div>
  );
}
