import { useRecoilState } from 'recoil';
import { cartState } from '@/atoms/cartAtom';
import type { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [cart, setCart] = useRecoilState(cartState);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="bg-white dark:bg-white p-8 rounded-lg shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[400px] object-contain"
            />
          </div>
        </div>
        <div className="md:w-1/2 space-y-4">
          <div className="badge badge-outline">{product.category}</div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <Rating value={product.rating.rate} reviews={product.rating.count} />
          <p className="text-gray-600">{product.description}</p>
          <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-4">
            <div className="join">
              <button 
                className="btn join-item"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                -
              </button>
              <input 
                type="number"
                className="input input-bordered join-item w-20 text-center"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
              />
              <button 
                className="btn join-item"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
            <button 
              className="btn btn-primary flex-1"
              onClick={addToCart}
            >
              장바구니에 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
