<template>
    <div class="overlay">
        <div class="modal-wrapper">
            <div class="modal">
                <div class="modal__content">
                    <p>{{text}}</p>
                    {{error}}
                    <input type="password" :class="{'error': error}" v-model="password"/>
                    <div class="flex flex--space">
                        <Button type="full" @click="toggle(this.password)" style="width: 100%">Delete</Button>
                        <Button type="outline" @click="toggle(false)" style="width: 100%">Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "@/components/common/Button.vue";
import UserService from "@/services/user.service.js";

export default {
    name: 'ConfirmationModal',
    props: ['text'],
    components: {
        Button
    },
    data(){
        return {
            password: "",
            error: false
        }
    },
    methods: {
        async toggle(state) {
            if(!state) {
                this.isOpened = false;
            } else {  
                let res = await UserService.deleteUser(state);
                if(res.data.status == 200 || res.data.status == 201) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('accessToken');
                    this.$router.push("/login");
                } else if(res.data.status == 400) {
                    this.error = true;
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.329);
    z-index: 600;
}
.modal-wrapper{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal {
    max-width: 350px;
    padding: 48px 80px;
    background: $primary-color;
    border-radius: 10px;
    &__content div {
        gap: 20px;
    }
}
p {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 30px;
    text-align: center;
}
input {
    width: 90%;
    padding: 10px 12px;
    margin-bottom: 20px;
}
.error {
    border: 1px solid red;
}
</style>