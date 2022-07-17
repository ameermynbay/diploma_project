<template>
  <div class="home">
   <div class="content">
     <div class="content__block">
       <div class="content__top flex flex&#45;&#45;space">
         <p class="content__title">Popular Albums</p>
         <button class="see-all-btn" @click="expandBlock(1)">See All</button>
       </div>
       <div class="content__nowrap" :class="{'content__nowrap&#45;&#45;expand' : isExpand.album}">
         <Albums />
       </div>
     </div>
     <div class="content__block">
       <div class="content__top flex flex&#45;&#45;space">
         <p class="content__title">Popular artists</p>
         <button class="see-all-btn" @click="expandBlock(2)">See All</button>
       </div>
       <div class="content__nowrap" :class="{'content__nowrap&#45;&#45;expand' : isExpand.artist}">
         <Artists />
       </div>
     </div>
   </div>
  </div>
</template>
<script>
import Artists from "@/components/artists/Artists.vue";
import Albums from "@/components/albums/Albums.vue";

export default {
  name: "Home",
  components: {
    Artists,
    Albums
  },
  data() {
    return {
      content: "",
      isExpand: {
        album: false,
        artist: false
      }
    };
  },
  computed: {
    userInfo: {
      get: function() {
        return this.$store.getters['user/getUser'];
      }
    },
  },
  created(){
    this.$store.dispatch('artist/fetchArtist');
    this.$store.dispatch('album/fetchAlbum');
  },
  methods: {
    expandBlock(id) {
      if(id == 1) {
        this.isExpand.album = !this.isExpand.album;
      } else if(id == 2) {
        this.isExpand.artist = !this.isExpand.artist;
      }
    }
  }
};
</script>

<style lang="scss">
.home {
  position: relative;
}
.content {
  max-width: 100%;
  padding: 25px 40px;
  &__title {
    text-align: left;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 26px;
    line-height: 30px;
  }
  &__block {
    margin-bottom: 35px;
  }
  &__nowrap {
    height: 280px;
    overflow: hidden;
    &--expand {
      height: auto;
    }
  }
}
</style>