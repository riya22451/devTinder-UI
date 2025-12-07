import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";

const appStore=configureStore({
  reducer:{userReducer}
})
export default appStore;