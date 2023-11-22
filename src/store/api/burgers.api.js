import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://norma.nomoreparties.space/api";
const WS_URL = "wss://norma.nomoreparties.space"
const accessToken = localStorage.getItem("accessToken") ?? "";
const refreshToken = localStorage.getItem("refreshToken") ?? "";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    if (accessToken) {
      headers.set("Authorization", accessToken);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response?.error?.status === 401 || response?.error?.status === 403) {
    // console.log("Refresh token");
    if (refreshToken) {
      const refreshResponse = await baseQuery(
        { url: "/auth/token", method: "POST", body: { token: refreshToken } },
        api,
        extraOptions
      );

      if (refreshResponse) {
        // console.log(refreshResponse)
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
        localStorage.setItem("refreshToken", refreshResponse.data.refreshToken);
      }
    }
  }
  return response;
};

export const burgersApi = createApi({
  reducerPath: "burgersApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (payload) => ({
        url: `auth/register`,
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: `/password-reset`,
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: `/password-reset/reset`,
        method: "POST",
        body: payload,
      }),
    }),
    getToken: builder.mutation({
      query: (payload) => ({
        url: `auth/token`,
        method: "POST",
        body: { token: refreshToken },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
        body: { token: refreshToken },
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `/auth/user`,
      }),
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/auth/user`,
        method: "PATCH",
        body: payload,
      }),
    }),
    getIngredients: builder.query({
      query: () => `/ingredients`,
      transformResponse: (response) => response.data,
    }),
    orderBurger: builder.mutation({
      query: (payload) => ({
        url: `/orders`,
        method: "POST",
        body: { ingredients: payload, token: accessToken },
      }),
    }),
    getFeed: builder.query({
      query: (channel) => `/orders/all`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket(WS_URL);
        try {
          await cacheDataLoaded;
          const listener = (event) => {
            const data = JSON.parse(event.data);
            if (data.channel !== arg) return;

            updateCachedData((draft) => {
              draft.push(data);
            });
          };
          ws.addEventListener("message", listener);
        } catch {
          console.log("error");
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
    getUserFeed: builder.query({
      query: (channel) => `/orders`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket(
          `${WS_URL}/orders?token=${accessToken.split(" ")[1]}`
        );
        try {
          await cacheDataLoaded;
          const listener = (event) => {
            const data = JSON.parse(event.data);
            if (data.channel !== arg) return;

            updateCachedData((draft) => {
              // draft.push(data);
            });
          };
          ws.addEventListener("message", listener);
        } catch {
          console.log("error");
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetIngredientsQuery,
  useOrderBurgerMutation,
  useGetFeedQuery,
  useGetUserFeedQuery,
} = burgersApi;
