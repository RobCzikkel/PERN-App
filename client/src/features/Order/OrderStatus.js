import React from 'react';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/OrderItem';
import { Link } from "react-router-dom";

export default function OrderStatus() {

    const order = useSelector((state) => state.order.order);
    return (
        <div className={'p-5'}>
            <h1 className={'text-indigo-900 text-5xl text-center py-4'}>Thanks for your order!</h1>
            <p className={'text-indigo-900 text-2xl py-4'}>SUMMARY</p>
            <div className={'w-full flex mt-5 justify-around'}>

                <div className={'bg-indigo-400 flex flex-col text-white p-4 w-5/12 rounded-sm self-start'}>
                    <h3 className={'text-xl font-semibold mb-5'}>Shipping information:</h3>
                    <div className={'mx-auto w-10/12 flex flex-col font-light'}>
                        <p>{order.payment.shipping.name}</p>
                        <p>{order.payment.receipt_email}</p>
                        <p>{order.payment.shipping.address.line1}</p>
                        <p>{order.payment.shipping.address.city}</p>
                        <p>{order.payment.shipping.address.postal_code}</p>
                    </div>
                </div>

                <div className={'border-indigo-400 border p-4 w-5/12 rounded-sm flex flex-col'}>
                    <h3 className={'text-xl font-semibold mb-5'}>Your order:</h3>
                    <div className={'flex flex-col font-light'}>
                        {order.items.map(item => <OrderItem item={item}/>)}
                    </div>
                    <div className={'flex justify-between text-xl pt-6'}>
                        <h3 className={'font-semibold'}>TOTAL PAID</h3>
                        <p className={'font-light'}>{`£${order.total}`}</p>
                    </div>
                    
                </div>
            </div>
            <div className={'w-5/12 justify-around mx-auto mt-8 flex'}>
                <Link to={'/'}><button className={'bg-indigo-400 hover:bg-indigo-600 text-white text-lg inline mx-auto p-3 rounded-sm mt-5 ml-3'}>Continue shopping</button></Link>
                <Link to={'/profile'}><button className={'border border-indigo-400 hover:bg-indigo-600 hover:text-white text-indigo-800 text-lg inline mx-auto p-3 rounded-sm ml-3 mt-5'}>Order History</button></Link>
                </div>
            
            {/* <JSONPretty id="json-pretty" data={order}></JSONPretty> */}
        </div>
    )
}
