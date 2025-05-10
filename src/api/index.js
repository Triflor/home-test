import axios from 'axios'
import axiosRetry from 'axios-retry' 

export const api = axios.create({

baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    headers: {
        "Content-Type" : 'application/json',
    }
})

axiosRetry(api, {
    retries: 3,
    retryDelay: (count) => {
        return count * 1000
    },
    retryCondition : (error) => {
        return error.code === 'ECONNABORTED' || error.response?.status >= 500
    },
})


export default api