'use client'

import Image from "next/image"
import Logo from "@/assets/Logo.svg"
import LogoBlk from "@/assets/Logo-blk.svg"
import { useEffect, useState } from 'react'
import Link from "next/link"

export default function Navbar ({styled=true}) {
    const [screenWidth, setScreenWidth] = useState(681)

    useEffect(() => {
        const size = () => {
            setScreenWidth(window.innerWidth)
        }
        size()
        window.addEventListener('resize', size)
        return () => window.removeEventListener('size', size)
    },[])

    return (
        <div className={`flex ${styled && 'block border-b border-slate'}  bg-[wheat] px-[20px] sm:px-[40px] bg-white sm:bg-[transparent] flex-row justify-between h-[54px] lg:px-[60px] sm:h-[96px] items-center w-[100%]`}>
            <Link
             href={'/home'}
             className='sm:w-[150px] w-[100px] h-[40px] sm:h-[80px] justify-center flex items-center'>
                {!styled ? <Image
                    alt={'Logo'}
                    height={'84px'}
                    width={'154px'}
                    src={screenWidth > 680 ? Logo : LogoBlk}
                /> :
                    <Image
                    alt={'Logo'}
                    height={'84px'}
                    width={'154px'}
                    src={LogoBlk}
                /> }
            </Link>
            <div className='flex flex-row justify-center items-center'>
                <div className='rounded-full bg-[#BFDBFE] w-[28px] h-[29px] sm:w-[32px] sm:h-[32px] mr-2 flex justify-center items-center text-[12px] md:text-[14px]'>
                    J
                </div>
                <span className={`text-[15px] hidden md:block  ${styled ? 'text-black' : 'text-white'}`}> James Dean</span>
            </div>
        </div>
    )
}