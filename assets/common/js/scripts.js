/**
 * Created by FMF-LAP on 6/5/2017.
 */


$(function () {


    var countries = [
        {
            city: "Colombo",
            country: "Sri Lanka",
            code: "CMB",
            class: "sl"
        },
        {
            city: "Sydney",
            country: "Australia",
            code: "SYD",
            class: "aus"
        },
        {
            city: "New Delhi",
            country: "India",
            code: "IND",
            class: "ind"
        },
        {
            city: "London",
            country: "England",
            code: "LDN",
            class: "ldn"
        }
    ];


    var recentSearches = [];
    if (!(typeof $.cookie('recentSearchArray') === 'undefined')) {
        recentSearches = $.cookie("recentSearchArray").split(',');
    }
    console.log(" Array " + recentSearches + " -- " + recentSearches);

    function custom_source(request, response) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
        response($.grep(countries, function (value) {
            return matcher.test(value.city)
                || matcher.test(value.country)
                || matcher.test(value.code);
        }));
    }

    $('#from').autocomplete({
        minLength: 0,
        source: custom_source,
        autoFocus: true,
        open: function () {
            $('ul.ui-autocomplete').addClass("fmf-countires");
            $('ul.ui-autocomplete').prepend('<li><div class="list-header">HEADER</div></li>');
            var buttonlist = "";


            if (!(typeof $.cookie('recentSearchArray') === 'undefined')) {
                $('ul.ui-autocomplete').prepend('<li id="recent-search"><div class="list-header">Recent Searches</div><div class="button-list"></div></li>');
                $('#recent-search').append('<input type="button" id="clear" value="Clear">');
            }


            $('.button-list').empty();
            recentSearches.reverse();
            for (var i = 0; i < recentSearches.length; i++) {
                $('.button-list').append('<input class="clear" id="clear-cookie" value="' + recentSearches[i] + '" type="button"></div>');
            }
            // recentSearches.reverse();

            console.log("{");
            for (var i = 0; i < recentSearches.length; i++) {

                console.log(recentSearches[i]);
            }

            console.log("}");
        },

        select: function (event, ui) {
            $('#from').val(ui.item.city + " (" + ui.item.code + ")");
            $.cookie("departure", ui.item.city + " (" + ui.item.code + ")");


            recentSearches.push($.cookie("departure"));
            if (recentSearches.length > 3) {
                recentSearches.shift();
            }


            $.cookie("recentSearchArray", recentSearches, {expires: 7});
            return false;

        }


    }).bind('focus', function () {
        $(this).autocomplete("search", "")
    });

    $('#from').data("ui-autocomplete")._renderItem = function (ul, item) {

        var $li = $('<li>'),
            $img = $('<img>');


        $img.attr({
            //   src: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + item.icon,
            alt: item.label
        });

        $li.attr('data-value', item.label);
        $li.append('<a class="country-item">');
        $li.find('a').append(item.city).append(item.country).append(item.code).append('<div class="country-flag ' + item.class + '">');


        return $li.appendTo(ul);
    };

    $(".ui-autocomplete").on("click", "#clear", function () {
        recentSearches = [];
        $.removeCookie("recentSearchArray");
        $("#recent-search").remove();
    });


    $("#btn-submit").click()
    {

    }
});