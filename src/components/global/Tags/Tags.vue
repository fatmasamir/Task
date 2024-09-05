<script setup lang="ts">
import NiceTag from "./NiceTag/NiceTag.vue";
import type niceTag from "./NiceTag/interface/niceTag";
// props
const props = defineProps(["data"]);

</script>
<template>
  <section class="tags">
    <NiceTag v-for="tag in data" :tag="tag.tag" :key="tag.id" />
  </section>
</template>
<style lang="scss">
.tags {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  list-style: none;
  gap: 5px;
}
</style>
