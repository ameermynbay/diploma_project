<template>
  <div class="settings">
    <div class="content">
      <div class="settings__header">
        <Avatar class="edit__avatar" size="large" :img="userInfo.avatar" :isHoverable="true"/>
      </div>
      <div class="settings__main">
        <p class="title">Settings</p>
        <div class="settings__form">
            <div class="form-top flex flex--space">
                <div class="form-top__field">
                  <label for="email" class="text">Email</label><br/>
                  <input type="email" class="form-top__input" id="email" v-model="email" disabled/>
                </div>
                <div class="form-top__field">
                  <label for="name" class="text">Name</label><br/>
                  <input type="text" class="form-top__input" id="name" v-model="name"/>
                </div>
            </div>
            <p class="text title--second">Date of birth</p>
            <div class="form-top__field flex flex--space">
                <select name="month" aria-invalid="true" class="form__input date__item">
                    <option selected="" disabled="" :value="month">{{month}}</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <input placeholder="DD" class="form__input date__item" inputmode="numeric" maxlength="2" pattern="((0?[1-9])|([12][0-9])|(3[01]))" v-model="day"/>
                <input placeholder="YYYY" class="form__input date__item" inputmode="numeric" maxlength="4" pattern="\d{4}" v-model="year"/>
            </div>
            <div class="settings__bottom">
              <p class="delete" @click="show">Delete account</p>
              <Button type="full" @click="changeUser">Save</Button>
            </div>
        </div>
      </div>
    </div>
    <ConfirmationModal v-show="isOpened" text="Enter your password"/>
  </div>
</template>

<script>
import Avatar from "@/components/common/Avatar.vue";
import ConfirmationModal from "@/components/common/ConfirmationModal.vue";
import Button from "@/components/common/Button.vue";

export default {
  name: 'Settings',
  components: {
    Avatar,
    ConfirmationModal,
    Button
  },
  data(){
    return {
      name: "",
      email: "",
      day: "",
      month: "",
      year: "",
      newMonth: "",
      isOpened: false,
    }
  },
  computed: {
    userInfo: {
      get: function() {
        return this.$store.getters['user/getUser'];
      },
      set: function(newVal) {
        this.userInfo.name = newVal;
      }
    },
  },
  mounted() {
    this.$store.dispatch('user/fetchUser');
    
    this.name = this.userInfo.name;
    this.email = this.userInfo.email;
    this.getDate();
  },
  methods: {
    getDate(){
      let s = this.$store.state.user.user.date_of_birth;
      s = s.split(".");
      this.day = s[0];
      if(s[1] == "01") this.month = "January";
      else if(s[1] == "02") this.month = "February";
      else if(s[1] == "03") this.month = "March";
      else if(s[1] == "04") this.month = "April";
      else if(s[1] == "05") this.month = "May";
      else if(s[1] == "06") this.month = "June";
      else if(s[1] == "07") this.month = "July";
      else if(s[1] == "08") this.month = "August";
      else if(s[1] == "09") this.month = "September";
      else if(s[1] == "10") this.month = "October";
      else if(s[1] == "11") this.month = "November";
      else if(s[1] == "12") this.month = "December";
      this.year = s[2];
    },
    onInput(e){
      this.userInfo.name = e.target.innerText;
    },
    setProfile() {
      this.$store.dispatch('user/changeUserName', this.userInfo.name);
      this.isEdit = false;
    },
    show() {
      this.isOpened = !this.isOpened;
    },
    changeUser() {
      this.$store.dispatch('user/changeUserName', this.name);
      let date = `${this.day}.${this.month}.${this.year}`;
      this.$store.dispatch('user/changeUserDate', date);
    }
  },
};
</script>

<style lang="scss" scoped>
.settings{
  padding: 0 60px;
  &__header{
      display: flex;
      justify-content: center;
  }
  &__main{
    padding-top: 60px;
    position: relative;
    z-index: 300;
  }
  &__bottom{
    margin-top: 60px;
    text-align: center;
    p{
      margin-bottom: 50px;
      text-align: left;
    }
  }
}
.title{
  font-weight: 600;
  font-size: 36px;
  margin-bottom: 50px;
  &--second{
    margin-top: 37px;
  }
}
.text{
  font-weight: 500;
  font-size: 24px;
}
.form-top{
  &__input{
    background: #FFFFFF;
    border: 1px solid #CDCDCD;
    border-radius: 8px;
    padding: 23px 30px;
    width: 90%;
    margin-top: 13px;
  }
  &__field{
    width: 45%;
    .form__input{
      width: 45%;
      &:nth-child(2){
        width: 15%;
      }
      &:nth-child(3){
        width: 20%;
      }
    }
  }
}
.delete {
  font-weight: 600;
  font-size: 24px;
  text-decoration-line: underline;
  color: #6900FF;
  &:hover{
    cursor: pointer;
  }
}
button {
  width: 290px;
  height: 65px;
  border-radius: 90px;
}
</style>