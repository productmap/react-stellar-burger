import { createSlice, nanoid } from "@reduxjs/toolkit";
import update from "immutability-helper";

const burgerSlice = createSlice({
  name: "burger",
  initialState: {
    burger: { bun: "", ingredients: [] },
  },
  reducers: {
    addIngredient(state, action) {
      const ingredient = Object.assign({ key: nanoid() }, action.payload);
      if (action.payload.type === "bun") {
        state.burger.bun = ingredient;
      } else {
        state.burger.ingredients.push(ingredient);
      }
    },
    removeIngredient(state, action) {
      state.burger.ingredients = state.burger.ingredients.filter(
        (i) => i.key !== action.payload
      );
    },
    newBurger(state) {
      state.burger = { bun: "", ingredients: [] };
    },
    sortedBurger(state, action) {
      state.burger.ingredients = update(state.burger.ingredients, {
        $splice: [
          [action.payload.dragIndex, 1],
          [
            action.payload.hoverIndex,
            0,
            state.burger.ingredients[action.payload.dragIndex],
          ],
        ],
      });
    },
  },
});

export const { addIngredient, removeIngredient, newBurger, sortedBurger } =
  burgerSlice.actions;
export default burgerSlice.reducer;
