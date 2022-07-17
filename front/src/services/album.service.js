import api from './api';
// const auth = "JWT " + localStorage.getItem('accessToken')
// const headers = {
//     "Authorization": auth,
// };

class AlbumService {
    async getPublicAlbums() {
        return api.get("audio/album/");
    }
}

export default new AlbumService();