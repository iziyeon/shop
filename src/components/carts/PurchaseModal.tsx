import { memo } from 'react';
import { formatPrice } from '@/utils/cart';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  total: number;
}

const PurchaseModal = memo(({ isOpen, onClose, onConfirm, total }: PurchaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 relative z-10 w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">주문 확인</h3>
          <p className="mb-4">총 결제금액: <span className="font-bold">{formatPrice(total)}</span></p>
          <p className="mb-6">주문을 진행하시겠습니까?</p>
          <div className="flex justify-end gap-2">
            <button className="btn btn-outline" onClick={onClose}>취소</button>
            <button className="btn btn-primary" onClick={onConfirm}>확인</button>
          </div>
        </div>
      </div>
    </div>
  );
});

PurchaseModal.displayName = 'PurchaseModal';
export default PurchaseModal;
