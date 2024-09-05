<script setup lang="ts">
const props = defineProps({
    statue: String,
});
</script>

<template>
    <section class="validate-input">
        <slot name="label"></slot>
        <section class="vali-input">
            <slot name="input"></slot>
            <section
                class="statue"
                :class="{
                    correct: statue == 'correct',
                    warn: statue == 'warn',
                }"
            >
                <svg
                    v-if="statue == 'correct'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.181"
                    height="8.06"
                    viewBox="0 0 12.181 8.06"
                >
                    <path
                        id="Path_11709"
                        data-name="Path 11709"
                        d="M17.2,8.368l-5.162,5.177L9.272,10.661A1.233,1.233,0,1,0,7.5,12.369l2.842,2.958a2.307,2.307,0,0,0,1.658.74h.041a2.309,2.309,0,0,0,1.645-.682l5.266-5.266A1.237,1.237,0,1,0,17.2,8.368Z"
                        transform="translate(-7.13 -8.007)"
                        fill="#fff"
                    />
                </svg>
                <svg
                    v-else-if="statue == 'warn'"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#FFFFFF"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <circle cx="12" cy="19" r="2" />
                    <path d="M10 3h4v12h-4z" />
                </svg>
            </section>
        </section>
    </section>
</template>

<style lang="scss">
@import "../../../../assets/scss/_variables.scss";
.validate-input {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    label {
        color: var(--first-text-color);
        font: {
            weight: bold;
        }
        margin: {
            bottom: 15px;
        }
    }
    .vali-input {
        width: 100%;
        position: relative;
        input {
            width: 100%;
            padding: 15px 10px;
            outline: none;
            border: 1px solid var(--second-button-border);
            border-radius: $main_border_radius;
            transition: $main_transition;
            &:focus {
                border-color: var(--third-color);
            }
        }
        .statue {
            width: 25px;
            height: 25px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 10px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: $main_transition;
            &.correct {
                background: var(--download-background);
            }
            &.warn {
                background: var(--report-background);
            }
            svg {
                width: 15px;
                height: 15px;
            }
        }
    }
}
.is-ar {
    .validate-input .vali-input .statue {
        right: unset;
        left: 10px;
    }
}
</style>
