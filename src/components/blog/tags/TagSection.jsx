
import React from 'react'
import TagButton from './TagButton'

const TagSection = ({ tagList}) => {
  return (
    <div className='flex flex-wrap gap-y-2  md:flex-row gap-x-4'>
      {
        tagList.map((tag, index) => {
          return (
            <div key={index}>
              <TagButton tagName={tag} />
            </div>
          )
        })
      }
    </div>
  )
}

export default TagSection