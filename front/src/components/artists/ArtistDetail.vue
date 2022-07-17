<template>
    <div class="artist-page">
        <div class="artist-page__top">
            <div class="artist-page__cover"> 
                <img :src="artistObject.avatar" />
            </div>
            <div class="artist-detail">
                <p class="artist-detail__text">Artist</p>
                <p class="artist-detail__name"> {{ artistObject.name }} </p>
                <!-- <p class="playlist-detail__count"> {{ artistObject.author[0].name }} &#8226; </p> -->
            </div>
        </div>
        <div class="artist-page__content">
            <p class="artist-page__title">Popular</p>
            <div class="artist-tracks" >
                <div class="artist-tracks__item" v-for="track in trackList" :key="track.id" 
                    @mouseover="selectIndex(track.id)" @mouseleave="itemIndex = null"
                    @click="setActiveTrack(track.id)">
                    
                    <audio :ref="'element' + track.id" :src="track.file"></audio>
                  
                    <div class="artist-tracks__img" style="position: relative">
                        <div v-if="itemIndex == track.id || activeIndex == track.id" class="artist-tracks__play">
                            <div>
                                <PlayButton :width="25" @click="changeTrackState(track.id)" :isPlay="isPlayTrack" /> 
                            </div>
                        </div>
                        <img :src="track.album.cover" />
                    </div>
                    <div class="artist-tracks__name">{{track.title}}</div>
                    <div class="artist-tracks__time">{{  }}</div>
                </div>
            </div>
        </div>
        <div class="artist-page__content" style="margin-top: 32px">
            <p class="artist-page__title">Releases</p>
            <div class="artist-albums" >
                <Album  v-for="item in albumList" :key="item.id" :item="item"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlayButton from "@/components/common/PlayButton.vue";
import Album from "../albums/Album.vue";

export default {
    name: 'ArtistDetail',
    components: {
        PlayButton,
        Album,
    },
    data() {
        return {
            isPlay: false,
            upHere: false,
            itemIndex: null,
            activeIndex: null,
            playIndex: null,
            isPlayTrack: false,
            currentTrack: 1,
            trackDuration: 0,
            duration: 0,
        }
    },
    computed: {
        userInfo: {
            get: function() {
                return this.$store.getters['user/getUser'];
            }
        },
        ...mapGetters({
            artist: 'artist/getArtistById',
            albums: 'album/getAlbumsByArtist',
            tracks: 'track/getTracksByArtist'
        }),
        artistObject() {
            return this.artist(this.$route.params.id)
        },
        albumList() {
            return this.albums(this.artistObject.name)
        },
        trackList() {
            return this.tracks(this.artistObject.name)
        }
    },
    beforeCreate(){
        this.urlId = this.$route.params.playlistId;
        this.$store.dispatch('artist/fetchArtist');
        this.$store.dispatch('album/fetchAlbum');
        this.$store.dispatch('track/fetchTracks');
    },
    methods: {
        getAudioDuration(id) {
            console.log(this.$refs["element"+id][0]);
        },
        changePlayState() {
            this.isPlay = !this.isPlay;
            this.activeIndex = null;
            this.isPlayTrack = !this.isPlayTrack;
            
            if(this.activeIndex == null) {
                this.activeIndex = 1;
                this.playIndex = 1;
                this.playMusic(1);
            } else {
                this.playMusic(this.playIndex);
            }
        },
        timeDisplay(time) {
            let hrs = Math.floor(time / 3600);
            let mins = Math.floor((time % 3600) / 60);
            let secs = Math.floor(time % 60);
            // Output like "1:01" or "4:03:59" or "123:03:59"
            let output = "";
            if (hrs > 0) {
                output += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }
            output += "" + mins + ":" + (secs < 10 ? "0" : "");
            output += "" + secs;
            return output;
        },
        setActiveTrack(id) {
            this.activeIndex = id;
            this.currentTrack = id;
        },
        changeTrackState(id) {
            console.log(this.trackList)
            console.log(this.trackList.splice(id))
            this.$store.dispatch('track/togglePlayer', this.trackList);
            this.isPlay = !this.isPlay;
            this.isPlayTrack = !this.isPlayTrack;
            this.playIndex = id;
            this.playMusic(id);
        },
        playMusic(id) {
            this.$store.dispatch('track/changeTrackList', this.trackList);
            if(this.isPlayTrack) {
                this.$refs["element"+id][0].play();
            } else {
               this.$refs["element"+id][0].pause();
            }
        },
        selectIndex(index) { 
            this.itemIndex = index;
        }
    }
}
</script>

<style lang="scss" scoped>

.artist-page {
    padding: 35px;
    margin-bottom: 70px;
    &__top {
        display: flex;
        align-items: center;
        gap: 37px;
        padding: 0 0 25px;
        border-bottom: 2px solid $gray-title;
    }
    &__cover {
        border-radius: 10px;
        height: 200px;
        width: 200px;
        border-radius: 100%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__content {
        margin-top: 15px;
    }
    &__title {
        font-weight: 500;
        font-size: 24px;
        margin-bottom: 18px;
    }
}
.artist-detail {
    &__text {
        font-weight: bold;
    }
    &__name {
        font-weight: 600;
        font-size: 96px;
        line-height: 112px;
    }
}
.album-table{ 
    width: 100%;
    margin-top: 20px;
    &__row {
        display: flex;
        padding: 8px 10px;
    }
    &__id {
        font-weight: 600;
        font-size: 20px;
    }
    &__cover{
        width: 58px;
        height: 58px;
        border-radius: 2px;
        margin-right: 12px;
    }
    &__item{
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 20px;
        &--time {
            color: #979797;
        }
    }
}
.album-hover {
    height:100%;
    width: 100%;
    position: absolute;
    top: 33%;
    left: 3px;
    z-index: 2;
}
.album-list-item {
    position: relative;
    border-radius: 5px;
    padding: 8px 10px;
    transition: all 0.3s ease;
    &:hover, &--active {
        background: $gray;
    }
}
.artist-tracks {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    &__item {
        width: 47%;
        display: flex;
        align-items: center;
        padding-right: 5px;
        transition: all 0.3s ease;
        &:hover {
            background: $gray;
        }
    }
    &__img {
        width: 50px;
        height: 50px;
        border-radius: 2px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__name {
        font-weight: 500;
        font-size: 16px;
        margin-left: 15px;
    }
    &__time {
        font-weight: 500;
        font-size: 14px;
        color: #767676;
        margin-left: auto;
    }
    &__play {
        height:100%;
        width: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.288);
        z-index: 5;
        transition: all 0.3s ease;
        >div {
            width: 25px;
            margin: 25% auto;
        }
    }
}
</style>