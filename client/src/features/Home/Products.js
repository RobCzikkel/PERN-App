import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { loadProducts, setCat } from './ProductSlice';
import { loadCart } from '../Cart/CartSlice'

const Products = () => {
 
    const cat = useSelector((state) => state.products.cat);
    const products = useSelector((state) => state.products.products);
    const cart = useSelector((state) => state.cart.items);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    // const cartIDs = isLoggedIn ? cart.map(item => item.prod_id) : cart.map(item => item.id);
    const cartIDs = cart.map(item => item.prod_id);

    const dispatch = useDispatch();

    const filteredProducts = {} 
    Object.values(products).filter(item => item.category === cat).forEach(item => {
    filteredProducts[item.id] = item
    });

    
    useEffect(() => {
        dispatch(loadProducts())

        let delay = setTimeout(() => dispatch(loadCart()), 500);
      return () => {
        clearTimeout(delay);
      };
        
    }, [dispatch, isLoggedIn])


    const handleChange = (e) => {
        e.preventDefault();
        dispatch(setCat(e.target.value))
    }

    return (
        <div id="products" className="flex">
            {/* Categories Panel */}
            <div id="cat" className="flex flex-col w-1/12 py-2 px-1">
                <h1>CATEGORIES</h1>
                <select onChange={handleChange} className="mt-4" name="category">
                    <option value="lows">Lows</option>
                    <option value="highs">Highs</option>
                </select>
            </div>

            {/* Product list */}
            <div id="prod-grid" className="flex flex-wrap pt-3 pl-5 w-full">
                {Object.keys(filteredProducts).map((key) => {
                    const product = filteredProducts[key]
                    return <ProductCard key={key} cartIDs={cartIDs} prodID={key} product={product}/>
                }
                )}
                
            </div>
        </div>

    )
}

export default Products;