import { NextResponse } from 'next/server'
import api from '@/api'
import { cookies } from 'next/headers'

export async function POST(req) {
    try {
        const cookieStore = await cookies()
        const body = await req.json()
        const res = await api.post('/auth/login', body)
    
        cookieStore.set('token', JSON.stringify(res.data), {
            secure: true
        })
        cookieStore.set('user', body.username, {
            secure: true
        })
        return NextResponse.json({
            success: true,
            status : 200,
            role : res.data.role
        })
        
    } catch (err) {
        return NextResponse.json({
            success: false,
            error : err?.response?.data || err.message,
            status : err?.response?.status || 500
        })
    }
}