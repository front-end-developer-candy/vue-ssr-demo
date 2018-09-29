const routes = require.context('../pages', true, /routes.js$/);

export default routes.keys().map(key => (routes(key).default || routes(key)));