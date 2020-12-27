require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import $ from 'jquery'


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        component: () => import('./Index')
    }]
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});