<template>
    <div v-if="this.$store.state.user.user.id != 0" class="player">
      <div class="track-info">
        <img :src="audioList[this.currentIndex].album.cover" class="track-info__img"/>
        <div class="track-info__content">
          <p class="main">{{ audioList[this.currentIndex].title }}</p>
          <p class="secondary">{{audioList[this.currentIndex].album.author[0].name}}</p>
        </div>
        <Like :id="audioList[this.currentIndex].id"/>
      </div>
      <audio-player
      ref="audioPlayer"
      :audio-list="audioList.map(elm => elm.file)"
      :before-play="handleBeforePlay"
      theme-color="#6900FF"
      />
      <div class="track-info">
        
      </div>
  </div>
</template>

<script>
import AudioPlayer from '@liripeng/vue-audio-player';
import Like from "./Like.vue";

export default {
  name: 'MusicPlayer',
  components: {
    AudioPlayer,
    Like
  },
  props: ['audioList', 'isPlay'],
  data() {
    return {
      play: false,
      currentAudioName: '',
      currentIndex: 0,
      isLogged: false,
      isOpened: false
    }
  },
  beforeCreate() {
    this.$store.dispatch('auth/login')
    this.isLogged = this.$store.state.auth.loggedIn;
  },
  watch: {
    "this.isPlay"() {
      this.handlePlay();
    }
  },
  methods: {
    handleBeforePlay(next, id) {
      this.currentAudioName = this.audioList[this.$refs.audioPlayer.currentPlayIndex].title
      this.currentIndex = id;
      next();
    },
    showTracks() {
      this.isOpened = !this.isOpened;
    },
    playCurrent(playlistId) {
      this.$refs.audioPlayer.currentPlayIndex = playlistId;
      this.currentIndex = playlistId;
    }
  }
}
</script>

<style lang="scss">
.track-info {
  width: 320px;
  padding: 10px;
  display: flex;
  align-items: center;
  &__img {
    width: 75px;
    height: 75px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__content {
    margin: 0 17px;
    .main {
      font-weight: 500;
      font-size: 18px;
    }
  }
}
.audio__progress-wrap {
  margin: 0 200px 0;
  width: auto;
  position: relative;
  z-index: 2;
  margin-top: 10px !important;
}
.audio__btn-wrap {
  width: 100%;
  margin-top: 10px;
}
.audio-player {
  width: 60%;
  position: relative;
  padding: 8px 20px;
}
.player {
  display: flex;
  position: relative;
  &--additional {
    position: absolute;
    width: 100%;
    height: 880px;
    background: rgba(172, 172, 172, 0.623);
    bottom: 90px;
  }
}
.audio__time-wrap {
  width: 65%;
  margin-left: 160px;
  position: absolute;
  bottom: 21%;
}
</style>