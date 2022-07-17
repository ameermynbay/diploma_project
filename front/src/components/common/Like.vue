<template>
<div @click="changeState()" v-if="isLiked" >
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_234_1508)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9999 1.80676C17.1022 -4.46599 32.3592 6.51063 10.9999 20.625C-10.3593 6.51201 4.89767 -4.46599 10.9999 1.80676Z" fill="#6900FF"/>
        </g>
        <defs>
            <clipPath id="clip0_234_1508">
                <rect width="22" height="22" fill="white"/>
            </clipPath>
        </defs>
    </svg>
</div>
<div v-else @click="changeState()">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_511_1398)">
            <path d="M10.6413 2.15547L10.9997 2.52387L11.3581 2.15547C14.1418 -0.706018 19.0822 0.341075 20.8527 3.79867C21.7214 5.49517 21.8411 7.82393 20.4228 10.6221C19.0231 13.3835 16.1265 16.592 10.9997 20.0246C5.87286 16.5924 2.9763 13.384 1.57662 10.6226C0.158355 7.82458 0.277955 5.49577 1.14669 3.79918C2.91724 0.341371 7.85764 -0.70598 10.6413 2.15547Z" stroke="#D0D0D0"/>
        </g>
        <defs>
            <clipPath id="clip0_511_1398">
                <rect width="22" height="22" fill="white"/>
            </clipPath>
        </defs>
    </svg>
</div>
</template>

<script>
export default {
    name: "Like",
    props: ['id'],
    data() {
        return {
            isLiked: false
        }
    },
    methods: {
        changeState(){
            this.isLiked = !this.isLiked;
            if(this.isLiked) {
                this.$store.dispatch('liked/addLiked', this.id);
                console.log(this.$store.dispatch('liked/addLiked'))
            }
            console.log(this.id)
        }
    }
}
</script>
<style lang="scss" scoped></style>