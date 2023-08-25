import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const burgerSlice = createSlice({
  name: "burger",
  initialState: {
    burger: [],
  },
  reducers: {
    addIngredient(state, action) {
      const ingredient = Object.assign({ key: uuid() }, action.payload);
      if (action.payload.type === "bun") {
        state.burger = state.burger.filter((i) => i.type !== "bun");
        state.burger.push(ingredient, ingredient);
      } else {
        state.burger.push(ingredient);
      }
    },
    removeIngredient(state, action) {
      state.burger = state.burger.filter((i) => i.key !== action.payload);
    },
    newBurger(state) {
      state.burger = [];
    },
  },
});

export const { addIngredient, removeIngredient, newBurger } =
  burgerSlice.actions;
export default burgerSlice.reducer;
