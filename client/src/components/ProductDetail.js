import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from '../features/Home/ProductSlice';
import UserHead from './UserHead';
import { addToCart, removeFromCart } from '../features/Cart/CartSlice';

const ProductDetail = ({ match }) => {

    const item = useSelector((state) => state.products.item);
    const user = useSelector((state) => state.login.user);
    const cart = useSelector((state) => state.cart.items);
    // const cartIDs = isLoggedIn ? cart.map(item => item.prod_id) : cart.map(item => item.id);
    const cartIDs = cart.map(item => item.prod_id);
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductById(match.params.id))
    }, [dispatch, match.params.id])

    const checkID = (id) => {
        return cartIDs.some(el => el === id)
    };

    const addItem = (e) => {
        dispatch(addToCart({prod_id: item.id, ...item}))
    };

    const deleteItem = (e) => {
        dispatch(removeFromCart(parseInt(item.id)));
    };

    if (item !== null) {
        return (
            <div id="Home" className="w-full text-center align-middle">
                <UserHead user={user}/>
    
    
                <div className="flex justify-between">
                    <div id="shoe" className="w-8/12">
                        <img src={`/images/${item.photo}`} alt="" className="w-full"/>
                    </div>
                    <div id="info" className="w-4/12 flex flex-col justify-evenly pt-16">
                        <h1 className="font-extrabold text-2xl text-left tracking-wide">{item.name}</h1>
                        <p className="text-left font-black">{`£${item.price}`}</p>
                        <p className="text-left">{item.description}</p>
                        {!checkID(item.id) ? <button onClick={addItem} className="w-full p-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-700">Add to Cart</button>
                        : <button onClick={deleteItem} className="w-full p-4 text-white bg-pink-700 rounded-md hover:bg-pink-900">Remove</button>
                        }
                </div>
            </div>
            </div>
        ) 
    } else {
        return <h1>Item not found</h1>
    }
    
    
    
    
}

export default ProductDetail;