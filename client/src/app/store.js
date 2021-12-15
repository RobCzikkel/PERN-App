import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/Auth/LoginSlice';
import productReducer from '../features/Home/ProductSlice';
import cartReducer from '../features/Cart/CartSlice';
import orderReducer from '../features/Order/OrderSlice'
import { persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const persistCart = {
  key: 'items',
  storage,
  stateReconciler: hardSet,
}


export const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productReducer,
    cart: persistReducer(persistCart, cartReducer),
    order: orderReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store, { manualPersist: true })