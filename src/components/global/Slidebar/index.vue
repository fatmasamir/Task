<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
let activeItem = ref("Profile");

//router
let router = useRouter();
//Language
const authStore = useAuthStore();
let Slidebar = ref([
  {
    id: 0,
    image_icon: new URL(`@/assets/images/profile.svg`, import.meta.url).href,
    image_icon_active: new URL(
      `@/assets/images/profile-active.svg`,
      import.meta.url
    ).href,
    name: "Profile",
    Link: "/profile",
  },
  {
    id: 1,
    image_icon: new URL(`@/assets/images/document-upload.svg`, import.meta.url)
      .href,
    image_icon_active: new URL(
      `@/assets/images/document-upload-active.svg`,
      import.meta.url
    ).href,
    name: "Upload problem",
    Link: "/",
  },
  {
    id: 2,
    image_icon: new URL(`@/assets/images/History.svg`, import.meta.url).href,
    image_icon_active: new URL(
      `@/assets/images/History-active.svg`,
      import.meta.url
    ).href,
    name: "History",
    Link: "/history",
  },
  {
    id: 3,
    image_icon: new URL(`@/assets/images/warning-2.svg`, import.meta.url).href,
    image_icon_active: new URL(
      `@/assets/images/warning-2-active.svg`,
      import.meta.url
    ).href,
    name: "Announcement",
    Link: "/announcement",
  },
]);
//Logout
const Logout = async () => {
  if (localStorage.getItem("user")) {
    await authStore.logOut();
  }
};
</script>
<template>
  <div class="Slidebar">
    <h2 class="website-logo">Logo</h2>
    <ul class="row List p-0 m-0">
      <li class="col-lg-12" v-for="item in Slidebar" :key="item.id">
        <router-link :to="item.Link" class="nav-link">
          <img :src="item.image_icon" class="normal" />
          <img :src="item.image_icon_active" class="activeImage" /><span
            class="title"
            >{{ item.name }}</span
          ></router-link
        >
      </li>
    </ul>
    <div class="logout">
      <div class="LinkLogout" @click="Logout()">
        <img src="@/assets/images/logout.svg" />
        <p>Log out</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.Slidebar {
  background: white;
  width: 16%;
  position: fixed;
  margin-bottom: 70px;
  border-radius: 0px 0px 50px 8px;
  padding: 20px 0px;
  z-index: 9999;
  padding-bottom: 230px;
  h2 {
    padding: 20px 10px;
    font-size: 23px;
  }
  .List {
    padding: 0px;
    li {
      padding: 0px;
      a {
        width: 100%;
        display: block;
        margin: 5px 0px;
        padding: 12px;
        background: white;
        transition: 0.2s all ease-in-out;
        cursor: pointer;
        img {
          margin-right: 10px;
          width: 25px;
          height: 25px;
          vertical-align: sub;
        }
        span {
          color: rgba(78, 78, 78, 1);
        }
        .normal {
          display: inline-block;
        }
        .activeImage {
          display: none;
        }
      }
    }
    .activeImage,
    li a:hover,
    .active,
    .router-link-exact-active {
      background: rgba(0, 16, 99, 1);
      span {
        color: white;
      }
      .normal {
        display: none;
      }
      .activeImage {
        display: inline-block;
      }
    }
  }
  .logout {
    position: absolute;
    bottom: 50px;
    margin: auto;
    width: 80%;
    .LinkLogout {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer !important;
      color: rgba(193, 2, 2, 1);
    }
    p {
      margin: 0px;
      padding: 0px 10px;
      color: rgba(193, 2, 2, 1);
      font-weight: 500;
      cursor: pointer !important;
    }
  }
}
@media screen and (max-width: 992px) {
  .Slidebar {
    width: 100%;
    padding: 0px;
    margin: 0px;
    display: flex;
    bottom: 0px;
    border: 0px;
    justify-content: center;
    .website-logo {
      display: none;
    }
    .List {
      display: flex;
      width: auto;

      li {
        width: auto;
        .title {
          display: none;
        }
        a {
          margin: 0px;
          padding: 15px;
          img {
            margin: 0px;
          }
        }
      }
    }
    .logout {
      width: max-content;
      position: unset;
      bottom: 0px;
      margin: 0px;
      padding: 15px 20px !important;
      display: flex;
      .LinkLogout {
        width: max-content;
      }
    }
  }
}
</style>
