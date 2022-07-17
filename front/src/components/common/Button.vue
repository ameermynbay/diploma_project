<template>
    <button :class="type == 'outline' ? 'outline' : ''">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "Button",
    props: {
        type: String,
    }
}
</script>
<style lang="scss" scoped>
button {
    font-size: 14px;
    padding: 11px 28px;
    background: $secondary-color;
    border-radius: 28px;
    border: none;
    color: #fff;
    transition: all 0.3s ease;
    &:hover {
        cursor: pointer;
        background: #6a00ffcb;
    }
    &:disabled {
        background: #b6b6b6;
        color: rgb(102, 102, 102);
        &:hover{
            cursor:default;
        }
    }
}
.outline {
    padding: 9px 28px;
    background: inherit;
    color: $secondary-color;
    border: 2px solid $secondary-color;
    &:hover{
        background: #cba6ff8e !important;
    }
}
</style>