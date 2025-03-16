import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { cartTotalSelector } from '@/atoms/cartAtom';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/cart';
import Button from '../common/Button';

interface CartListProps {
  items: any[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartList = memo(({ items, onUpdateQuantity, onRemove }: CartListProps) => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const totals = useRecoilValue(cartTotalSelector);

  if (cart.length === 0) {
    return <div className="text-center mt-10">장바구니가 비어있습니다.</div>;
  }

  return (
    <div className="mt-8">
      <div className="bg-white rounded-lg shadow divide-y">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-24 h-24 object-contain"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </h3>
              <div className="mt-1 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="btn btn-circle btn-sm"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="btn btn-circle btn-sm"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span>상품금액</span>
          <span>{formatPrice(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span>{formatPrice(totals.shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>부가세</span>
          <span>{formatPrice(totals.tax)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>총 결제금액</span>
          <span>{formatPrice(totals.total)}</span>
        </div>
        <Button 
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => console.log('결제하기')}
        >
          결제하기
        </Button>
      </div>
    </div>
  );
});

CartList.displayName = 'CartList';

export default CartList;
