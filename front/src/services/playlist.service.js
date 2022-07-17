import api from './api';
const auth = "JWT " + localStorage.getItem('accessToken')
const headers = {
    "Authorization": auth,
};

class PlaylistService {
    async getAllPlaylists() {
        return api.get("audio/playlist/", { headers });
    }

    async createPlaylist(name) {
        var bodyFormData = new FormData();
        bodyFormData.append("title", name,);
        await api.post('audio/playlist/', bodyFormData, { headers });
    }
    async editPlaylistTitle(id, data) {
        let body = {
            "title": data.title,
        }
        return api.patch(`audio/playlist/${id}/`, body, { headers })
          .then(function () {
          console.log("success")
          })
          .catch(function () {
            console.log("error")
        })
    }
    async changePlaylistCover(id, cover) {
        return api.patch(`audio/playlist/${id}/`, cover, { headers })
          .then(function() {
            console.log("success")
          }).catch(function() {
            console.log("error")
          })
      }
    async getOnePlaylist(id) {
        return api.get(`audio/playlist/${id}/`, { headers });
    }
    async deletePlaylist(id) {
        return api.delete(`audio/playlist/${id}/`, { headers });
    }

    // async updatePlaylist(id, title, cover, tracks) {
    //     const body = {
    //         "title": title
    //     }
    //     return api.patch("profile/", body, { headers })
    //         .then((response) => response.data)
    //         .catch((err) => err)
    // }
}

export default new PlaylistService();
