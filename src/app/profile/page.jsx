import MainLayout from "@/mainlayout/MainLayout"
import Link from "next/link"
import api from "@/api"
import { cookies } from "next/headers"

export default async function Profile () {

    const cookieStore = await cookies()
    const raw = cookieStore.get('token')?.value
    let parsed = JSON.parse(raw)
    const token = parsed.token
    let user

    try {
        const res = await api.get('/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        user = res.data
    } catch (error) {
        console.error(error?.message || error?.response?.data || error)
    }
    

    return (
        <MainLayout styled={true}>
            <div className="flex items-center h-[100vh]">
                <div className="rounded-md px-5 flex justify-center pt-[2.5rem]  w-[100%] h-[100%]">
                    <div className="flex flex-col w-[400px] h-[438px] justify-center items-center">
                        <h1 className="text-[20px] font-[500] mb-[2rem]">User profile</h1>
                        <div 
                        className="soft-col-bg primary-col flex justify-center items-center font-[500] 
                        rounded-full w-[68px] h-[68px] text-[24px] mb-[1.3rem]">
                            {user.username[0]}
                        </div>
                        <div className="w-[368px] h-[44px] flex flex-row mb-2 rounded-md bg-[#F3F4F6] border border-slate">
                            <div className="w-[113px] pl-3 font-[500] flex flex-row justify-between items-center">
                                <span>Username</span><span>:</span>
                            </div>
                            <div className="text-center flex items-center justify-center w-[255px]">
                                {user.username}
                            </div>
                        </div>
                        <div className="w-[368px] h-[44px] flex flex-row mb-2 rounded-md bg-[#F3F4F6] border border-slate">
                            <div className="w-[113px] pl-3 font-[500] flex flex-row justify-between items-center">
                                <span>Password</span><span>:</span>
                            </div>
                            <div className="text-center flex items-center justify-center w-[255px]">
                                Admin123
                            </div>
                        </div>
                        <div className="w-[368px] h-[44px] flex flex-row mb-2 rounded-md bg-[#F3F4F6] border border-slate">
                            <div className="w-[113px] pl-3 font-[500] flex flex-row justify-between items-center">
                                <span>Role</span><span>:</span>
                            </div>
                            <div className="text-center flex items-center justify-center w-[255px]">
                                {user.role}
                            </div>
                        </div>
                        <Link
                        href='/home'
                        className="cursor-pointer mt-[2.5rem] flex justify-center items-center text-white primary-col-bg rounded-md w-[368] h-[44px]">
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}