import { createSlice, nanoid } from "@reduxjs/toolkit";
import update from "immutability-helper";
import { IBurgerIngredient, IIngredient } from "../../utils/types";

type TBurger = {
  burger: { bun: IIngredient | null; ingredients: IIngredient[] };
};

const initialState: TBurger = {
  burger: { bun: null, ingredients: [] },
};

const burgerSlice = createSlice({
  name: "burger",
  initialState: initialState,
  reducers: {
    addIngredient(state, action: { payload: IIngredient }) {
      const ingredient: IBurgerIngredient = {
        key: nanoid(),
        ...action.payload
      };

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
      state.burger = { bun: null, ingredients: [] };
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
