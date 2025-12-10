import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import feedReducer from "./feedSlice.js";
import connectionSlice from "./connectionSlice.js";
const appStore=configureStore({
  reducer:{userReducer,feed:feedReducer,connections:connectionSlice}
})
export default appStore;