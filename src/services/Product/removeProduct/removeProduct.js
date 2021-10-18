import api from './../../http';

export const removeProduct = (id) => {
    return api.delete(`/product/${id}`)
}