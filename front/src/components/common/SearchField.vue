<template>
    <div class="search">
        <input type="search" class="search__input" placeholder="Search"/>
        <div class="search__icon">
            <img src="@/assets/icons/search.svg" />
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchField"
}
</script>
<style lang="scss" scoped>
.search {
    height: 38px;
    width: 450px;
    position: relative;
    &__input {
        width: 100%;
        height: 100%;
        border-radius: 30px;
        background: $gray;
        font-size: 18px;
        padding: 8px 10px 8px 64px;
        outline: none;
        border: none;
        &::placeholder {    
            color: $dark-gray;
        }
    }
    &__icon {
        position: absolute;
        top: 25%;
        left: 14px;
    }
}
</style>