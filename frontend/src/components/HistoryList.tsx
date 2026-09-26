'use client';

import type { AttemptRecord } from '@/lib/types';
import { DOMAIN_SHORT_NAMES } from '@/config/constants';

interface HistoryListProps {
  history: AttemptRecord[];
  onClear: () => void;
}

export default function HistoryList({ history, onClear }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <svg
          className="w-16 h-16 mx-auto fill-gray-300 mb-4"
          viewBox="0 0 24 24"
        >
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
        <p className="text-gray-500 text-sm">
          Nenhuma tentativa registrada ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Últimas {history.length} tentativas
        </span>
        <button
          onClick={onClear}
          className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer"
        >
          Limpar Histórico
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((record) => (
          <div
            key={record.id}
            className={`bg-white rounded-xl p-5 border-l-4 shadow-sm flex flex-col justify-between ${
              record.isPassed ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-gray-400">
                  {new Date(record.date).toLocaleString()}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    record.mode === 'exam'
                      ? 'bg-aws-navy text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {record.mode === 'exam' ? 'Exame' : 'Prática'}
                </span>
              </div>
              <h4 className="font-bold text-sm text-aws-navy mb-3 line-clamp-1">
                {DOMAIN_SHORT_NAMES[record.domain] || 'Simulado'}
              </h4>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <span className="block text-xs text-gray-500 mb-1">Nota</span>
                <span
                  className={`text-2xl font-black ${
                    record.isPassed ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {record.scoreScaled}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-xs text-gray-500 mb-1">
                  Acertos
                </span>
                <span className="text-sm font-bold text-gray-700">
                  {record.correct}/{record.total} ({record.percentage}%)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
