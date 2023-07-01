import axios from 'axios';

const Api = axios.create({
    baseURL:'https://back-vdpy.onrender.com',
    withCredentials: true,
    headers: {
        'Content-type':'multipart/form-data',
    },
});


const config={
    headers:{
        'authorization': `Bearer ${localStorage.getItem('token')}`,
    }
}

//creating route
export const testApi=() => Api.get('/');

export const registerApi = (data) => Api.post('/api/user/register', data);

export const loginApi = (data) => Api.post('/api/user/login', data);




export const addProductApi = (data) => Api.post('/api/product/add', data, config);

export const getAllProductApi = () => Api.get('/api/product/get_products');

export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`);

export const updateProductApi = (id,data) => Api.put(`/api/product/update_product/${id}`,data, config);

export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`, config);

export const createOrderApi = (data) => Api.post('/api/orders/create',data, config);

export const getOrdersByUserApi = () => Api.get('/api/orders/get_single', config);

export const getAllOrdersApi = () => Api.get('/api/orders/get_All');

export const updateOrderStatusApi = (id, data) => Api.put(`/api/orders/change_status/${id}`, data, config);
//`` when there is ${ } values


export const searchProductsApi = (query) => Api.get(`/api/product/search_product/${query}`);

export const getCount = () => Api.get('/api/product/count');

export const forgotPasswordApi = (data) => Api.post('/api/user/forget_password',data);













