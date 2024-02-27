import React from 'react'

const TagButtonLarge = ({ tagName, bgColor, textColor }) => {
  return (
    <div className={`py-2 px-2 md:px-4 rounded-3xl w-fit font-semibold text-sm
     ${bgColor} ${textColor}`}>
      {tagName}
    </div>
  )
}

export default TagButtonLarge