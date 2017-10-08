function initialize() {
    var mapProp = {
        center: new google.maps.LatLng(59.944625, 30.2950071),
        zoom: 15,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapProp);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(59.944625, 30.2950071),
        map: map
    });
    var iw1 = new google.maps.InfoWindow({
        content: "<a class='golovinka' href='http://technopark.ifmo.ru/'>Технопарк ИТМО</a><br>Биржевая линия, 14-16"
    });

    iw1.open(map, marker);
    google.maps.event.addListener(marker, "click", function (e) {
        iw1.open(map, this);
    });
}

function set_days() {
    $("#first-day").css('top', $(".raspis-description:eq(1)").offset().top - 27);
    $("#second-day").css('top', $(".raspis-description:eq(-1)").offset().top - 27);
}


function long_comments() {
    $(".first_long").css("display", "none");
    $(".second_long").css("display", "none");
    $(".third_long").css("display", "none");
    $(".more").css("display", "inline");
}

$(document).ready(function () {
    google.maps.event.addDomListener(window, 'load', initialize);
    set_days();
    setTimeout(function () {
        $('.slick-arrow').attr('onclick', 'long_comments()')
    }, 1000);
});

$(window).resize(function () {
    set_days();
});

function toggle() {
    $('.hid').toggle();
    $('.more-gosti').toggle()
}


function cool(i) {
    $('.opisanie').css('display', 'block').css('bottom', '0').css('top', '320px').css('height', '320');

    if (i === 0) {
        $('.opisanie').css('background-color', 'rgb(81, 13, 129)');
        $('.programm-text').css('display', 'none');
        $('.cool_feature_text').css('display', 'none');
        $('.bio-text').css('display', 'none');
        $('.fp-text').css('display', 'none');
        $('.robot-text').css('display', 'block');
         $('.blockchain-text').css('display', 'none');
    }
    if (i === 1) {
        $('.opisanie').css('background-color', 'rgb(67, 180, 152)');
        $('.robot-text').css('display', 'none');
        $('.cool_feature_text').css('display', 'none');
        $('.bio-text').css('display', 'none');
        $('.fp-text').css('display', 'none');
        $('.programm-text').css('display', 'block');
         $('.blockchain-text').css('display', 'none');
    }

    if (i === 2) {
        $('.opisanie').css('background-color', 'rgb(238, 229, 58)');
        $('.robot-text').css('display', 'none');
        $('.cool_feature_text').css('display', 'none');
        $('.bio-text').css('display', 'none');
        $('.programm-text').css('display', 'none');
        $('.fp-text').css('display', 'block');
         $('.blockchain-text').css('display', 'none');
    }
}

function ntcool(i) {
    $('.opisanie').css('display', 'block').css('top', '0').css('bottom', '320px').css('height', '320');

    if (i === 0) {
        $('.opisanie').css('background-color', 'rgb(238, 229, 58)');
        $('.programm-text').css('display', 'none');
        $('.cool_feature_text').css('display', 'block');
        $('.bio-text').css('display', 'none');
        $('.fp-text').css('display', 'none');
        $('.robot-text').css('display', 'none');
         $('.blockchain-text').css('display', 'none');
    }
    if (i === 1) {
        $('.opisanie').css('background-color', 'rgb(255, 140, 102)');
        $('.robot-text').css('display', 'none');
        $('.cool_feature_text').css('display', 'none');
        $('.bio-text').css('display', 'block');
        $('.fp-text').css('display', 'none');
        $('.programm-text').css('display', 'none');
         $('.blockchain-text').css('display', 'none');
    }

    if (i === 2) {
        $('.opisanie').css('background-color', 'rgb(81, 13, 129)');
        $('.robot-text').css('display', 'none');
        $('.cool_feature_text').css('display', 'none');
        $('.bio-text').css('display', 'none');
        $('.fp-text').css('display', 'none');
        $('.programm-text').css('display', 'none');
        $('.blockchain-text').css('display', 'block');
    }
}

function awesome() {
    $('.opisanie').toggle().css('bottom', '').css('height', '320');
    $('.robot-text').css('display', 'none');
    $('.programm-text').css('display', 'none');
    $('.cool_feature_text').css('display', 'none');
    $('.bio-text').css('display', 'none');
    $('.fp-text').css('display', 'none');
}