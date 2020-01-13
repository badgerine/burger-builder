import { axios } from "axios";

const instance = axios.create({
    baseURL: 'https://burger-builder-ed94e.firebaseio.com/'
});

export default instance;

