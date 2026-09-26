'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  showCancel = true,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aws-dark/65 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-fadeIn">
        <h3 className="font-bold text-lg text-aws-navy">{title}</h3>
        <p className="text-sm text-gray-600">{message}</p>
        <div className="flex gap-3 pt-2">
          {showCancel && (
            <button
              onClick={onCancel}
              className="w-1/2 bg-gray-100 text-gray-700 font-bold py-2.5 rounded-xl text-xs hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`${showCancel ? 'w-1/2' : 'w-full'} bg-aws-orange text-aws-navy font-bold py-2.5 rounded-xl text-xs hover:bg-aws-orange-hover transition-colors cursor-pointer`}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
