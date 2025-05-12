import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST() {
    revalidatePath('/admin/articles')
    return NextResponse.json({
        revalidated : true
    })
}