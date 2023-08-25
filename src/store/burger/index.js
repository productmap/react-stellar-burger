import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import update from "immutability-helper";

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
    sortedBurger(state, action) {
      state.burger = update(state.burger, {
        $splice: [
          [action.payload.dragIndex, 1],
          [action.payload.hoverIndex, 0, state.burger[action.payload.dragIndex]],
        ],
      });
    },
  },
});

export const { addIngredient, removeIngredient, newBurger, sortedBurger } =
  burgerSlice.actions;
export default burgerSlice.reducer;
