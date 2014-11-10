/**
 * Created by Holden Caulfield on 07.11.2014.
 */
var start_position = {
    white: {
        'a0' : 'R',
        'b0' : 'N',
        'c0' : 'B',
        'd5' : 'Q',
        'e0' : 'K',
        'f0' : 'B',
        'g0' : 'N',
        'h0' : 'R',
        'a1' : 'P',
        'b1' : 'P',
        'c1' : 'P',
        'd1' : 'P',
        'e1' : 'P',
        'f1' : 'P',
        'g1' : 'P',
        'h1' : 'P'
    },
    black: {
        'a7' : 'R',
        'b7' : 'N',
        'c7' : 'B',
        'd7' : 'Q',
        'e7' : 'K',
        'f7' : 'B',
        'g7' : 'N',
        'h7' : 'R',
        'a6' : 'P',
        'b6' : 'P',
        'c6' : 'P',
        'd6' : 'P',
        'e6' : 'P',
        'f6' : 'P',
        'g6' : 'P',
        'h6' : 'P'
    }


};
if (window) {
    define && (define([], function () {
        return start_position;
    }));
} else {
    module && (module.exports = start_position);
}


