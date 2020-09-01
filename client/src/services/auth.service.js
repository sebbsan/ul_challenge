import axios from 'axios';

const API_URL = 'http://localhost:3001/';

class AuthService {
  login(email, password) {
    return axios
      .post(`${API_URL}login`, {
        email,
        password
      })
      .then(response => {
        if (response.data.token && response.data.user) {
          const sessionData = { token: response.data.token, ...response.data.user };
          localStorage.setItem('user', JSON.stringify(sessionData));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(fullName, email, password) {
    return axios.post(`${API_URL}register`, {
      fullName,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
