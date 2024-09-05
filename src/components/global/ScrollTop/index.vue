<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import AOS from "aos";
const windowTop = ref(0);
const showScroll = ref(true);

const onScroll = (e) => {
  windowTop.value = e.target.documentElement.scrollTop;
  if (windowTop.value < 100) {
    showScroll.value = false;
  } else {
    showScroll.value = true;
  }
};

const toTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
  AOS.init();
});
// onBeforeUnmount(() => {
//   window.removeEventListener("scroll", onScroll);
// });
</script>
<template>
  <div class="onScroll" v-if="showScroll">
    <!-- <button
      fab
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
      data-aos="fade-up"
      data-aos-offset="100"
      data-aos-duration="100"
    >
      <span><img src="../../../assets/images/Top.png" /></span>
    </button> -->
  </div>
</template>
<style scoped lang="scss">
.onScroll button {
  position: fixed;
  background: rgba(255, 255, 255, 0.4);

  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  z-index: 100000000;
  border: 0px;
  box-shadow: 0px 0px 0px 0px;
  img {
    width: 20px;
    height: 30px;
  }
}
</style>
