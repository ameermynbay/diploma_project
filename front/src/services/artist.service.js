import api from './api';
// const auth = "JWT " + localStorage.getItem('accessToken')
// const headers = {
//     "Authorization": auth,
// };

class ArtistService {
    async getPublicArtists() {
        return api.get("audio/artist/");
    }
}

export default new ArtistService();