<template>
    <div class="menu-list">
        <div class="menu-list__content">
            <div class="menu-list__header">
                <div class="menu-list__info-preview">
                    <div class="menu-list__logo-small"></div>
                </div>
                <div class="menu-list__info-full">
                    <div class="menu-list__logo-large"></div>
                    <div class="menu-list__avatar">
                        <div class="menu-list__avatar-img"
                             :class="[{'is-fallback': !hasAvatar}]"
                             :style="{ backgroundImage: 'url(' + avatar + ')' }"></div>
                    </div>
                </div>
            </div>
            <div class="menu-list__main">
                <slot :name="slots.main"></slot>
            </div>
            <div class="menu-list__footer">
                <slot :name="slots.footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
  import BaseComponent from '@/components/base/BaseComponent'

  import Helper from '@/core/utils/helper'

  const slots = {
    header: 'header',
    main: 'main',
    footer: 'footer'
  }

  export default {
    name: 'MenuList',
    extends: BaseComponent,
    props: {
      avatar: {
        type: String,
        required: false,
        default: null
      }
    },
    data () {
      return {
        slots
      }
    },
    computed: {
      hasAvatar () {
        return Helper.isDefined(this.avatar)
      }
    }
  }
</script>
