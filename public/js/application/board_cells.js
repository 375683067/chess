/**
 * Created by Holden Caulfield on 06.11.2014.
 */
define(['figure_image_map', 'app_dir/board_cell','data/moves'], function (ImageMap, BoardCellConstructor, AllowMoves) {
    return function (Animation, color_side) {
        /**
         *
         */
        BoardCellConstructor = Animation.extend(BoardCellConstructor, Animation.texture);
        this.cells = {};
        this.ActiveCell;
        this.BoardInfo;
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
            var Moves;
            if (_this.ActiveCell) {
                _this.ActiveCell.turnOffHighthligh();
                _this.unHightlightAllowerdMoves(_this.HightLightedCells);
                _this.HightLightedCells = null;
            }
            BoardCell.turnHighthligh();
            Moves = AllowMoves(_this.BoardInfo, BoardCell.figure, BoardCell._id, color_side);
            _this.HightLightedCells = Moves.allow.concat(Moves.threat);
            _this.addPutEventListenersForCells(_this.HightLightedCells);
            _this.hightlightAllowedMoves(Moves.allow);
            _this.hightlightAllowedMoves(Moves.threat, true);
            _this.ActiveCell = BoardCell;
        };
        /**
         *
         */
        var putFigure = function (Cell) {
            var Figure;
            Figure = _this.ActiveCell.takeFigure();
            Cell.setFigure(Figure.color, Figure.figure);
            Cell.addEventListener('click', onFigureSelected);
            _this.removePutEventListeners(_this.HightLightedCells);
            _this.ActiveCell.removeEventListener('click', onFigureSelected);
            _this.unHightlightAllowerdMoves(_this.HightLightedCells);
            _this.ActiveCell = null;
        };
        /**
         *
         */
        this.removePutEventListeners = function (CellsArray) {
            var len, i, CurrentCell;
            for (i = 0, len = CellsArray.length; i < len; i++) {
                CurrentCell = this.cells[CellsArray[i]];
                CurrentCell.removeEventListener('click', putFigure);
            }
        };
        /**
         *
         */
        this.addPutEventListenersForCells = function (CellsArray) {
            var len, i, CurrentCell;
            for (i = 0, len = CellsArray.length; i < len; i++) {
                CurrentCell = this.cells[CellsArray[i]];
                CurrentCell.addEventListener('click', putFigure);
            }
        };
        /**
         *
         */
        this.unHightlightAllowerdMoves = function (AllowedMoves) {
            var i, len;
            for (i = 0, len = AllowedMoves.length; i < len; i++) {
                this.cells[AllowedMoves[i]].turnOffHighthligh();
            }
        };
        /**
         *
         * @param AllowedMoves
         * @param [threat]
         */
        this.hightlightAllowedMoves = function (AllowedMoves, threat) {
            var i, len;
            for (i = 0, len = AllowedMoves.length; i < len; i++) {

                this.cells[AllowedMoves[i]].turnHighthligh(threat);
            }
        };
        /**
         *
         */
        this.renderFigures = function (BoardInfo) {
            this.BoardInfo = BoardInfo;
            var chess_color, CurrentCell, cell_id;
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