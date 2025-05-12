
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import api from "@/api"

const ListCategories = dynamic(() => import('@/components/ConfigCategories/ListCategories'))

export default async function Dashboard () {
    const cookieStore = await cookies()
    const rawName = cookieStore.get('user') ? cookieStore.get('user').value : null
    let datasCategories = ''
    
    try {
        const resCat = await api.get('/categories')    
        datasCategories = resCat.data.data
    } catch (error) {
        console.error(error)
    }

    return (
        <div className="bg-[#F3F4F6] w-[100%] flex flex-col">
            <div className="bg-[white] px-[20px] flex flex-row justify-between h-[4rem] items-center w-[100%]">
                <div className=' w-[100px]  justify-center flex items-center'>
                    <h2 className="text-[20px] font-[500]">Categories</h2>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <div className='rounded-full bg-[#BFDBFE] w-[28px] h-[29px]  mr-2 flex justify-center items-center text-[12px] '>
                        {rawName ? rawName[0] : 'Y'}
                    </div>
                    <span className='text-[14px]'>{rawName || 'Your name'}</span>
                </div>
            </div>
            <div> 
                <ListCategories datas={datasCategories}/>
            </div>
        </div>        

    )
}