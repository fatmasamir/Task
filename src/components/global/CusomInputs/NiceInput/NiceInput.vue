<script setup lang="ts">
// props
const props = defineProps({
    error: Boolean,
});
</script>

<template>
    <section class="nice-input" :class="{ error }">
        <!-- input -->
        <section class="icon">
            <slot name="icon"></slot>
        </section>
        <!-- input -->
        <slot name="input"></slot>
    </section>
</template>
<style lang="scss">
@import "../../../../assets/scss/_variables.scss";
.nice-input {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid var(--gray-border-color);
    &.error {
        svg {
            path {
                fill: var(--first-color);
            }
        }
        input {
            border-color: var(--first-color);
            &:focus {
                border-color: var(--first-color);
            }
        }
    }
    svg {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
    }
    img {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
    }
    input,
    textarea {
        width: 100%;
        outline: none;
        &:focus {
            border-color: var(--third-color);
        }
    }
    input {
        padding: 10px 40px;
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
    }
    textarea {
        height: 200px;
        resize: none;
        padding: 10px;
        overflow-y: scroll;
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
.is-ar {
    .nice-input svg {
        left: unset;
        right: 10px;
    }
    .nice-input img {
        left: unset;
        right: 10px;
    }
}
</style>
