<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <LayoutPromo class="recovery">
        <template v-slot:title>
            Смена
            пароля
        </template>
        <template v-slot:desc>
            Введите email который указывали при регистрации, и&nbsp;мы&nbsp;отправим вам ссылку
            на&nbsp;восстановление
        </template>
        <template v-slot:main>
            <!-- todo вынести в отдельный компонент -->
            <div v-if="visibleSuccessInfo" class="l-bg_color-1 l-br-3 l-shadow-1_color-2 l-border-1-7-300 l-p-25">
                <div class="l-mb-10 l-color l-color-7-800 l-fs-20">
                    Пароль успешно обновлен
                </div>
                <div>
                    Перейдите на страницу авторизации или это случится автоматически через {{timer}}с
                </div>
            </div>
            <FormBase v-else @action="auth"
                      id="auth-form"
                      :fields="fields"
                      class="l-bg_color-1 l-br-3 l-shadow-1_color-2 l-border-1-7-300">
                <template v-slot:action>
                    <VButton type="submit" :loading="loading">
                        Обновить пароль
                    </VButton>
                </template>
            </FormBase>

            <Cols jc="flex-end" cols="2x" class="l-pt-25 l-pb-25 l-pl-25 l-pr-25 l-fs-14 l-fw-500">
                <ColsItem>
                    <span @click="$pageManager.showAuth()" class="link link_color-7-800">На страницу авторизации</span>
                </ColsItem>
            </Cols>
        </template>
    </LayoutPromo>
</template>

<script>
  import { VIEWS } from '@/views/names'
  import RecoveryConfirmController from './recovery-confirm-controller'

  // components
  import Cols from '@/components/cols/base/Cols.vue'
  import VButton from '@/components/buttons/base/VButton'
  import ColsItem from '@/components/cols/base/ColsItem.vue'
  import FormBase from '@/components/forms/base/Form'
  import LayoutPromo from '@/components/layouts/promo/LayoutPromo'

  export default {
    name: VIEWS.security.recovery.name,
    mixins: [RecoveryConfirmController],
    components: {
      Cols,
      VButton,
      ColsItem,
      FormBase,
      LayoutPromo
    }
  }
</script>
