'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const LoginForm = dynamic(() => import('@/components/Auth/LoginForm'))
const RegisterForm = dynamic(() => import('@/components/Auth/RegisterForm'))

export default function Auth() {
  const [trigger, setTrigger] = useState('login')

  return (
    <div className="w-[100%] h-[100vh] md:bg-[#F3F4F6] items-center flex justify-center">
        {trigger === 'login' ? <LoginForm setTrigger={setTrigger}/> : 
        <RegisterForm setTrigger={setTrigger}/>}
    </div>
  );
}
