import React from "react";
import { useSelector } from "react-redux";
import CartItem from '../../components/CartItem';
import { Link } from "react-router-dom";

const Cart = () => {

    const cartItems = useSelector((state) => state.cart.items);
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

   
    const calcTotal = () => {
        if (cartItems.length > 0) {
            return cartItems.reduce((acc, cur) => {
                return acc + (cur.quantity * cur.price)
            }, 0)
        } else {
            return 0;
        }
    };
    
    return (
        <div id="Cart" className="w-full flex justify-between mt-5">

            <div id="items" className="flex flex-col w-7/12">
                {!isLoggedIn && <h3><small><Link to={'/login'}><span className="text-blue-600">Sign in</span></Link> to sync your cart across all devices</small></h3>}
                {cartItems.length < 1 && <h1 className="text-2xl my-auto mx-auto">Your cart is empty</h1>}
                {cartItems.map(item => <CartItem key={item.id} item={item}/>)}
            </div>

            <div id="summary" className="flex flex-col divide-y-2 divide-gray-500 w-4/12 p-5">
                <h1 className="py-4 text-xl font-semibold">TOTAL</h1>
                <div className="py-5">
                    <div className="flex py-2 justify-between border-b border-gray-300">
                        <h2>Sub-total</h2>
                        <p className="font-extralight">{`£${calcTotal()}`}</p>
                    </div>
                    <div className="flex py-2 justify-between">
                        <h2>Cost of the pain of developing this</h2>
                        <p className="font-extralight">£20000000</p>
                    </div>
                </div>
                <div className="w-full"><Link to={isLoggedIn ? '/checkout' : '/login'}><button disabled={cartItems.length < 1} className="bg-indigo-500 disabled:opacity-50 hover:bg-indigo-800 w-full mt-4 text-white rounded-sm p-4">Checkout</button></Link></div>
                
            </div>
            {/* <JSONPretty id="json-pretty" data={cartItems}></JSONPretty> */}
        </div>
    )
};

export default Cart;