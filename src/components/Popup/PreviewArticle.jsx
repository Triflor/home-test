'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import image from "@/assets/image.svg"
import ReactDOM from 'react-dom'
import ArticleSkeleton from '../Skeleton/ArticleSkeleton'

export default function PreviewArticle ({id, setShowArticle}) {
    const [datas, setData] = useState()

    useEffect(() => {
        const fething = async () => {
            try {
                 const res = await fetch(`/api/articles?id=${id}`, {
                    method: 'GET'
                 })
                 const resData = await res.json()
                 
                 if(resData.success){
                    setData(resData.data)
                 }

            } catch (error) {
                console.error(error)
            } 
        }
        if(id) fething()
    },[])

    const handleDate = (inputDate) => {
        const date = new Date(inputDate)
        const formattedDate = date.toLocaleDateString('en-us', {
            year:'numeric',
            month:'short',
            day:'numeric'
        })
        return formattedDate
    }

    return ReactDOM.createPortal(
        <div 
        onClick ={(e) => e.stopPropagation()}
        className='bg-alert w-[100%] h-[100%] pt-[3%] fixed bg-alert flex justify-center z-[100]'>
        <div className='px-[2px] flex flex-col bg-white h-[38rem] rounded-sm'>
            <span onClick={() => setShowArticle(false)} className='danger-col cursor-pointer text-[28px] px-2 py-2 ml-[auto] mr-[1rem]'>X</span>
            <div 
            className="flex flex-col justify-center bg-[white] rounded-sm w-[50rem] h-[38rem] pt-[10rem] 
            overflow-y-auto items-center px-[5rem] ">
            { !datas ?
            <ArticleSkeleton/> :
                <div className="w-[100%] flex flex-col items-center mb-4 text-center">
                    <p className="light-col md:text-[15px] font-[600] mb-3 mt-2">
                        {handleDate(datas?.createdAt)} . {datas?.user?.username}</p>
                    <p className="md:text-[30px] font-[600] text-[24px] leading-[32px] md:w-[642px] md:leading-[36px] mb-[35px]">
                        {datas?.title}</p>
                    <div className="w-[100%] md:h-[480px] mb-[34px]">
                        <Image
                            src={datas?.imageUrl ? datas?.imageUrl : image}
                            alt="Image"
                            height={100}
                            width={100}
                            className="rounded-md w-[100%] h-[480px] object-contain"
                        />
                    </div>
                    <div className="text-left darker-col md:text-[16px] text-[14px]">
                        <div dangerouslySetInnerHTML={{ __html:datas?.content}}
                        className="mb-6"/>
                    </div>
                </div>
            }
            </div>
        </div>
        </div>,
        document.getElementById('modal-root')
    )
}