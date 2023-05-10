import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Video from '../../interface/video'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000'
  }),
  tagTypes: ['videos', 'video', 'relatedVideo'],
  endpoints: builder => ({
    getVideos: builder.query<Video[], void>({
      query: () => 'videos',
      providesTags: ['videos']
    }),
    getVideo: builder.query<Video, number>({
      query: id => `videos/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'video', id: arg }]
    }),
    getRelatedVideos: builder.query<Video[], { title: string; id: number }>({
      query: ({ title, id }) => {
        const queryString = title
          .split(' ')
          .map(tag => `title_like=${tag}`)
          .join('&')
        return `videos?${queryString}&id_ne=${id}&_limit=4`
      },
      providesTags: (_result, _error, arg) => [{ type: 'relatedVideo', id: arg.id }]
    }),
    addVideo: builder.mutation<Video, Video>({
      query: data => ({
        url: 'videos',
        method: 'POST',
        body: data
      })
    }),
    editVideo: builder.mutation<Video, { id: number; data: Video }>({
      query: ({ data, id }) => ({
        url: `videos/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (_result, _err, arg) => [
        'videos',
        { type: 'video', id: arg.id },
        { type: 'relatedVideo', id: arg.id }
      ]
    }),
    deleteVideo: builder.mutation<Video, number>({
      query: id => ({
        url: `videos/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, arg) => ['videos', { type: 'relatedVideo', id: arg }]
    })
  })
})

export default apiSlice
export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation
} = apiSlice
