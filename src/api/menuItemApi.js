import axiosClient from './axiosClient'

export const getMenuItems = () => axiosClient.get('/menuitems')
export const getMenuItemById = (id) => axiosClient.get(`/menuitems/${id}`)
export const createMenuItem = (data) => axiosClient.post('/menuitems', data)
export const updateMenuItem = (id, data) => axiosClient.put(`/menuitems/${id}`, data)
export const deleteMenuItem = (id) => axiosClient.delete(`/menuitems/${id}`)