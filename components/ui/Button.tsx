import React from 'react'
import { IconType } from 'react-icons'

type ButtonProps = {
  label: string
  onClick: () => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
  fullWidth?: boolean
}

export default function Button({
  label,
  onClick,
  disabled = false,
  outline,
  small,
  icon: Icon,
  fullWidth,
} : ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        cursor-pointer
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${outline ? 'border-black' : 'bg-rose-500'}
        
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        ${fullWidth ? 'w-full' : 'w-auto'}
      `}
    >
      {label}
      {Icon && (
        <Icon size={24} className='absolute left-4 top-3' />
      )}
    </button>
  )
}
