import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { login, setLoggedIn, authcheck } from './LoginSlice';
import { useDispatch, useSelector } from "react-redux";
import { persistor } from '../../app/store';
import { syncDB } from '../Cart/CartSlice';
import { FaGooglePlusG } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";



const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const error = useSelector((state) => state.login.error);
    const history = useHistory()


    useEffect(() => {
        dispatch(authcheck());
        if (isLoggedIn && !error) {
            dispatch(syncDB());
            history.push('/')
        }
    }, [isLoggedIn, error, history, dispatch])

    async function handleSubmit(e) {
        e.preventDefault();
        await dispatch(login(username, password))
        setUsername('')
        setPassword('')
        persistor.pause();
        // dispatch(setLoggedIn())
    };

    const googleLogin = () => {
        window.open('https://localhost:5000/google', '_self');
        persistor.pause();
    }

    return (
        <div id="Login" className="w-full mt-24 p-4 flex flex-col justify-center">
            <div className="w-6/12 mx-auto flex flex-col my-4 items-center py-10 px-14 shadow-xl">
                <h1 className="p-6 font-normal text-2xl text-gray-400">Log in using credentials</h1>
                <form onSubmit={handleSubmit}>
                    <section className="flex items-center w-full mt-6 flex-col">
                        <input className="inputs"
                        type="text"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required>
                        </input>

                        <input className="inputs"
                        type="password"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required>
                        </input>
                        {error && <h1 className="p-3 text-red-700">{error}</h1>}
                        <input className="border p-3 text-white bg-indigo-600 hover:bg-indigo-900 mt-4 w-96 rounded " value="Login" type="submit"></input>
                    </section>
                </form>
                <p className="self-start mt-6 text-gray-600 ">Not registered? Sign up <Link to={'/register'}><span className="text-blue-700 underline">here</span></Link></p>
                <h1 className="p-6 font-normal text-2xl text-gray-400">OR</h1>
                <button onClick={googleLogin} className="border p-3 text-white bg-red-600 hover:bg-red-900 mt-4 w-96 rounded text-centre">
                    <IconContext.Provider value={{ className: "w-20 inline text-2xl" }}>
                    <FaGooglePlusG /></IconContext.Provider></button> 
                
            </div>
            
        </div>
    )
}

export default Login;