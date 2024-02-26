
import React from 'react'
import TagButton from './TagButton'

const colorCombos = [
  { bgColor: 'bg-slate-100', textColor: 'text-blue-400' },
  { bgColor: 'bg-green-200', textColor: 'text-blue-700' },
  { bgColor: 'bg-red-200', textColor: 'text-pink-800' }, 
];

const TagSection = ({ tagList }) => {
  return (
    <div className='flex flex-wrap gap-y-2  md:flex-row gap-x-4'>
      {
        tagList?.map((tag, index) => { 
          const colorCombo = colorCombos[index % colorCombos.length];
          return (
            <div key={index}>
              <TagButton tagName={tag} bgColor={colorCombo.bgColor} textColor={colorCombo.textColor} />
            </div>
          )
        })
      }
    </div>
  )
}

export default TagSection
