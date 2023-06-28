import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 50000
})

service.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('AI_TOKEN') || null
    return config
})

service.interceptors.response.use(
    (res) => {
        if (res.data.success) {
            return Promise.resolve(res.data.model)
        } else {
            ElMessage.error({
                message: res.data.errorMessage || 'Error'
            })
            return Promise.reject(res.data)
        }
    },
    (error) => {
        if (error.response.data.status == 401) {
            localStorage.clear()
            router.replace('/login')
        } else {
            // 除 401外, 其他错误信息需提示
            ElMessage.error({
                message: error
            })
        }

        return Promise.reject(error)
    }
)

export default service
