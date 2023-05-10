export default function Success({ message }: { message: string }) {
  return (
    <div className='max-w-7xl col-span-12 w-full flex h-10 items-center justiry-center mx-auto p-2 text-teal-700 bg-teal-100'>
      {message}
    </div>
  )
}
