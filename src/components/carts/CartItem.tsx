import { CartItem as CartItemType } from '@/recoil/cart';
import { useCartActions } from '@/hooks/useCartActions';

interface Props {
  item: CartItemType;
}

const CartItem = ({ item }: Props) => {
  const { updateQuantity, removeFromCart } = useCartActions();

  return (
    <div className="flex gap-4 items-center">
      <img 
        src={item.image} 
        alt={item.title}
        className="w-20 h-20 object-contain"
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="btn btn-xs btn-square"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            className="btn btn-xs btn-square"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">${(item.price * item.quantity).toLocaleString()}</p>
        <button
          className="btn btn-ghost btn-xs text-error"
          onClick={() => removeFromCart(item.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
