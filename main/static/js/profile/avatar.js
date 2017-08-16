function change_avatar() {
    $('.image-editor').css('display', 'block');
    $('.cropit-image-input').click();
}

$(function () {
    var $editor = $('.image-editor');
    $editor.cropit();

    $('.export').click(function () {
        // Get cropping information
        var imgData = $editor.cropit('export');
        console.log(imgData);

        var img = new Image();
        img.src = imgData;

        var formData = new FormData();
        formData.append('csrfmiddlewaretoken', $("#profile_page_csrf_token").val());
        formData.append('avatar', img.src);


        var url = "../api/update_avatar/";
        $.ajax({
            url: url,
            data: formData,
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false
        })
            .done(function (e) {
                window.location.reload();
            });
    });
});