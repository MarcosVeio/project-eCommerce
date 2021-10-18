import api from './../../http';

export const deleteProductInOrder = (code, id) => {
    return api.delete(`/order/${code}/${id}`)
}