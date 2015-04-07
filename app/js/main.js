require.config({
    bower: {
        baseUrl: '../../bower_components',
        root: '../../bower.json',
        extensions: 'js|css',
        ignore: 'requirejs|font-awesome',
        auto: true,
        deps: ['dependencies']
    },
    paths: {
        'text': '../../bower_components/requirejs-text/text',
        'json': '../../bower_components/requirejs-plugins/src/json',
        'bower': '../../bower_components/requirejs-plugin-bower/src/bower'
    }
});

define(['bower!bower.json'], function(bowerConfig) {
    require(['app']);
});

