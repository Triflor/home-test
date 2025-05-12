import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import api from '@/api'

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        let res
        if(id) res = await api.get(`/articles/${id}`)
        else res = await api.get(`/articles`)
            
        return NextResponse.json({
            success: true,
            status : 200,
            data : res.data.data
        })
            
    } catch (err) {
        const errorMessage = err?.response?.data || err.message
        return NextResponse.json({
            success: false,
            error : errorMessage,
            status : err?.response?.status || 500
        })
    }

}

export async function PUT(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        
        const cookieStore = await cookies()
        const raw = cookieStore.get('token')?.value
        let parsed = JSON.parse(raw)
        const token = parsed.token
    
        const body = await req.json()
        const res = await api.put(`/articles/${id}`, body, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
        
        revalidatePath('/admin/articles', 'layout')
        return NextResponse.json({
            success: true,
            status : 200,
            data : res.data
        })
        
    } catch (err) {
        const errorMessage = err?.response?.data || err.message
        return NextResponse.json({
            success: false,
            error : errorMessage,
            status : err?.response?.status || 500
        })
    }

}

export async function POST(req) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        const cookieStore = await cookies()
        const raw = cookieStore.get('token')?.value
        let parsed = JSON.parse(raw)
        const token = parsed.token

        const body = await req.json()
        const res = await api.post(`/articles/${id}`,body,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        
        revalidatePath('/admin/articles')
        return NextResponse.json({
            success: true,
            status : 200,
            data : res.data
        })
        
    } catch (err) {
        const errorMessage = err?.response?.data || err.message
        return NextResponse.json({
            success: false,
            error : errorMessage,
            status : err?.response?.status || 500
        })
    }

}
