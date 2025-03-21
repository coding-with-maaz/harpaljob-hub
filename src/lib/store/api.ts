import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Job, JobCategory, User, JobFilters } from './types';
import type { RootState } from './store';

// Define the base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Define response types
interface JobsResponse {
  success: boolean;
  data: {
    jobs: Job[];
    trending: {
      companies: Array<{ company: string; jobCount: number }>;
      searches: Array<{ title: string; count: number }>;
    };
  };
  pagination: {
    total: number;
    page: number;
    pages: number;
    hasMore: boolean;
  };
  filters: JobFilters;
}

interface JobResponse {
  success: boolean;
  data: {
    job: Job;
    similarJobs: Job[];
  };
}

interface CategoriesResponse {
  success: boolean;
  data: JobCategory[];
}

interface UserResponse {
  success: boolean;
  data: User;
}

// Create the API
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Jobs', 'Job', 'Categories', 'User'],
  endpoints: (builder) => ({
    // Jobs endpoints
    getJobs: builder.query<JobsResponse, JobFilters>({
      query: (filters) => ({
        url: 'jobs',
        method: 'GET',
        params: filters,
      }),
      providesTags: ['Jobs'],
    }),

    getFeaturedJobs: builder.query<{ success: boolean; data: Job[] }, { limit?: number }>({
      query: ({ limit } = {}) => ({
        url: 'jobs/featured',
        params: { limit },
      }),
    }),

    getLatestJobs: builder.query<{ success: boolean; data: Job[] }, { limit?: number }>({
      query: ({ limit } = {}) => ({
        url: 'jobs/latest',
        params: { limit },
      }),
    }),

    getJob: builder.query<JobResponse, string>({
      query: (id) => ({
        url: `jobs/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),

    createJob: builder.mutation<{ success: boolean; data: Job }, Omit<Job, 'id'>>({
      query: (job) => ({
        url: 'jobs',
        method: 'POST',
        body: job,
      }),
      invalidatesTags: ['Jobs'],
    }),

    updateJob: builder.mutation<{ success: boolean; data: Job }, { id: string; job: Partial<Job> }>({
      query: ({ id, job }) => ({
        url: `jobs/${id}`,
        method: 'PUT',
        body: job,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Jobs' },
        { type: 'Job', id },
      ],
    }),

    deleteJob: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Jobs' },
        { type: 'Job', id },
      ],
    }),

    // Categories endpoints
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: 'job-categories',
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),

    // User endpoints
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => 'users/me',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation<UserResponse, Partial<User>>({
      query: (userData) => ({
        url: 'users/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export hooks
export const {
  useGetJobsQuery,
  useGetFeaturedJobsQuery,
  useGetLatestJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetCategoriesQuery,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} = api; 