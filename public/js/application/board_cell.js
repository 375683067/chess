/**
 * Created by Holden Caulfield on 06.11.2014.
 */
define(['figure_image_map'], function BoardCellConstructor (FigureImageMap) {
    return  function ChessCellConstructor (options) {
        FigureImageMap;
        this.snapshots = {};
        this.render_function = 'drawImageWithFullSetParams';
        this.color;
        this.figure;
        this.setImage(FigureImageMap.img);
        /**
         * @param figure
         */
        this.setFigure = function (color, figure) {
            this.color = color;
            this.figure = figure;
            this.setOptions(FigureImageMap[color][figure]);
            this.render();
        };
        /**
         *
         */
        this.turnHighthligh = function (threat_flag) {
            this.putSnapshot('clear');
            if (threat_flag) {
                this.ThreatHightlight.render();
            } else {
                this.HightLight.render();

            }
            this.figure && this.render();
        };
        /**
         *
         */
        this.takeFigure = function () {
            var Figure = {
                color: this.color,
                figure: this.figure
            };
            this.color = null;
            this.figure = null;
            this.putSnapshot('clear');
            return Figure;
        };
        /**
         *
         */
        this.turnOffHighthligh = function () {
            this.putSnapshot('clear');
            this.figure && this.render();
        };
        /**
         *
         */
        options && this.setOptions(options);
        this.makeSnapshot('clear');
        /**
         *
         * @type {texture}
         */
        this.ThreatHightlight = new this.texture({
            position: {
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h
            },
            img: '/img/threat_hightliht.png',
            render_function: 'drawImage'
        });
        /**
         *
         */
        this.HightLight = new this.texture({
            position: {
                x: this.x,
                y: this.y,
                w: this.w,
                h: this.h
            },
            img: '/img/hightliht.png',
            render_function: 'drawImage'
        });
    };
});