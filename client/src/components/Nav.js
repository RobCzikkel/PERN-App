import React from "react";
import { Link } from 'react-router-dom';
import { logout } from '../features/Auth/LoginSlice';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetCart } from '../features/Cart/CartSlice'

const Nav = () => {

    const dispatch = useDispatch();    
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn) 
    const history = useHistory()

    const handleClick = () => {
        dispatch(logout());
        dispatch(resetCart())
        history.push('/')
    }

    return (
        <nav className="flex flex-row justify-between border-indigo-400 py-4 border-b-2">
            <Link to='/'><div>
                <img className="w-10" src="/images/jumpman.png" alt=""/>
                </div></Link>
            
            <div className="w-5/12">
                <input className="p-1.5 w-full border border-gray-300  rounded" placeholder="Type your shit"></input>
            </div>
            <div>

                { !isLoggedIn && <Link to="/login"><button className="p-1.5 border rounded border-indigo-500 hover:bg-indigo-500 hover:text-white mr-1 w-16">Log In</button></Link>}

                {isLoggedIn ? <button onClick={handleClick} className="p-1.5 border rounded bg-indigo-500 text-white hover:bg-white hover:text-black hover:border-indigo-500 mr-1">Log Out</button>
                :<Link to="/register"><button className="p-1.5 border rounded bg-indigo-500 text-white hover:bg-white hover:text-black hover:border-indigo-500 mr-1">Sign Up</button></Link>}
            </div>
        </nav>
    )
}

export default Nav;