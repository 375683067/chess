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
        this.setFigure = function (color, figure) {
            this.color = color;
            this.figure = figure;
            this.setOptions(FigureImageMap[color][figure]);
            this.render();
        };
        /**
         *
         */
        this.turnHighthligh = function () {

        };
        /**
         *
         */
        this.turnOffHighthligh = function () {

        };
        options && this.setOptions(options);
        this.makeSnapshot('clear');
    };
});