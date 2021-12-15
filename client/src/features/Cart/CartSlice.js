import { createSlice } from "@reduxjs/toolkit";


// API helpers
export const addCartItem = async (cart_id, qty, prod_id) => {
    try {
        const response =  fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                'cart_id': cart_id,
                'quantity': qty,
                'prod_id': prod_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response;

    } catch(err) {
        console.log(err)
    }
};

export const removeCartItem = async (id) => {
    try {
        const response =  fetch(`/cart/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;

    } catch(err) {
        console.log(err)
    }
};

export const changeQTY = async(prod_id, qty) => {
    try {
        const response = fetch(`/cart/items/${prod_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                'quantity': qty
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch(err) {
        console.log(err);
    }
};


// Add items in cart to DB upon signing in
export const syncDB = () => async(dispatch, getState) => {
    const cart = getState().cart.items;
    const cartID = getState().login.cartID;
    console.log(cartID)
    if (cartID !== null && cart.length > 0) {
        cart.map(async(item) => await addCartItem(cartID, item.quantity, item.id))
    }

    return;
};

// Load cart into store in App component and after every change to the cart
export const loadCart = () => async(dispatch, getState) => {
    const isLoggedIn = getState().login.isLoggedIn;
    if (isLoggedIn) {
        dispatch(resetCart());
        try {
            const response = await fetch('/cart');

            if (!response.ok) {
                const error = await response.json();
                dispatch(setError(error))
            }

            if (response.ok) {
                const cart = await response.json();
                cart.items.map(async item => {
                    return await dispatch(addItem(item))
                });
            }
        
        } catch(err) {
            throw err;
        }
    }
};

export const addToCart = (item) => async(dispatch, getState) => {
    const isLoggedIn = getState().login.isLoggedIn;
    const cartID = getState().login.cartID;
    if (isLoggedIn) {
        try {
            const response = await addCartItem(cartID, item.quantity, item.id);
            if (!response.ok) {
                const error = await response.json();
                dispatch(setError(error))
            }

            if (response.ok) {
                dispatch(loadCart())
            }

        } catch(err) {
            throw err;
        }
    };
    if (!isLoggedIn) {
        dispatch(addItem(item))
    }
    
}

export const removeFromCart = (id) => async(dispatch, getState) => {
    const isLoggedIn = getState().login.isLoggedIn;
    if (isLoggedIn) {
        try {
            const response = await removeCartItem(id);
            if (!response.ok) {
                const error = await response.json();
                dispatch(setError(error))
            }

            if (response.ok) {
                dispatch(loadCart(true))
            }

        } catch(err) {
            throw err;
        }
    };

    if(!isLoggedIn) {
        dispatch(deleteItem(id))
    }
};


export const changeQuantity = (prod_id, qty) => async(dispatch, getState) => {
    const isLoggedIn = getState().login.isLoggedIn;
    if (isLoggedIn) {
        try {
            const response = await changeQTY(prod_id, qty);
            if (!response.ok) {
                const error = await response.json();
                dispatch(setError(error))
            }

            if (response.ok) {                
                dispatch(loadCart())
            }

        } catch(err) {
            throw err;
        }
    };

    if(!isLoggedIn) {
        dispatch(changeQty({prod_id, qty}))
    }
}


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        error: null,
        loaded: null
    },
    reducers: { 
        addItem(state, action) {
            state.items.push(action.payload);
        },
        resetCart(state,action) {
            state.items = []
        },
        deleteItem(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        changeQty(state, action) {
            const item = state.items.find(item => item.id === action.payload.prod_id)
            item.quantity = action.payload.qty
        },
        setError(state, action) {
            state.error = action.payload;
        },

    }
})


export const { addItem, deleteItem, changeQty, setError, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

