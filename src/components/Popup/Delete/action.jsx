'use server'
import { cookies } from 'next/headers'
import api from "@/api"
import { revalidatePath } from 'next/cache'

export async function fethingAction (id, validatePath, url, action, data) {

    try {
        const cookieStore = await cookies()
        const raw = cookieStore.get('token')?.value
        let parsed

        try {
            if(raw) parsed = JSON.parse(raw)
        } catch {
            console.log('invalid session data')
        }

        const token = parsed.token

        if(action === 'create') {
            try {
                const res = await api.post(`${url}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }            
                })

                revalidatePath(validatePath)

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

        } else if(action === 'edit') {
            try {
                const res = await api.put(`${url}/${id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }            
                })

                revalidatePath(validatePath)

                return {
                    success : true,
                    isLoading : false,
                    message : 'Success edit data!'
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
        else if(action === 'delete') {
            const res = await api.delete(`${url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }            
            })
            revalidatePath(validatePath)
        }

    } catch (error) {
        console.error(error)
    }
}