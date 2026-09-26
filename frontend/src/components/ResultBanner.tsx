'use client';

interface ResultBannerProps {
  scoreScaled: number;
  percentage: number;
  correct: number;
  total: number;
  isPassed: boolean;
  passScore: number;
}

export default function ResultBanner({
  scoreScaled,
  percentage,
  correct,
  total,
  isPassed,
  passScore,
}: ResultBannerProps) {
  return (
    <div
      className={`rounded-2xl p-6 md:p-8 text-white shadow-lg animate-fadeIn ${
        isPassed
          ? 'bg-linear-to-r from-green-600 to-green-500'
          : 'bg-linear-to-r from-red-600 to-red-500'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="uppercase tracking-widest text-sm font-bold opacity-90 mb-2 block">
            Resultado do Exame
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-2">
            {isPassed ? 'APROVADO' : 'REPROVADO'}
          </h2>
          <p className="text-white/90 text-sm md:text-base">
            O mínimo exigido para aprovação é {passScore}.
          </p>
        </div>

        <div className="flex items-center gap-6 md:gap-10">
          <div className="text-center">
            <span className="block text-xs uppercase tracking-wider opacity-80 mb-1">
              Nota Final
            </span>
            <div className="text-4xl md:text-5xl font-black tabular-nums">
              {scoreScaled}
              <span className="text-lg md:text-2xl font-normal opacity-70">
                /1000
              </span>
            </div>
          </div>
          
          <div className="h-16 w-px bg-white/30 hidden sm:block"></div>

          <div className="text-center">
            <span className="block text-xs uppercase tracking-wider opacity-80 mb-1">
              Acertos
            </span>
            <div className="text-2xl md:text-3xl font-bold tabular-nums">
              {percentage}%
            </div>
            <div className="text-sm opacity-90 mt-1 font-medium">
              {correct} de {total} questões
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
