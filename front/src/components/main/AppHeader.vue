<template>
    <header style="width: 100%">
        <div class="header-content row flex flex--space">
            <div class="col flex flex--space">
                <PageArrow />
                <SearchField />
            </div>
            <div class="col col--btns flex flex--space">
                <div v-if="this.isAuth" class="profile">
                    <div class="user" @click="handleModal">
                        <span class="user__name">{{ userInfo.name }}</span>
                        <Avatar :img="userInfo.avatar" />
                    </div>
                    <div v-click-outside="hide" v-if="isOpen" class="profile__modal" v-on:mouseleave="hide">
                        <ul>
                            <li class="profile__modal-item"><router-link to="/profile">Profile</router-link></li>
                            <li class="profile__modal-item"><router-link to="/settings">Settings</router-link></li>
                            <li class="profile__modal-item" @click="logout()">Logout</li>
                        </ul>
                    </div>
                </div>
                <router-link v-if="!this.isAuth" to="/signup">
                    <Button type="outline">Sign up</Button>
                </router-link>
                <router-link v-if="!this.isAuth" to="/login">
                    <Button type="full"> Sign in </Button>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
import SearchField from "../common/SearchField.vue";
import PageArrow from "../common/PageArrow.vue";
import Button from "../common/Button.vue";
import Avatar from "@/components/common/Avatar.vue";
import { mapGetters } from 'vuex';
import ClickOutside from 'vue-click-outside'

export default  {
  name: "AppHeader",
  components: {
        PageArrow,
        SearchField,
        Button,
        Avatar
  },
  directives: {
    ClickOutside
  },
  data(){
    return { 
        isOpen: false,
    }
  },
  computed: { 
    ...mapGetters({
        user: 'user/getUser',
        isLogged: 'auth/getLogged',
    }), 
    userInfo() {
      return this.user;
    },
    isAuth() {
        return this.isLogged;
    }
  },
  beforeCreate() {
    if(this.$store.getters['auth/getLogged']){ 
        this.$store.dispatch('user/fetchUser')
        this.$store.dispatch("playlist/addPlaylist", "Liked songs");
    }
  },
  mounted(){
    this.popupItem = this.$el
  },
  methods: {
    logout() {
        this.$store.dispatch('auth/logout')
        this.$router.push("/login");
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },
    handleModal() {
        this.isOpen = !this.isOpen;
    },
    hide() {
        this.isOpen = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.header-content {
    max-height: 70px;
    background: $primary-color;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    padding: 16px 35px;
    & .search {
        margin-left: 66px;
    }
}
.col--btns {
    column-gap: 20px;
}
.user {
    display: flex;
    align-items: center;
    &__name {
        font-size: 20px;
        line-height: 23px;
        margin-right: 8px;
    }
    &:hover{
        cursor: pointer;
    }
}
.profile{
    position: relative;
    &__modal{
        position: absolute;
        z-index: 4;
        top: 100%;
        transform: translate(-50%, 15%);
        background: $primary-color;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        width: 270px;
        &-item{ 
            padding: 16px;
            font-size: 20px;
            transition: all 0.2s ease;
            &:hover{
                cursor: pointer;
                font-weight: 500;
            }
            a{ 
                font-size: 20px;
            }
            &+& {
                border-top: 1px solid $gray;
            }
        }
    }
}
</style>