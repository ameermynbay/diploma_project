import api from "./api";
class AuthService {
  async login(data) {
    const res = await api.post('login/', {
        email: data.email,
        password: data.pass
      })
    if(res.status == 200) {
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.setItem('accessToken', res.data.access);
      localStorage.setItem('refreshToken', res.data.refresh);
    }
    return res.status;
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }
  async register(email, password, name, date, gender) {
    const body = {
      "email": email,
      "name": name,  
      "date_of_birth": date,
      "gender": gender,
      "password": password,
      "re_password": password,
    }
    await api.post('sign-up/', body)
  }
}
export default new AuthService();