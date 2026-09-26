'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { AttemptRecord } from '@/lib/types';
import { MAX_HISTORY_ENTRIES } from '@/config/constants';

/**
 * Hook para gerenciar o histórico de tentativas no localStorage.
 */
export function useHistory() {
  const [history, setHistory, clearHistory] = useLocalStorage<AttemptRecord[]>(
    'aws_quiz_history',
    []
  );

  const addRecord = useCallback(
    (record: AttemptRecord) => {
      setHistory((prev) => {
        const updated = [record, ...prev];
        if (updated.length > MAX_HISTORY_ENTRIES) updated.pop();
        return updated;
      });
    },
    [setHistory]
  );

  return { history, addRecord, clearHistory };
}
