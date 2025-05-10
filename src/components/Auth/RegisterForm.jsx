'use client'
import Image from "next/image"
import Logo from '@/assets/Logo-blk.svg'
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import Down from "@/assets/chevron-down.svg"
import api from "@/api"


const schema = z.object({
    username: z.string()
        .nonempty('Please enter username.'),
    password: z.string()
        .nonempty('Please enter password.')
        .min(8, 'Minimum length is 8'),
    role : z.string()
        .nonempty('Please select role.'),
    
})

export default function RegisterForm ({setTrigger}) {
    const { control, register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver : zodResolver(schema)
    })
    const [dropdown, setDropdown] = useState(false)
    const [role, setRole] = useState('Select Role')
    const [successRegister, setSuccesRegister] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSelectRole = (role) => {
        setValue('role', role)
        setRole(role)
        setDropdown((prev) => !prev)
    } 

    const onSubmit = async (data) => {
        setLoading(true)

        try {
            const res = await fetch('/api/register', {
                method : 'POST',
                body : JSON.stringify(data)
            })
            
            const resData = await res.json()

            setSuccesRegister(true)
            setLoading(false)

            setTimeout(() => {
                setSuccesRegister(false)

            },2500)

        } catch (err) {
            console.error('Err :', err.response?.data || err.message)
        }
    }

    return (
        <div 
        className="w-[400px] duration-300 min-h-[452px] flex flex-col justify-center items-center 
        rounded-[12px] py-[40px] px-[22px] 
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
                    className="w-[100%] text-[14px] pl-3 rounded-md border border-slate h-[38px]" 
                    name="username" 
                    id="username" />
                    { errors.username && 
                    <span className='text-[12px] ml-1 danger-col mt-1'>{errors.username.message}
                    </span> }
                </div>
                <div className="flex flex-col mb-3">
                    <label htmlFor="username" className="mb-1 text-[14px] font-[500]">Password</label>
                    <input 
                    {...register('password')}
                    placeholder="Input Password"
                    type="password" 
                    className="w-[100%] text-[14px] pl-3 rounded-md border border-slate h-[38px]" 
                    name="password" 
                    id="password" />
                    { errors.password &&
                    <span className='text-[12px] ml-1 danger-col mt-1'>{errors.password.message}
                    </span> }
                </div>
                <div className="flex flex-col mb-6">
                    <label htmlFor="username" className="mb-1 text-[14px] font-[500]">Role</label>
                        <Controller
                            name='role'
                            defaultValue=''
                            control={control}
                            render={({field}) =>(
                                <div 
                                className="flex border border-slate rounded-md flex-row cursor-pointer h-[40px] relative">
                                    <div
                                    onInput={(e) => field.onChange(e.currentTarget.textContent)}
                                    onClick={() => setDropdown((prev) => !prev)}
                                    className="w-[100%] font-[500] flex items-center bg-[white] text-[14px] pl-3 md:pl-3 
                                    mb-2 md:mb-0 rounded-l-md darkest-col h-[38px]" 
                                    id="category">
                                    {role}
                                    </div>
                                        <div 
                                        onClick={() => setDropdown((prev) => !prev)}
                                        className='w-[35px] pr-1 h-[38px] border-none rounded-r-md 
                                        flex justify-center items-center'>
                                            <Image
                                                alt="down"
                                                src={Down}
                                                height={'20px'}
                                                width={'20px'}
                                                priority={true}
                                            />
                                        </div>
                                    { dropdown &&
                                    <div 
                                    className="absolute drop-shadow-md bg-[white] z-[20] transition-all duration-300 mt-[2.7rem] w-[100%] h-[5rem] rounded-[5px]">
                                        <ul className="darkest-col bg-[white] text-[14px] px-1 py-2 md:py-3">
                                            <li 
                                            onClick={() => handleSelectRole('Admin')}
                                            className="cursor-pointer rounded-md hover:bg-slate-300 py-1 pl-3">Admin</li>
                                            <li
                                            onClick={() => handleSelectRole('User')}
                                            className="cursor-pointer rounded-md hover:bg-slate-300 py-1 pl-3">User</li>
                                        </ul>
                                    </div>
                                    }
                                </div>
                            )}
                        
                        />
                        { errors.role && 
                            <span className='text-[12px] ml-1 danger-col mt-1'>{errors?.role?.message}
                            </span> }              
                    </div>
                <button 
                type="submit"
                disabled={loading}
                className={`cursor-pointer text-[14px] ${loading ? 'primary-col-bg-disable' : 'primary-col-bg'} rounded-md h-[40px] mb-6 w-[100%] 
                flex justify-center items-center text-[white]`}> 
                    {loading ? '...' : 'Register'}
                </button>
                {successRegister && 
                    <div 
                    className="w-[75%] md:w-[364px] h-[70px] mb-[15rem] bg-trans rounded-md absolute  bg-white drop-shadow-md flex py-2 flex-col justify-center items-center">
                        <h2 className="font-[500]  text-[15px]">Success Create an Account!</h2>
                        <p className="text-[13px]">Please Login to Continue.</p>
                    </div>
                }
            </form>
            <div className="text-[14px]">Already have an account? 
                <span 
                onClick={() => setTrigger('login')}
                className="primary-col cursor-pointer"> <u>Login</u></span></div>
        </div>
    )
}