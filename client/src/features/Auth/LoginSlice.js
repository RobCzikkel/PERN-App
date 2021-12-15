import { createSlice } from '@reduxjs/toolkit';



export const login = (username, password) => async(dispatch) => {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            const error = await response.json();
            dispatch(setError(error.message))
        }
        
        if (response.ok) {
            // dispatch(setLoggedIn());
            const cartID = await response.json()
            dispatch(setCartID(cartID))
            dispatch(setError(null));
            dispatch(setLoggedIn());
        }

    } catch(err) {
        throw err;
    }
}

export const signup = (username, email, password) => async(dispatch) => {
    try {
        const response = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'email': email,
                'password': password
            }),
            headers: {
                'Content-Type': 'application/json'
            }            
        });


        if (response.status === 500) {
            const message = await response.json();
            dispatch(setSigninError(message.constraint))
        }

        
        if (response.ok) {
            const cartID = await response.json();
            dispatch(setLoggedIn());
            dispatch(setCartID(cartID));
            dispatch(setSigninError(null));
        }
        

    } catch(err) {
        console.log(err);
    }
}

export const logout = () => async(dispatch) => {
    await fetch('/logout');
    dispatch(setLoggedOut())
    dispatch(setUser(null))
}

export const authcheck = () => async(dispatch) => {
    try {
        const response = await fetch('/authcheck');
        if (response.status === 200) {
            const user = await response.json()
            dispatch(setCartID(user.cart_id))
            dispatch(setUser(user))
            dispatch(setLoggedIn());
        }
    } catch(err) {
        console.log(err)
    }
}



const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null,
        isLoggedIn: false,
        error: null,
        signinError: null,
        cartID: null,
        google: false
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setCartID(state,action) {
            state.cartID = action.payload
        },
        setLoggedIn(state, action) {
            state.isLoggedIn = true;
        },
        setLoggedOut(state, action) {
            state.isLoggedIn = false;
        },
        setError(state, action) {
            state.error = action.payload
        },
        setSigninError(state,action) {
            state.signinError = action.payload;
        },

       
    }
})

export const { setUser, setLoggedIn, setLoggedOut, setError, setSigninError, setCartID } = loginSlice.actions;

export default loginSlice.reducer