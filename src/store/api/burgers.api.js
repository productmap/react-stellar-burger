import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://norma.nomoreparties.space/api";

export const burgersApi = createApi({
  reducerPath: "burgersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => `/ingredients`,
      transformResponse: (response) => {
        return response.data;
      },
    }),
    orderBurger: builder.mutation({
      query: (payload) => ({
        url: `/orders`,
        method: "POST",
        body: { ingredients: payload },
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useOrderBurgerMutation } = burgersApi;
