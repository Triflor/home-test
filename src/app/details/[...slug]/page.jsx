import Image from "next/image"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import img from "@/assets/hero-bg.jpg"
import api from "@/api"

const MainLayout = dynamic(() => import("@/mainlayout/MainLayout"))
const ArticleCard = dynamic(() => import("@/components/ArticleCard"))

export default async function Details ({params}) {
    const { slug } = await params
    const stored = cookies()
    const name = stored.get('user')?.value || 'Your name'
    let datas
    let datasArticles

    try {
        const res = await api.get(`/articles/${slug[1]}`)  
        datas = res.data
    } catch (error) {
        console.error(error?.message || error?.response?.data || error)
    }

    try {
        const res = await api.get(`/articles/${slug[1]}`)  
        const resArticles = await api.get(`/articles`, {
            params : {
                categoryId : slug[0],
                limit : 3
            }
        }) 
        datasArticles = resArticles.data.data
    } catch (error) {
        console.error(error?.message || error?.response?.data || error)
    }

    const date = new Date(datas.createdAt)
    const formattedDate = date.toLocaleDateString('en-us', {
        year:'numeric',
        month:'short',
        day:'numeric'
    })

    return (
        <MainLayout styled={true} name={name}>
        <div 
        className="flex flex-col justify-center md:w-[auto] items-center px-[22px] md:px-[145px] 
        mt-[2rem] w-[100%]">
            <div className="w-[100%] flex flex-col items-center mb-4 text-center">
                <p className="light-col md:text-[15px] font-[600] mb-3 mt-2">{formattedDate} . {datas.user.username}</p>
                <p className="md:text-[30px] font-[600] text-[24px] leading-[32px] md:w-[642px] md:leading-[36px] mb-[35px]">{datas.title}</p>
                <div className="w-[100%] md:h-[480px] mb-[34px]">
                    <Image
                        src={datas.imgeUrl ? datas.imageUrl : img}
                        alt="Image"
                        height={'100%'}
                        width={'100%'}
                        className="rounded-[12px] w-[100%] h-[100%] object-cover"
                    />
                </div>
                <div className="text-left darker-col md:text-[16px] text-[14px]">
                    <div dangerouslySetInnerHTML={{ __html:datas?.content}}
                    className="mb-2"/>
                </div>
            </div>
            <div className="flex flex-col mt-[5rem]">
                <p className="font-[600] mb-5">Other articles</p>
                <div>
                    <ArticleCard datas={datasArticles}/>
                </div>
            </div>
        </div>
        </MainLayout>
    )
}