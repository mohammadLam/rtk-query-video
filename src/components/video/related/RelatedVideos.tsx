import { useGetRelatedVideosQuery } from '../../../features/api/slice'
import RelatedVideoLoader from '../../ui/loaders/RelatedVideoLoader'
import RelatedVideo from './RelatedVideo'

interface Props {
  title: string
  id: number
}

export default function RelatedVideos({ id, title }: Props) {
  const { data: videos, isLoading } = useGetRelatedVideosQuery({ id, title })
  let content = <></>

  if (isLoading) {
    content = <RelatedVideoLoader />
  }

  if (videos && videos.length > 0) {
    content = (
      <>
        {videos.map(video => (
          <RelatedVideo key={video.id} video={video} />
        ))}
      </>
    )
  }

  return <div className='col-span-full lg:col-auto max-h-[570px] overflow-y-auto'>{content}</div>
}
