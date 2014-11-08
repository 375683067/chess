/**
 * Created by Holden Caulfield on 04.11.2014.
 */
define([], function () {
    return function AnimationConstructor (config) {
        var canvas;
        if (config && config.canvas_id) {
            canvas = document.getElementById(config.canvas_id);
            this.context = canvas.getContext('2d');
            this.canvas_width = canvas.width;
            this.canvas_height = canvas.height;
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
        this.addEventListener = function () {

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
            option = option || {};
            this.x = option.x || 0;
            this.y = option.y || 0;
            this.w = option.w || 0;
            this.h = option.h || 0;
            this.fill_style = option.fill_style;
            this.render_function = option.render_function || 'drawImage';
            if (option.img) {
                this.img = document.createElement('img');
                this.img.src = option.img;
            }
            //if texture pos is percent value
            if ((typeof this.x ===  'string') && (this.x.indexOf('%') !== -1)) {
                this.x = parseFloat(this.x) / 100 * this.canvas_width;
            }
            if ((typeof  this.y ===  'string') && (this.y.indexOf('%') !== -1)) {
                this.y = parseFloat(this.y) / 100 * this.canvas_height;
            }
            if ((typeof this.w ===  'string') && (this.w.indexOf('%') !== -1)) {
                this.w = parseFloat(this.w) / 100 * this.canvas_width;
            }
            if ((typeof this.h ===  'string') && (this.h.indexOf('%') !== -1)) {
                this.h = parseFloat(this.h) / 100 * this.canvas_height;
            }
            this.render = function () {
                this[this.render_function]();
            }
        };
        /**
         *
         */
        this.extend(this.createTexture, this);
    };
});