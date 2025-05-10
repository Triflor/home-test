
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import api from "@/api"

const CreateArticle = dynamic(() => import('@/components/ConfigArticles/CreateArticle'))

export default async function Dashboard () {
    const cookieStore = await cookies()
    const raw = cookieStore.get('token')?.value
    let datas = ''
    let datasCategories = ''
    let parsed

    try {
        parsed = JSON.parse(raw)
    } catch {
        console.log('invalid session data')
    }

    const token = parsed.token
    
    try {
        const resCat = await api.get('/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })    
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