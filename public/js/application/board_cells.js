/**
 * Created by Holden Caulfield on 06.11.2014.
 */
define(['figure_image_map', 'app_dir/board_cell'], function (ImageMap, BoardCellConstructor) {
    return function (Animation, color_side) {
        /**
         *
         */
        BoardCellConstructor = Animation.extend(BoardCellConstructor, Animation.texture);
        this.cells = {};
        this.ActiveCell;
        /**
         *
         */
        this.initBoardCells = function (color_side) {
            var a_char_code = 97, len = 8, i, j, CellTexture, cell_id,
                side = 100 / 8, prefix = '%', i_reverce = 0,
                j_reverce = 0;

            if (color_side === 'white') {
                j_reverce = 100 - side;
            } else {
                i_reverce = 100 - side;
            }

            for (i = 0; i < len; i++) {
                for (j = 0; j < len; j++) {
                    cell_id = String.fromCharCode(a_char_code + i) + j;
                    CellTexture = new BoardCellConstructor({
                        position: {
                            _id: cell_id,
                            w: side + prefix,
                            h: side + prefix,
                            x: (Math.abs(i_reverce - (i * side))) + prefix,
                            y: (Math.abs(j_reverce - (j * side))) + prefix
                        }
                    });
                    this.cells[cell_id] = CellTexture;
                }
            }
        };
        color_side && this.initBoardCells(color_side);
        /**
         *
         */
        var _this = this;
        var onFigureSelected = function (BoardCell) {
            if (_this.ActiveCell) {
                _this.ActiveCell.turnOffHighthligh();
            }
            BoardCell.turnHighthligh();
            _this.ActiveCell = BoardCell;
        };
        /**
         *
         */
        this.renderFigures = function (BoardInfo) {
            var chess_color, CurrentCell, _this = this, cell_id;
            for (chess_color in BoardInfo) {
                for (cell_id in BoardInfo[chess_color]) {
                    CurrentCell = this.cells[cell_id];
                    CurrentCell.setFigure(chess_color, BoardInfo[chess_color][cell_id]);
                    if (chess_color === color_side) {
                        CurrentCell.addEventListener('click', onFigureSelected);
                    }
                }
            }
        };
    };
});