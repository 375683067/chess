/**
 * Created by Holden Caulfield on 06.11.2014.
 */
define(['figure_image_map'], function (ImageMap) {
    return function (Animation) {
        var a_char_code = 97, len = 8, i, j, CellTexture,
            side = 100 / 8, prefix = '%', r = 0, g = 0, b= 0;
        this.cells = {};
        for (i = 0; i < len; i++) {
            for (j = 0; j < len; j++) {
                if (side)
                CellTexture = new Animation.createTexture({
                    position: {
                        w: side + prefix,
                        h: side + prefix,
                        x: i * side + prefix,
                        y: j * side + prefix
                    }
                });
                this.cells[String.fromCharCode(a_char_code + i) + j] = CellTexture;
            }
        }
        /**
         *
         */
        this.renderFigures = function (BoardInfo) {
            var chess_type, CurrentCell, cell_id, FigureImg, figure_type;
            for (chess_type in BoardInfo) {
                for (cell_id in BoardInfo[chess_type]) {
                    figure_type = BoardInfo[chess_type][cell_id];
                    FigureImg = ImageMap[chess_type][figure_type];
                    CurrentCell = this.cells[cell_id];
                    CurrentCell.setOptions({
                        position: FigureImg,
                        img: ImageMap.img,
                        render_function: 'drawImageWithFullSetParams'
                    });
                    debugger;
                    CurrentCell.render();
                }
            }
        };
    };
});