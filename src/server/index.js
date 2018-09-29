import {createApp} from '../app';

export default context => {
    return new Promise((resolve, reject) => {

        const {app, router, store} = createApp(context);

        /**
         * 添加路由
         */
        router.push(context.path);

        // const matchedComponents = router.getMatchedComponents();

        /**
         * 注册方法
         */
        router.onReady(() => {

            /**
             * 处理异步请求
             */

            resolve(app);
        }, reject);

    });
}