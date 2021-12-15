import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import OrderStatus from './OrderStatus';
import { useSelector } from 'react-redux';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const StripeCheckout = () => {
  
    const success = useSelector((state) => state.order.success)


    return (
        <Elements stripe={stripePromise}>

            {!success ? <CheckoutForm /> : <OrderStatus />}
        </Elements>
    );
};

export default StripeCheckout;