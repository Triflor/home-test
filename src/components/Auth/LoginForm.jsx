'use client'

import Image from "next/image"
import Logo from '@/assets/Logo-blk.svg'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import api from "@/api"
import { fethingAction } from './action'

const schema = z.object({
    username: z.string().nonempty('Please enter username.'),
    password: z.string().nonempty('Please enter password.')
})

export default function LoginForm ({setTrigger}) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver : zodResolver(schema)
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const onSubmit = async (data, e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // const res = await api.post('/auth/login', data)
            const res = await fethingAction('', '/home', '/auth/login', 'create', data)
            if(res.success){
                Cookies.set('user', data.username)
                router.push('/home')
            }

            // Cookies.set('token', JSON.stringify(res.data))
            // Cookies.set('user', data.username)

            // setLoading(false)
            // if(res.data.role == 'User') router.push('/home')
            // else router.push('/admin/articles')

        } catch (err) {
            console.error('Err :', err.response?.data || err.message)
        }        
    }

    return (
        <div 
        className="w-[400px] h-[376px] flex flex-col justify-center items-center rounded-[12px] 
        py-[40px] px-[22px] 
        md:px-[18px] bg-white">
            <div className="flex flex-row items-center justify-between mb-6">
                <div className="" style={{marginRight:'5px'}}>
                    <Image
                        alt="logo"
                        src={Logo}
                        height={'20px'}
                        width={'20px'}
                        priority={true}
                        className=""
                    />
                </div>
            </div>
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-around w-[100%]">
                <div className="flex flex-col mb-3">
                    <label htmlFor="username" className="mb-1 text-[14px] font-[500]">Username</label>
                    <input 
                    {...register('username')}
                    placeholder="Input Username"
                    type="text" 
                    className={`w-[100%] text-[14px] pl-3 rounded-md border 
                    border-slate h-[38px]`}
                    name="username" 
                    id="username" />
                    { errors.username && <span className='text-[12px] ml-1 danger-col mt-1'>{errors.username.message}</span> }
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="password" className="mb-1 text-[14px] font-[500]">Password</label>
                    <input 
                    {...register('password')}
                    placeholder="Input Password"
                    type="password" 
                    className={`w-[100%] text-[14px] pl-3 rounded-md border 
                    border-slate h-[38px]`}
                    name="password" 
                    id="password" />
                    { errors.password && <span className='text-[12px] ml-1 danger-col mt-1'>{errors.password.message}</span> }
                </div>
                <button 
                disabled={loading}
                type='submit'
                className="cursor-pointer text-[14px] primary-col-bg rounded-md h-[40px] mb-6 w-[100%] flex 
                justify-center items-center text-[white]"> 
                    Login
                </button>
            </form>
            <div className="text-[14px]">Didn't have an account? 
                <span 
                onClick={() => setTrigger('register')}
                className="primary-col cursor-pointer"> <u>Register</u></span></div>
        </div>
    )
}