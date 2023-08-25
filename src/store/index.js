import { configureStore } from "@reduxjs/toolkit";
import { burgersApi } from "./api/burgers.api";
import burgerReducer from "./burger";
import currentIngredientReducer from "./current-ingredient";
import orderNumberReducer from "./order-number";

export const store = configureStore({
  reducer: {
    [burgersApi.reducerPath]: burgersApi.reducer,
    currentIngredient: currentIngredientReducer,
    burger: burgerReducer,
    orderNumber: orderNumberReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      burgersApi.middleware
    ),
  // devTools: false,
});
