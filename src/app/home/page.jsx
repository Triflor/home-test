import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import api from "@/api"

const ArticleCard = dynamic(() => import('@/components/ArticleCard'))
const Hero = dynamic(() => import('@/components/Hero'))
const Navbar = dynamic(() => import('@/components/Navbar'))
const Footer = dynamic(() => import('@/components/Footer'))

export default async function Home () {
    let datas
    const stored = cookies()
    const name = stored.get('user')?.value || 'Your name'

    try {
        const res = await api.get('/articles')    
        datas = res.data.data
    } catch (error) {
        console.error(error?.message || error?.response?.data || error)
    }

    return (
        <div className="w-[100%]">
            <Navbar username={name}/>
            <Hero/>

            <div className='bg-white min-h-[30rem] w-[100%] px-[100px] pt-[40px]'>
                <div className=' h-[100%] w-[100%]'>
                    <p className='mb-[30px] md:block hidden'>Showing : {datas.length} of 0 articles</p>
                    <div className=''>
                        <ArticleCard datas={datas}/>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}