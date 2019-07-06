<template>
    <div class="container">
        <componentB></componentB>
        <div class="ca" @click="log">
            我是C
        </div>
    </div>
</template>

<script>
    import componentB from './componentB'
    import _ from 'lodash'
    import '@style/app.scss'
    import $ from 'jquery'
    export default {
        name: "componentA",
        components: {
            componentB
        },
        mounted() {
          console.log(`jquery: ${$('.container')}}`)
        },
        methods: {
            log() {
                console.log(_.join(['1', '2']))
                require.ensure([], (require) => {
                    const logger = require('logger').default
                    console.log(logger)
                    logger.log('async module 1')
                })

            }
        }
    }
</script>

<style scoped>

</style>