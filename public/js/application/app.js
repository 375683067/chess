/**
 * Created by Holden Caulfield on 04.11.2014.
 */
define(['animation', 'board_cells', 'data/start_position_info'], function (AnimationConstructor, BoardCellsConstructor,
    StartPostion) {
    var application = function () {
        var Animation = new AnimationConstructor({
            canvas_id: 'canvas'
        });
        var BackgroundTexture = new Animation.createTexture({
            position: {
                w: '100%',
                h: '100%'
            },
            img: '/img/board0.png',
            render_function: 'drawImage'
        });
        BackgroundTexture.render();
        var BoardCells = new BoardCellsConstructor(Animation, 'white');
        BoardCells.renderFigures(StartPostion);

    };
    return application
});