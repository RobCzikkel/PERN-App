import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav.js';
import Home from './features/Home/Home.js';
import Login from './features/Auth/Login.js';
import { useSelector, useDispatch } from "react-redux";
import { authcheck } from './features/Auth/LoginSlice'
import SignUp from './features/Auth/SignUp';
import ProductDetail from './components/ProductDetail'
import Cart from './features/Cart/Cart';
import StripeCheckout from './features/Order/StripeCheckout';
import { persistor } from './app/store';
import Profile from './features/Auth/Profile';

function App() {
  
  const user = useSelector((state) => state.login.user);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authcheck());
    if (!isLoggedIn) {
      persistor.persist()
    } else {
        persistor.purge()
        
    }
  }, [isLoggedIn, dispatch])


  return (
    <BrowserRouter>
      <div className="App max-w-screen-lg h24 py-4 mx-auto">
        
        <Nav user={user}/>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} user={user} />}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/cart' component={Cart}></Route>
          <Route path='/register' component={SignUp}></Route>
          <Route path='/product/:id' component={ProductDetail}></Route>
          <Route path='/checkout' component={StripeCheckout}></Route>
          <Route path='/profile' component={Profile}></Route>
        </Switch>

      </div>
    </BrowserRouter>
    
  );
}

export default App;
