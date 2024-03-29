import { configureStore } from "@reduxjs/toolkit";
// import { booksApi } from "./services/booksApi";
import themeToggleSliceReducer from "../features/themeToggle/themeToggleSlice";
import { apiSlice } from "../api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice from "../features/auth/authSlice";
// import { signupUser } from "../features/auth/singupUser";
// import { loginUser } from "../features/auth/loginUser";




const store = configureStore({
  reducer: {
    // [booksApi.reducerPath]: booksApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    authSlice:authSlice,
    theme: themeToggleSliceReducer,
    // signupUser: signupUser.reducer,
    // loginUser:loginUser.reducer
 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store
setupListeners(store.dispatch);

  