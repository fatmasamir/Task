<script setup lang="ts">
const props = defineProps<{
  type: "send" | "end" | "sub_button";
}>();
</script>
<template>
  <section class="simple-button" :class="{ [type]: type }">
    <slot></slot>
  </section>
</template>
<style lang="scss">
.simple-button {
  button,
  .btn {
    height: 54px;
    padding: 12px 42px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: #fff;
    font-size: 16px;
    padding: 10px 30px;
    line-height: 19.5px;
    font-weight: 500;
    svg {
      width: 18px;
      height: 20px;
    }
  }
  &.send,
  &.send_blue {
    button,
    .btn {
      background-color: #2a282b;
      &:hover {
        background: #d6a345;
      }
    }
  }
  &.end {
    button,
    .btn {
      background: #d6a345;
      color: #2a282b;
    }
  }
  &.sub_button {
    button,
    .btn {
      background: #f3f3f3;
      min-width: max-content;
    }
  }
  button:disabled {
    background: #b9b9b9;
    cursor: no-drop;
    color: rgba(89, 89, 89, 0.604);
  }
}
</style>
