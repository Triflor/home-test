
import dynamic from "next/dynamic"
import api from "@/api"

const EditArticle = dynamic(() => import('@/components/ConfigArticles/EditArticle'))

export default async function Dashboard ({params}) {
    const { slug } = params
    let datas = ''
    let datasCategories = ''

    try {
        const resAr = await api.get(`/articles/${slug}`)    
        datas = resAr.data
        
    } catch (error) {
        console.error(error)
    }

    try {
        const resCat = await api.get('/categories')    
        datasCategories = resCat.data.data
        
    } catch (error) {
        console.error(error)
    }

    return (
        <div>
            <EditArticle datasCategories={datasCategories} datas={datas} id={slug}/>
        </div>
    )
}