/**
 * Created by Holden Caulfield on 03.11.2014.
 */
require.config({
    baseUrl: 'js',
    paths: {
        sham: 'vendor/es5-sham.min',
        shim: 'vendor/es5-shim.min',
        app: 'application/app',
        animation: 'application/animation',
        board_cells: 'application/board_cells',
        data: '../data',
        figure_image_map: './application/figure_image_map'
    },
    shim: {
        '*': {
            deps: ['sham', 'shim']
        }
    }
});
var ImageForPreload = [
        '/img/board0.png',
        '/img/figure.png'
    ],
    preloaded_image_cout = 0;
window.require(['app'], function (app) {

    test_canvas = document.getElementById('test_canvas');
    test_context = test_canvas.getContext('2d');

    var i, len = ImageForPreload.length, img;
    if (len) {
        for (i = 0; i < len; i++) {
            img = document.createElement('img');
            img.src = ImageForPreload[i];
            img.onload = function () {
                if (len === ++preloaded_image_cout) {
                    app();
                }
            }
        }
    } else {
        app();
    }

});
