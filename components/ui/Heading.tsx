import React from 'react'

type HeadingProps = {
  title: string
  subtitle?: string
  center?: boolean
}

export default function Heading({
  title,
  subtitle,
  center = false,
} : HeadingProps) {
  return (
    <div
      className={center ? "text-center" : "text-start"}
    >
      <div className='text-2xl font-bold'>{title}</div>
      <div className='font-light text-neutral-500 mt-2'>{subtitle}</div>
    </div>
  )
}
