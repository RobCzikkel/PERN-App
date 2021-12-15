import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { setSuccess, setOrder } from './OrderSlice';
import CircularIndeterminat from '../../components/Spinner';
import OrderItem from '../../components/OrderItem';
import { resetCart } from '../Cart/CartSlice';

const CheckoutForm = () => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [line1, setLine1] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');

  const cartItems = useSelector((state) => state.cart.items); 
  const cartID = useSelector((state) => state.login.cartID);

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const calcTotal = () => {
    if (cartItems.length > 0) {
        return cartItems.reduce((acc, cur) => {
            return acc + (cur.quantity * cur.price)
        }, 0)
    } else {
        return 1;
    }
  };

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement)
    });

    if(!error) {
      setIsLoading(true);
      try {
        const { id } = paymentMethod;
        const response = await fetch('/cart/checkout', {
          method: 'POST',
          body: JSON.stringify({
            'cart_id': cartID,
            'email': email,
            'first': first,
            'last': last,
            'address': {
              'line1': line1,
              'city': city,
              'postcode': postcode
            },
            'amount': calcTotal(),
            'id': id
          }),
          headers: {
            'Content-Type': 'application/json'
        }
        });

        const data = await response.json();
        console.log(data);
        dispatch(setOrder(data))

      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      }

      dispatch(setSuccess(true));
      setIsLoading(false);
      dispatch(resetCart())
    } 
    if (error) {
      setErrorMessage(error.message);
    }

  };

  const options = {
    style: {
      base: {
        iconColor: '#c4f0ff',
        textAlign: 'center',
        letterSpacing: '2px',
        color: 'black',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#6e34eb',
        },
        ':focus': {
          color: '#6e34eb',
        },
        '::selection': {
          color: '#6e34eb',
        },
        '::placeholder': {
          color: '#6e34eb',
          fontSize: '16px'
        },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: 'red',
      },
    },
  }
  
  return (
    <div className={'flex justify-between pt-4'}>
      <form className={'w-6/12 p-2 flex  flex-col'} onSubmit={handleSubmit}>
      <h1 className={'my-4 py-2 text-2xl text-indigo-900'}>SHIPPING DETAILS</h1>
      <div className={'flex justify-between'}>
        <div className={'w-5/12'}>
          <label className={'labels'} for="first">First Name</label>
          <input className={'payment w-full'} type="text" id="first" name="first" value={first} onChange={(e) => setFirst(e.target.value)} required></input>
        </div>
        <div className={'w-5/12'}>
          <label className={'labels'} for="last">Last Name</label>
          <input className={'payment w-full'} type="text" id="last" name="last" value={last} onChange={(e) => setLast(e.target.value)} required></input>
        </div>
      </div>
      <label className={'labels'} for="last">Email</label>
      <input className={'payment w-full'} type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
      <label className={'labels'} for="line1">Street address</label>
      <input className={'payment w-full'} type="text" id="line1" name="line1" value={line1} onChange={(e) => setLine1(e.target.value)} required></input>

      <div className={'flex justify-between'}>
        <div className={'w-5/12'}>
          <label className={'labels'} for="city">City</label>
          <input className={'payment w-full'} type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required></input>
        </div>
        <div className={'w-5/12'}>
          <label className={'labels'} for="postcode">Postcode</label>
          <input className={'payment w-full'} type="text" id="postcode" name="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} required></input>
        </div>
      </div>
      
      

      <h1 className={'my-4 py-2 text-2xl text-indigo-900'}>CARD DETAILS</h1>
      <label className={'labels'}>Card number</label>
      <CardNumberElement className={'payment'} options={options}/>
      <div className={'flex justify-between'}>
        <div className={'w-5/12'}>
          <label className={'labels'}>Expiry date</label>
          <CardExpiryElement className={'payment'} options={options}/>
        </div>
        <div className={'w-5/12'}>
          <label className={'labels'}>CVV</label>
          <CardCvcElement className={'payment'} options={options}/>
        </div>
      </div>
      
      <button className={'bg-indigo-500 text-white text-lg p-4 rounded-sm w-full mt-4'} disabled={!stripe}>Pay</button>
      {errorMessage && <div className={'mt-5'}><h2 className={'text-white bg-red-400 p-2 rounded-sm text-center text-lg'}>{errorMessage}</h2></div>}
    </form>
    <div className={'w-2/5 p-2'}>
      <h1 className={'my-4 py-2 text-2xl text-indigo-900'}>YOUR ORDER</h1>
      <div>
        {cartItems.map(item => <OrderItem key={item.id} item={item} />)}
      </div>
      <div className={'flex text-white justify-between py-4 px-3 bg-indigo-500'}>
        <h2 className={'text-2xl'}>TOTAL</h2>
        <p className={'text-2xl font-extralight'}>{`£${calcTotal()}`}</p>
      </div>
    </div>
    {isLoading && <CircularIndeterminat />}
    </div>
    
  )
};

export default CheckoutForm;