import TrackService from "@/services/track.service";

export const track = {
    namespaced: true,
    state() {
        return {
            tracks: [
                {
                    id: null,
                    title: "",
                    genre: null,
                    album: {
                        id: null,
                        author: [{
                            id: null,
                            name: "",
                            avatar: "",
                            social_links: null
                        }],
                        name: "",
                        description: "",
                        cover: "",
                        private: Boolean,
                    },
                    file: "",
                    create_at: "",
                    plays_count: null
                },
            ],
            player: []
        }
    },
    getters: {
        getTracks: (state) => state.tracks,
        getTracksByAlbum: (state) => (album) => {
            return state.tracks.filter(track => track.album.name === album);
        },
        getTracksByArtist: (state) => (artist) => {
            return state.tracks.filter(track => track.album.author[0].name == artist)
        },
        getTracksByArray: (state) => (array) => {
            return state.tracks.filter(track => !array.includes(track))
        },
        getPlayer: (state) => state.player
    },
    mutations: {
        setTracks(state, payload) {
            state.tracks = payload;
        },
        togglePlayer(state, payload) {
            state.player = payload;
        }
    },
    actions: {
        async fetchTracks(context) {
            const res = await TrackService.getTracks();
            context.commit("setTracks", res.data);
        },
        async changeTrackList(context, array) {
            context.commit("setTracks", array)
        },
        togglePlayer(context, array) {
            console.log(array)
            context.commit("togglePlayer", array)
        }
    }
}