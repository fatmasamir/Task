<template>
  <div class="content-slider">
    <v-navigation-drawer
      active-class="bg-deep-purple-active"
      class="bg-deep-purple"
      :clipped="clipped"
      theme="dark"
      permanent
    >
      <v-list color="transparent">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          :title="t('Homepage')"
          link
          exact
          @click="$router.push({ path: '/' })"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-box"
          :title="t('Products')"
          link
          @click="$router.push({ path: '/products' })"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="height: 400px"> </v-main>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
let props = defineProps(["showMobile"]);
// i18n
const { t } = useI18n();
</script>
<style scoped lang="scss">
.v-btn.v-btn--density-default {
  width: 100%;
}
.content-slider {
  position: relative;
  .close {
    display: none;
    width: auto;
    z-index: 999999;
    margin: auto;
    top: 5px;
    right: 25px;
    text-align: left;
    cursor: pointer;
    position: absolute;
    img {
      width: 15px;
      height: 15px;
    }
  }
}
.ListItemClass {
  color: #f5f5f5;
}

.bg-deep-purple:hover {
  border-radius: 4px;
  background: #455a64;
}

.bg-deep-purple-active {
  border-radius: 4px;
  background: rgba(10, 204, 117, 0.19);
}
.is-ar .close {
  right: auto;
  left: 25px;
}
@media screen and (max-width: 1500px) {
  .slidbardisplay {
    display: none;
  }
  .content-slider {
    .close {
      display: block;
    }
  }
}
</style>
