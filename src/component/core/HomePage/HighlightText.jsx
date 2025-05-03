import React from 'react'

const HighlightText = ({text}) => {
  return (
    <div>
      <span className='bg-gradient-to-b from-[#0fe91d] via-[#0fe91d] to-[#0fe91d] 
    text-transparent bg-clip-text font-bold'>
        {text}
      </span>
    </div>
  )
}

export default HighlightText
