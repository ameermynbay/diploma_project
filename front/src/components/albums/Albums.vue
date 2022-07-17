<template>
    <div class="albums">
        <Album  v-for="item in albums" :key="item.id" :item="item" :itemId="item.id"/>
    </div>
</template>

<script>
import Album from "./Album.vue";
import { mapGetters } from 'vuex';

export default{
    name: 'Albums',
    components:{
        Album,
    },
    computed: {
        ...mapGetters({
            album: 'album/getAlbums',
        }),
        albums() {
            return this.album;
        },
    },
    mounted() {
        this.$store.dispatch('album/fetchAlbum');
    }
}
</script>

<style lang="scss">
.albums{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, auto);
    grid-gap: 35px;
}
</style>