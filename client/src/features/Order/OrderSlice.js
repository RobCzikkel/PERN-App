import { createSlice } from "@reduxjs/toolkit";

export const getOrders = () => async (dispatch) => {
    dispatch(resetOrder())
    try {
        const response = await fetch('/orders');

        if(response.ok) {
            const orders = await response.json();
            dispatch(setOrder(orders));
            dispatch(setIsLoading(false))
        }
        if(!response.ok) {
            const error = await response.json()
            dispatch(setError(error))
        }

    } catch (error) {
        throw error;
    }
}

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        id: null,
        error: null,
        success: false,
        order: null,
        isLoading: true
    },
    reducers: {
        setID(state, action) {
            state.id = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        setSuccess(state, action) {
            state.success = action.payload
        },
        setOrder(state,action) {
            state.order = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        resetOrder(state,action) {
            state.order = null;
        }
    }
})

export const { setID, setError, setSuccess, setOrder, setIsLoading, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;