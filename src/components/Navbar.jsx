'use client'

import Image from "next/image"
import Logo from "@/assets/Logo.svg"
import LogoBlk from "@/assets/Logo-blk.svg"
import Logout from "@/assets/log-out.svg"
import Link from "next/link"
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

const LogoutAlert = dynamic(() => import('@/components/Popup/Logout'))

export default function Navbar ({username}) {
    const [screenWidth, setScreenWidth] = useState(681)
    const [show, setShow] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const size = () => {
            setScreenWidth(window.innerWidth)
        }
        size()
        window.addEventListener('resize', size)
        return () => window.removeEventListener('size', size)
    },[])

    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('user')
        router.push('/authentication')
    }

    const Dropdown = () => {
        return (
            <div className='w-[100%] h-[100%] bg-alert z-[50] relative flex flex justify-end'>
                <div className="bg-white md:text-[14px] text-[12px] darkest-col absolute z-[40] float-right mt-[5px] md:mt-[5rem] mr-[7%] md:mr-[4.5%] rounded-md flex 
                    flex-col w-[170px] h-[70px] md:w-[200px] md:h-[90px]">
                        <Link 
                        href={'/profile'}
                        className="hover:bg-slate-200 cursor-pointer rounded-t-md h-[50%] px-3 border-b border-slate flex items-center">
                            My Account
                        </Link>
                        <div 
                        onClick={() => setShow(true)}
                        className="cursor-pointer flex hover:bg-slate-200 rounded-b-md h-[50%] px-3 flex-row items-center">
                            <Image
                                src={Logout}
                                alt="Logout"
                                width={17}
                                height={17}
                                priority
                                className="md:w-[17px] md:h-[17px] w-[14px] h-[14px]"
                            />
                            <p 
                            className="ml-2 red-col">Logout</p>
                        </div>
                    </div>                 
            </div>
        )
    }

    return (
        <>
            { show && 
            <LogoutAlert setShow={setShow} handleLogout={handleLogout}/> }
            <div className="flex z-[20] md:absolute px-[20px] md:px-[40px] bg-white sm:bg-[transparent] 
            flex-row justify-between h-[54px] lg:px-[60px] md:h-[84px] items-center w-[100%]">
                <div className='sm:w-[150px] w-[100px] h-[40] sm:h-[80px] justify-center flex items-center'>
                    <Image
                        alt={'Logo'}
                        height={'84px'}
                        width={'154px'}
                        src={screenWidth > 765 ? Logo : LogoBlk}
                    />
                </div>
                <div 
                onClick={() => setShowDropdown((prev) => !prev)}
                className='flex cursor-pointer flex-row justify-center items-center'>
                    <div className='rounded-full bg-[#BFDBFE] w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] mr-2 
                    flex justify-center items-center text-[12px] md:text-[14px]'>
                        {username[0]}
                    </div>
                    <span className='text-[14px] hidden md:block text-white'> <u>{username}</u> </span>
                </div>
            </div>
                    { showDropdown && 
                        Dropdown()
                    }
        </>
    )
}