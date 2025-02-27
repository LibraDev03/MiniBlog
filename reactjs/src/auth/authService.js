import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const register = (name, email, password) => {
    return axios.post(`${API_URL}register`, { name, email, password });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', {
        email,
        password
    })
    .then(response => {
        if (response.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const isAuthenticated = () => {
    return !!localStorage.getItem('user');
};

// const logout = () => {
//     localStorage.removeItem('user');
// };

const authService = {
    register,
    login,
    isAuthenticated
    // logout
};

export default authService;