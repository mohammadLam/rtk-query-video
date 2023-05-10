import { useGetVideosQuery } from '../../features/api/slice'
import Error from '../ui/Error'
import VideoLoader from '../ui/loaders/VideoLoader'
import Video from './Video'

export default function Videos() {
  const { isLoading, isError, data: videos } = useGetVideosQuery()
  let content = <></>
  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    )
  }

  if (isError) {
    content = <Error />
  }

  if (videos && videos.length > 0) {
    content = (
      <>
        {videos.map(video => (
          <Video key={video.id} video={video} />
        ))}
      </>
    )
  }
  return <>{content}</>
}
