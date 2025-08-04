import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import CartSummary from "../components/CartSummary";

const Home = () => {
    const dispatch = useDispatch();
    const { items, status } = useSelector(state => state.products);
    
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const renderedProducts = useMemo(
        () => items.map(p => <ProductCard key={p.id} product={p} />),
        [items]
    );


    return (
        <div className="p-4">
            <h1 className="text-5xl font-bold text-center mx-3 p-3">Products</h1>
            {status === 'loading'
                ? <p>Loading...</p>
                : <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {renderedProducts}
                </div>
            }
            <CartSummary />
        </div>
    );
}

export default Home;
