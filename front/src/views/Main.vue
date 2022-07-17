<template>
    <div class="main">
      <div class="main__content">
       <NavigationDrawer />
        <div style="width: 100%; margin-left: 220px;">
          <AppHeader />
         <router-view></router-view>
        </div>
        <div class="player-bottom">
          <MusicPlayer :audioList="audio" :isPlay="isPlayTrack"/>
        </div>
      </div>
    </div>
</template>

<script>
import AppHeader from "@/components/main/AppHeader.vue";
import NavigationDrawer from "@/components/main/NavigationDrawer.vue";
import MusicPlayer from "@/components/common/MusicPlayer.vue";
import { mapGetters } from 'vuex';
import TrackService from "@/services/track.service.js";

export default {
    name: "Main",
    components: {
        AppHeader, 
        NavigationDrawer,
        MusicPlayer,
    },
    data() {
      return {
        isPlayTrack: false,
      }
    },
    computed: {
      ...mapGetters({
        player: 'track/getPlayer'
      }),
      trackList() {
        return this.tracks;
      },
      audio() {
        return this.player;
      }
    },
    mounted() {
      this.fetchTrackList();
    },
    methods: {
      async fetchTrackList() {
        let res = await TrackService.getTracks();
        this.$store.dispatch('track/togglePlayer', res.data);
      }
    }
}
</script>

<style lang="scss">
.main{
  &__content{
    min-width: 100%;
    display: flex;
    position: relative;
  }
}
.player-bottom {
  width: 1700px;
  margin-left: 220px;
  position: fixed;
  bottom: 0;
  z-index: 300;
  background: #FAFAFA;
}
</style>