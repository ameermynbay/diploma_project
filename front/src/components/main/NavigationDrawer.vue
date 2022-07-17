<template>
    <div class="navigation">
        <div class="navigation__logo flex flex--center">
            <Logo />
        </div>
        <div class="navigation__menu">
            <ul class="menu">
                <li class="menu__item" :class="{'menu__item--active' : (this.active_el == 1)}" @click="setActiveNav(1)"><router-link exact to="/">Home</router-link></li>
                <li class="menu__item" :class="{'menu__item--active' : (this.active_el == 2)}" @click="setActiveNav(2)"><router-link to="/library">My Library</router-link></li>
                <li class="menu__item" :class="{'menu__item--active' : (this.active_el == 3)}" @click="setActiveNav(3)"><router-link to="/liked">Liked Songs</router-link></li>
            </ul>
            <div class="playlist-menu" v-if="playlistItems.title !== null">
                <p class="playlist-menu__title"> Playlists </p>
                <ul v-if="playlistItems.title !== null">
                    <li v-for="p in playlistItems" :key="p.id">
                        <router-link :to="`/playlist/${p.id}`">
                            {{p.title}} 
                        </router-link>
                    </li>
                </ul>
                <button class="create-playlist" @click="showModal">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="22" height="22" fill="#9D9D9D"/>
                    <path d="M11.6875 10.3125V5.5H10.3125V10.3125H5.5V11.6875H10.3125V16.5H11.6875V11.6875H16.5V10.3125H11.6875Z" fill="black"/>
                    </svg>
                    Create playlist
                </button>
            </div>
            <Modal v-show="isModalVisible" type="create" @close="closeModal">
                <template v-slot:header>
                    Create playlist
                </template>
            </Modal>
        </div>
    </div>
</template>

<script>
import Logo from "../common/Logo.vue";
import Modal from '../common/Modal.vue';
import { mapGetters } from 'vuex';


export default {
    name: "NavigationDrawer",
    components: {
        Logo,
        Modal
    },
    props: ['id'],
    data() {
        return{
            active_el: 0,
            isModalVisible: false,
            playlistId: null,
        }
    },
    computed: {
        isLoggedIn: {
            get: function() {
                return this.$store.getters['auth/getLogged'];
            }
        },
        ...mapGetters({
            playlist: 'playlist/getPlaylist',
        }),
        playlistItems() {
            return this.playlist;
        },
    },
    beforeMount(){
        if(this.isLoggedIn){
            this.$store.dispatch('playlist/fetchPlaylist');
        }
    },
    mounted(){
        this.catchActiveNav();
    },
    watch:{
        "this.$route.path"() {
            this.catchActiveNav();
        }
    },
    methods: {
        setActiveNav(index) {
            this.active_el = index;
        },
        catchActiveNav() {
            if(this.$route.path == "/") {
                this.setActiveNav(1);
            } else if(this.$route.path == "/library") {
                console.log("nnn")
                this.setActiveNav(2);
            } else if(this.$route.path == "/liked") {
                this.setActiveNav(3);
            } else {
                console.log("Grgr")
                this.setActiveNav(0);
            }
        },
        showModal() {
            if(this.isLoggedIn){
                this.isModalVisible = true;
            } else {
                this.$router.push("/login");
            }
        },
        closeModal() {
            this.isModalVisible = false;
        }
    }
}
</script>

<style lang="scss">
.navigation {
    position: fixed;
    left: 0;
    top: 0;
    min-width: 220px;
    height: 100vh;
    background: $light-gray;
    text-align: left;
    z-index: 20;
    &__logo {
        height: 180px;
    }
}
.menu {
    margin-top: 5px;
    &__item {
        position: relative;
        padding: 6px 25px;
        a {
            font-size: 20px;
        }
        & + & {
            margin-top: 11px;
        }
        &--active {
            font-weight: bold;
            &::before {
                content: '';
                display: inline-block;
                position: absolute;
                left: 0;
                top: 0;
                width: 4px;
                height: 35px;
                border-radius: 0px 3px 3px 0px;
                background: $secondary-color;
            }
        }
    }
}
.playlist-menu {
    margin-top: 18px;
    padding-left: 25px;
    &__title {
        color: $gray-title;
        font-size: 24px;
        margin-bottom: 21px;
    }
    a {
       font-size: 20px;
    }
    li + li {
        margin-top: 17px;
    }
}
.create-playlist {
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    column-gap: 5px;
    font-size: 20px;
    transition: all 0.4s ease;
    padding: 0 10px 0 0; 
    margin-top: 22px;
    &:hover {
        cursor: pointer;
        background: rgb(204, 204, 204);
    }
}
</style>