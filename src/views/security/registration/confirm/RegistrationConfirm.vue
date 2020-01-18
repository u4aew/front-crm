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
            <BaseForm @action="$pageManager.showAuth()"
                      id="reg-confirm"
                      :fields="[]"
                      class="l-bg_color-1 l-br-3 l-shadow-1_color-2 l-border-1-7-300 l-fg-1 registration test">
                <template v-slot:addition>
                    <template v-if="loading">
                        <div class="l-ta-center l-fs-20 l-color-2"> Потдвержение учетной записи</div>
                    </template>
                    <template v-else>
                        <!--todo сделать компонент для текстовок-->
                        <template v-if="statusSuccess">
                            <div class="l-mb-20">
                                <div class="icon icon_status-success"></div>
                            </div>
                            <div class="l-mb-10 l-color-7-800 l-fs-14">
                                Регистрация успешно завершена!
                            </div>
                            <div class="l-fs-14">
                                Теперь вы&nbsp;можете войти в&nbsp;систему
                                и&nbsp;настроитьсвою организацию, создать
                                проекты и&nbsp;пригласить сотрудников
                            </div>
                        </template>
                        <template v-if="statusError">
                            <!--todo придумать текстовки для ошибки регистрации-->
                            <div class="l-mb-20">
                                <div class="icon icon_status-error"></div>
                            </div>
                            <div class="l-mb-10 l-color l-color-7-800 l-fs-20">
                                Регистрация не удалась
                            </div>
                            <div>
                                Ошибка
                            </div>
                        </template>
                    </template>
                </template>
                <template v-slot:action>
                    <Cols ai="ai-center" jc="space-between">
                        <ColsItem class="l-flex-1">
                            <VButton full
                                     :loading="loading"
                                     type="submit">
                                На страницу авторизации
                                <template v-slot:icon>
                                    <div class="icon icon_arrow-right_white"></div>
                                </template>
                            </VButton>
                        </ColsItem>
                    </Cols>
                </template>
            </BaseForm>
        </template>
    </LayoutPromo>
</template>

<script>
  import { VIEWS } from '@/views/names'
  import RegistrationConfirmController from './registration-confirm-controller'
  // components
  import Cols from '@/components/cols/base/Cols.vue'
  import VButton from '@/components/buttons/base/VButton'
  import BaseForm from '@/components/forms/base/Form'
  import ColsItem from '@/components/cols/base/ColsItem.vue'
  import LayoutPromo from '@/components/layouts/promo/LayoutPromo'

  export default {
    name: VIEWS.security.registrationConfirm.name,
    mixins: [RegistrationConfirmController],
    components: {
      Cols,
      VButton,
      BaseForm,
      ColsItem,
      LayoutPromo
    }
  }
</script>
