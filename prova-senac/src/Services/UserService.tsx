import axios from 'axios';
import { UserData } from '../Interfaces/UserData';
const apiClient = axios.create({
    baseURL: 'https://scholarspace-254954748843.southamerica-east1.run.app/api',
    headers:{
        'Content-Type': 'application/json',
        'Accept': "*"
    }
})

export const createUser = (userData: UserData) => {
    return apiClient.post('/User', userData)
}