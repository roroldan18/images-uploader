import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL : "https://rodri-image-uploader.herokuapp.com/"
})