import api from './api';
const auth = "JWT " + localStorage.getItem('accessToken')
const headers = {
  "Authorization": auth,
};

class UserService {
  async getUserBoard() {
    return await api.get("profile/", { headers })
      .then((response) => { return response.data })
      .catch(() => {
        let refresh = localStorage.getItem('refreshToken');
        console.log(refresh)
        const body = {
          "refresh": refresh
        }
        api.post('refresh/', body)
          .then((response) => { 
            console.log(response)
            localStorage.removeItem('accessToken');
            localStorage.setItem('accessToken', response.data.access);
            location.reload();
         })
      });
  }
  async changeUserName(newName) {
    const body = {
      "name": newName
    }
    return api.patch("profile/", body, { headers })
      .then((response) => response.data)
      .catch((err) => err)
  }
  async changeUserAvatar(newAvatar) {
    return api.patch("profile/", newAvatar, { headers })
      .then(function() {
        console.log("success")
      }).catch(function() {
        console.log("error")
      })
  }
  async changeDateOfBirth(newDate) {
    return api.patch("profile/", newDate, { headers })
      .then(function () {
      console.log("success")
      })
      .catch(function () {
        console.log("error")
    })
  }
  async deleteUser(currPass) {
    return api.delete("profile/", {
      headers: {
        "Authorization": auth,
      },
      data: {
        "current_password": currPass
      }
    })
  }
}
export default new UserService();
