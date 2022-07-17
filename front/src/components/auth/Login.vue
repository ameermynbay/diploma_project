<template>
    <div class="signin">
        <div class="signin__top flex flex--center">
            <Logo />
            <span class="logo-text">Tyñda</span>
        </div>
        <div class="signin__content">
            <div v-if="message" class="error-box">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 1.5625C6.45996 1.5625 1.5625 6.45996 1.5625 12.5C1.5625 18.54 6.45996 23.4375 12.5 23.4375C18.54 23.4375 23.4375 18.54 23.4375 12.5C23.4375 6.45996 18.54 1.5625 12.5 1.5625ZM12.5 21.582C7.48535 21.582 3.41797 17.5146 3.41797 12.5C3.41797 7.48535 7.48535 3.41797 12.5 3.41797C17.5146 3.41797 21.582 7.48535 21.582 12.5C21.582 17.5146 17.5146 21.582 12.5 21.582Z" fill="white"/>
                    <path d="M11.3281 16.7969C11.3281 17.1077 11.4516 17.4057 11.6714 17.6255C11.8911 17.8453 12.1892 17.9688 12.5 17.9688C12.8108 17.9688 13.1089 17.8453 13.3286 17.6255C13.5484 17.4057 13.6719 17.1077 13.6719 16.7969C13.6719 16.4861 13.5484 16.188 13.3286 15.9682C13.1089 15.7485 12.8108 15.625 12.5 15.625C12.1892 15.625 11.8911 15.7485 11.6714 15.9682C11.4516 16.188 11.3281 16.4861 11.3281 16.7969ZM11.9141 14.0625H13.0859C13.1934 14.0625 13.2812 13.9746 13.2812 13.8672V7.22656C13.2812 7.11914 13.1934 7.03125 13.0859 7.03125H11.9141C11.8066 7.03125 11.7188 7.11914 11.7188 7.22656V13.8672C11.7188 13.9746 11.8066 14.0625 11.9141 14.0625Z" fill="white"/>
                </svg>
                <span class="error-box__text">Invalid password or username</span>
            </div> 
            <Form class="form" @submit="handleLogin(inputEmail, inputPass)" :validation-schema="schema">
                <div>
                    <label for="email" class="form__label" >Email or username</label>
                    <Field v-model="inputEmail" name="email" type="text" placeholder="Email or username" class="form__input" />
                    <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div>
                    <label for="password" style="margin-top:25px" class="form__label">Password</label>
                    <Field v-model="inputPass" name="password" type="password" placeholder="Password" class="form__input" />
                    <ErrorMessage name="password" class="error-feedback" />
                </div>
                <div style="margin-top:25px" class="form__btn flex flex--space">
                    <router-link to="/reset-password"><p>Forgot your password?</p></router-link>
                    <Button type="submit" class="login-btn" :disabled="loading">
                        <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Login</span>
                    </Button>
                </div>
            </Form>
            <div class="another">
                <span>OR</span>
            </div>
            <p>Don't have an account?</p>
            <router-link to="/signup">
                <Button type="outline" class="login-btn login-btn--full"> 
                    Sign up for Tyñda
                </Button>
            </router-link>
        </div>
    </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import Logo from "@/components/common/Logo.vue";
import Button from "@/components/common/Button.vue";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
    Logo,
    Button,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string()
        .required("Email is required!")
        .email("Please enter valid email")
        .max(50, "Must be maximum 50 characters!"),
      password: yup.string()
        .required("Password is required!")
        .min(8, "Please enter valid password")
        .max(40, "Must be maximum 40 characters!"),
    });
    return {
      loading: false,
      message: "",
      schema,
      user: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin(email, pass) {
      this.$store.dispatch("auth/login", {email, pass})
          .then( () => {
            if (this.$store.getters['auth/getStatus'] == 200) {
              this.message = "";
              this.$nextTick(()=> {
                this.$router.push("/");
            })
            location.reload();
            }
          })
          .catch(() => {
            this.loading = false;
            this.message = "error";
          })
    },
  },
};
</script>

<style lang="scss" scoped>
.signin {
    &__top {
        height: 158px;
        border-bottom: 2px solid #D2D2D2;
        display: flex;
        align-items: center;
    }
    &__content {
        max-width: 450px;
        margin: 0 auto;
        padding-top: 32px;
        position: relative;
    }
}
.another {
    border-top: 1px solid #D2D2D2;
    border-bottom: 1px solid #D2D2D2;
    position: relative;
    >span {
        width: 50px;
        text-align: center;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%);
        font-weight: 500;
    }
}
.form {
    margin: 15px 0 0 !important;
    &__btn {
        margin: 0 0 25px;
        p {
            margin: 0;
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
p { 
    margin: 26px 0;
    font-weight: 500;
}
.login-btn {
    font-size: 16px;
    padding: 17px 37px;
    &--full {
        width: 100%;
    }
}
.error-box {
    padding: 0 26px;
    display: flex;
    align-items: center;
    background: #EC4F4F;
    max-width: 450px;
    height: 60px;
    &__text {
        font-weight: 500;
        color: white;
        font-size: 18px;
        margin-left: 11px;
    }
}
.error-feedback {
    color: red;
    margin-top: 10px;
    font-size: 13px;
}
</style>
