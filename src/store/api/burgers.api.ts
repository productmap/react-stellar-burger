import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout } from "../user";
import { IFeedOrder, IIngredient } from "../../utils/types";

const BASE_URL = "https://norma.nomoreparties.space/api";
const WS_URL = "wss://norma.nomoreparties.space";
type Channel = "redux" | "general";

type Feed = {
  orders: IFeedOrder[];
  totalToday: string;
  total: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    if (localStorage.getItem("accessToken")) {
      headers.set("authorization", localStorage.getItem("accessToken")!);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response.error?.status === 401 || response.error?.status === 403) {
    if (localStorage.getItem("refreshToken")) {
      const refreshResponse = await baseQuery(
        {
          url: "/auth/token",
          method: "POST",
          body: { token: localStorage.getItem("refreshToken") },
        },
        api,
        extraOptions
      );

      if (refreshResponse) {
        const tokens = refreshResponse as {
          data: { accessToken: string; refreshToken: string };
        };

        localStorage.setItem("accessToken", tokens.data.accessToken);
        localStorage.setItem("refreshToken", tokens.data.refreshToken);
      } else {
        localStorage.clear();
        api.dispatch(logout());
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
        url: `/auth/register`,
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
      query: () => ({
        url: `/auth/token`,
        method: "POST",
        body: { token: localStorage.getItem("refreshToken") },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
        body: { token: localStorage.getItem("refreshToken") },
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
      transformResponse: (response: { data: ReadonlyArray<IIngredient> }) =>
        response.data,
    }),
    orderBurger: builder.mutation({
      query: (payload) => ({
        url: `/orders`,
        method: "POST",
        body: {
          ingredients: payload,
          token: localStorage.getItem("accessToken"),
        },
      }),
    }),
    getFeed: builder.query<Feed, Channel>({
      query: () => `/orders/all`,
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket(WS_URL);
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData(() => data);
          };
          ws.addEventListener("message", listener);
        } catch {
          console.log("ws error");
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
    getUserFeed: builder.query<Feed, Channel>({
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // console.log("getUserFeed",accessToken)
        const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];
        const ws = new WebSocket(`${WS_URL}/orders?token=${accessToken}`);
        try {
          await cacheDataLoaded;
          ws.addEventListener("message", (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData(() => data);
          });
        } catch {
          console.log("ws error");
        }
        await cacheEntryRemoved;
        ws.close();
      },
      query: () => `/orders`,
      // transformResponse: (response) => response["orders"].reverse(),
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  // useLogoutMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetIngredientsQuery,
  useOrderBurgerMutation,
  useGetFeedQuery,
  useGetUserFeedQuery,
} = burgersApi;
