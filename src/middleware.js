import { NextResponse } from "next/server";

export function middleware(request){
    const token = request.cookies.get('token')

    let role = token? JSON.parse(token?.value)?.role : ''
    const { pathname } = request.nextUrl
    const publicPath = ['/favicon.ico', '/_next']

    const goingPublic = publicPath.some(path => pathname.startsWith(path))

    if(!token && !goingPublic) {
        const loginUrl = request.nextUrl.clone()
        loginUrl.pathname ='/authentication'

        return NextResponse.redirect(loginUrl)
    }

    if(token && role == 'Admin' && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/admin/articles', request.url))
    }

    if(role == 'User' && pathname.startsWith('/admin')) {
        const unauthorized = request.nextUrl.clone()
        unauthorized.pathname ='/unauthorized'
        return NextResponse.redirect(unauthorized)
    }

    return NextResponse.next()
}