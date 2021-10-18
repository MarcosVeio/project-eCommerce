import api from "../../http"

export const addidOrder = (productList) => {
    return api.post('/orders', productList)
}