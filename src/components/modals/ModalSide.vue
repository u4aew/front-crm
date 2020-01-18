<template>
    <transition name="modal-side" :duration="500">
        <div v-if="visible" class="modal-side">
            <div class="modal-side__overlay"></div>
            <div class="modal-side__wrapper">
                <div class="modal-side__inner">
                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BaseComponent from '@/components/base/BaseComponent'

    const body = document.querySelector('body')

    export default {
        name: 'ModalBase',
        extends: BaseComponent,
        props: {
            visible: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        watch: {
            visible (value) {
                if (value) {
                    body.classList.add('is-lock')
                } else {
                    body.classList.remove('is-lock')
                }
            }
        }
    }
</script>
