interface Props {
  src: string
  title: string
}

export default function Player({ src, title }: Props) {
  return (
    <iframe
      width='100%'
      className='aspect-video'
      src={src}
      title={title}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    ></iframe>
  )
}
