import api from './api';
const auth = "JWT " + localStorage.getItem('accessToken')
const headers = {
    "Authorization": auth,
};

class LikedSongsService {
    async getLikedSongs() {
        return api.get("audio/liked-songs/", { headers });
    }

    async addLiked(id) {
        const body = {
            "tracks": id
        }
        return api.patch(`audio/liked-songs/${id}/`, body, { headers })
            .then((response) => response.data)
            .catch((err) => err)
    }
    
}

export default new LikedSongsService();
