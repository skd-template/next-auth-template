'use client'

import React, { useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import Button from '@/components/ui/Button'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
  secondaryAction?: () => void
  secondaryActionLabel?: string
}

export default function Modal({
  actionLabel,
  isOpen,
  onClose,
  title,
  body,
  footer,
  onSubmit,
  disabled,
  secondaryAction,
  secondaryActionLabel
}: ModalProps) {
  const [showModal, setShowModal] = React.useState(isOpen)

  React.useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    if (disabled) { return; }

    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onSubmit])

  const handleSubmit = useCallback(() => {
    if (disabled) { return; }
    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction()
  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className='
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed inset-0
        z-50 outline-none focus:outline-none
        bg-neutral-800/70
      '
    >
      <div
        className='
        relative 
        w-full
        md:w-4/6
        lg:w-3/6
        xl:w-2/5
        my-6
        mx-auto
        h-full
        lg:h-auto
        md:h-auto
      '
      >
        {/* Content */}
        <div
          className={
            `
            h-full 
            translate
            duration-300
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `
          }
        >
          <div
            className='
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              focus:outline-none
            '
          >
            {/* Header */}
            <div
              className='
                flex 
                items-center 
                justify-center 
                p-6 
                rounded-t
                relative
                border-b-[1px]
                border-neutral-200
              '>
              <button
                className='
                  p-1 
                  absolute
                  border-0
                  hover:opacity-70 
                  transition 
                  cursor-pointer
                  left-9
                '
                onClick={() => handleClose()}
              >
                <AiOutlineClose size={20} />
              </button>
              <div className='text-lg font-semibold'>
                {title}
              </div>
            </div>
            {/* Body */}
            <div className='relative p-10 flex-auto'>
              {body}
            </div>
            {/* Footer */}
            <div className='flex flex-col gap-2 p-6'>
              <div className='flex flex-row items-center gap-4 w-full'>
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    fullWidth
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={() => handleSecondaryAction()}
                  />
                )}
                <Button
                  fullWidth
                  disabled={disabled}
                  label={actionLabel}
                  onClick={() => handleSubmit()}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
