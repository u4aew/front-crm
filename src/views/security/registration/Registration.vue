<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <LayoutPromo>
        <template v-slot:title>
            Привет, Hello, Salut, こんにちは
        </template>
        <template v-slot:desc>
            <p>
                Организация <span class="l-color-primary"> Power</span> пригласила
                вас в&nbsp;Скиллмаркет&nbsp;| Service на&nbsp;роль
                <span class="l-color-primary"> Организация</span>
            </p>
            <p>
                Зарегестрируйтесь
                по&nbsp;форме справа и&nbsp;пользуйтесь функционалом сервиса!
            </p>
        </template>
        <template v-slot:main>
            <!-- todo вынести в отдельный компонент -->
            <template v-if="visibleSuccessInfo">
                <div class="l-bg_color-1 l-br-3 l-shadow-1_color-2 l-border-1-7-300 l-p-25">
                    <div class="l-mb-10 l-color l-color-7-800 l-fs-20">
                        Регистрация
                    </div>
                    <div>
                        Ссылка для потверждения отправлена вам на&nbsp;почту.
                    </div>
                </div>
                <Cols jc="flex-end" cols="2x" class="l-pt-25 l-pb-25 l-pl-25 l-pr-25 l-fs-14 l-fw-500">
                    <ColsItem>
                        <span @click="$pageManager.showAuth()"
                              class="link link_color-7-800">На страницу авторизации</span>
                    </ColsItem>
                </Cols>
            </template>
            <template v-else>
                <FormBase v-show="visible2step" id="reg-confirm-form"
                          :fields="fieldsCompany"
                          @action="registration"
                          class="l-bg_color-1 l-br-3 l-shadow-1_color-2 l-border-1-7-300 l-fg-1 registration">
                    <template v-slot:addition>
                        <div class="l-pt-15">
                            Именно от лица организации вы будете вести свою деятельность в системе
                        </div>
                    </template>
                    <template v-slot:action>
                        <Cols ai="ai-center" jc="space-between">
                            <ColsItem>
                                <VButton type="submit" :loading="loading">
                                    Зарегистрироваться
                                </VButton>
                            </ColsItem>
                            <ColsItem>
                                <span class="l-color-7-800 l-fs-16"> <span class="l-color-primary">2</span>/2</span>
                            </ColsItem>
                        </Cols>
                    </template>
                </FormBase>
                <FormBase v-show="!visible2step"
                          @action="show2step"
                          id="reg-form"
                          :fields="fieldsInfo"
                          class="l-bg_color-1 l-br-3 l-shadow-1_color-2 l-border-1-7-300 l-fg-1 registration">
                    <template v-slot:action>
                        <Cols ai="ai-center" jc="space-between">
                            <ColsItem>
                                <VButton type="submit" :loading="loading">
                                    Следующий шаг
                                    <template v-slot:icon>
                                        <div class="icon icon_arrow-right_white"></div>
                                    </template>
                                </VButton>
                            </ColsItem>
                            <ColsItem>
                                <span class="l-color-7-800 l-fs-16"> <span class="l-color-primary">1</span>/2</span>
                            </ColsItem>
                        </Cols>
                    </template>
                </FormBase>
            </template>
        </template>
    </LayoutPromo>
</template>

<script>
  import { VIEWS } from '@/views/names'
  import RegistrationController from './registration-controller'

  // components
  import Cols from '@/components/cols/base/Cols.vue'
  import VButton from '@/components/buttons/base/VButton'
  import ColsItem from '@/components/cols/base/ColsItem.vue'
  import FormBase from '@/components/forms/base/Form'
  import LayoutPromo from '@/components/layouts/promo/LayoutPromo'

  export default {
    name: VIEWS.security.registration.name,
    mixins: [RegistrationController],
    components: {
      Cols,
      VButton,
      ColsItem,
      FormBase,
      LayoutPromo
    }
  }
</script>
