// src/services/expense.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Category} from "../types"

export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: ({ page = 1, limit = 10, category }) =>
        `expenses?page=${page}&limit=${limit}${category ? `&category=${category}` : ''}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => '/categories', 
    }),
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: 'expenses',
        method: 'POST',
        body: newExpense,
      }),
    }),
    updateExpense: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `expenses/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expenses/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetCategoriesQuery, 
} = expenseApi;
