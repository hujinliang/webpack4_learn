<template>
    <div class="container">
        <componentB></componentB>
        <div class="ca" @click="log">
            我是{{info}}
        </div>
    </div>
</template>

<script>
    import componentB from './componentB'
    import _ from 'lodash'
    import '@style/app.scss'
    import '@style/common/common.css'
    import {add} from 'cmath' //tree shaking

    export default {
        name: "componentA",
        components: {
            componentB
        },
        data() {
            return {
                info: ''
            }
        },
        mounted() {
            let context = this
            console.log(`jquery: ${$('.container')}}`)
            $.get(
                '/comments/hotflow',
                {
                    id: '4263554020904293',
                    mid: '4263554020904293',
                    max_id_type: '0'
                },
                function (data) {
                    context.info = data.data.total_number
                }
            )
        },
        methods: {
            log() {
                console.log(add(1, 2))
                console.log(_.join(['1', '2']))
                import(/* webpackPrefetch: true */ 'logger').then(({default: logger}) => {
                    console.log(logger)
                    logger.log('async module 1')
                })

            }
        }
    }
</script>

<style scoped>

</style>