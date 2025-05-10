import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import api from "@/api"

const ArticleCard = dynamic(() => import('@/components/ArticleCard'))
const Hero = dynamic(() => import('@/components/Hero'))
const Navbar = dynamic(() => import('@/components/Navbar'))
const Footer = dynamic(() => import('@/components/Footer'))

export default async function Home () {
    const res = await api.get('/articles')    
    let datas = res.data.data

    return (
        <div className="w-[100%]">
            <Navbar username={'soban'}/>
            <Hero/>

            <div className='bg-white min-h-[30rem] w-[100%] px-[100px] pt-[40px]'>
                <div className=' h-[100%] w-[100%]'>
                    <p className='mb-[30px] md:block hidden'>Showing : 20 of 240 articles</p>
                    <div className=''>
                        <ArticleCard datas={datas}/>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}