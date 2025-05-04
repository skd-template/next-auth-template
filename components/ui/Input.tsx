import React from 'react'
import { BiDollar } from 'react-icons/bi'

import { 
  FieldValues, 
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form'

type InputProps = {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  errors: FieldErrors
  register: UseFormRegister<FieldValues>
}

//TODO: Cuando el error no existe debe mostrar el focus en gray
export default function Input({
  id,
  label,
  type = 'text',
  disabled = false,
  formatPrice = false,
  required = false,
  register,
  errors,
} : InputProps) {
  return (
    <div className='relative'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='absolute text-neutral-700 top-5 left-2'
        />
      )}

      <input 
        id={id}
        type={type} 
        disabled={disabled}
        {...register(id, {required})}
        placeholder=''
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition-all
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-neutral-300'}
        `}
      />
      <label htmlFor={id}
        className={`
          absolute
          text-md
          duration-300
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id]? 'text-rose-500' : 'text-neutral-400'}
        `}
      >
        {label}
      </label>
    </div>
  )
}
