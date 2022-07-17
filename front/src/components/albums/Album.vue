<template>
    <router-link :to="`/albums/${item.id}`">
        <div class="album">
            <div class="album__img">
                <img :src="item.cover" />
            </div>
            <p class="album__name"> {{ item.name }} </p> 
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'Album',
    props: ['item'],
    mounted() {

        this.$route.params.id = this.item.id
    }
}
</script>

<style lang="scss" scoped>
.album {
    width: auto;
    max-width: 200px;
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
        margin: 11px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; 
                line-clamp: 1; 
        -webkit-box-orient: vertical;
    }
    &__desc {
        font-weight: 500;
        font-size: 18px;
        color: $gray-title;
    }
}
</style>