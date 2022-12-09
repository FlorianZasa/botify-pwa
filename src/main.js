import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueApexCharts from 'vue3-apexcharts'


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(store).use(router).use(VueApexCharts).mount('#app')
