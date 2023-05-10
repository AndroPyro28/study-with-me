import React from 'react'
import Loader from './Loader'

function LoaderModal() {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-screen h-[100vh] flex justify-center items-center z-50' style={{
      background: 'rgba(0, 0, 0, 0.459)'
    }}>
        <Loader size={50} />
    </div>
  )
}

export default LoaderModal