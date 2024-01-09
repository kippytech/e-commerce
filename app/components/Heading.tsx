type HeadingPropTypes = {
    title: string
    center?: boolean
}

function Heading({ title, center }: HeadingPropTypes) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <h1 className='font-bold text-2xl'>{title}</h1>
    </div>
  )
}

export default Heading