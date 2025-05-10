
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import api from "@/api"

const ListArticle = dynamic(() => import('@/components/ConfigArticles/ListArticle'))
const CreateArticle = dynamic(() => import('@/components/ConfigArticles/CreateArticle'))
const ListCategories = dynamic(() => import('@/components/ConfigCategories/ListCategories'))
const Profile = dynamic(() => import('@/app/profile/page'))

export default async function Dashboard ({params}) {
    const { slug } = await params
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
        const res = await api.get('/articles', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })    
        datas = res.data.data
        
    } catch (error) {
        console.error(error)
    }

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
        <>
            { slug == 'Articles' ?
            <ListArticle datas={datas}/> :
            <ListCategories datas={datasCategories}/>
            }   
        </>

    )
}