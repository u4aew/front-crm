<template>
    <div class="promo">
        <div class="promo__header">
            <div class="promo-header block">
                <div class="promo-header__wrapper block-wrapper">
                    <div class="promo-header__content">
                        <router-link to="/" class="promo-header__logo">
                            <img src="@/assets/images/logo.svg" alt="">
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="promo__main">
            <div class="promo-main block">
                <div class="promo-main__wrapper block-wrapper">
                    <div class="promo-main__cols">
                        <div class="promo-main__cols-item promo-main__cols-item_main">
                            <div class="promo-main__greeting">
                                <div class="promo-main__title">
                                    <h1 class="title-h1">
                                        <slot name="title"></slot>
                                    </h1>
                                </div>
                                <div class="promo-main__desc">
                                    <slot name="desc"></slot>
                                </div>
                            </div>
                        </div>
                        <div class="promo-main__cols-item promo-main__cols-item_side">
                            <div class="promo-main__content">
                                <slot name="main"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="promo__footer">
            <div class="promo-footer block">
                <div class="promo-footer__wrapper block-wrapper">
                    <div class="promo-footer__content">
                        <div class="promo-footer__content-main">
                            <div class="promo-footer__copyright">
                                © 2019 ООО«POWER»
                            </div>
                        </div>
                        <div class="promo-footer__content-side">
                            <div class="promo-footer__rules">
                                Нажимая на кнопку, вы соглашаетесь с условием оферты
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  /** Промо шаблон
   */
  export default {
    name: 'LayoutPromo'
  }
</script>
