import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const apiKey = '19541383-5d00357ab0e5a7bba4cc805df';


const fetchRequest = () => {
    return axios.get(`${baseURL}?lang=ru&key=${apiKey}`).then(res => {
        console.log(res.data)
        return res.data
    })
}


const fetchQuery = (query) => {
    return axios
    .get(`${baseURL}?lang=ru&key=${apiKey}&q=${query}`)
    .then(res => {
        console.log(res.data)
        return res.data
    })
}


export default {
    fetchRequest,
    fetchQuery
}