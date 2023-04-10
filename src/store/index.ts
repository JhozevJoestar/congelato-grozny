import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import cartSlice from "./reducers/cartSlice";

export const rootReducer = combineReducers({
    cart: cartSlice
})

export const store = configureStore({ reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware(),})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;