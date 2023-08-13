import React from 'react'

const FormField = ({lebelName , type , name , placeholder , value,handleChange , isSurpriseMe , handleSurpriseMe}) => {
  return (
    <div>
      <div className='flex item-center gap-2 mt-4 mb-1'>
        <label
          htmlFor={name}    
          className='block font-serif text-xl font-medium text-violet-800'    
        >
          {lebelName}
        </label>
        { isSurpriseMe && (
          <button 
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold font-sans rounded-lg text-base bg-violet-700 text-white rounded-[50px] py-1 px-2 text-black'
          >
             {name}
          </button> 
        )}

      </div>
      <input 
        type={type}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
        className='block outline-none p-3 rounded-xl w-full bg-grey-50 border border-[#4545f1] text-grey-300 focus:ring-[#4545f4] focus:border-[#4746ff]'
      />

     
    </div>
  )
}

export default FormField