import componentA from './common/componentA'
import Vue from 'vue'

import $ from 'jquery'

new Vue({
    el: '#app',
    render: h => h(componentA)
});