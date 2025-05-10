import { NextResponse } from 'next/server'
import api from '@/api'

export async function POST(req) {
    try {
        const body = await req.json()
        const res = await api.post('/auth/register', body)
    
        return NextResponse.json({
            success: true,
            status : 200,
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