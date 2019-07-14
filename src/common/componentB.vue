<template>
    <div @click="toast">
        Hello B4
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