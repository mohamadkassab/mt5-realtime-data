import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Reducer";

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware(), thunk];
  },
});

export default store;
