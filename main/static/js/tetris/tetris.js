var block, now_color, block_id, cur_text, cur_text_id, saved_text, c_tetris, tetris_context, W, H,
    tetris_first_interval, tetris_first_param, playing, need_row;
var score = 0, offset = 0;
var lock_first_interval = false;
var game_field = [], game_freezed = [];
var rows = 6, cols = 12;
var step_time = 350;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


var shapes = [
    [[1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],

    [[1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],

    [[0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],

    [[1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],

    [[0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],

    [[0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],

    [[1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],

    [[0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]],

    [[0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]],

    [[0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]],

    [[0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]],

    [[0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]],

    [[1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]],

    [[1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]],

    [[1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]],

    [[1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]],

    [[0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]],

    [[0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]],

    [[0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]],

    [[0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]],

    [[0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]]

];

var count_blocks = [0, 1, 3, 4, 6, 19, 10, 18, 16, 15, 18, 16, 10, 20, 6, 0, 3, 9];
var positions = [4, 8, 0, 2, 4, 10, 0, 2, 9, 6, 7, 1, 9, 4, 6, 8, 3, -1];
var colors = [1, 3, 1, 2, 4, 4, 3, 1, 1, 2, 4, 4, 3, 3, 2, 1, 2, 1];
var colors_meta = ["", "rgb(255, 140, 102)", "rgb(81, 13, 129)", "rgb(67, 180, 152)", "rgb(238, 229, 58)"];

var texts = ['программирование', 'робототехника', ['машинное', 'обучение'], ['AR', 'VR'], ['soft', 'skills'], 'блокчейн',
    'биоинформатика', 'алгоритмы', ['интернет', 'вещей'], ['данных', 'базы'], ['критическое', 'мышление'], ['веб', 'сервисы'], 'предпринимательство', 'моб. приложения',
    ['чат -', 'боты'], 'нейроинтерфейсы', ['инфо-', 'безопасность'], 'промдизайн', '', '', '', '', '', '', ''];
var cur_shape = 1;


$(document).ready(function () {
    saved_text = [];
    c_tetris = document.getElementById("tetris");
    tetris_context = c_tetris.getContext("2d");

    W = $('#tetris').width();
    H = $('#tetris').height();

    c_tetris.height = H;
    c_tetris.width = W;

    for (var i = 0; i < rows; i++) {
        var tmp = [];

        for (var g = 0; g < cols; g++) {
            tmp.push(0);
        }

        game_field.push(tmp);
        game_freezed.push(tmp);
    }
    tetris_first_param = {'rad': 130};
    tetris_first_interval = window.setInterval(function () {
        if (!lock_first_interval) {
            tetris_context.clearRect(0, 0, W, H);
            tetris_context.beginPath();
            tetris_context.lineWidth = 4;
            tetris_context.arc(W / 2, H / 2, tetris_first_param['rad'], 0, 2 * Math.PI, false);
            tetris_context.strokeStyle = '#080808';
            tetris_context.stroke();
            tetris_context.closePath();
        }
    }, 10);
});


function start_tetris() {
    window.clearInterval(tetris_first_interval);

    $('#tetris').css('width', '1170px').css('height', '600px');
    W = 1170;
    H = 600;
    $('#tetris').css('position', 'static');
    c_tetris.height = H;
    c_tetris.width = W;


    lock_first_interval = true; // bugs of js
    tetris_context.clearRect(0, 0, W, H);
    $("#we-teach").toggle();

    function reshape_block() {
        if (cur_shape + 1 === 1) {
            return shapes[block_id]
        }
        else if (cur_shape + 1 === 2) {
            switch (block_id) {
                case 0:
                    return shapes[7];
                    break;
                case 1:
                    return shapes[9];
                    break;
                case 2:
                    return shapes[12];
                    break;
                case 3:
                    return shapes[block_id];
                    break;
                case 4:
                    return shapes[15];
                    break;
                case 5:
                    return shapes[19];
                    break;
                case 6:
                    return shapes[17];
                    break;
            }
        }
        else if (cur_shape + 1 === 3) {
            switch (block_id) {
                case 0:
                    return shapes[block_id];
                    break;
                case 1:
                    return shapes[10];
                    break;
                case 2:
                    return shapes[13];
                    break;
                case 3:
                    return shapes[block_id];
                    break;
                case 4:
                    return shapes[16];
                    break;
                case 5:
                    return shapes[20];
                    break;
                case 6:
                    return shapes[block_id];
                    break;
            }

        }
        else if (cur_shape + 1 === 4) {
            switch (block_id) {
                case 0:
                    return shapes[8];
                    break;
                case 1:
                    return shapes[11];
                    break;
                case 2:
                    return shapes[14];
                    break;
                case 3:
                    return shapes[block_id];
                    break;
                case 4:
                    return shapes[block_id];

                    break;
                case 5:
                    return shapes[block_id];
                    break;
                case 6:
                    return shapes[block_id];
                    break;
            }

        }
    }

    function add_shape() {
        if (cur_shape + 1 === 4) {
            cur_shape = 0
        }
        else {
            cur_shape += 1
        }
    }

    var qubes = [];
    for (i = 0; i < count_blocks.length; i++) {
        qubes.push(shapes[count_blocks[i]]);
    }

    function clear_game() {
        game_field = [];
        for (var i = 0; i < rows; i++) {
            var tmp = [];

            for (var g = 0; g < cols; g++) {
                tmp.push(game_freezed[i][g] | 0);
            }

            game_field.push(tmp);
        }

    }

    clear_game();

    var cur_X, cur_Y = 0;

    function valid(X, Y, block) {
        for (var r = 0; r < 4; r++) {
            if (-1 !== $.inArray(1, block[r]) && Y + r >= rows) {
                return false;
            }

            for (var g = 0; g < 4; g++) {
                if (block[r][g] && game_freezed[Y + r][X + g]
                    || block[r][g] && X + g >= cols
                    || block[r][g] && X + g < 0) {
                    return false;
                }
            }

        }

        return true;
    }


    var lock_tetris = false;

    function step(block_proto, position, color, text_on_block) {
        cur_text = text_on_block;
        block = block_proto[0];
        block_id = block_proto[1];
        now_color = colors[color];
        if (!lock_tetris) {
            game_freezed = game_field;
            if (cur_Y >= 0) {
                if (cur_text_id === undefined) {
                    cur_text_id = 0;
                }
                saved_text.push([texts[cur_text_id], text_X, text_Y, rotate]);
            }
        }

        clear_game();

        cur_X = position;
        cur_Y = 0;

        var n = 0;

        if (valid(cur_X, cur_Y, block)) {
            for (var g = 0; g < 4; g++) {
                for (i = 0; i < 4; i++) {
                    game_field[g][cur_X + n] = block[g][i] * now_color;
                    n += 1;
                }
                n = 0;
            }
        }
        lock_tetris = true;
        var game_interval = window.setInterval(function () {
            cur_Y += 1;

            if (!valid(cur_X, cur_Y + 1, block)) {
                lock_tetris = false;
                window.clearInterval(game_interval);
            }

        }, step_time);

    }

    var b = 0;
    var lol = setInterval(function () {
        if (lock_tetris === false) {

            if (valid(positions[b], 0, qubes[b])) {
                step([qubes[b], count_blocks[b]], positions[b], colors[b], texts[b]);
                cur_text_id = b;
            }

            if (playing) {
                need_row = 0;

                while (need_row !== -1) {
                    need_row = -1;

                    for (var tt = 0; tt < rows; tt++) {
                        if ($.inArray(0, game_freezed[tt]) === -1) {
                            need_row = tt;
                            break;
                        }
                    }
                    if (need_row !== -1) {
                        for (var hh = 0; hh < game_freezed[need_row].length; hh++) {
                            score += game_freezed[need_row][hh] << 0;
                        }
                        game_freezed.splice(need_row, 1);
                        game_freezed.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                        saved_text = [];
                    }
                }
            }

            b++;


            if (b >= count_blocks.length) {
                window.clearInterval(lol);
                step_time += 100;

                if (playing) {
                    setTimeout(function () {
                        var gaming = setInterval(function () {
                            if (lock_tetris === false) {
                                offset = 3;
                                saved_text = [];
                                cur_text_id = 20;
                                cur_text = "";
                                var rand_block = getRandomInt(0, 6);
                                var rand_pos = getRandomInt(0, cols - 1);
                                var rand_color = getRandomInt(1, 4);

                                if (valid(rand_pos, 0, shapes[rand_block])) {
                                    step([shapes[rand_block], rand_block], rand_pos, rand_color, "");
                                }

                                need_row = 0;

                                while (need_row !== -1) {
                                    need_row = -1;

                                    for (var tt = 0; tt < rows; tt++) {
                                        if ($.inArray(0, game_freezed[tt]) === -1) {
                                            need_row = tt;
                                            break;
                                        }
                                    }
                                    if (need_row !== -1) {
                                        for (var hh = 0; hh < game_freezed[need_row].length; hh++) {
                                            score += game_freezed[need_row][hh] << 0;
                                        }
                                        game_freezed.splice(need_row, 1);
                                        game_freezed.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                                    }
                                }
                            }

                        }, step_time);
                    }, 2 * step_time);
                }
            }
        }
    }, step_time);


    var BLOCK_W = W / cols, BLOCK_H = H / rows;

    function drawBlock(x, y) {
        tetris_context.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - offset, BLOCK_H - offset);
        tetris_context.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - offset, BLOCK_H - offset);
    }

    function get_text_coors() {
        var start_x = cur_X * BLOCK_W;
        var start_y = cur_Y * BLOCK_H;
        var rotate = false;

        switch (cur_text_id) {
            case 0:
                start_x += 2 * BLOCK_W - tetris_context.measureText(texts[0]).width / 2;
                start_y += BLOCK_H / 2 + 13;
                break;
            case 1:
                start_x += 1.5 * BLOCK_W - tetris_context.measureText(texts[1]).width / 2;
                start_y += BLOCK_H + BLOCK_H / 2 + 13;
                break;
            case 2:
                start_x = [start_x + BLOCK_W - tetris_context.measureText(texts[2][0]).width / 2,
                    start_x + BLOCK_W - tetris_context.measureText(texts[2][1]).width / 2];
                start_y = [start_y + BLOCK_H - 13, start_y + BLOCK_H + 20];
                break;
            case 3:
                start_x = [start_x + 1.5 * BLOCK_W + tetris_context.measureText(texts[3][0]).width / 2,
                    start_x + BLOCK_W / 2 + tetris_context.measureText(texts[3][1]).width / 2];
                start_y = [start_y + BLOCK_H / 2 + 13, start_y + 1.5 * BLOCK_H + 13];
                break;
            case 4:
                start_x = [start_x + BLOCK_W / 2 + tetris_context.measureText(texts[4][0]).width / 2,
                    start_x + 2 * BLOCK_W - tetris_context.measureText(texts[4][1]).width / 2];
                start_y = [start_y + BLOCK_H / 2 + 13, start_y + 1.5 * BLOCK_H + 13];
                break;
            case 5:
                start_y += 2 * BLOCK_H + 13;
                start_x += 1.5 * BLOCK_W + 13;
                rotate = -90 * Math.PI / 180;
                break;
            case 6:
                start_x += 1.5 * BLOCK_W - tetris_context.measureText(texts[6]).width / 2;
                start_y += 1.5 * BLOCK_H + 13;
                break;
            case 7:
                start_x += 1.5 * BLOCK_W - tetris_context.measureText(texts[7]).width / 2;
                start_y += 1.5 * BLOCK_H + 13;
                break;

            case 8:
                start_x = [start_x + 0.5 * BLOCK_W + 13,
                    start_x + 1.5 * BLOCK_W + 13];

                start_y = [start_y + 2 * BLOCK_H + tetris_context.measureText(texts[8][0]).width / 2, start_y + BLOCK_H + tetris_context.measureText(texts[8][1]).width / 2];

                rotate = -90 * Math.PI / 180;
                rotate = [rotate, rotate];
                break;
            case 9:
                start_x = [start_x + 1.5 * BLOCK_W + 13, start_x + 0.5 * BLOCK_W + 13];

                start_y = [start_y + 2 * BLOCK_H + tetris_context.measureText(texts[9][0]).width / 2, start_y + BLOCK_H + tetris_context.measureText(texts[9][1]).width / 2];

                rotate = -90 * Math.PI / 180;
                rotate = [rotate, rotate];
                break;

            case 10:
                start_x = [start_x + 1.5 * BLOCK_W - tetris_context.measureText(texts[10][0]).width / 2,
                    start_x + 1.5 * BLOCK_W - tetris_context.measureText(texts[10][1]).width / 2];

                start_y = [start_y + 1.5 * BLOCK_H - 13, start_y + 1.5 * BLOCK_H + 20];
                break;
            case 11:
                start_x = [start_x + 0.5 * BLOCK_W + 13,
                    start_x + 1.5 * BLOCK_W + 13];

                start_y = [start_y + 2 * BLOCK_H + tetris_context.measureText(texts[11][0]).width / 2, start_y + BLOCK_H + tetris_context.measureText(texts[11][1]).width / 2];

                rotate = -90 * Math.PI / 180;
                rotate = [rotate, rotate];
                break;
            case 12:
                start_y += 1.5 * BLOCK_H + 13;
                start_x += 1.5 * BLOCK_W - tetris_context.measureText(texts[12]).width / 2;
                break;
            case 13:
                start_y += 1.5 * BLOCK_H + tetris_context.measureText(texts[13]).width / 2;
                start_x += 1.5 * BLOCK_W + 13;
                rotate = -90 * Math.PI / 180;
                break;
            case 14:
                start_x = [start_x + BLOCK_W / 2 + tetris_context.measureText(texts[14][0]).width / 2,
                    start_x + 2 * BLOCK_W - tetris_context.measureText(texts[14][1]).width / 2];
                start_y = [start_y + BLOCK_H / 2 + 13, start_y + 1.5 * BLOCK_H + 13];
                break;
            case 15:
                start_x += 2 * BLOCK_W - tetris_context.measureText(texts[15]).width / 2;
                start_y += BLOCK_H / 2 + 13;
                break;
            case 16:
                start_x = [start_x + BLOCK_W - tetris_context.measureText(texts[16][0]).width / 2,
                    start_x + BLOCK_W - tetris_context.measureText(texts[16][1]).width / 2];
                start_y = [start_y + BLOCK_H - 13, start_y + BLOCK_H + 20];
                break;
            case 17:
                start_y += 2 * BLOCK_H + 25;
                start_x += 1.5 * BLOCK_W + 13;
                rotate = -90 * Math.PI / 180;
                break;
            case 18:
                break;
            case 19:
                break;
            case 20:
                break;
        }

        return [start_x, start_y, rotate];

    }

    function render() {
        clear_game();
        var n = 0;
        var h = 0;


        if (valid(cur_X, cur_Y, block)) {
            for (g = 0; g < 4; g++) {
                for (i = 0; i < 4; i++) {
                    if (typeof game_field[cur_Y + h] !== 'undefined') {
                        game_field[cur_Y + h][cur_X + n] += block[g][i] * now_color;
                    }
                    n += 1

                }

                h += 1;
                n = 0;
            }
        } else {
            cur_Y -= 1;

            for (g = 0; g < 4; g++) {
                for (i = 0; i < 4; i++) {
                    if (typeof game_field[cur_Y + h] !== 'undefined') {
                        game_field[cur_Y + h][cur_X + n] += block[g][i] * now_color;
                    }
                    n += 1

                }

                h += 1;
                n = 0;
            }
        }

        tetris_context.clearRect(0, 0, W, H);
        for (var x = 0; x < cols; ++x) {
            for (var y = 0; y < rows; ++y) {
                if (game_field[y][x]) {
                    tetris_context.fillStyle = colors_meta[game_field[y][x]];
                    tetris_context.strokeStyle = colors_meta[game_field[y][x]];
                    drawBlock(x, y);
                }
            }
        }

        tetris_context.font = "26px Ubuntu";
        tetris_context.fillStyle = "white";
        tetris_context.textAlign = "left";


        // Draw saved text
        for (var t = 0; t < saved_text.length; t++) {
            tetris_context.save();
            if (typeof saved_text[t][0] === "string") {
                if (saved_text[t][3]) {
                    tetris_context.save();
                    tetris_context.translate(saved_text[t][1], saved_text[t][2]);
                    tetris_context.rotate(saved_text[t][3]);
                    tetris_context.fillText(saved_text[t][0], 0, 0);
                    tetris_context.restore()
                } else {
                    tetris_context.fillText(saved_text[t][0], saved_text[t][1], saved_text[t][2]);
                    tetris_context.restore();
                }
            } else {
                if (saved_text[t][3]) {
                    tetris_context.save();
                    tetris_context.translate(saved_text[t][1][0], saved_text[t][2][0]);
                    tetris_context.rotate(saved_text[t][3][0]);
                    tetris_context.fillText(saved_text[t][0][0], 0, 0);
                    tetris_context.restore();

                    tetris_context.save();
                    tetris_context.translate(saved_text[t][1][1], saved_text[t][2][1]);
                    tetris_context.rotate(saved_text[t][3][1]);
                    tetris_context.fillText(saved_text[t][0][1], 0, 0);
                    tetris_context.restore()
                } else {
                    tetris_context.fillText(saved_text[t][0][0], saved_text[t][1][0], saved_text[t][2][0]);
                    tetris_context.fillText(saved_text[t][0][1], saved_text[t][1][1], saved_text[t][2][1]);
                }

            }
        }

        // Draw current text
        answer = get_text_coors();

        text_X = answer[0];
        text_Y = answer[1];
        rotate = answer[2];
        if (typeof cur_text === "string") {
            if (rotate) {
                tetris_context.save();
                tetris_context.translate(text_X, text_Y);
                tetris_context.rotate(rotate);
                tetris_context.fillText(cur_text, 0, 0);
                tetris_context.restore()
            } else {
                tetris_context.fillText(cur_text, text_X, text_Y);
            }
        } else {
            if (rotate) {
                tetris_context.save();
                tetris_context.translate(text_X[0], text_Y[0]);
                tetris_context.rotate(rotate[0]);
                tetris_context.fillText(cur_text[0], 0, 0);
                tetris_context.restore();

                tetris_context.save();
                tetris_context.translate(text_X[1], text_Y[1]);
                tetris_context.rotate(rotate[1]);
                tetris_context.fillText(cur_text[1], 0, 0);
                tetris_context.restore()
            } else {
                tetris_context.fillText(cur_text[0], text_X[0], text_Y[0]);
                tetris_context.fillText(cur_text[1], text_X[1], text_Y[1]);
            }

        }

    }

    setInterval(render, 30);

    function keyPress(key) {
        playing = true;
        switch (key) {
            case 'left':
                if (valid(cur_X - 1, cur_Y, block) && lock_tetris) {
                    cur_X -= 1;
                }
                break;

            case 'right':
                if (valid(cur_X + 1, cur_Y, block) && lock_tetris) {
                    cur_X += 1;
                }
                break;

            case 'down':
                break;

            case 'rotate':
                if (valid(cur_X + 1, cur_Y + 1, reshape_block())) {
                    texts[cur_text_id] = "";
                    cur_text = "";
                    block = reshape_block();
                    add_shape();
                }
                break;
        }

    }

    document.body.onkeydown = function (e) {
        var keys = {
            37: 'left',
            39: 'right',
            40: 'down',
            38: 'rotate'
        };
        if (typeof keys[e.keyCode] != 'undefined') {
            keyPress(keys[e.keyCode]);
            render();
        }
    };
}

$('#we-teach').mouseenter(function () {
    TweenLite.to(tetris_first_param, 2, {
        rad: 150,
        ease: Power4.easeOut
    });
}).mouseout(function () {
    TweenLite.to(tetris_first_param, 2, {
        rad: 130,
        ease: Power4.easeOut
    });
});

$('#we-teach a').mouseenter(function () {
    TweenLite.to(tetris_first_param, 2, {
        rad: 150,
        ease: Power4.easeOut
    });
});