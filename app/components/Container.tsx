import React from 'react'

type ContainerProps = {
    children: React.ReactNode
}

function Container({ children }: ContainerProps) {
  return (
    <div className='max-w-[1920px] mx-auto px-4 md:px-2 xl:px-20'>
      {children}
    </div>
  )
}

export default Container