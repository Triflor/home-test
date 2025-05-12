
import dynamic from "next/dynamic"
import api from "@/api"

const CreateArticle = dynamic(() => import('@/components/ConfigArticles/CreateArticle'))

export default async function Dashboard () {
    let datasCategories = ''

    try {
        const resCat = await api.get('/categories')    
        datasCategories = resCat.data.data
        
    } catch (error) {
        console.error(error)
    }

    return (
        <div>
            <CreateArticle datasCategories={datasCategories}/>
        </div>
    )
}