import ArtistService from "@/services/artist.service";

export const artist = {
    namespaced: true,
    state() {
        return {
            artists: [
                {
                    id: null,
                    name: "",
                    avatar: "",
                    social_links: null
                }
            ]
        }
    },
    getters: {
        getArtists: (state) => state.artists,
        getArtistById: (state) => (id) => {
            return state.artists.find(artist => artist.id == id)
        }
    },
    mutations: {
        setArtist(state, payload) {
            state.artists = payload;
        }
    },
    actions: {
        async fetchArtist(context) {
            const res = await ArtistService.getPublicArtists();
            context.commit("setArtist", res.data);
        }
    }
}