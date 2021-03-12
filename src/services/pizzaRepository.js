import axios from 'axios';
import API_URL from './constant';

export default {
    getPizzaSizes() {
        return axios.get(`${API_URL}/pizza-tamanhos`)
    },
    getPizzaPastas() {
        return axios.get(`${API_URL}/pizza-massas`)
    },
    getPizzaFillings() {
        return axios.get(`${API_URL}/pizza-recheios`)
    },
    getDayHighlights() {
        return axios.get(`${API_URL}/destaque-dia`)
    },
    createOrder(data) {
        return axios.post(`${API_URL}/pedidos`, data)
    },
    getOrderById(id) {
        return axios.get(`${API_URL}/pedidos/${id}`)
    },
    getUser() {
        return axios.get(`${API_URL}/usuario`)
    },
    updatePointsUser(data) {
        return axios.patch(`${API_URL}/usuario`, data)
    }
}