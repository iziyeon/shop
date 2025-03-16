import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import type { CartItem } from '@/types/cart';
import { formatPrice } from '@/utils/cart';
import { Button } from '../common/Button';
import PurchaseModal from './PurchaseModal';
import { cartState } from '@/atoms/cartAtom';

interface OrderSummaryProps {
  cart: CartItem[];
}

export default function OrderSummary({ cart }: OrderSummaryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_, setCart] = useRecoilState(cartState);
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50000 ? 0 : 3000;
    const tax = subtotal * 0.1;
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    };
  }, [cart]);

  const handleConfirmPurchase = () => {
    alert('결제가 완료되었습니다.');
    setCart([]); // 장바구니 비우기
    setIsModalOpen(false);
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-4">주문 요약</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>상품금액</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>부가세</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>총 결제금액</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
      <Button 
        variant="primary" 
        fullWidth 
        className="mt-4"
        onClick={() => setIsModalOpen(true)}
      >
        결제하기
      </Button>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPurchase}
        total={total}
      />
    </div>
  );
}
