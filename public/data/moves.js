/**
 *
 * @type {{Q: {steps: *[], long_step: boolean}, K: {steps: *[], long_step: boolean}, B: {steps: *[], long_step: boolean}, N: Function, R: {steps: *[], long_step: boolean}, P: {steps: *[], long_step: boolean}, p: {steps: *[], long_step: boolean}}}
 */
var StepInfo = {
    'Q': {
        steps: [[1,-1],[-1,1],[-1,-1],[1,1],[1,0],[-1,0],[0,-1],[0,1]],
        long_step: true
    },
    'K': {
        steps: [[1,-1],[-1,1],[-1,-1],[1,1],[1,0],[-1,0],[0,-1],[0,1]],
        long_step: false
    },
    'B': {
        steps: [[1,-1],[-1,1],[-1,-1],[1,1]],
        long_step: true
    },
    'N': {
        steps: [[2,-1],[2,1],[-2,-1],[-2,1], [1, 2], [-1, 2], [1, -2], [-1, -2]],
        long_step: false
    },
    'R': {
        steps: [[1,0],[-1,0],[0,-1],[0,1]],
        long_step: true
    },
    'bP': {
        steps: [[0,-1], [0,-2]],
        long_step: false
    },
    'bp': {
        steps: [[0,-1]],
        long_step: false
    },
    'P': {
        steps: [[0,1], [0,2]],
        long_step: false
    },
    'p': {
        steps: [[0,1]],
        long_step: false
    }
};
/**
 *
 * @param AllPositions
 * @param figure_id
 * @param position
 * @param color
 * @returns {{allow: Array, threat: Array}}
 */
var getAllowedSteps = function (AllPositions, figure_id, position, color) {
    var position = position.split(''), i, len,
        allow = true,
        cell_id, to_return = {
            allow: [],
            threat: []
        },
        steps = StepInfo[figure_id].steps,
        long_step = StepInfo[figure_id].long_step,
        position_char = position[0].charCodeAt(0),
        position_number = parseInt(position[1]),
        check_char, check_number,
        char_cod_a = 'a'.charCodeAt(0),
        char_code_h = 'h'.charCodeAt(0);

    for (i = 0, len = steps.length; i < len; i++) {
        check_char = position_char;
        check_number = position_number;
        allow = long_step;
        do {
            check_char += steps[i][0];
            check_number += steps[i][1];
            if (check_char > char_code_h || check_number > 7 || check_number < 0  || check_char < char_cod_a) {
                break;
            } else {
                cell_id = String.fromCharCode(check_char) + check_number;
                if (!AllPositions.white[cell_id] && !AllPositions.black[cell_id]) {
                    to_return.allow.push(cell_id);
                } else {
                    if (color === 'white') {
                        if (AllPositions.black[cell_id]) {
                            to_return.threat.push(cell_id)
                        }
                    } else {
                        if (AllPositions.white[cell_id]) {
                            to_return.threat.push(cell_id)
                        }
                    }
                    allow = false;
                }
            }
        } while(allow);
    }
    return to_return;
};
var module = module || false;
module && (module.exports = getAllowedSteps);
define && (define([], function () {
    return getAllowedSteps;
}));
