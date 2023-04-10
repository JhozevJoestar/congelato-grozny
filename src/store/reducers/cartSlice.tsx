import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from './../../components/Products';

interface initial {
    cart: IProduct[],
    counter: number,
    readonly: boolean
} 

export const initialState: initial = {
    cart: [],
    counter: 0,
    readonly: false
  };


  
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCartSlice: (state, action: PayloadAction<IProduct>) => {
            const newCode = action.payload
            const existingCart = JSON.parse(JSON.stringify(state.cart));
            if(newCode.counter !== undefined) {
                newCode.counter += 1
            }
            const newCart = [...existingCart, {...newCode}];
            state.cart= newCart;
            state.counter += 1;
            console.log(JSON.parse(JSON.stringify(state.cart)))
        },
        decrement: (state: {cart: IProduct[], counter: number}, action: PayloadAction<IProduct>) => {
            const newCode = action.payload
            const existingCart = JSON.parse(JSON.stringify(state.cart));
            if (newCode.counter !== undefined){
                newCode.counter -= 1
            }
            const newCart = [{...existingCart, ...newCode}];
            state.cart= newCart;
            state.counter -= 1;
            console.log(existingCart)
        },
        increment: (state: {cart: IProduct[], counter: number}, action: PayloadAction<IProduct>) => {
            const newCode = action.payload
            const existingCart = JSON.parse(JSON.stringify(state.cart));
            if (newCode.counter !== undefined){
                newCode.counter += 1
            }
            const newCart = [{...existingCart, ...newCode}];
            state.cart= newCart;
            state.counter += 1;
        },
        deleteFromCart: (state: {cart: IProduct[], counter: number}, action: PayloadAction<IProduct>): any => {
            const newCode = action.payload
            const existingCart = JSON.parse(JSON.stringify(state.cart));
            if(newCode.counter)
            state.counter -= newCode.counter;
            if (newCode.counter !== undefined){
                newCode.counter -= newCode.counter
            }
            const newCart = [{...existingCart, ...newCode}];
            state.cart= newCart;
        },
        clearCart: (state: {cart: IProduct[], counter: number}, action: PayloadAction<number>): any => {
            const newCart: IProduct[] = [];
            state.cart= newCart;
            state.counter = 0
            
        },
        counterMinus: (state: {cart: IProduct[], counter: number}, action: PayloadAction<IProduct>) => {
            if(action.payload.counter)
            state.counter -= action.payload.counter;
        }
    },
  });

  export const { addToCartSlice, decrement, increment, clearCart } = cartSlice.actions;
  
  export default cartSlice.reducer;