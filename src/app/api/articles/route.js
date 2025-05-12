import { NextResponse } from 'next/server'
import api from '@/api'

export async function handler(req) {

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    switch (req.method) {
        case 'GET': return await GET(id)
        case 'POST': 
        case 'PUT' : return await PUT(id)
        default: 
        return NextResponse.json({
            success: false,
            error : 'Method not allowed',
            status :  405
        })
    }

    async function GET(passId) {
        try {
            let res
            if(passId) res = await api.get(`/articles/${passId}`)
            else res = await api.get(`/articles`)
                
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

    async function PUT(passId) {
        try {

            const body = await req.json()
            const res = await api.post(`/articles/${passId}`, body)
            
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
}

export { handler as POST, handler as GET, handler as PUT, handler as DELETE}