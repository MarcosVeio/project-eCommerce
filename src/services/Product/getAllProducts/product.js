import api from './../../http';

export const getAllProducts = () => {
    return api.get('/product')
}