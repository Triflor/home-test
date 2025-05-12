'use client'
import Image from "next/image"
import article from "@/assets/article.svg"
import category from "@/assets/category.svg"
import logout from "@/assets/logout.svg"
import Link from "next/link"
import Logo from '@/assets/Logo.svg'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminLayout ({children}) {
    const router = useRouter()
    const pathname = usePathname()
    const navigation = pathname.split('/')[2] ||  ''

    console.log(pathname)
    console.log(navigation)

    const handleLogout = () => {
        Cookies.remove('token')
        Cookies.remove('user')
        router.push('/authentication')
    }

    return (
        <div className="flex flex-row min-h-[100vh] primary-col-bg" id='modal-root'>
            <div className="primary-col-bg flex flex-col px-[1rem] pt-[1.7rem] w-[267px] ">
                <Image
                    alt={'Logo'}
                    src={Logo}
                    width={145}
                    heigth={140}
                    className="pl-3 mb-1"
                />
                <ul className="mt-6 text-[#F3F4F6] text-[16px] font-[500]">
                    <li 
                    
                    className={` ${navigation[0] == 'a' && 'bg-[#3B82F6]'} py-[6px] mb-2 rounded-sm pl-3 flex flex-row cursor-pointer hover:bg-[#3B82F6]`}>
                        <Link href={'/admin/articles'} className="flex flex-row w-[100%]">
                            <Image
                                alt={'Logo'}
                                src={article}
                                width={20}
                                heigth={20}
                            />
                            <span className="ml-3">Articles</span>
                        </Link>
                    </li>
                    <li 
                    className={` ${navigation[0] == 'c' && 'bg-[#3B82F6]'} py-[6px] mb-2 rounded-sm pl-3 flex flex-row cursor-pointer hover:bg-[#3B82F6]`}>
                        <Link href={'/admin/categories'} className="flex flex-row w-[100%]">
                            <Image
                                alt={'Logo'}
                                src={category}
                                width={20}
                                heigth={20}
                            />
                            <span className="ml-3">Category</span>
                        </Link>
                    </li>
                    <li 
                    onClick={handleLogout}
                    className="py-[6px] rounded-sm pl-3 flex flex-row cursor-pointer hover:bg-[#3B82F6]">
                        <Image
                            alt={'Logo'}
                            src={logout}
                            width={20}
                            heigth={20}
                        />
                        <span className="ml-3">Logout</span>
                    </li>
                </ul>
            </div> 
            {children}
        </div>
    )
}