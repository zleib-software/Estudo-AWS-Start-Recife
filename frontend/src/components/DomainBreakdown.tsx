'use client';

import { DOMAIN_NAMES } from '@/config/constants';
import type { DomainStats } from '@/lib/types';
import { calculatePercentage } from '@/lib/scoring';

interface DomainBreakdownProps {
  statsByDomain: Record<number, DomainStats>;
}

export default function DomainBreakdown({ statsByDomain }: DomainBreakdownProps) {
  const domains = Object.keys(statsByDomain)
    .map(Number)
    .sort((a, b) => a - b);

  if (domains.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mt-6 border border-gray-100">
      <h3 className="text-xl font-bold text-aws-navy mb-6">
        Desempenho por Domínio
      </h3>
      <div className="space-y-4">
        {domains.map((domainId) => {
          const stats = statsByDomain[domainId];
          const percentage = calculatePercentage(stats.correct, stats.total);
          const domainName = DOMAIN_NAMES[domainId] || `Domínio ${domainId}`;

          return (
            <div key={domainId} className="group">
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-sm text-gray-700">
                  {domainName}
                </span>
                <span className="text-sm font-bold text-aws-navy tabular-nums">
                  {stats.correct}/{stats.total} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    percentage >= 70 ? 'bg-aws-blue' : 'bg-aws-orange'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
