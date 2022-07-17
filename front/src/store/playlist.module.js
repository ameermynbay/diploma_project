import PlaylistService from "@/services/playlist.service";

export const playlist = {
    namespaced: true,
    state: {
        playlists: [{
            id: null,
            title: "",
            tracks: null,
            cover: ""
        }],
    },
    getters: {
        getPlaylist: (state) => state.playlists,
        getPlaylistById: (state) => (id) => {
            return state.playlists.find(playlist => playlist.id == id)
        }
    },
    mutations: {
        ADD_PLAYLIST(state, playlist) {
            state.playlists.push(playlist);
        },
        SET_PLAYLIST(state, playlists) {
            state.playlists = playlists;
        },
        SET_PLAYLIST_TITLE(state, payload) {
            state.playlists.find(x => x.id == payload.id).title = payload.title;
        },
        SET_PLAYLIST_COVER(state, payload) {
            state.playlists.find(x => x.id == payload.id).cover = payload.img;
        },
        DELETE_PLAYLIST(state, payload) {
            state.playlists.splice(payload, 1);
        }
    },
    actions: {
        async fetchPlaylist({ commit }) {
            const data = await PlaylistService.getAllPlaylists();
            commit('SET_PLAYLIST', data.data);
        },
        async addPlaylist({ commit }, playlist) {
            console.log("CREATE")
            const res = await PlaylistService.createPlaylist(playlist).then(
                response => {
                    commit('ADD_PLAYLIST', res.data);
                    return Promise.resolve(response);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        async changePlaylistTitle(context, payload) {
            context.commit("SET_PLAYLIST_TITLE", payload);
            await PlaylistService.editPlaylistTitle(payload.id, payload.title)
        },
        async changePlaylistCover(context, payload) {
            context.commit("SET_PLAYLIST_COVER", payload)
            await PlaylistService.changePlaylistCover(payload.id, payload.img);
        },
        async deletePlaylist(context, payload) {
            context.commit('DELETE_PLAYLIST', payload);
            await PlaylistService.deletePlaylist(payload);
        }
        // async getOnePlaylist({ commit }, id) {
        //     const data = await PlaylistService.getOnePlaylist(id);
        //     commit
        // }
    }
}