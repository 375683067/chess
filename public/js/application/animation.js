/**
 * Created by Holden Caulfield on 04.11.2014.
 */
define([], function () {
    return function AnimationConstructor (config) {
        var canvas;
        var Listeners = {
            'click': []
        };
        var catchEvent = function (ev) {
            var x = ev.offsetX,
                y = ev.offsetY,
                type = ev.type,
                i, len, CurrentListeners = Listeners[type] || [];
            for (i = 0, len = CurrentListeners.length; i < len; i++) {
                if (x > CurrentListeners[i].texture.x && x < CurrentListeners[i].texture.x  + CurrentListeners[i].texture.w &&
                y > CurrentListeners[i].texture.y && y < CurrentListeners[i].texture.y  + CurrentListeners[i].texture.h) {
                    CurrentListeners[i].callback(CurrentListeners[i].texture);
                }
            }
        };
        if (config && config.canvas_id) {
            canvas = document.getElementById(config.canvas_id);
            this.context = canvas.getContext('2d');
            this.canvas_width = canvas.width;
            this.canvas_height = canvas.height;
            canvas.addEventListener('click', catchEvent);
        };
        /**
         * public methods
         */
        /**
         * @param Child
         * @param Parent
         */
        this.extend = function Texture (Child, Parent) {
            if (Parent instanceof Function) {
                Child.prototype = new Parent();
            } else {
                Child.prototype = this;
            }
        };
        /**
         *
         */
        this.drawFillRect = function () {
            this.context.fillStyle = this.fill_style;
            this.context.fillRect(this.x, this.y, this.w, this.h);
        };
        /**
         *
         */
        this.drawImageWithFullSetParams = function () {
            this.context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
        };
        /**
         *
         */
        this.drawImage = function () {
            this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
        };
        /**
         *
         */
        this.addEventListener = function (type, callback) {
            if (!Listeners[type]) {
                Listeners[type] = [];
            }
            Listeners[type].push({
                texture: this,
                callback: callback
            });
        };
        /**
         *
         */
        this.startAnimation = function () {

        };
        /**
         *
         */
        this.stopAnimation = function () {

        };
        /**
         * @param config
         */
        this.createTexture = function (option) {
            /**
             * @param options
             */
            this.x = this.y = this.sx = this.sy = this.h = this.w = this.sh = this.sw = 0;
            this.setOptions = function (option) {
                var key;
                this.render_function =  this.render_function || 'drawImage';

                for (key in option.position) {
                    this[key] = option.position[key];
                    if ((typeof this[key] ===  'string') && (this[key].indexOf('%') !== -1)) {
                        this[key] = parseFloat(this[key]) / 100 * this.canvas_width;
                    }
                }
                this.figure_color = option.figure_color;
                this.figure = option.figure;
                this.fill_style = option.fill_style !== undefined ? option.fill_style : this.fill_style;
                this.render_function = option.render_function !== undefined ? option.render_function : this.render_function;
                option.img && this.setImage(option.img);
            };
            /**
             *
             */
            this.setImage = function (image) {
                this.img = document.createElement('img');
                this.img.src = image;
            };
            /**
             *
             */
            this.render = function () {
                this[this.render_function]();
            };
            option && this.setOptions(option);
        };
        /**
         *
         */
        this.extend(this.createTexture, this);
    };
});