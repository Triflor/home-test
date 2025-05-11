'use client'

import Image from "next/image"
import Logo from "@/assets/Logo.svg"
import LogoBlk from "@/assets/Logo-blk.svg"
import Logout from "@/assets/log-out.svg"
import { useEffect, useState } from 'react'
import Link from "next/link"
import Cookies from "js-cookie"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

const LogoutAlert = dynamic(() => import('@/components/Popup/Logout'))

export default function Navbar ({styled=true, name}) {
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
                <div className="bg-white drop-shadow-md md:text-[14px] text-[12px] darkest-col absolute z-[40] float-right mt-[5px] md:mt-[5rem] mr-[7%] md:mr-[4.5%] rounded-md flex 
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
            <div className={`flex ${styled && 'block border-b border-slate'}  bg-[wheat] px-[20px] sm:px-[40px] 
            bg-white sm:bg-[transparent] flex-row justify-between h-[54px] lg:px-[60px] sm:h-[96px] 
            items-center w-[100%]`}>
                <Link
                href={'/home'}
                className='sm:w-[150px] w-[100px] h-[40px] sm:h-[80px] justify-center flex items-center'>
                    {!styled ? <Image
                        alt={'Logo'}
                        height={'84px'}
                        width={'154px'}
                        src={screenWidth > 742 ? Logo : LogoBlk}
                    /> :
                        <Image
                        alt={'Logo'}
                        height={'84px'}
                        width={'154px'}
                        src={LogoBlk}
                    /> }
                </Link>
                <div 
                onClick={() => setShowDropdown((prev) => !prev)}
                className='flex cursor-pointer flex-row justify-center items-center'>
                    <div className='rounded-full bg-[#BFDBFE] w-[28px] h-[29px] sm:w-[32px] sm:h-[32px] 
                    mr-2 flex justify-center items-center text-[12px] md:text-[14px]'>
                        {name[0]}
                    </div>
                    <span className={`text-[15px] hidden md:block  ${styled ? 'text-black' : 'text-white'}`}> {name} </span>
                </div>
            </div>
                { showDropdown && Dropdown() }
        </>
    )
}