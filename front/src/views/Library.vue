<template>
  <div class="library">
    <div class="library__top"> 
      <div class="select-btns">
        <button class="select-btns__item" :class="{'select-btns__item--active' : (active_el == 1)}" @click="setActiveEl(1)">Playlists</button>
        <button class="select-btns__item" :class="{'select-btns__item--active' : (active_el == 2)}" @click="setActiveEl(2)">Artists</button>
        <button class="select-btns__item" :class="{'select-btns__item--active' : (active_el == 3)}" @click="setActiveEl(3)">Albums</button>
      </div>
      <div class="library__filter">
        <!-- <SearchField /> -->
      </div>
    </div>
    <div>
      <div v-if="active_el == 1" class="library__content">
        <Playlists :withLiked="true"/>
      </div>
      <div v-if="active_el == 2" class="library__content">
        <Artists />
      </div>
      <div v-if="active_el == 3" class="library__content">
        <Albums />
      </div>
    </div>
  </div>
</template>

<script>
// import SearchField from "@/components/common/SearchField.vue";
import Artists from "@/components/artists/Artists.vue";
import Albums from "@/components/albums/Albums.vue";
import Playlists from "@/components/playlists/Playlists.vue";

export default {
    name: 'Library',
    components: {
        // SearchField,
        Artists,
        Albums,
        Playlists
    },
    data() {
        return {
            active_el: 1
        }
    },
    methods: {
        setActiveEl(index) {
            this.active_el = index;
        }
    }
}
</script>

<style lang="scss">
.library {
  padding: 35px 20px 35px 45px;
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__content {
    margin: 65px 0;
    display: flex;
  }
}
.select-btns {
  
  display: inline-block;
  &__item {
    width: 120px;
    height: 50px;
    background: inherit;
    border-radius: 5px;
    transition: all 0.3s ease;
    border: none;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    &:hover {
      cursor: pointer;
    }
    &--active {
      background: #F2F2F2;
      color: #6900FF;
    }
    &+& {
      margin-left: 20px;
    }
  }
}
</style>