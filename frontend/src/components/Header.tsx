'use client';

import Link from 'next/link';

interface HeaderProps {
  quizInfo?: {
    domainLabel: string;
    modeLabel: string;
    progress: string;
  };
  timerDisplay?: string;
  isExamMode?: boolean;
  onHomeClick?: () => void;
  showHomeConfirm?: boolean;
}

export default function Header({
  quizInfo,
  timerDisplay,
  isExamMode,
  onHomeClick,
  showHomeConfirm,
}: HeaderProps) {
  return (
    <header className="bg-aws-navy text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showHomeConfirm ? (
            <button
              onClick={onHomeClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <svg className="w-5 h-5 fill-aws-orange" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="font-bold text-sm md:text-base tracking-wide">
                Simulado AWS
              </span>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5 fill-aws-orange" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="font-bold text-sm md:text-base tracking-wide">
                Simulado AWS
              </span>
            </Link>
          )}
        </div>

        {quizInfo && (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-gray-300">
              {quizInfo.domainLabel} • {quizInfo.modeLabel}
            </span>
            <span className="text-xs font-semibold text-aws-orange">
              {quizInfo.progress}
            </span>
            {isExamMode && timerDisplay && (
              <div className="flex items-center gap-1.5 bg-aws-dark px-3 py-1.5 rounded-lg">
                <svg className="w-4 h-4 fill-aws-orange" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                <span className="text-sm font-mono font-bold text-white">
                  {timerDisplay}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
