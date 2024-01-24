import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://house-hunter-server-rho.vercel.app/api",
  }),
  tagTypes: ["Users", "Houses"],
  endpoints: () => ({}),
});

export default baseApi;
