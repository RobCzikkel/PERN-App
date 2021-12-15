import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../Order/OrderSlice';
import OrderItem from '../../components/OrderItem';
import { Link } from 'react-router-dom';
import CircularIndeterminat from '../../components/Spinner';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

export default function Profile() {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
    const orders = useSelector((state) => state.order.order);
    const isLoading = useSelector((state) => state.order.isLoading);
    const error = useSelector((state) => state.order.error)

    const history = useHistory();

    
    
    useEffect(() => {
        if(!isLoggedIn) {
            history.push('/');
        };
        dispatch(getOrders())
        
    },[isLoggedIn, history,  dispatch]);

    if(error) {
        return (
            <div>
                <h1>{error}</h1>
            </div>
        )
    }

    if(isLoading) {
        return <CircularIndeterminat />
    } else {
        return (
        
            <div id="Profile" className="w-full py-20">
                <div className="w-9/12 mx-auto flex flex-col">
                    <h1 className="font-bold text-2xl text-indigo-900 py-8">Recent orders</h1>
    
                    {orders && orders.map(order =>  
                        (<div key={order.id} className=" my-8 flex flex-col rounded-sm shadow-md">
                            <div className="bg-indigo-400 p-2 flex justify-between text-white">
                                <p>{moment(order.created).format("DD MMM YYYY").toString()}</p>
                                <p className="font-light"><span className="font-semibold">£{order.total}</span></p>
                            </div>
                            {order.items.map(item => <OrderItem key={item.id} item={item} />)}
                        </div> )
                    )}
                    <Link to={'/'}><button className={'bg-indigo-400 hover:bg-indigo-600 text-white text-lg p-3 float-right rounded-sm mt-5 ml-3'}>Continue shopping</button></Link>
                </div>
            </div>
        )
    }
    
}
