'use server'
import { cookies } from 'next/headers'
import api from "@/api"
import { revalidatePath } from 'next/cache'

export async function fethingAction (data) {

        const cookieStore = await cookies()

            try {
                const res = await api.post(`/auth/login`, data)
                cookieStore.set('token', JSON.stringify(res.data))
                console.log(res.data)
                return {
                    success : true,
                    isLoading : false,
                    message : 'Success add new data!'
                }

            } catch (error) {
                return {
                    success : false,
                    isLoading : false,
                    message : 'Failed add new data.',
                    errorMessage: error.message
                }
            }
}