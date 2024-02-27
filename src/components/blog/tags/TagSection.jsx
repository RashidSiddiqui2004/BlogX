
import React from 'react'
import TagButton from './TagButton'
import TagButtonLarge from './TagButtonsLarge';

const colorCombos = [
  { bgColor: 'bg-slate-100', textColor: 'text-blue-400' },
  { bgColor: 'bg-green-200', textColor: 'text-blue-700' },
  { bgColor: 'bg-red-200', textColor: 'text-pink-800' }, 
];

const TagSection = ({ tagList, buttonSize='small' }) => {
  return (
    <div className='flex flex-wrap gap-y-2  md:flex-row gap-x-4'>
      {
        tagList?.map((tag, index) => { 
          const colorCombo = colorCombos[index % colorCombos.length];
          return (
            <div key={index}>
              {
                buttonSize === 'small'
                ?
                <TagButton tagName={tag} bgColor={colorCombo.bgColor} textColor={colorCombo.textColor} />
                :
                <TagButtonLarge tagName={tag} bgColor={colorCombo.bgColor} textColor={colorCombo.textColor} />
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default TagSection
