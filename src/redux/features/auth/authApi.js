import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveUser: builder.mutation({
      query: (userData) => {
        console.log({userData});
        return {
          url: "/user/register",
          method: "POST",
          body: userData,
        };
      },
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
});

export const { useSaveUserMutation, useLoginMutation, useGetUsersQuery } =
  authApi;
