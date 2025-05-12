
import dynamic from "next/dynamic"
import api from "@/api"
const ListArticles = dynamic(() => import('@/components/ConfigArticles/ListArticle'))

export default async function Dashboard () {
    let datas = ''
    let datasCategories = ''

    try {
        const res = await api.get('/articles')    
        datas = res.data.data
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
            <ListArticles datas={datas} datasCategories={datasCategories}/>
        </div>
    )
}