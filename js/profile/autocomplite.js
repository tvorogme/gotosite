/**
 * Created by tvorogme on 6/10/17.
 */

$(function () {
    function split(val) {
        return val.split(/,\s*/);
    }

    function extractLast(term) {
        return split(term).pop();
    }

    $("#skill")
        .on("keydown", function (event) {
            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
        })
        .autocomplete({
            source: function (request, response) {
                console.log("go", $("#portSelect").val());
                $.getJSON("/get_all", {
                    term: extractLast(request.term)
                }, response);
            }
        });
});