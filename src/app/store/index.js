import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);

export function createStore(context) {
    return new vuex.Store({
        state: {},
        getters: {},
        actions: {},
        mutations: {}
    });
}