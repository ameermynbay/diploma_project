<template>
  <div class="profile">
    <div class="content">
      <div class="profile__header">
        <div class="edit">
          <Avatar class="edit__avatar" size="large" :img="userInfo.avatar" />
        </div>
        <div class="profile__main">
          <div class="profile__name">{{ userInfo.name }}</div>
          <div class="edit-btns">
            <router-link to="/settings">
              <Button type="outline">Edit profile</Button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="content__block" v-if="isShow">
        <div class="content__top flex flex--space">
          <p class="content__title">Playlists</p>
          <button class="see-all-btn" @click="expandBlock()">See All</button>
        </div>
        <div class="content__nowrap" :class="{'content__nowrap&#45;&#45;expand' : isExpand}">
          <Playlists :withLiked="false"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/common/Avatar.vue";
import Button from "@/components/common/Button.vue";
import Playlists from "@/components/playlists/Playlists.vue";

export default {
  name: 'Profile',
  components: {
    Avatar,
    Button,
    Playlists
  },
  data(){
    return {
      user: null,
      newName: "",
      isEdit: false,
      previewImage: null,
      isExpand: false,
      isShow: false
    }
  },
  computed: {
    userInfo: {
      get: function() {
        return this.$store.getters['user/getUser'];
      },
      set: function(newVal) {
        this.userInfo.name = newVal;
      }
    },
    playlists: {
      get: function() {
        return this.$store.getters['playlist/getPlaylist'];
      }
    }
  },
  mounted() {
    this.$store.dispatch('user/fetchUser');
    if(this.playlists.length == 0) this.isShow = false;
    else this.isShow = true;
  },
  methods: {
    onInput(e){
      this.userInfo.name = e.target.innerText;
    },
    setProfile() {
      this.$store.dispatch('user/changeUserName', this.userInfo.name);
      this.isEdit = false;
    },
    expandBlock() {
      this.isExpand = !this.isExpand;
    }
  },
};
</script>

<style lang="scss" scoped>
.profile {
  &__header {
    padding: 35px 45px 60px;
    max-height: 200px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &__name {
    padding: 20px;
    font-weight: 600;
    font-size: 96px;
    line-height: 112px;
    border: none;
  }
}
.edit-btns{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-left: auto;
  button + button {
    margin-left: 10px;
  }
}
.seller_image {
  width: 200px;
  height: 200px;
}
.imagePreviewWrapper {
  background-repeat: no-repeat;
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: contain;
    background-position: center center;
}
.edit {
  position: relative;
  &__hidden {
    // display: none;
    position: absolute;
    bottom: 0;
    left: 40%;
    z-index: 2;
    background: #fff;
  }
  &__avatar:hover + .edit__hover{
    display: block;
  }

}
</style>