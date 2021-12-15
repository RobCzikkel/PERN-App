import React from "react";
import { removeFromCart } from '../features/Cart/CartSlice';
import { useDispatch } from "react-redux";
import { changeQuantity } from '../features/Cart/CartSlice'

const CartItem = ({ item }) => {

    const dispatch = useDispatch()
    const handleChange = (e) => {
        e.preventDefault();
        const qty = parseInt(e.target.value);
        const id = item.prod_id
        // dispatch(changeQty({id, qty}))
        dispatch(changeQuantity(id, qty))
    }

    const removeItem = () => {
        dispatch(removeFromCart(item.prod_id))
    }
    return (
        <div className="flex p-1 justify-between mt-4 border-b">
            <div>
                <img onClick={removeItem} className="w-5 relative inline left-0 top-6 z-10 hover:scale-50" src="images/close.png" alt=""/>
                <img className="h-32 relative" src={`/images/${item.photo}`} alt=""/>
            </div>
            
            <div className="flex flex-col items-end pt-6">
                
                <h2 className="font-extralight uppercase text-gray-400 text-md">{item.name}</h2>
                <p className="font-semibold text-xl">{`£${item.price}`}</p>
                <label className="text-xs text-gray-700 mt-2" htmlFor="qty">QTY</label>
                <select onChange={handleChange} className="appearance-none text-s focus:outline-none" name="quantity" id="qty">
                    <option value={item.quantity} disabled selected>{item.quantity}</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            
        </div>
    )
}

export default CartItem;