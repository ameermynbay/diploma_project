<template>
  <div class="modal-backdrop" >
    <div class="modal">
      <header class="modal-header">
        <slot name="header"></slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <div v-if="type == 'create'">
          <label>Name your playlist</label> <br>  
          <input v-model="newPlaylist" type="text" />      
        </div>  
        <div v-else class="edit flex flex--space">
          <div class="hover">
            <div class="edit__img">
              <img :src="item.cover" />
            </div>
            <div class="edit__img--hover">
                <input class="form-control edit__hidden" ref="fileInput" type="file" @input="pickFile" id="avatar" style="display:none;">
                <label for="avatar">
                  <img src="@/assets/icons/hover.svg" />
                </label>
            </div>
          </div>
          <div class="edit__input">
            <label>Playlist name</label> <br>  
            <input v-model="newTitle" type="text" />      
          </div>
        </div>  
      </section>

      <footer class="modal-footer">
        <p class="delete" v-if="type != 'create'">Delete playlist</p>
        <Button @click="createPlaylist">Save</Button>
      </footer>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
  export default {
    name: 'Modal',
    components: {
      Button
    },
    props: ['type', 'id', 'item'],
    data() {
      return {
        newPlaylist: "",
        newTitle: ""
      }
    },
    methods: {
      createPlaylist() {
        console.log(this.type)
        if(this.type == "create"){
          this.$store.dispatch("playlist/addPlaylist", this.newPlaylist);
          // location.reload();
        } else if(this.type == "edit"){
          let data = {id: this.id, title: this.newTitle}
          this.$store.dispatch("playlist/changePlaylistTitle", data);
        }
        this.close();
      },
      close() {
        this.$emit('close');
      },
      deletePlaylist(id) {
        this.$store.dispatch("playlist/deletePlaylist", id)
      },
      selectImage () {
        this.$refs.fileInput.click();
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
              let formData = new FormData();
              formData.append('cover', file[0]);
              let data = {
                  id: this.id,
                  img: formData
              }
              await this.$store.dispatch('playlist/changePlaylistCover', data)
          }
      },
      // editPlaylistName() {
      //   this.$store.dispatch("playlist/editPlaylistTitle", this.)
      // }
    },
  };
</script>

<style lang="scss" scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    width: 550px;
    border-radius: 10px;
    padding: 33px 34px 37px 42px;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    justify-content: center;
    font-size: 26px;
    font-weight: 500;
  }

  .modal-footer {
    flex-direction: column;
    justify-content: flex-end;
    button {
      width: 210px;
      height: 44px;
      margin: 0 auto;
      font-size: 16px;
    }
  }

  .modal-body {
    position: relative;
    padding: 15px 10px;
    input {
      margin: 8px 0 0;
      min-width: 100%;
      max-width: 100%;
      border: 1px solid #878787;
      border-radius: 5px;
      outline: none;
      padding: 10px 15px;
      -ms-box-sizing: border-box; 
      -khtml-box-sizing: border-box; 
      -webkit-box-sizing: border-box; 
      -moz-box-sizing: border-box;  
      box-sizing: border-box;
    }
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    cursor: pointer;
    background: transparent;
  }
  
  .edit {
    &__img{
      width: 68px;
      height: 68px;
      border-radius: 5px;
      overflow: hidden;
      &--hover{
        opacity: 0;
        position: absolute;
        top: 0;
        background: rgba(0, 0, 0, 0.329);
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__input {
      width: 83%;
    }
  }
  .hover {
    position: relative;
    &:hover{
      .edit__img--hover {
        opacity: 1;
      }
    }
  }
</style>