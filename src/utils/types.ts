export interface IIngredient {
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  _id: string;
  __v: number;
  key?: string;
  count?: string;
}

export interface IBurgerIngredient extends IIngredient {
  key: string;
}

export interface IOrder {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IFeedOrder extends Omit<IOrder, "__v" | "owner"> {
  number: number;
}

export interface IBurger {
  bun: IIngredient;
  ingredients: IIngredient[];
}

export interface CustomError extends Error {
  data: {
    message: string;
  };
}
