'use client'
import Link from "next/link"
import Image from "next/image"
import pic from '@/assets/image.svg'

export default function ArticleCard ({ datas = [] }) {

    const handleDate = (inputDate) => {
        const date = new Date(inputDate)
        const formattedDate = date.toLocaleDateString('en-us', {
            year:'numeric',
            month:'short',
            day:'numeric'
        })
        return formattedDate
    }

    return (
        <div className='flex flex-col justify-center mb-6 items-center md:grid md:grid-cols-2 
        lg:grid-cols-3 md:gap-4 lg:gap-8'>
            { datas.map((item, index) => (
                <Link
                key={index}
                href={`/details/${item?.categoryId}/${item?.id}`}
                className='w-[300px]  sm:w-[440px] md:w-[auto] mb-[38px]'>
                    <div className='w-[100%] sm:h-[250px] md:h-[240px] rounded-[12px]'>
                        { item?.imageUrl ?
                            <Image
                                alt='article'
                                src={item?.imageUrl}
                                height={180}
                                width={180}
                                className="rounded-[12px] w-[100%] h-[100%] object-cover"
                            /> :
                            <Image
                                alt='article'
                                src={pic}
                                height={150}
                                width={150}
                                className="rounded-[12px] w-[100%] h-[100%] object-contain"
                            />
                        }
                        </div>
                        <p className="text-[12px] md:text-[14px] mt-4 mb-2 light-col">
                            {handleDate(item?.createdAt)}
                        </p>
                        <h1 className="mb-2 text-[16px] md:text-[18px] font-[600] truncate">
                            {item?.title}</h1>
                        <div 
                            dangerouslySetInnerHTML={{ __html:item?.content}}
                            className="mb-3 text-[14px] md:text-[16px] light-col truncate"/>
                        <div>
                            <ul className="flex flex-row text-[12px] md:text-[14px] dark-primary-col">
                                <li className="rounded-full mr-2 py-1 soft-col-bg flex justify-center 
                                    items-center px-3">{item?.category.name}
                                </li>
                            </ul>
                        </div>
                </Link>
            ))}
        </div>
    )
}