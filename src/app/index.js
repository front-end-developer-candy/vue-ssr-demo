import vue from 'vue';
import view from './app.vue';
import {createStore} from './store';
import {createRouter} from './routes';
import {sync} from 'vuex-router-sync';

export function createApp(context) {
    const router = createRouter(context);
    const store = createStore(context);

    sync(store, router);

    router.onReady(() => {

        console.log('测试这个生命周期');

    });

    const app = new vue({
        store,
        router,
        render: h => h(view)
    });

    return {
        router,
        store,
        app
    };
}