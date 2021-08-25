import axios, { AxiosInstance} from 'axios';

const api : AxiosInstance = axios.create({
    baseURL: "https://habitica.com/api/v3"
})

export default api