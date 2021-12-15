import { createSlice } from "@reduxjs/toolkit";

export const loadProducts = () => async(dispatch) => {
    try {
        const response = await fetch(`/products/`);


        if (!response.ok) {
            const error = await response.json();
            dispatch(setError(error.message))
        }

        if (response.ok) {
            const data = await response.json();
            const products = data.map(item => ({
                ...item,
                quantity: 1
            }))

       
            dispatch(setProducts(products))
            dispatch(setError(null))
        }

    } catch(error) {
        throw error;
    }
}

export const getProductById = (id) => async(dispatch) => {
    try {
        const response = await fetch(`/products/${id}`);

        if (!response.ok) {
            const error = await response.json();
            console.log(error)
            dispatch(setError(error.message))
        }

        if (response.ok) {
            const data = await response.json();
            const item = {...data, quantity: 1};
            dispatch(setItem(item))
            dispatch(setError(null))
        }

    } catch(error) {

    }
}

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: {},
        item: null,
        error: null,
        cat: 'lows'
    },
    reducers: {
        setProducts(state, action) {
            action.payload.forEach(product => {
                state.products[product.id] = product
            });
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setCat(state, action) {
            state.cat = action.payload;
        },
        setItem(state, action) {
            state.item = action.payload;
        },
        setLike(state,action) {
            state.products[action.payload].liked = true;
        },
        setUnlike(state,action) {
            state.products[action.payload].liked = false;
        }
    }
})

export const { setProducts, setError, setCat, setItem, setLike, setUnlike } = productSlice.actions;

export default productSlice.reducer;