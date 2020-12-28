require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './Main';
import $ from 'jquery';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';


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
    render: h => h(Main)
});