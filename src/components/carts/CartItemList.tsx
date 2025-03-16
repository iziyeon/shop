import React from 'react';
import type { Product } from '@/types/product';

interface CartItemListProps {
  items: Product[];
  onRemove: (id: number) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({ items, onRemove }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-4 border rounded">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
