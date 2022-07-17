<template>
    <router-link to="/">
        <div class="logo">
            <img src="@/assets/logo.png" alt="logo" />
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'Logo'
}
</script>

<style lang="scss" scoped>
.logo {
    font-weight: 500;
    font-size: 36px;
    line-height: 42px;
}
</style>