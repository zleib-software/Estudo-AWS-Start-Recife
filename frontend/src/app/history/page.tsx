'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HistoryList from '@/components/HistoryList';
import ConfirmModal from '@/components/ConfirmModal';
import { useHistory } from '@/hooks/useHistory';

export default function HistoryPage() {
  const router = useRouter();
  const { history, clearHistory } = useHistory();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleClear = () => {
    clearHistory();
    setIsConfirmOpen(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-aws-navy">
            Histórico de Simulado
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-white text-aws-navy font-bold text-sm rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Voltar ao Início
          </button>
        </div>

        <HistoryList
          history={history}
          onClear={() => setIsConfirmOpen(true)}
        />
      </main>
      <Footer />

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Apagar Histórico?"
        message="Isso removerá todas as tentativas registradas permanentemente do seu navegador. Deseja continuar?"
        onConfirm={handleClear}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
