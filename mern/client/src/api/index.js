import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5050'

const api = axios.create({
    baseURL
})

export const createFundraiser = payload => api.post('/record', payload)
export const getAllFundraisers = () => api.get('/record')
export const editFundraiser = (id, payload) => api.put(`/record/${id}`, payload)
export const getFundraiserById = id => api.get(`/record/${id}`)

const apis = {
    createFundraiser,
    getAllFundraisers,
    editFundraiser,
    getFundraiserById
}

export default apis
