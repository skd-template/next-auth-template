import { signIn, useSession } from 'next-auth/react'
import React, { useCallback, useState } from 'react'

import Modal from '@/components/Modal'
import Input from '@/components/Input'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

export default function LoginModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const session = useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)  
  
  const onToggle = useCallback(() => {
    if(isLoading) return;

    loginModal.closeModal()
    registerModal.openModal()
  }, [isLoading, registerModal, loginModal])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      await signIn('credentials', {
        email,
        password,
        redirect: false
      })
      loginModal.closeModal()
    } catch (e) {
    } finally {
      setIsLoading(false)
    }
  }, [loginModal, email, password, session])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        value={email}
        placelhoder='Email'
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        value={password}
        placelhoder='Password'
        disabled={isLoading}
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>First time using Twitter? &nbsp;
        <span onClick={onToggle} className='text-white cursor-pointer hover:underline font-semibold'>Create an account</span>
      </p>
    </div>
  );

  return (
    <Modal
      title='Login'
      disabled={isLoading}
      actionLabel='Sign in'
      isOpen={loginModal.isOpen}
      onClose={loginModal.closeModal}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
