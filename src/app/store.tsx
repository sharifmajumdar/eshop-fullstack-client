import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/Cart/cartSlice";
import productsReducer from "../features/Products/productsSlice";
import loginReducer from "../auth/Login/loginSlice";
import adminReducer from "../features/Admin/adminSlice"

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        login: loginReducer,
        addproduct: adminReducer 
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;