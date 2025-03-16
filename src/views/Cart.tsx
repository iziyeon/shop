import CartList from "../components/carts/CartList";

const Cart = () => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold">장바구니</h1>
      <CartList />
    </div>
  );
};

export default Cart;
