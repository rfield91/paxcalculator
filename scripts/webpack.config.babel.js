import '@babel/polyfill';

import appConfig from './app.webpack.config.babel.js';

export default async (...props) => {
    return [
        await appConfig(...props),
    ];
};
