<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <CardProductBase :image="image">
        <template v-slot:side>
            <div class="l-mb-15">
                {{title}}
            </div>
            <Cols ai="ai-center">
                <ColsItem>
                    <Badge :title="category">
                        {{category}}
                    </Badge>
                </ColsItem>
                <ColsItem>
                    <Cols ai="ai-center" offset="offset-none">
                    <ColsItem class="l-ml-0 l-mr-10 l-op-05">
                        <div class="icon icon_calendar_white"></div>
                    </ColsItem>
                    <ColsItem class="l-ml-0 l-mr-0">
                        {{date}}
                    </ColsItem>
                    </Cols>
                </ColsItem>
            </Cols>
        </template>
        <template v-slot:main>
            <Cols delimiter ai="ai-center">
                <ColsItem>
                    <div class="l-op-05 l-mb-5">
                        За сутки
                    </div>
                   <div class="l-fs-22 l-fw-600">
                       <Sum :value="priceDay"></Sum>
                   </div>
                </ColsItem>
                <ColsItem>
                    <div class="l-op-05 l-mb-5">
                        За сделку
                    </div>
                    <div class="l-fs-22 l-fw-600">
                        <Sum :value="priceDeal"></Sum>
                    </div>
                </ColsItem>
            </Cols>
        </template>
        <template v-slot:action>
            <VButton full outline>Подать заявку</VButton>
        </template>
    </CardProductBase>
</template>

<script>

  import Sum from '@/components/ui/Sum'
  import Cols from '@/components/cols/base/Cols'
  import Badge from '@/components/ui/Badge'
  import VButton from '@/components/buttons/base/VButton'
  import ColsItem from '@/components/cols/base/ColsItem'
  import CardProductBase from '@/components/cards/products/base/CardProductBase'

  export default {
    name: 'CardProduct',
    components: {
      Sum,
      Cols,
      Badge,
      VButton,
      ColsItem,
      CardProductBase
    },
    props: {
      image: {
        type: String,
        required: false
      },
      title: {
          type: String,
          required: true
        },
        category: {
          type: String,
          required: true
        },
        date: {
          type: String,
          required: true
        },
        priceDay: {
          type: Number,
          required: true
        },
        priceDeal: {
        type: Number,
        required: true
      }
    }
  }
</script>
