<template>
    <div class="playlist-page">
        <div class="playlist-page__top">
            <div class="playlist-page__cover">
                <img :src="liked.cover" />
            </div>
            <div class="playlist-detail">
                <p class="playlist-detail__text">Liked Songs</p>
                <p class="playlist-detail__name"> {{ liked.title }} </p>
                <span class="playlist-detail__text"> {{ userInfo.name }} &#8226; </span>
                <span class="playlist-detail__text"> {{ liked.tracks.length }}</span>
            </div>
        </div>
        <div class="playlist-page__content" v-if="liked.tracks.length != 0">
            <PlayButton @click="changePlayState" :isPlay="isPlay" />
            <div class="playlist-table">
                <div class="playlist-table__row">
                    <div style="width: 20px;">#</div>
                    <div style="width: 32%">Title</div>
                    <div style="width: 32%">Album</div>
                    <div style="width: 32%;">Artist</div>
                    <div style="width: 45px;">Time</div>
                </div>
                <div>
                    <div v-for="(track, index) in liked.tracks" :key="track.id" class="playlist-list-item playlist-table__row" 
                        :class="{'playlist-list-item--active' : activeIndex == track.id}" 
                        @mouseover="selectIndex(track.id)" @mouseleave="itemIndex = null"
                        @click="setActiveTrack(track.id)"
                    >
            
                        <audio :ref="'element' + track.id" :src="track.file"></audio>
                
                        <div style="width: 20px;" class="align-center">
                            <div v-if="itemIndex == track.id || activeIndex == track.id" class="playlist-hover" style="transform: translateX(-10px)"><PlayButton :width="25" @click="changeTrackState(track.id)" :isPlay="isPlayTrack" /> </div>
                            <span v-else class="playlist-table__id">{{ index + 1 }}</span>    
                        </div>
                        <div style="width: 32%" class="align-center"> 
                            <div class="playlist-table__item  playlist-table__img">
                                <img :src="track.album.cover" />
                                <span>{{ track.title }}</span>
                            </div> 
                        </div>
                        <div style="width: 32%" class="align-center"> 
                            <span class="playlist-table__item">{{ track.album.name }} </span>
                        </div>
                        <div style="width: 32%" class="align-center"> <span class="playlist-table__item">{{ track.album.author[0].name }} </span></div>
                        <div style="width: 45px" class="align-center"> <span class="playlist-table__item playlist-table__item--time"> 000 </span></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="empty">There’s no music in the playlist</p>
        </div>
    </div>
</template>

<script>
import PlayButton from "@/components/common/PlayButton.vue";
import { mapGetters } from 'vuex';

export default {
    name: 'Liked',
    components: {
        PlayButton,
    },
    data() {
        return {
            tracks: [],
            isPlay: false,
            upHere: false,
            itemIndex: null,
            activeIndex: null,
            playIndex: null,
            isPlayTrack: false,
            currentTrack: 1
        }
    },
    props:["id"],
    computed: {
        isLoggedIn: {
            get: function() {
                return this.$store.getters['auth/getLogged'];
            }
        },
        userInfo: {
            get: function() {
                return this.$store.getters['user/getUser'];
            }
        },
        ...mapGetters({
            likedDetail: 'liked/getLiked'
        }),
        liked() {
            return this.likedDetail;
        },
    },
    beforeCreate() {
        this.$store.dispatch('liked/fetchLiked');
    },
    methods: {
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
        setActiveTrack(id) {
            this.activeIndex = id;
            this.currentTrack = id;
        },
        changeTrackState(id) {
            this.isPlay = !this.isPlay;
            this.isPlayTrack = !this.isPlayTrack;
            this.playIndex = id;
            this.playMusic(id);
        },
        playMusic(id) {
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

.playlist-page {
    padding: 35px;
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
}
.playlist-detail {
    &__text {
        font-weight: bold;
    }
    &__name {
        font-weight: 600;
        font-size: 96px;
        line-height: 112px;
    }
}
.empty {
    font-weight: 600;
    font-size: 24px;
    color: #898989;
    margin-top: 50px;
    text-align: center;
}
</style>