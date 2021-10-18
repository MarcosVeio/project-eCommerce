import api from './../../http';

export const removeOrder = (code) => {
    return api.delete(`/order/${code}`)
}