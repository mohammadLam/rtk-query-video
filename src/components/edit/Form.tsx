import { useState } from 'react'
import { useEditVideoMutation } from '../../features/api/slice'
import Video from '../../interface/video'
import Error from '../ui/Error'
import Success from '../ui/Success'
import TextArea from '../ui/TextArea'
import TextInput from '../ui/TextInput'

export default function Form({ video: editedVideo }: { video: Video }) {
  const [editVideo, { data: video, isLoading, isError, isSuccess }] = useEditVideoMutation()
  const [title, setTitle] = useState(editedVideo.title)
  const [author, setAuthor] = useState(editedVideo.author)
  const [description, setDescription] = useState(editedVideo.description)
  const [link, setLink] = useState(editedVideo.link)
  const [thumbnail, setThumbnail] = useState(editedVideo.thumbnail)
  const [date, setDate] = useState(editedVideo.date)
  const [duration, setDuration] = useState(editedVideo.duration)
  const [views, setViews] = useState(editedVideo.views)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    editVideo({
      id: editedVideo.id as number,
      data: {
        title,
        author,
        date,
        description,
        duration,
        link,
        thumbnail,
        views
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='shadow overflow-hidden sm:rounded-md'>
        <div className='px-4 py-5 bg-white sm:p-6'>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6 sm:col-span-3'>
              <TextInput
                title='Video Title'
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <TextInput
                title='Author'
                value={author}
                onChange={event => setAuthor(event.target.value)}
              />
            </div>

            <div className='col-span-6'>
              <TextArea
                title='Description'
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
            </div>

            <div className='col-span-6'>
              <TextInput
                title='YouTube Video link'
                value={link}
                onChange={event => setLink(event.target.value)}
              />
            </div>

            <div className='col-span-6'>
              <TextInput
                title='Thumbnail link'
                value={thumbnail}
                onChange={event => setThumbnail(event.target.value)}
              />
            </div>

            <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
              <TextInput
                title='Upload Date'
                value={date}
                onChange={event => setDate(event.target.value)}
              />
            </div>

            <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
              <TextInput
                title='Video Duration'
                value={duration}
                onChange={event => setDuration(event.target.value)}
              />
            </div>

            <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
              <TextInput
                title='Video no of views'
                value={views}
                onChange={event => setViews(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
          <button
            type='submit'
            disabled={isLoading}
            className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
          >
            Save
          </button>
        </div>

        {isSuccess ? <Success message='Video was added successfully' /> : ''}
        {isError ? <Error /> : ''}
      </div>
    </form>
  )
}
