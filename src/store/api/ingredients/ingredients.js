import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ingredients = createApi({
  reducerPath: "api/ingredients",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://norma.nomoreparties.space/api",
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => `/ingredients`,
      transformResponse: (response) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredients;
