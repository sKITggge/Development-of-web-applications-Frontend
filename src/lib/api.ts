import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  AuthResponse,
  Category,
  LoginRequest,
  PaginatedPosts,
  RegisterRequest,
  Source,
  UserProfile,
} from './types'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      headers.set('content-type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Posts', 'Sources', 'Categories', 'User'],
  endpoints: (build) => ({
    getPosts: build.query<PaginatedPosts, { limit: number; offset: number }>({
      query: ({ limit, offset }) => {
        const params = new URLSearchParams()

        if (limit) {
          params.append('limit', limit.toString())
        }

        if (offset) {
          params.append('offset', offset.toString())
        }

        return {
          url: `api/posts?${params.toString()}`,
          metod: 'GET',
        }
      },
      providesTags: ['Posts'],
    }),

    getSources: build.query<Source[], void>({
      query: () => `api/sources`,
      providesTags: ['Sources'],
    }),

    getPendingSources: build.query<Source[], void>({
      query: () => `api/moderateSources`,
      providesTags: ['Sources'],
    }),

    addSource: build.mutation<Source, Omit<Source, 'id' | 'updated_at' | 'created_at'>>({
      query: (newSource) => ({
        url: 'api/sources',
        method: 'POST',
        body: newSource,
      }),
      invalidatesTags: ['Sources'],
    }),

    getCategories: build.query<Category[], void>({
      query: () => `api/categories`,
      providesTags: ['Categories'],
    }),

    deleteSource: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `api/moderateSources/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Sources']
    }),

    updateSource: build.mutation<{ message: string }, Source>({
      query: (source: Source) => ({
        url: `api/moderateSources/${source.id}`,
        method: 'PUT',
        body: source
      }),
      invalidatesTags: ['Sources']
    }),

    getFilteredPosts: build.query<PaginatedPosts, { categories: string[]; sources: string[], limit: number; offset: number }>({
      query: ({ categories, sources, limit, offset }) => {
        const params = new URLSearchParams()

        if (categories && categories.length > 0) {
          categories.forEach((category) => {
            params.append('categories[]', category)
          })
        }

        if (sources && sources.length > 0) {
          sources.forEach((source) => {
            params.append('sources[]', source)
          })
        }

        if (limit) {
          params.append('limit', limit.toString())
        }

        if (offset) {
          params.append('offset', offset.toString())
        }

        return {
          url: `api/posts?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['Posts'],
    }),

    register: build.mutation<AuthResponse, RegisterRequest>({
      query: (credentials) => ({
        url: 'api/register',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem('authToken', data.token)
        } catch (error) {
          console.error('Registration failed:', error)
        }
      },
    }),

    login: build.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'api/login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem('authToken', data.token)
        } catch (error) {
          console.error('Login failed:', error)
        }
      },
    }),

    getProfile: build.query<UserProfile, void>({
      query: () => 'api/profile',
      providesTags: ['User'],
    }),

    getTrackedCategories: build.query<{ categories: Category[]; count: number }, void>({
      query: () => 'api/profile/tracked-categories',
      providesTags: ['User'],
    }),

    updateTrackedCategories: build.mutation<{ message: string }, { category_ids: string[] }>({
      query: (categoryIds) => ({
        url: 'api/profile/categories',
        method: 'PUT',
        body: categoryIds,
      }),
      invalidatesTags: ['User'],
    }),

    getTrackedSources: build.query<{ sources: Source[]; count: number }, void>({
      query: () => 'api/profile/sources',
      providesTags: ['User'],
    }),

    updateTrackedSources: build.mutation<{ message: string }, { source_ids: string[] }>({
      query: (sourceIds) => ({
        url: 'api/profile/sources',
        method: 'PUT',
        body: sourceIds,
      }),
      invalidatesTags: ['User'],
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: 'api/logout',
        method: 'POST',
      }),
      onQueryStarted: async (_, { dispatch }) => {
        localStorage.removeItem('authToken')
        dispatch(postsApi.util.invalidateTags(['User']))
      },
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetSourcesQuery,
  useGetPendingSourcesQuery,
  useAddSourceMutation,
  useGetCategoriesQuery,
  useUpdateSourceMutation,
  useDeleteSourceMutation,
  useGetFilteredPostsQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useGetTrackedCategoriesQuery,
  useUpdateTrackedCategoriesMutation,
  useGetTrackedSourcesQuery,
  useUpdateTrackedSourcesMutation,
  useLogoutMutation,
} = postsApi
