import { configureStore } from "@reduxjs/toolkit";
import { ingredients } from "./api/ingredients/ingredients";
import { orderBurger } from "./api/order-burger/order-burger";
import burgerReducer from "./burger/burger";
import currentIngredientReducer from "./current-ingredient/current-ingredient";
import orderNumberReducer from "./order-number/order-number";

export const store = configureStore({
  reducer: {
    [ingredients.reducerPath]: ingredients.reducer,
    [orderBurger.reducerPath]: orderBurger.reducer,
    currentIngredient: currentIngredientReducer,
    burger: burgerReducer,
    orderNumber: orderNumberReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ingredients.middleware,
      orderBurger.middleware
    ),
  // devTools: false,
});
