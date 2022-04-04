import axios from 'axios'

export const mcDonaldsApi = axios.create({
    baseURL: 'https://mcdonalds.trio.dev',
    timeout: 10000
});
