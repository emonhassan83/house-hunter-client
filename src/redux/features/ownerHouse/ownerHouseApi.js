import baseApi from "../../api/baseApi";

const ownerHouseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHouses: builder.query({
      query: () => ({
        url: "/house-owner/all-owner-houses",
        method: "GET",
      }),
      providesTags: ["Houses"],
    }),

    getOwnerHouses: builder.query({
      query: () => {
        return {
          url: "/house-owner/houses",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllHousesQuery, useGetOwnerHousesQuery } = ownerHouseApi;
