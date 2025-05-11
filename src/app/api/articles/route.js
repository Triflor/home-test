import { NextResponse } from 'next/server'
import api from '@/api'
import { cookies } from 'next/headers'

export async function GET(req, res) {
    try {
        const body = await req.json()
        const res = await api.post('/articles')
    
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