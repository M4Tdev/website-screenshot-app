import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://website-screenshot-app.herokuapp.com',
});

export default instance;