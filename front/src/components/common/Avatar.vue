<template>
    <div class="avatar-wrapper">
        <div class="avatar" :class=" (size == 'large') ? 'avatar--large' : 'avatar--small'">
            <img :src="img" alt="user avatar" />
            {{img}}
        </div>
        <div class="avatar-hover" v-if="isHoverable">
            <input class="form-control edit__hidden" ref="fileInput" type="file" @input="pickFile" id="avatar" style="display:none;">
            <label for="avatar">
                <img src="@/assets/icons/avatar.svg" />
            </label>
        </div>
    </div>
</template>

<script>
export default{
  name: 'Avatar',
  props: {
    img: String,
    size: String,
    isHoverable: Boolean
  },
  methods: {
    selectImage () {
        this.$refs.fileInput.click()
    },
    async pickFile () {
        let input = this.$refs.fileInput
        let file = input.files
        if (file && file[0]) {
            let reader = new FileReader
            reader.onload = e => {
                this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
        let formData = new FormData();
        formData.append('avatar', file[0]);

        await this.$store.dispatch('user/changeUserAvatar', formData)
        location.reload();
        }
    },
  }
}
</script>

<style lang="scss">
.avatar {
    width: 38px;
    height: 38px;
    border-radius: 100%;    
    overflow: hidden;
    display: inline-block;
    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &--large {
        width: 200px;
        height: 200px;
    }
    &-wrapper{
        position: relative;
        &:hover {
            .avatar-hover{
                opacity: 1;
            }
        }
    }
    &-hover{
        opacity: 0;
        position: absolute;
        top: 0;
        background: rgba(0, 0, 0, 0.329);
        width: 100%;
        height: 100%;
        border-radius: 100%;
        transition: all 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
}
</style>
