import componentA from './common/componentA'
import Vue from 'vue'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register(('/service-worker.js'))
            .then(registration => {
                console.log('sw registration')
            })
            .catch(() => {
                console.log('sw registration error')
            })
    })
}

new Vue({
    el: '#app',
    render: h => h(componentA)
})