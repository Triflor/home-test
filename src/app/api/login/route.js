import { NextResponse } from 'next/server'
import api from '@/api'
import { cookies } from 'next/headers'

export async function POST(req) {
    try {
        const body = await req.json()
        const res = await api.post('/auth/login', body)
    
        const cookieStore = await cookies()
        cookieStore.set('token', JSON.stringify(res.data), {
            secure: true
        })
        cookieStore.set('user', JSON.stringify(body.username), {
            secure: true
        })
        return NextResponse.json({
            success: true,
            status : 200,
            role : res.data.role
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