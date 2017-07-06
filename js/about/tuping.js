$(function () {
    //get the welcome msg element
    var $all_msg = $('#typed');
    //get a list of letters from the welcome text
    var $wordList = $('#typed').text().split(" ");
    //clear the welcome text msg
    $('#typed').text("");
    //loop through the letters in the $wordList array
    $.each($wordList, function (idx, elem) {
        //create a span for the letter and set opacity to 0
        var newEL = $("<span/>").text(elem + " ");

        newEL.css({
            opacity: 0
        });
        //append it to the welcome message
        newEL.appendTo($all_msg);
        //set the delay on the animation for this element
        newEL.delay(idx * 70);
        //animate the opacity back to full 1
        newEL.animate({
            opacity: 1
        }, 1100);
    });

});