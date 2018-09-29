import {createApp} from "../app";

const {app, store, router} = createApp();


router.onReady(() => {
    app.$mount('#app');
});