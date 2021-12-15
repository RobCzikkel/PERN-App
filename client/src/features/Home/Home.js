import React from "react";
import UserHead from "../../components/UserHead";
import Products from './Products'

const Home = ({ user }) => {
    return (
        <div id="Home" className="w-full text-center align-middle">
            <UserHead user={user}/>
            <Products />

        </div>
    )
}

export default Home;