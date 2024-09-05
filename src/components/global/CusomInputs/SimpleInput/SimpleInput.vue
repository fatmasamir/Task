<template>
  <section class="simple-input">
    <slot></slot>
  </section>
</template>

<style lang="scss">
@import "../../../../assets/scss/_variables.scss";

.simple-input {
  width: 100%;
  display: grid;
  // row-gap: 8px;
  label {
    color: var(--second-text-color);
    font: {
      weight: bold;
    }
    span {
      font: {
        weight: normal;
      }
    }
  }
  // fix vue select style

  .vs__search {
    padding: 5px 7px !important;
  }
  input:not([class="vs__search"]),
  textarea {
    // width: 100%;
    // background: var(--gray-blue-white-color);
    padding: 8px;
    outline: none;
    border: 1px solid var(--second-gray-border-color);
    border-radius: var(--main-border-radius);
    transition: var(--main-transition);

    &:focus {
      border-color: var(--orange-text-color);
      background: white !important;
      box-shadow: none;
    }
    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type="number"] {
      appearance: textfield;
    }
    &::placeholder {
      color: var(--second-text-color);
    }
  }
  textarea {
    resize: none;
    padding: 10px;
    overflow-y: scroll;
    width: 100%;
    height: 150px;
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--second-color);
      border-radius: 8px;
    }
  }
}
.vs--searchable .vs__dropdown-toggle,
input {
  direction: rtl;
  height: 41px;
}
</style>
