import api from './../../http';

export const addidProducts = (productList) => {
    return api.post('/products', productList)
}