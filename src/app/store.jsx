import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import todoReduc from "../features/todoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReduc,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
