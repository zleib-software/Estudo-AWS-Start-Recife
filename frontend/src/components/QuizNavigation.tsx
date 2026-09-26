'use client';

interface QuizNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  onToggleFlag: () => void;
  onToggleGrid: () => void;
  canPrev: boolean;
  canNext: boolean;
  isFlagged: boolean;
  isGridOpen: boolean;
}

export default function QuizNavigation({
  onPrev,
  onNext,
  onFinish,
  onToggleFlag,
  onToggleGrid,
  canPrev,
  canNext,
  isFlagged,
  isGridOpen,
}: QuizNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="flex w-full sm:w-auto gap-3">
        <button
          onClick={onToggleGrid}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer border ${
            isGridOpen
              ? 'bg-aws-navy text-white border-aws-navy'
              : 'bg-white text-aws-navy border-gray-300 hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
          </svg>
          <span className="hidden sm:inline">Navegar</span>
        </button>

        <button
          onClick={onToggleFlag}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm border cursor-pointer transition-colors ${
            isFlagged
              ? 'bg-red-50 text-red-600 border-red-200'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <svg
            className={`w-4 h-4 ${isFlagged ? 'fill-red-600' : 'fill-gray-400'}`}
            viewBox="0 0 24 24"
          >
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
          </svg>
          <span className="hidden sm:inline">
            {isFlagged ? 'Sinalizada' : 'Sinalizar'}
          </span>
        </button>
      </div>

      <div className="flex w-full sm:w-auto gap-3">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Anterior
        </button>
        {canNext ? (
          <button
            onClick={onNext}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm bg-aws-blue text-white hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            Próxima
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm bg-aws-orange text-aws-navy hover:bg-aws-orange-hover transition-colors shadow-sm cursor-pointer"
          >
            Finalizar Simulado
          </button>
        )}
      </div>
    </div>
  );
}
