<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

// props
const props = defineProps({
    placeholder: String,
    name: String,
    id: String,
    done: Boolean,
    error: Boolean,
});

// emit
const emit = defineEmits(["currentValue"]);

// vars
const statue = ref(true);
const input = ref();
const currentValue = ref();

// change status
function changeStatue() {
    if (statue.value) {
        input.value.setAttribute("type", "text");
        statue.value = false;
    } else {
        input.value.setAttribute("type", "password");
        statue.value = true;
    }
}

watchEffect(() => {
    emit("currentValue", currentValue.value);
    if (props.done == true) {
        currentValue.value = "";
    }
});
</script>

<template>
    <section class="nice-password" :class="{ error }">
        <!-- icon -->
        <section class="icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <g
                    id="Group_2"
                    data-name="Group 2"
                    transform="translate(-1193 -507)"
                >
                    <rect
                        id="Rectangle_10"
                        data-name="Rectangle 10"
                        width="24"
                        height="24"
                        transform="translate(1193 507)"
                        fill="none"
                    />
                    <g id="lock" transform="translate(1193 507)">
                        <path
                            id="Path_1"
                            data-name="Path 1"
                            d="M19,8.424V7A7,7,0,1,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"
                            fill="#8f8f8f"
                        />
                        <path
                            id="Path_2"
                            data-name="Path 2"
                            d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"
                            fill="#8f8f8f"
                        />
                    </g>
                </g>
            </svg>
        </section>
        <!-- pass eye -->
        <section class="eye-controle" @click="changeStatue">
            <button type="button" class="show" v-if="statue">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24.009"
                    height="18.69"
                    viewBox="0 0 24.009 18.69"
                >
                    <g id="eye" transform="translate(0.004 -2.655)">
                        <path
                            id="Path_3"
                            data-name="Path 3"
                            d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.7,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"
                            fill="#8f8f8f"
                        />
                        <path
                            id="Path_4"
                            data-name="Path 4"
                            d="M12,7a5,5,0,1,0,5,5,5,5,0,0,0-5-5Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"
                            fill="#8f8f8f"
                        />
                    </g>
                </svg>
            </button>
            <button type="button" class="hidden" v-else>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                >
                    <path
                        d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
                        fill="none"
                    />
                    <path
                        d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                    />
                </svg>
            </button>
        </section>
        <!-- input -->
        <input
            ref="input"
            type="password"
            :name="name"
            :placeholder="placeholder"
            :id="id"
            v-model="currentValue"
            required
            min="9999999"
        />
    </section>
</template>

<style lang="scss">
@import "../../../../assets/scss/_variables.scss";

.nice-password {
    width: 100%;
    display: flex;
    position: relative;
    &.error {
        .icon {
            svg {
                path {
                    fill: var(--first-color);
                }
            }
        }
        input {
            border-color: var(--first-color);
        }
    }
    .icon {
        width: 40px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        svg {
            width: 20px;
            height: 20px;
            path {
                transition: var(--main-transition);
            }
        }
    }
    .eye-controle {
        width: 40px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        button {
            all: unset;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &.hidden {
                svg {
                    color: var(--gray-button-color);
                    path:last-of-type {
                        fill: var(--gray-button-color);
                    }
                }
            }
        }
    }
    input {
        width: 100%;
        padding: 10px 40px;
        background: var(--gray-color);
        border-radius: var(--main-border-radius);
        border: 1px solid var(--gray-color);
        outline: none;
        transition: var(--main-transition);
    }
}
.is-ar {
    .nice-password {
        .icon {
            right: 0;
            left: unset;
        }
        .eye-controle {
            right: unset;
            left: 0;
        }
    }
}
</style>
