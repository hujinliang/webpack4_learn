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
    import '@style/app.scss'
    export default {
        name: "componentA",
        components: {
            componentB
        },
        methods: {
            log() {
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