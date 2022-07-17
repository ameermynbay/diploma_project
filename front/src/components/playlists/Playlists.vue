<template>
    <div class="playlists">
        <router-link to="/liked">
            <div v-if="withLiked" class="library-liked">
                <span>Liked Songs</span>
            </div>
        </router-link>
        <Playlist v-for="item in playlists" :key="item.id" :item="item"/>
    </div>
</template>

<script>
import Playlist from "./Playlist.vue";

export default{
    name: 'Playlists',
    components:{
        Playlist,
    },
    props: {
        withLiked: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        playlists: {
            get: function() {
                return this.$store.getters['playlist/getPlaylist']
            }
        }
    },
    mounted() {
        this.$store.dispatch('playlist/fetchPlaylist')
    }
}
</script>

<style lang="scss">
.playlists{
    width: 100%;
    display: flex;
    column-gap: 35px;
    flex-wrap: wrap;
}
.library-liked {
    width: 395px;
    height: 234px;
    background: #A275FF;
    border-radius: 10px;
    display: flex;
    align-items: flex-end;
    padding: 23px 20px;
    span {
        font-weight: 500;
        font-size: 32px;
        color: #FFFFFF;
    }
}
</style>