<template>
    <div class="play-btn">
        <svg v-if="!isPlay" :width="width" :height="width" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="15" fill="#6900FF"/>
            <path d="M11.1666 8L22.8333 15L11.1666 22V8Z" fill="#FAFAFA"/>
        </svg>
        <svg v-else :width="width" :height="width" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="15" r="15" fill="#6900FF"/>
            <rect x="10" y="8" width="3" height="14" fill="white"/>
            <rect x="17" y="8" width="3" height="14" fill="white"/>
        </svg>
    </div>
</template>

<script>
export default {
    name: "PlayButton",
    props: {
        isPlay: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: "40"
        }
    }
}
</script>

<style lang="scss">
.play-btn{
    width: 40px;
}
</style>