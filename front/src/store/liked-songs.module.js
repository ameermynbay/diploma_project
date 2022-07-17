import LikedSongsService from "@/services/liked-songs.service";

export const liked = {
    namespaced: true,
    state: {
        liked: [{
            id: null,
            title: "",
            tracks: null,
            cover: ""
        }],
    },
    getters: {
        getLiked: (state) => state.liked
    },
    mutations: {
        SET_LIKED(state, liked) {
            state.liked = liked;
        },
        ADD_LIKED(state, track) {
            state.liked.push(track);
        }
    },
    actions: {
        async fetchLiked({ commit }) {
            const data = await LikedSongsService.getLikedSongs();
            commit('SET_LIKED', data.data[0]);
        },
        async addLiked({ commit }, id) {
            const data = await LikedSongsService.addLiked(id);
            commit('ADD_LIKED', data.data)
        }
    }
}