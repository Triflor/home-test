import Image from "next/image"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import img from "@/assets/hero-bg.jpg"
import api from "@/api"

const MainLayout = dynamic(() => import("@/mainlayout/MainLayout"))
const ArticleCard = dynamic(() => import("@/components/ArticleCard"))

export default async function Details ({params}) {
    const { slug } = await params

    const cookieStore = await cookies()
    const raw = cookieStore.get('token')?.value
    let parsed
    const token = parsed.token

    try {
        parsed = JSON.parse(raw)
    } catch {
        console.log('invalid session data')
    }

    const res = await api.get(`/articles/${slug[1]}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })  
    
    const resArticles = await api.get(`/articles`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params : {
            categoryId : slug[0],
            limit : 3
        }
    }) 

    let datas = res.data
    let datasArticles = resArticles.data.data

    return (
        <MainLayout styled={true}>
        <div 
        className="flex flex-col justify-center md:w-[auto] items-center px-[22px] md:px-[145px] mt-[2rem] w-[100%]">
            <div className="w-[100%] flex flex-col items-center mb-4 text-center">
                <p className="light-col md:text-[15px] font-[600] mb-3 mt-2">{datas.createdAt} . {datas.user.username}</p>
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
                    <p className=" mb-2">{datas?.content}</p>
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