<template>
    <section class="social-input">
        <!-- icon -->
        <section class="icon">
            <slot name="icon"></slot>
        </section>
        <!-- input -->
        <slot name="input"></slot>
    </section>
</template>
<style lang="scss">
@import "../../../../assets/scss/_variables.scss";
.social-input {
    width: 100%;
    display: flex;
    .icon {
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--gray-color);
        padding: 14px 0;
        border-top-left-radius: $main_border_radius;
        border-bottom-left-radius: $main_border_radius;
        border: 1px solid var(--gray-color);
    }
    input {
        width: 100%;
        border: 1px solid var(--second-button-border);
        outline: none;
        border-radius: 6px;
        transition: 0.3s;
        padding: 10px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        &:focus {
            border-color: var(--third-color);
        }
    }
}
.is-ar {
    .social-input .icon {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: $main_border_radius;
        border-bottom-right-radius: $main_border_radius;
    }
    .social-input input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: $main_border_radius;
        border-bottom-left-radius: $main_border_radius;
    }
}
</style>
