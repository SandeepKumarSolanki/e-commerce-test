import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';

const CartSummary = React.memo(() => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, items);
      alert('Cart submitted successfully!');
      dispatch(clearCart());
      setOpen(false);
    } catch {
      alert('Error submitting cart');
    }
  };

  // close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 bg-white rounded-full shadow hover:shadow-md transition"
      >
        <ShoppingCart size={24} className="text-gray-700" />
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={ref}
          className="mt-2 w-72 bg-white border rounded-2xl shadow-lg p-4"
        >
          <h3 className="text-lg font-bold mb-3">Your Cart</h3>

          {items.length === 0 ? (
            <p className="text-gray-600">No items in cart.</p>
          ) : (
            <ul className="max-h-48 overflow-y-auto space-y-2">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="flex justify-between text-sm text-gray-800"
                >
                  <span>{i.title}</span>
                  <span>x{i.quantity}</span>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-full transition"
            >
              Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
});

export default CartSummary;



