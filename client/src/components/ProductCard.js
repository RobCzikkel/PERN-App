import React from "react";

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../features/Cart/CartSlice';

const ProductCard = ({ prodID, product, cartIDs }) => {

    const dispatch = useDispatch();
    
    const addItem = (e) => {
        dispatch(addToCart({prod_id: product.id, ...product}))
    };

    const deleteItem = (e) => {
        // const id = e.target.parentElement.dataset.id;
        // dispatch(removeFromCart(parseInt(id)));
        dispatch(removeFromCart(product.id));
    };

    const checkID = (id) => {
        return cartIDs.some(el => el === id)
    };

    return (
        <div className="w-1/3 flex flex-col text-center ml-5 mb-5 border-b shadow-md rounded-lg">
            <Link to={`/product/${product.id}`}><img src={`/images/${product.photo}`} alt=""/></Link>
            <div id ="title" className="flex flex-col items-start p-2">
                <h2 className="font-bold">{product.name}</h2>
            </div>
            <div className="text-left p-2">
                <h6>{product.description}</h6>
            </div>
            <div className="p-4 flex justify-end">
            

            {/* {product.liked === false ? <button data-id={prodID} ><ShoppingCartOutlinedIcon onClick={addToCart} fontSize='medium'/></button> 
            : <button className="z-10" ><ShoppingCartIcon onClick={(e) => dispatch(setUnlike(e.target.parentElement.dataset.id))} data-id={prodID} /></button>} */}

            {/* {!checkID(product.id) ? <button data-id={prodID} ><ShoppingCartOutlinedIcon onClick={addItem} fontSize='medium'/></button> 
            : <button className="z-10" ><ShoppingCartIcon onClick={deleteItem} data-id={prodID} /></button>} */}

            {!checkID(product.id) ? <IconButton onClick={addItem}><ShoppingCartOutlinedIcon sx={{ color: "black" }} fontSize='medium'/></IconButton> 
            : <IconButton onClick={deleteItem}><ShoppingCartIcon sx={{ color: "black" }}/></IconButton>}
            </div>
        </div>
    );
};

export default ProductCard;