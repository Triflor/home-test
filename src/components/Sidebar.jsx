import Image from "next/image"
import Logo from "@/assets/Logo.svg"
import article from "@/assets/article.svg"
import category from "@/assets/category.svg"
import logout from "@/assets/logout.svg"
import Link from "next/link"

export default function Sidebar ({choose}) {
    return (
        <div className="primary-col-bg flex flex-col px-[1rem] pt-[1.7rem] w-[267px] ">
        <Image
            alt={'Logo'}
            src={Logo}
            width={145}
            priority={true}
            heigth={140}
            className="pl-3 mb-1"
        />
        <ul className="mt-6 text-[#F3F4F6] text-[16px] font-[500]">
            <li className="py-[6px] mb-2 rounded-sm pl-3 flex flex-row cursor-pointer hover:bg-[#3B82F6]">
                <Link href={'/admin/Articles'} className="flex flex-row w-[100%]">
                    <Image
                        priority={true}
                        alt={'Logo'}
                        src={article}
                        width={20}
                        heigth={20}
                    />
                    <span className="ml-3">Articles</span>
                </Link>
            </li>
            <li className="py-[6px] mb-2 rounded-sm pl-3 flex flex-row cursor-pointer hover:bg-[#3B82F6]">
                <Link href={'/admin/Category'} className="flex flex-row w-[100%]">
                    <Image
                        alt={'Logo'}
                        priority={true}
                        src={category}
                        width={20}
                        heigth={20}
                    />
                    <span className="ml-3">Category</span>
                </Link>
            </li>
            <li className="py-[6px] rounded-sm pl-3 flex flex-row cursor-pointer hover:bg-[#3B82F6]">
                <Image
                    alt={'Logo'}
                    priority={true}
                    src={logout}
                    width={20}
                    heigth={20}
                />
                <span className="ml-3">Logout</span>
            </li>
        </ul>
    </div>
    )
}