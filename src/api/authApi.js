import axiosClient from './axiosClient'

export const login = (data) => axiosClient.post('/auth/login', data)
export const register = (data) => axiosClient.post('/auth/register', data)
export const resetPassword = (data) => axiosClient.post('/auth/reset-password', data)