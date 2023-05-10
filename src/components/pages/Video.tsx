import Description from '../video/Description'
import Player from '../video/Player'
import RelatedVideos from '../video/related/RelatedVideos'
import { useGetVideoQuery } from '../../features/api/slice'
import { useParams } from 'react-router-dom'
import PlayerLoader from '../ui/loaders/PlayerLoader'
import DescriptionLoader from '../ui/loaders/DescriptionLoader'

export default function Video() {
  const { videoId } = useParams()
  const { data: video, isLoading } = useGetVideoQuery(parseInt(videoId as string))
  let content = <></>

  if (isLoading) {
    content = (
      <>
        <PlayerLoader />
        <DescriptionLoader />
      </>
    )
  }

  if (video) {
    content = (
      <>
        <Player src={video.link} title={video.title} />
        <Description
          title={video.title}
          date={video.date}
          description={video.description}
          id={video.id as number}
        />
      </>
    )
  }

  return (
    <section className='pt-6 pb-20 min-h-[calc(100vh_-_157px)]'>
      <div className='mx-auto max-w-7xl px-2 pb-20 min-h-[400px]'>
        <div className='grid grid-cols-3 gap-2 lg:gap-8'>
          <div className='col-span-full w-full space-y-8 lg:col-span-2'>{content}</div>

          {video ? <RelatedVideos id={video.id as number} title={video.title} /> : <></>}
        </div>
      </div>
    </section>
  )
}
