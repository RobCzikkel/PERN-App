import React, { useState,useEffect } from "react";
import { signup, authcheck } from "./LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { persistor } from '../../app/store';
import { FaGooglePlusG } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { syncDB } from '../Cart/CartSlice';



const SignUp = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn)
    const error = useSelector((state) => state.login.signinError)

    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(authcheck());
        if (isLoggedIn && !error) {
            dispatch(syncDB())
            history.push('/');
        }
    }, [isLoggedIn, error, history, dispatch])

    async function handleSubmit(e) {
        e.preventDefault(); 
        dispatch(signup(username, email, password));

        setUsername('')
        setPassword('')
        setEmail('')

    }

    const googleLogin = () => {
        window.open('https://localhost:5000/google', '_self');
        persistor.pause();
    }

    const errorMessage = error === 'users_email_key' ? 'Email exists' : 'Username taken'

    return (
        <div className="w-full mt-24 p-4 flex flex-col justify-center">
            <div className="w-6/12 mx-auto flex flex-col my-4 items-center py-10 px-14 shadow-xl">
                <h1 className="p-6 font-normal text-2xl text-gray-400">Register using credentials</h1>
                <form onSubmit={handleSubmit}>

                    <section className="flex items-center mt-6 flex-col mx-auto">   
                        <input className="inputs"
                        type="email"
                        placeholder="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required>
                        </input>

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
                        {error && <h1 className="p-3 text-red-700">{errorMessage}</h1>}
                        <input className="border p-3 text-white bg-indigo-600 hover:bg-indigo-900 mt-4 w-96 rounded " value="Sign Up" type="submit"></input>
                    </section>
                </form>
                <h1 className="p-6 font-normal text-2xl text-gray-400">OR</h1>
                    <button onClick={googleLogin} className="border p-3 text-white bg-red-600 hover:bg-red-900 mt-4 w-96 rounded text-centre">
                        <IconContext.Provider value={{ className: "w-20 inline text-2xl" }}>
                        <FaGooglePlusG /></IconContext.Provider></button> 
            </div>
        </div>
    )
}


export default SignUp;