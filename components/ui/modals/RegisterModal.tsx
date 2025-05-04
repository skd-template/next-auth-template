import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import React, { useCallback, useState } from 'react'

import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'


import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Modal from '@/components/ui/modals/Modal'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

export default function RegisterModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    try {
      await axios.post('/api/auth/register', data)
      registerModal.closeModal()
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.closeModal()
    loginModal.openModal()
  }, [isLoading, registerModal, loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title={'Welcome Airbnb'}
        subtitle={'Create your account'}
      />
      <Input
        id='email'
        label='Email'
        type='email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        type='text'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr className='border-neutral-300' />
      <Button
        outline
        icon={FcGoogle}
        label={'Continue with Google'}
        onClick={() => { }}
      />
      <Button
        outline
        icon={AiFillGithub}
        label={'Continue with Github'}
        onClick={() => { }}
      />
      <div
        className='
          text-neutral-500
          text-center
          mt-4
          font-light
        '
      >
        <div
          className='
            flex
            flex-row
            items-center
            justify-center
            gap-2
          '
        >
          <div>Already have an account?</div>
          <div
            onClick={registerModal.closeModal}
            className='
              text-neutral-800
              cursor-pointer
              hover:underline
            '
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.closeModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
