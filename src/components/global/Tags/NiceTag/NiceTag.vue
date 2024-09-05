<script setup lang="ts">
const props = defineProps(["tag"]);
</script>
<template>
  <router-link to="" class="nice-tag tag">
    {{ tag }}
  </router-link>
</template>
<style scoped lang="scss">
.nice-tag {
  color: var(--second-text-color);
  background: var(--white-color);
  padding: 6px 20px;
  border-radius: var(--main-border-radius);
  border: 1px solid var(--gray-border-color);
  text-decoration: none;
  display: grid;
  justify-content: center;
  align-items: center;
}
</style>
