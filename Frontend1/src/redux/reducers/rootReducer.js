import { combineReducers } from "redux";
import counterReducer from "./firstReducer";
import productReducer  from "./productReducer";
import cartReducer from "./cartReducer";

export const rootReducer = combineReducers({
  Array: counterReducer,
  product: productReducer,
  cart: cartReducer,
});
