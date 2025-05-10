
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import api from "@/api"

const EditArticle = dynamic(() => import('@/components/ConfigArticles/EditArticle'))

export default async function Dashboard ({params}) {
    const { slug } = params
    const cookieStore = await cookies()
    const raw = cookieStore.get('token')?.value
    let datas = ''
    let datasCategories = ''
    let parsed = JSON.parse(raw)
    const token = parsed.token

    console.log(slug)
    try {
        const resAr = await api.get(`/articles/${slug}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })    
        datas = resAr.data
        
    } catch (error) {
        console.error(error)
    }

    console.log(datas)
    
    try {
        const resCat = await api.get('/categories')    
        datasCategories = resCat.data.data
        
    } catch (error) {
        console.error(error)
    }

    return (
        <div>
            <EditArticle datasCategories={datasCategories} datas={datas}/>
        </div>
    )
}