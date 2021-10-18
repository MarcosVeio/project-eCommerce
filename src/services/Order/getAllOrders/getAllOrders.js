import api from "../../http"

export const getAllOrders = () => {
    return api.get('/order')
}