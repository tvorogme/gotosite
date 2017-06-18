function getClosestNum(num, ar) {
    var i = 0, closest, closestDiff, currentDiff;
    closest = ar[0];
    for (i; i < ar.length; i++) {
        closestDiff = Math.abs(num - closest);
        currentDiff = Math.abs(num - ar[i]);
        if (currentDiff < closestDiff) {
            closest = ar[i];
        }
        closestDiff = null;
        currentDiff = null;
    }
    return closest;
}

var s, old_name, old_lenght, prep;

var angels_g = [177, -177, -150, -130, -129, -125, -115, -110, -105, -90, -83, -70, -50, 30, 70];

function box_and_array_to_name(box, arr, e, debug) {
    b = typeof b !== 'undefined' ? b : false;

    var boxCenter = [box.offset().left + box.width() / 2, box.offset().top + box.height() / 2];
    var to_mouse_angle = Math.atan2(e.pageX - boxCenter[0], e.pageY - boxCenter[1]) * (180 / Math.PI);
    var our_paren = $.inArray(getClosestNum(to_mouse_angle, arr), arr);

    s = our_paren + 1 + "";
    while (s.length < 3) s = "0" + s;

    if (debug) {
        console.log(s, to_mouse_angle);
    }
    return s + ".jpg"
}

$(document).mousemove(function (e) {

    var names = ['alena', 'vanya', 'sasha', 'kolya', 'pasha', 'roct'];

    for (var i = 0; i < names.length; i+=1) {
        prep = $('#' + names[i] + ' img');
        old_lenght = prep.attr('src').length;
        old_name = prep.attr('src').slice(0, old_lenght - 7);
        prep.attr('src', old_name + box_and_array_to_name(prep, angels_g, e));
    }
});