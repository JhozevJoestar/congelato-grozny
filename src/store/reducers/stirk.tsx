import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from './../../components/Products';

interface initial {
    cart: IProduct[],
    counter: number
} 

export const initialState: initial = {
    cart: [],
    counter: 0
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
            const newCart = [{...existingCart, newCode}];
            state.cart = newCart;
            console.log(JSON.parse(JSON.stringify(state.cart)))
            state.counter += 1;
        },
        increment: (state, action: PayloadAction<IProduct>) => {
            console.log(action.payload)
            const newCode = action.payload
            const existingCart = JSON.parse(JSON.stringify(state.cart));
            const newCart = [...existingCart, newCode];
            state.cart = newCart;
            console.log(JSON.parse(JSON.stringify(state.cart)))
            state.counter += 1;
        },
        // increment: (state: {cart: IProduct[], counter: number}, action: PayloadAction<IProduct>) => {
        //     const newCode = action.payload
        //     const existingCart = JSON.parse(JSON.stringify(state.cart));
        //     if (newCode.counter !== undefined){
        //         newCode.counter += 1
        //     }
        //     const newCart = [{...existingCart, ...newCode}];
        //     state.cart= newCart;
        //     console.log(JSON.parse(JSON.stringify(state.cart)))
        //     state.counter += 1;
        // },
        decrement: (state, action: PayloadAction<IProduct>) => {
            const newCode = action.payload
            const existingCart = JSON.parse(JSON.stringify(state.cart));
            if(newCode.counter !== 0) {
                if(newCode.counter !== undefined) {
                    newCode.counter -= 1
                }
                const newCart = [{...existingCart, ...newCode}];
                state.cart= newCart;
                state.counter -= 1;
            }
        },
        deleteFromCart: (state: any, action: PayloadAction<IProduct>) => ({
            ...state,
            cart: state.cart.filter((el: IProduct) => el.barcode !== action.payload.barcode),
        }),
        counterMinus: (state, action: PayloadAction<IProduct>) => {
            if(action.payload.counter) {
                state.counter -= action.payload.counter
                const newCode = action.payload.counter = 0
                const existingCart = JSON.parse(JSON.stringify(state.cart));
                const newCart = [{...existingCart, newCode}];
                state.cart= newCart;
            }
        }
        
    },
  });

  export const { addToCartSlice, decrement, increment, deleteFromCart, counterMinus } = cartSlice.actions;
  
  export default cartSlice.reducer;