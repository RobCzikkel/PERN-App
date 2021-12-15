import React from "react";
import { BsFillEmojiExpressionlessFill, BsFillEmojiSunglassesFill, BsCart2 } from 'react-icons/bs';
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserHead = ({ user }) => {

    const numOfItems = useSelector((state) => state.cart.items.length)


    return (
        <section className="py-6 w-full flex justify-between items-end border-gray-900 border-b">
            <Link to={'/profile'}><div className="flex ">
            {!user ? <IconContext.Provider value={{size:"1.7em", className:"text-indigo-600"}}><BsFillEmojiExpressionlessFill /></IconContext.Provider> : <IconContext.Provider value={{size:"1.7em", className:"text-indigo-600"}}><BsFillEmojiSunglassesFill /> </IconContext.Provider> }
            <h3 className="text-indigo-900 text-xl ml-2 self-end"><small className="text-sm">Logged in as: </small>{user && user.username}</h3>
            </div></Link>
            <Link to={'/cart'}>
            <div className="flex p-2">
            <IconContext.Provider value={{size:"1.7em", className:"text-indigo-900 relative top-2 "}}><BsCart2 /></IconContext.Provider>
            <small className="z-10 relative right-2 top-0 text-white bg-indigo-600 rounded-2xl px-2 py-1">{numOfItems}</small>
            </div></Link>
        </section>
    )
}

export default UserHead;