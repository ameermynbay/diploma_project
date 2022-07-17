import AlbumService from "@/services/album.service";

export const album = {
    namespaced: true,
    state() {
        return {
            albums: [
                {
                    id: null,
                    author: [{
                        id: null,
                        name: "",
                        avatar: "",
                        social_links: null
                    }],
                    name: "",
                    description: "",
                    cover: null,
                    private: Boolean
                }
            ]
        }
    },
    getters: {
        getAlbums: (state) => state.albums,
        getAlbumsById: (state) => (id) => {
            return state.albums.find(album => album.id == id)
        },
        getAlbumsByArtist: (state) => (name) => {
            return state.albums.filter(album => album.author[0].name == name)
        }
    },
    mutations: {
        setAlbum(state, payload) {
            state.albums = payload;
        }
    },
    actions: {
        async fetchAlbum(context) {
            const res = await AlbumService.getPublicAlbums();
            context.commit("setAlbum", res.data);
        },
    }
}