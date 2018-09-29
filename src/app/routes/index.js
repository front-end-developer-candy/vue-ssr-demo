import vue from 'vue';
import vueRouter from 'vue-router';
import pages from './pages';

vue.use(vueRouter);

export function createRouter(context) {
    return new vueRouter({
        mode: 'history',
        base: '/',
        routes: [
            ...pages
        ]
    });
}