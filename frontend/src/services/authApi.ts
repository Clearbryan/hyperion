import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:4000',
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (body: { loginId: string; password: string }) => {
        return {
          url: '/login',
          method: 'post',
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: { username: string; emailAddress: string, password: string, confirmPassword: string }) => {
        return {
          url: '/register',
          method: 'post',
          body,
        };
      },
    }),
  }),
});

export const { useUserLoginMutation, useRegisterUserMutation } = authApi