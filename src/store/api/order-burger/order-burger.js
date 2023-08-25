import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderBurger = createApi({
  reducerPath: "api/orderBurger",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://norma.nomoreparties.space/api",
  }),
  endpoints: (builder) => ({
    orderBurger: builder.mutation({
      query: (payload) => ({
        url:`/orders`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: {ingredients: payload},
      }),
    }),
  }),
});

export const { useOrderBurgerMutation } = orderBurger;

export const orderBurgerResult = orderBurger.endpoints.orderBurger.select()
