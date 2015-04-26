require.config({
    bower: {
        baseUrl: '../libs',
        root: '../../bower.json',
        extensions: 'js|css',
        ignore: 'requirejs|font-awesome',
        auto: true,
        deps: ['dependencies']
    },
    paths: {
        'text': '../libs/requirejs-text/text',
        'css': '../libs/require-css/css',
        'json': '../libs/requirejs-plugins/src/json',
        'bower': '../libs/requirejs-plugin-bower/src/bower'
    }
});

define(['bower!bower.json'], function(bowerConfig) {
    require(['app']);
});

