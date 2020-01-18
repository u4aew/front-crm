<template>
    <GridList>
        <GridListItem v-for="(card, key) in cards" :key="`loading-card-product-${key}`">
            <CardProductBase :loading="true"/>
        </GridListItem>
    </GridList>
</template>

<script>
    import BaseComponent from '@/components/base/BaseComponent'

    import GridList from '@/components/grids/grid-list/GridList'
    import GridListItem from '@/components/grids/grid-list/GridListItem'
    import CardProductBase from '@/components/cards/products/base/CardProductBase'

    export default {
        name: 'SkeletonProductCards',
        extends: BaseComponent,
        components: {
            GridList,
            GridListItem,
            CardProductBase
        },
        props: {
            size: {
                type: Number,
                required: true,
                default: 15
            }
        },
        data () {
            return {
                cards: new Array(this.size)
            }
        }
    }
</script>
