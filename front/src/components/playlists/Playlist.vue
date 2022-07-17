<template>
<router-link :to="{ name: 'PlaylistDetail', params: { id: this.item.id }}">
    <div class="playlist">
        <div class="playlist__img">
            <img :src="item.img" />
        </div>
        <p class="playlist__name"> {{ item.name }} </p> 
        <p class="playlist__desc"> {{ item.description }} </p>
    </div>
</router-link>
</template>

<script>
export default {
    name: 'Playlist',
    props: {
        item: Object,
    },
}
</script>

<style lang="scss" scoped>
.playlist {
    width: auto;
    max-width: 200px;
    min-width: 200px;
    &__img {
        width: 100%;
        height: 200px;
        border-radius: 10px;
        background: $gray;
        overflow: hidden;
        img {
            width: 100%; 
            height: 100%;
            object-fit: cover;
        }
    }
    &__name {
        text-align: left;
        font-size: 22px;
        line-height: 26px;
        margin: 11px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; 
                line-clamp: 1; 
        -webkit-box-orient: vertical;
    }
    &__desc {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        color: $gray-title;
    }
}
</style>