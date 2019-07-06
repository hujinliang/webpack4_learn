<template>
    <div @click="toast">
        我是B
    </div>
</template>

<script>
    export default {
        name: "componentB",
        methods: {
            toast() {
                require.ensure([], (require) => {
                    const time = require('time').default
                    alert(time.now())
                })
            }
        }
    }
</script>

<style scoped>

</style>