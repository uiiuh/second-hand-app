// 对axios进行二次封装
// 引入 axios
import axios from 'axios'

// 1.利用axios对象的方法create创建一个axios实例
// 2.requests就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径：发请求的时候，路径当中都会加上api(因为接口路径当中都有/api)
    baseURL: "/api",
    // 请求超时的时间：5s
    timeout: 5000,
})

// 请求拦截器：在发请求之前，请求拦截器可以监测到，因此可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    // config：配置对象，它有一个属性很重要 ———— headers请求头
    
    // 获取本地存储中的token
    const token = localStorage.getItem('token');
    // 如果token存在，则将token添加到请求头中
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        // config.headers['Authorization'] = `${token}`;
    }
    return config
})

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        // 成功的回调：服务器响应数据回来以后，响应拦截器可以监测到，可以做一些事情
        return res.data
    },
    (error) => {
        // 失败的回调：
        // 终止promise量？
        console.log(error);
        return error.response.data
        // return Promise.reject(new Error('faile'))
    }
)

// 对外暴露
export default requests