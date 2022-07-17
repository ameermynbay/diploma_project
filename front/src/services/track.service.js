import api from './api';
const auth = "JWT " + localStorage.getItem('accessToken')
const headers = {
    "Authorization": auth,
};

class TrackService {
    async getTracks() {
        return api.get("audio/track/", { headers });
    }
}

export default new TrackService();