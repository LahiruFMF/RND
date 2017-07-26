/**
 * Created by lahiru.c on 6/13/2017.
 */

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
            country: "England, UK",
            code: "LON",
            class: "lon"
        },
        {
            city: "Heathrow",
            country: "England, UK",
            code: "LHR",
            class: "lon"
        },
        {
            city: "Stansted",
            country: "England, UK",
            code: "STN",
            class: "lon"
        },
        {
            city: "Luton",
            country: "England, UK",
            code: "LON",
            class: "lon"
        }
    ];

    $component = '#from';
    var fromSearches = [];
    if (!(typeof $.cookie('recentUserSearchesArray') === 'undefined')) {
        fromSearches = $.cookie("recentUserSearchesArray").split(',');
        console.log("fromSearches :::::::: "+fromSearches);
        for(var i=0;i<fromSearches.length;i++){
            makeSearch=  fromSearches[i];

                console.log("make search : "+ Object.values(makeSearch));

            for(key in makeSearch) {
               console.log(makeSearch[key]);
            }

        }
    }

    function custom_source(request, response) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
        response($.grep(countries, function (value) {
            return matcher.test(value.city)
                || matcher.test(value.country)
                || matcher.test(value.code);
        }));
    }

    $($component).autocomplete({
        minLength: 0,
        source: custom_source,
        autoFocus: true,
        open: function () {
            $('ul.ui-autocomplete').addClass("fmf-widget-countries");
            $('ul.ui-autocomplete').prepend('<li><div class="fmf-widget-list-header">HEADER</div></li>');
            var buttonlist = "";


            if (!(typeof $.cookie('recentSearchArray') === 'undefined')) {
                $('ul.ui-autocomplete').prepend('<li id="fmf-widget-recent-search"><div class="fmf-widget-list-header">Recent Searches</div><div class="fmf-widget-button-list"></div></li>');
                $('#fmf-widget-recent-search').append('<input type="button" id="fmf-widget-clear" value="Clear" onclick="fmf-widget-clear">');
            }


            $('.fmf-widget-button-list').empty();
            for (var i = (fromSearches.length - 1); i >= 0; i--) {
                $('.fmf-widget-button-list').append('<input class="fmf-widget-country" id="fmf-widget-recent-country" value="' + fromSearches[i] + '" type="button"></div>');
            }

        },

        select: function (event, ui) {
            $($component).val(ui.item.city + " (" + ui.item.code + ")");
            $.cookie("departure", ui.item.city + " (" + ui.item.code + ")");


            fromSearches.push($.cookie("departure"));
            if (fromSearches.length > 3) {
                fromSearches.shift();
            }

            $.cookie("recentSearchArray", fromSearches, {expires: 7});
            return false;
        }


    }).bind('focus', function () {
        $(this).autocomplete("search", "")
    });

    $($component).data("ui-autocomplete")._renderItem = function (ul, item) {

        var $li = $('<li>'),
            $img = $('<img>');


        $img.attr({
            //   src: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + item.icon,
            alt: item.label
        });

        $li.attr('data-value', item.label);
        $li.append('<a class="fmf-widget-country-item">');
        $li.find('a').append(item.city).append(item.country).append(item.code).append('<div class="fmf-widget country-flag ' + item.class + '">');


        return $li.appendTo(ul);
    };

    $(".ui-autocomplete").on("click", "#fmf-widget-clear", function () {
        fromSearches = [];
        $.removeCookie("recentUserSearchesArray");
        $("#fmf-widget-recent-search").remove();
    });


    $("#btn-submit").click()
    {

    }


    /****************/
    /* To Search    */
    /****************/

    $componentTo = '#to';
    var toSearches = [];
    if (!(typeof $.cookie('recentSearchArray') === 'undefined')) {
        toSearches = $.cookie("recentSearchArray").split(',');
    }

    function custom_source(request, response) {
        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
        response($.grep(countries, function (value) {
            return matcher.test(value.city)
                || matcher.test(value.country)
                || matcher.test(value.code);
        }));
    }

    $($componentTo).autocomplete({
        minLength: 0,
        source: custom_source,
        autoFocus: true,
        open: function () {

        },

        select: function (event, ui) {
            $($componentTo).val(ui.item.city + " (" + ui.item.code + ")");
            $.cookie("departure", ui.item.city + " (" + ui.item.code + ")");


            toSearches.push($.cookie("departure"));
            if (toSearches.length > 3) {
                toSearches.shift();
            }

            $.cookie("recentSearchArray", toSearches, {expires: 7});
            return false;
        }


    }).bind('focus', function () {
        $(this).autocomplete("search", "")
    });

    $($componentTo).data("ui-autocomplete")._renderItem = function (ul, item) {

        var $li = $('<li>'),
            $img = $('<img>');


        $img.attr({
            //   src: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/1x1/' + item.icon,
            alt: item.label
        });

        $li.attr('data-value', item.label);
        $li.append('<a class="fmf-widget-country-item">');
        $li.find('a').append(item.city).append(item.country).append(item.code).append('<div class="fmf-widget-country-flag ' + item.class + '">');


        return $li.appendTo(ul);
    };


    var recentUserSearches = [];

    $("#search-flight").click(function () {
       // alert("clicked :"+$("#from").val()+" : "+$("#to").val()+" : "+$("#departure").val()+" : "+$("#return").val());
        console.log("Submit clicked");
        var makeSearchObject = {from:$("#from").val(), to:$("#to").val(), depart:$("#departure").val(), ret:$("#return").val()};
       console.log("DDDDD "+makeSearchObject);
        recentUserSearches.push(makeSearchObject);
        if (recentUserSearches.length > 3) {
            recentUserSearches.shift();
        }

        $.cookie("recentUserSearchesArray", recentUserSearches, {expires: 7});
        console.log(recentUserSearches);


    });


});


/*************/
/* departure */
/*************/

$(function(){

    var countries = [{
        "country": "Sri Lanka",
        "city": "Colombo",
        "code": "CMB",
        "class": "sri",
        "airport": "Bandaranaike International Colombo Airport",
        "label": "Colombo, Sri Lanka (CMB)",
        "isrecent":"111"
    }, {
        "country": "Singapore",
        "city": "Singapore",
        "code": "SIN",
        "class": "sin",
        "airport": "Singapore Changi International Airport",
        "label": "Singapore, Singapore (SIN)",
        "isrecent":"111"
    }, {
        "country": "India",
        "city": "Chennai",
        "code": "MAA",
        "class": "ind",
        "airport": "Chennai International Airport",
        "label": "Chennai, India (MAA)",
        "isrecent":"111"
    }, {

        "country": "Afghanistan",
        "city": "Mazar-I-Sharif",
        "code": "MZR",
        "class": "afg",
        "airport": "Mazar I Sharif Airport",
        "label": "Mazar-I-Sharif, Afghanistan (MZR)"
    }, {
        "country": "Afghanistan",
        "city": "Kabul",
        "code": "KBL",
        "class": "afg",
        "airport": "Kabul International Airport",
        "label": "Kabul, Afghanistan (KBL)"
    }, {
        "country": "Afghanistan",
        "city": "Herat",
        "code": "HEA",
        "class": "afg",
        "airport": "Herat Airport",
        "label": "Herat, Afghanistan (HEA)"
    }, {
        "country": "Algeria",
        "city": "Algiers",
        "code": "ALG",
        "class": "alg",
        "airport": "Houari Boumediene Airport",
        "label": "Algiers, Algeria (ALG)"
    }, {
        "country": "American Samoa",
        "city": "Pago Pago",
        "code": "PPG",
        "class": "ame",
        "airport": "Pago Pago International Airport",
        "label": "Pago Pago, American Samoa (PPG)"
    }, {
        "country": "Angola",
        "city": "Lubango",
        "code": "SDD",
        "class": "ang",
        "airport": "Lubango Airport",
        "label": "Lubango, Angola (SDD)"
    }, {
        "country": "Angola",
        "city": "Luanda",
        "code": "LAD",
        "class": "ang",
        "airport": "Quatro De Fevereiro Airport",
        "label": "Luanda, Angola (LAD)"
    }, {
        "country": "Antigua",
        "city": "Antigua",
        "code": "ANU",
        "class": "ant",
        "airport": "V.C. Bird International Airport",
        "label": "Antigua, Antigua (ANU)"
    }, {
        "country": "Argentina",
        "city": "Cordoba",
        "code": "COR",
        "class": "arg",
        "airport": "Ingeniero Ambrosio Taravella Airport",
        "label": "Cordoba, Argentina (COR)"
    }, {
        "country": "Argentina",
        "city": "Corrientes",
        "code": "CNQ",
        "class": "arg",
        "airport": "Corrientes Airport",
        "label": "Corrientes, Argentina (CNQ)"
    }, {
        "country": "Argentina",
        "city": "Esquel",
        "code": "EQS",
        "class": "arg",
        "airport": "Brigadier Antonio Parodi Airport",
        "label": "Esquel, Argentina (EQS)"
    }, {
        "country": "Argentina",
        "city": "Neuquen",
        "code": "NQN",
        "class": "arg",
        "airport": "Presidente Peron Airport",
        "label": "Neuquen, Argentina (NQN)"
    }, {
        "country": "Argentina",
        "city": "Puerto Madryn",
        "code": "PMY",
        "class": "arg",
        "airport": "El Tehuelche Airport",
        "label": "Puerto Madryn, Argentina (PMY)"
    }, {
        "country": "Argentina",
        "city": "Formosa",
        "code": "FMA",
        "class": "arg",
        "airport": "Formosa Airport",
        "label": "Formosa, Argentina (FMA)"
    }, {
        "country": "Argentina",
        "city": "Posadas",
        "code": "PSS",
        "class": "arg",
        "airport": "Libertador Gral D Jose De San Martin Airport",
        "label": "Posadas, Argentina (PSS)"
    }, {
        "country": "Argentina",
        "city": "Viedma",
        "code": "VDM",
        "class": "arg",
        "airport": "Gobernador Castello Airport",
        "label": "Viedma, Argentina (VDM)"
    }, {
        "country": "Argentina",
        "city": "Tucuman",
        "code": "TUC",
        "class": "arg",
        "airport": "Teniente Benjamin Matienzo Airport",
        "label": "Tucuman, Argentina (TUC)"
    }, {
        "country": "Argentina",
        "city": "Buenos Aires",
        "code": "EZE",
        "class": "arg",
        "airport": "Ministro Pistarini International Airport",
        "label": "Buenos Aires, Argentina (EZE)"
    }, {
        "country": "Argentina",
        "city": "Buenos Aires",
        "code": "EZE",
        "class": "arg",
        "airport": "Ministro Pistarini International Airport",
        "label": "Buenos Aires, Argentina (EZE)"
    }, {
        "country": "Argentina",
        "city": "Ushuaia",
        "code": "USH",
        "class": "arg",
        "airport": "Malvinas Argentinas Airport",
        "label": "Ushuaia, Argentina (USH)"
    }, {
        "country": "Argentina",
        "city": "Catamarca",
        "code": "CTC",
        "class": "arg",
        "airport": "Catamarca Airport",
        "label": "Catamarca, Argentina (CTC)"
    }, {
        "country": "Argentina",
        "city": "Bahia Blanca",
        "code": "BHI",
        "class": "arg",
        "airport": "Comandante Espora Airport",
        "label": "Bahia Blanca, Argentina (BHI)"
    }, {
        "country": "Argentina",
        "city": "San Martin DeLos Andes",
        "code": "CPC",
        "class": "arg",
        "airport": "Aviador C. Campos Airport",
        "label": "San Martin DeLos Andes, Argentina (CPC)"
    }, {
        "country": "Argentina",
        "city": "San Luis",
        "code": "LUQ",
        "class": "arg",
        "airport": "Brigadier Mayor D Cesar Raul Ojeda Airport",
        "label": "San Luis, Argentina (LUQ)"
    }, {
        "country": "Argentina",
        "city": "San Juan",
        "code": "UAQ",
        "class": "arg",
        "airport": "Domingo Faustino Sarmiento Airport",
        "label": "San Juan, Argentina (UAQ)"
    }, {
        "country": "Argentina",
        "city": "San Rafael",
        "code": "AFA",
        "class": "arg",
        "airport": "Suboficial Ay Santiago Germano Airport",
        "label": "San Rafael, Argentina (AFA)"
    }, {
        "country": "Argentina",
        "city": "Santa Fe",
        "code": "SFN",
        "class": "arg",
        "airport": "Sauce Viejo Airport",
        "label": "Santa Fe, Argentina (SFN)"
    }, {
        "country": "Argentina",
        "city": "Santiago del Estero",
        "code": "SDE",
        "class": "arg",
        "airport": null,
        "label": "Santiago del Estero, Argentina (SDE)"
    }, {
        "country": "Argentina",
        "city": "Santa Rosa",
        "code": "RSA",
        "class": "arg",
        "airport": "Santa Rosa Airport",
        "label": "Santa Rosa, Argentina (RSA)"
    }, {
        "country": "Argentina",
        "city": "San Carlos DeBariloche",
        "code": "BRC",
        "class": "arg",
        "airport": "San Carlos De Bariloche Airport",
        "label": "San Carlos DeBariloche, Argentina (BRC)"
    }, {
        "country": "Argentina",
        "city": "Salta",
        "code": "SLA",
        "class": "arg",
        "airport": "Martin Miguel De Guemes International Airport",
        "label": "Salta, Argentina (SLA)"
    }, {
        "country": "Argentina",
        "city": "Resistencia",
        "code": "RES",
        "class": "arg",
        "airport": "Resistencia International Airport",
        "label": "Resistencia, Argentina (RES)"
    }, {
        "country": "Argentina",
        "city": "La Rioja",
        "code": "IRJ",
        "class": "arg",
        "airport": "Capitan V A Almonacid Airport",
        "label": "La Rioja, Argentina (IRJ)"
    }, {
        "country": "Argentina",
        "city": "Jujuy",
        "code": "JUJ",
        "class": "arg",
        "airport": "Gobernador Horacio Guzman International Airport",
        "label": "Jujuy, Argentina (JUJ)"
    }, {
        "country": "Argentina",
        "city": "Rio Gallegos",
        "code": "RGL",
        "class": "arg",
        "airport": null,
        "label": "Rio Gallegos, Argentina (RGL)"
    }, {
        "country": "Argentina",
        "city": "Rio Grande",
        "code": "RGA",
        "class": "arg",
        "airport": "Hermes Quijada International Airport",
        "label": "Rio Grande, Argentina (RGA)"
    }, {
        "country": "Argentina",
        "city": "Iguazu",
        "code": "IGR",
        "class": "arg",
        "airport": null,
        "label": "Iguazu, Argentina (IGR)"
    }, {
        "country": "Argentina",
        "city": "Rosario",
        "code": "ROS",
        "class": "arg",
        "airport": "Islas Malvinas Airport",
        "label": "Rosario, Argentina (ROS)"
    }, {
        "country": "Argentina",
        "city": "Trelew",
        "code": "REL",
        "class": "arg",
        "airport": "Almirante Marco Andres Zar Airport",
        "label": "Trelew, Argentina (REL)"
    }, {
        "country": "Argentina",
        "city": "Buenos Aires",
        "code": "AEP",
        "class": "arg",
        "airport": "Jorge Newbery Airpark",
        "label": "Buenos Aires, Argentina (AEP)"
    }, {
        "country": "Argentina",
        "city": "Comodoro Rivadavia",
        "code": "CRD",
        "class": "arg",
        "airport": "General E. Mosconi Airport",
        "label": "Comodoro Rivadavia, Argentina (CRD)"
    }, {
        "country": "Argentina",
        "city": "Mendoza",
        "code": "MDZ",
        "class": "arg",
        "airport": "El Plumerillo Airport",
        "label": "Mendoza, Argentina (MDZ)"
    }, {
        "country": "Argentina",
        "city": "Mar del Plata",
        "code": "MDQ",
        "class": "arg",
        "airport": null,
        "label": "Mar del Plata, Argentina (MDQ)"
    }, {
        "country": "Argentina",
        "city": "El Calafate",
        "code": "FTE",
        "class": "arg",
        "airport": "El Calafate Airport",
        "label": "El Calafate, Argentina (FTE)"
    }, {
        "country": "Armenia",
        "city": "Yerevan",
        "code": "EVN",
        "class": "arm",
        "airport": "Zvartnots International Airport",
        "label": "Yerevan, Armenia (EVN)"
    }, {
        "country": "Armenia",
        "city": "Gyumri",
        "code": "LWN",
        "class": "arm",
        "airport": "Gyumri Shirak Airport",
        "label": "Gyumri, Armenia (LWN)"
    }, {
        "country": "Australia",
        "city": "Burketown",
        "code": "BUC",
        "class": "aus",
        "airport": "Burketown Airport",
        "label": "Burketown, Australia (BUC)"
    }, {
        "country": "Australia",
        "city": "Merimbula",
        "code": "MIM",
        "class": "aus",
        "airport": "Merimbula Airport",
        "label": "Merimbula, Australia (MIM)"
    }, {
        "country": "Australia",
        "city": "Mildura",
        "code": "MQL",
        "class": "aus",
        "airport": "Mildura Airport",
        "label": "Mildura, Australia (MQL)"
    }, {
        "country": "Australia",
        "city": "Richmond",
        "code": "RCM",
        "class": "aus",
        "airport": "Richmond Airport",
        "label": "Richmond, Australia (RCM)"
    }, {
        "country": "Australia",
        "city": "Rockhampton",
        "code": "ROK",
        "class": "aus",
        "airport": "Rockhampton Airport",
        "label": "Rockhampton, Australia (ROK)"
    }, {
        "country": "Australia",
        "city": "Bamaga",
        "code": "ABM",
        "class": "aus",
        "airport": "Bamaga Injinoo Airport",
        "label": "Bamaga, Australia (ABM)"
    }, {
        "country": "Australia",
        "city": "Ballina",
        "code": "BNK",
        "class": "aus",
        "airport": "Ballina Byron Gateway Airport",
        "label": "Ballina, Australia (BNK)"
    }, {
        "country": "Australia",
        "city": "Meekatharra",
        "code": "MKR",
        "class": "aus",
        "airport": "Meekatharra Airport",
        "label": "Meekatharra, Australia (MKR)"
    }, {
        "country": "Australia",
        "city": "Mackay",
        "code": "MKY",
        "class": "aus",
        "airport": "Mackay Airport",
        "label": "Mackay, Australia (MKY)"
    }, {
        "country": "Australia",
        "city": "Inverell",
        "code": "IVR",
        "class": "aus",
        "airport": "Inverell Airport",
        "label": "Inverell, Australia (IVR)"
    }, {
        "country": "Australia",
        "city": "Badu Island",
        "code": "BDD",
        "class": "aus",
        "airport": "Badu Island Airport",
        "label": "Badu Island, Australia (BDD)"
    }, {
        "country": "Australia",
        "city": "Aurukun Mission",
        "code": "AUU",
        "class": "aus",
        "airport": "Aurukun Airport",
        "label": "Aurukun Mission, Australia (AUU)"
    }, {
        "country": "Australia",
        "city": "Lockhart River",
        "code": "IRG",
        "class": "aus",
        "airport": "Lockhart River Airport",
        "label": "Lockhart River, Australia (IRG)"
    }, {
        "country": "Australia",
        "city": "Alice Springs",
        "code": "ASP",
        "class": "aus",
        "airport": "Alice Springs Airport",
        "label": "Alice Springs, Australia (ASP)"
    }, {
        "country": "Australia",
        "city": "Julia Creek",
        "code": "JCK",
        "class": "aus",
        "airport": "Julia Creek Airport",
        "label": "Julia Creek, Australia (JCK)"
    }, {
        "country": "Australia",
        "city": "Avalon",
        "code": "AVV",
        "class": "aus",
        "airport": "Avalon Airport",
        "label": "Avalon, Australia (AVV)"
    }, {
        "country": "Australia",
        "city": "Adelaide",
        "code": "ADL",
        "class": "aus",
        "airport": "Adelaide International Airport",
        "label": "Adelaide, Australia (ADL)"
    }, {
        "country": "Australia",
        "city": "Milingimbi",
        "code": "MGT",
        "class": "aus",
        "airport": "Milingimbi Airport",
        "label": "Milingimbi, Australia (MGT)"
    }, {
        "country": "Australia",
        "city": "Ayers Rock",
        "code": "AYQ",
        "class": "aus",
        "airport": "Ayers Rock Connellan Airport",
        "label": "Ayers Rock, Australia (AYQ)"
    }, {
        "country": "Australia",
        "city": "Quilpie",
        "code": "ULP",
        "class": "aus",
        "airport": "Quilpie Airport",
        "label": "Quilpie, Australia (ULP)"
    }, {
        "country": "Australia",
        "city": "Longreach",
        "code": "LRE",
        "class": "aus",
        "airport": "Longreach Airport",
        "label": "Longreach, Australia (LRE)"
    }, {
        "country": "Australia",
        "city": "Burnie",
        "code": "BWT",
        "class": "aus",
        "airport": "Wynyard Airport",
        "label": "Burnie, Australia (BWT)"
    }, {
        "country": "Australia",
        "city": "Hobart",
        "code": "HBA",
        "class": "aus",
        "airport": "Hobart International Airport",
        "label": "Hobart, Australia (HBA)"
    }, {
        "country": "Australia",
        "city": "Barcaldine",
        "code": "BCI",
        "class": "aus",
        "airport": "Barcaldine Airport",
        "label": "Barcaldine, Australia (BCI)"
    }, {
        "country": "Australia",
        "city": "Albany",
        "code": "ALH",
        "class": "aus",
        "airport": "Albany Airport",
        "label": "Albany, Australia (ALH)"
    }, {
        "country": "Australia",
        "city": "Albury",
        "code": "ABX",
        "class": "aus",
        "airport": "Albury Airport",
        "label": "Albury, Australia (ABX)"
    }, {
        "country": "Australia",
        "city": "Mabuiag Island",
        "code": "UBB",
        "class": "aus",
        "airport": "Mabuiag Island Airport",
        "label": "Mabuiag Island, Australia (UBB)"
    }, {
        "country": "Australia",
        "city": "Maningrida",
        "code": "MNG",
        "class": "aus",
        "airport": "Maningrida Airport",
        "label": "Maningrida, Australia (MNG)"
    }, {
        "country": "Australia",
        "city": "Bathurst",
        "code": "BHS",
        "class": "aus",
        "airport": "Bathurst Airport",
        "label": "Bathurst, Australia (BHS)"
    }, {
        "country": "Australia",
        "city": "Hayman Island",
        "code": "HIS",
        "class": "aus",
        "airport": "Hayman Island Resort Seaplane Base",
        "label": "Hayman Island, Australia (HIS)"
    }, {
        "country": "Australia",
        "city": "Coober Pedy",
        "code": "CPD",
        "class": "aus",
        "airport": "Coober Pedy Airport",
        "label": "Coober Pedy, Australia (CPD)"
    }, {
        "country": "Australia",
        "city": "Hervey Bay",
        "code": "HVB",
        "class": "aus",
        "airport": "Hervey Bay Airport",
        "label": "Hervey Bay, Australia (HVB)"
    }, {
        "country": "Australia",
        "city": "Ceduna",
        "code": "CED",
        "class": "aus",
        "airport": "Ceduna Airport",
        "label": "Ceduna, Australia (CED)"
    }, {
        "country": "Australia",
        "city": "Lord Howe Island",
        "code": "LDH",
        "class": "aus",
        "airport": "Lord Howe Island Airport",
        "label": "Lord Howe Island, Australia (LDH)"
    }, {
        "country": "Australia",
        "city": "Perth",
        "code": "PER",
        "class": "aus",
        "airport": "Perth International Airport",
        "label": "Perth, Australia (PER)"
    }, {
        "country": "Australia",
        "city": "Kalbarri",
        "code": "KAX",
        "class": "aus",
        "airport": "Kalbarri Airport",
        "label": "Kalbarri, Australia (KAX)"
    }, {
        "country": "Australia",
        "city": "Carnarvon",
        "code": "CVQ",
        "class": "aus",
        "airport": "Carnarvon Airport",
        "label": "Carnarvon, Australia (CVQ)"
    }, {
        "country": "Australia",
        "city": "Hamilton Island",
        "code": "HTI",
        "class": "aus",
        "airport": "Hamilton Island Airport",
        "label": "Hamilton Island, Australia (HTI)"
    }, {
        "country": "Australia",
        "city": "Hughenden",
        "code": "HGD",
        "class": "aus",
        "airport": "Hughenden Airport",
        "label": "Hughenden, Australia (HGD)"
    }, {
        "country": "Australia",
        "city": "Bedourie",
        "code": "BEU",
        "class": "aus",
        "airport": "Bedourie Airport",
        "label": "Bedourie, Australia (BEU)"
    }, {
        "country": "Australia",
        "city": "Horn Island",
        "code": "HID",
        "class": "aus",
        "airport": "Horn Island Airport",
        "label": "Horn Island, Australia (HID)"
    }, {
        "country": "Australia",
        "city": "Mcarthur River",
        "code": "MCV",
        "class": "aus",
        "airport": "McArthur River Mine Airport",
        "label": "Mcarthur River, Australia (MCV)"
    }, {
        "country": "Australia",
        "city": "Brisbane",
        "code": "BNE",
        "class": "aus",
        "airport": "Brisbane International Airport",
        "label": "Brisbane, Australia (BNE)"
    }, {
        "country": "Australia",
        "city": "Saibai Island",
        "code": "SBR",
        "class": "aus",
        "airport": "Saibai Island Airport",
        "label": "Saibai Island, Australia (SBR)"
    }, {
        "country": "Australia",
        "city": "Coffs Harbour",
        "code": "CFS",
        "class": "aus",
        "airport": "Coffs Harbour Airport",
        "label": "Coffs Harbour, Australia (CFS)"
    }, {
        "country": "Australia",
        "city": "Kowanyama",
        "code": "KWM",
        "class": "aus",
        "airport": "Kowanyama Airport",
        "label": "Kowanyama, Australia (KWM)"
    }, {
        "country": "Australia",
        "city": "Leonora",
        "code": "LNO",
        "class": "aus",
        "airport": "Leonora Airport",
        "label": "Leonora, Australia (LNO)"
    }, {
        "country": "Australia",
        "city": "Orange",
        "code": "OAG",
        "class": "aus",
        "airport": "Orange Airport",
        "label": "Orange, Australia (OAG)"
    }, {
        "country": "Australia",
        "city": "Murray Island",
        "code": "MYI",
        "class": "aus",
        "airport": "Murray Island Airport",
        "label": "Murray Island, Australia (MYI)"
    }, {
        "country": "Australia",
        "city": "Kubin Island",
        "code": "KUG",
        "class": "aus",
        "airport": "Kubin Airport",
        "label": "Kubin Island, Australia (KUG)"
    }, {
        "country": "Australia",
        "city": "Palm Island",
        "code": "PMK",
        "class": "aus",
        "airport": "Palm Island Airport",
        "label": "Palm Island, Australia (PMK)"
    }, {
        "country": "Australia",
        "city": "Kingscote",
        "code": "KGC",
        "class": "aus",
        "airport": "Kingscote Airport",
        "label": "Kingscote, Australia (KGC)"
    }, {
        "country": "Australia",
        "city": "Mount Magnet",
        "code": "MMG",
        "class": "aus",
        "airport": "Mount Magnet Airport",
        "label": "Mount Magnet, Australia (MMG)"
    }, {
        "country": "Australia",
        "city": "Canberra",
        "code": "CBR",
        "class": "aus",
        "airport": "Canberra International Airport",
        "label": "Canberra, Australia (CBR)"
    }, {
        "country": "Australia",
        "city": "Paraburdoo",
        "code": "PBO",
        "class": "aus",
        "airport": "Paraburdoo Airport",
        "label": "Paraburdoo, Australia (PBO)"
    }, {
        "country": "Australia",
        "city": "Coconut Island",
        "code": "CNC",
        "class": "aus",
        "airport": "Coconut Island Airport",
        "label": "Coconut Island, Australia (CNC)"
    }, {
        "country": "Australia",
        "city": "Olympic Dam",
        "code": "OLP",
        "class": "aus",
        "airport": "Olympic Dam Airport",
        "label": "Olympic Dam, Australia (OLP)"
    }, {
        "country": "Australia",
        "city": "Leinster",
        "code": "LER",
        "class": "aus",
        "airport": "Leinster Airport",
        "label": "Leinster, Australia (LER)"
    }, {
        "country": "Australia",
        "city": "Launceston",
        "code": "LST",
        "class": "aus",
        "airport": "Launceston Airport",
        "label": "Launceston, Australia (LST)"
    }, {
        "country": "Australia",
        "city": "Narrandera",
        "code": "NRA",
        "class": "aus",
        "airport": "Narrandera Airport",
        "label": "Narrandera, Australia (NRA)"
    }, {
        "country": "Australia",
        "city": "Narrabri",
        "code": "NAA",
        "class": "aus",
        "airport": "Narrabri Airport",
        "label": "Narrabri, Australia (NAA)"
    }, {
        "country": "Australia",
        "city": "Cairns",
        "code": "CNS",
        "class": "aus",
        "airport": "Cairns International Airport",
        "label": "Cairns, Australia (CNS)"
    }, {
        "country": "Australia",
        "city": "Laverton",
        "code": "LVO",
        "class": "aus",
        "airport": "Laverton Airport",
        "label": "Laverton, Australia (LVO)"
    }, {
        "country": "Australia",
        "city": "Newman",
        "code": "ZNE",
        "class": "aus",
        "airport": "Newman Airport",
        "label": "Newman, Australia (ZNE)"
    }, {
        "country": "Australia",
        "city": "Oakey",
        "code": "OKY",
        "class": "aus",
        "airport": "Oakey Airport",
        "label": "Oakey, Australia (OKY)"
    }, {
        "country": "Australia",
        "city": "Kununurra",
        "code": "KNX",
        "class": "aus",
        "airport": "Kununurra Airport",
        "label": "Kununurra, Australia (KNX)"
    }, {
        "country": "Australia",
        "city": "Learmonth",
        "code": "LEA",
        "class": "aus",
        "airport": "Learmonth Airport",
        "label": "Learmonth, Australia (LEA)"
    }, {
        "country": "Australia",
        "city": "Normanton",
        "code": "NTN",
        "class": "aus",
        "airport": "Normanton Airport",
        "label": "Normanton, Australia (NTN)"
    }, {
        "country": "Australia",
        "city": "Mount Isa",
        "code": "ISA",
        "class": "aus",
        "airport": "Mount Isa Airport",
        "label": "Mount Isa, Australia (ISA)"
    }, {
        "country": "Australia",
        "city": "Parkes",
        "code": "PKE",
        "class": "aus",
        "airport": "Parkes Airport",
        "label": "Parkes, Australia (PKE)"
    }, {
        "country": "Australia",
        "city": "Karumba",
        "code": "KRB",
        "class": "aus",
        "airport": "Karumba Airport",
        "label": "Karumba, Australia (KRB)"
    }, {
        "country": "Australia",
        "city": "Armidale",
        "code": "ARM",
        "class": "aus",
        "airport": "Armidale Airport",
        "label": "Armidale, Australia (ARM)"
    }, {
        "country": "Australia",
        "city": "Moranbah",
        "code": "MOV",
        "class": "aus",
        "airport": "Moranbah Airport",
        "label": "Moranbah, Australia (MOV)"
    }, {
        "country": "Australia",
        "city": "Moree",
        "code": "MRZ",
        "class": "aus",
        "airport": "Moree Airport",
        "label": "Moree, Australia (MRZ)"
    }, {
        "country": "Australia",
        "city": "Karratha",
        "code": "KTA",
        "class": "aus",
        "airport": "Karratha Airport",
        "label": "Karratha, Australia (KTA)"
    }, {
        "country": "Australia",
        "city": "Proserpine",
        "code": "PPP",
        "class": "aus",
        "airport": "Proserpine Whitsunday Coast Airport",
        "label": "Proserpine, Australia (PPP)"
    }, {
        "country": "Australia",
        "city": "Lismore",
        "code": "LSY",
        "class": "aus",
        "airport": "Lismore Airport",
        "label": "Lismore, Australia (LSY)"
    }, {
        "country": "Australia",
        "city": "Kalgoorlie",
        "code": "KGI",
        "class": "aus",
        "airport": "Kalgoorlie Boulder Airport",
        "label": "Kalgoorlie, Australia (KGI)"
    }, {
        "country": "Australia",
        "city": "Cloncurry",
        "code": "CNJ",
        "class": "aus",
        "airport": "Cloncurry Airport",
        "label": "Cloncurry, Australia (CNJ)"
    }, {
        "country": "Australia",
        "city": "Cloncurry",
        "code": "CNJ",
        "class": "aus",
        "airport": "Cloncurry Airport",
        "label": "Cloncurry, Australia (CNJ)"
    }, {
        "country": "Australia",
        "city": "Mornington",
        "code": "ONG",
        "class": "aus",
        "airport": "Mornington Island Airport",
        "label": "Mornington, Australia (ONG)"
    }, {
        "country": "Australia",
        "city": "Port Macquarie",
        "code": "PQQ",
        "class": "aus",
        "airport": "Port Macquarie Airport",
        "label": "Port Macquarie, Australia (PQQ)"
    }, {
        "country": "Australia",
        "city": "King Island",
        "code": "KNS",
        "class": "aus",
        "airport": "King Island Airport",
        "label": "King Island, Australia (KNS)"
    }, {
        "country": "Australia",
        "city": "Moruya",
        "code": "MYA",
        "class": "aus",
        "airport": "Moruya Airport",
        "label": "Moruya, Australia (MYA)"
    }, {
        "country": "Australia",
        "city": "Groote Eylandt",
        "code": "GTE",
        "class": "aus",
        "airport": "Groote Eylandt Airport",
        "label": "Groote Eylandt, Australia (GTE)"
    }, {
        "country": "Australia",
        "city": "Mount Gambier",
        "code": "MGB",
        "class": "aus",
        "airport": "Mount Gambier Airport",
        "label": "Mount Gambier, Australia (MGB)"
    }, {
        "country": "Australia",
        "city": "Newcastle",
        "code": "NTL",
        "class": "aus",
        "airport": "Newcastle Airport",
        "label": "Newcastle, Australia (NTL)"
    }, {
        "country": "Australia",
        "city": "Katherine",
        "code": "KTR",
        "class": "aus",
        "airport": "Tindal Airport",
        "label": "Katherine, Australia (KTR)"
    }, {
        "country": "Australia",
        "city": "Port Lincoln",
        "code": "PLO",
        "class": "aus",
        "airport": "Port Lincoln Airport",
        "label": "Port Lincoln, Australia (PLO)"
    }, {
        "country": "Australia",
        "city": "Coen",
        "code": "CUQ",
        "class": "aus",
        "airport": "Coen Airport",
        "label": "Coen, Australia (CUQ)"
    }, {
        "country": "Australia",
        "city": "Argyle",
        "code": "GYL",
        "class": "aus",
        "airport": "Argyle Airport",
        "label": "Argyle, Australia (GYL)"
    }, {
        "country": "Australia",
        "city": "Port Hedland",
        "code": "PHE",
        "class": "aus",
        "airport": "Port Hedland International Airport",
        "label": "Port Hedland, Australia (PHE)"
    }, {
        "country": "Australia",
        "city": "Cooktown",
        "code": "CTN",
        "class": "aus",
        "airport": "Cooktown Airport",
        "label": "Cooktown, Australia (CTN)"
    }, {
        "country": "Australia",
        "city": "Roma",
        "code": "RMA",
        "class": "aus",
        "airport": "Roma Airport",
        "label": "Roma, Australia (RMA)"
    }, {
        "country": "Australia",
        "city": "Blackall",
        "code": "BKQ",
        "class": "aus",
        "airport": "Blackall Airport",
        "label": "Blackall, Australia (BKQ)"
    }, {
        "country": "Australia",
        "city": "Birdsville",
        "code": "BVI",
        "class": "aus",
        "airport": "Birdsville Airport",
        "label": "Birdsville, Australia (BVI)"
    }, {
        "country": "Australia",
        "city": "Birdsville",
        "code": "BVI",
        "class": "aus",
        "airport": "Birdsville Airport",
        "label": "Birdsville, Australia (BVI)"
    }, {
        "country": "Australia",
        "city": "Melbourne",
        "code": "MEL",
        "class": "aus",
        "airport": "Melbourne International Airport",
        "label": "Melbourne, Australia (MEL)"
    }, {
        "country": "Australia",
        "city": "Wagga Wagga",
        "code": "WGA",
        "class": "aus",
        "airport": "Wagga Wagga City Airport",
        "label": "Wagga Wagga, Australia (WGA)"
    }, {
        "country": "Australia",
        "city": "Blackwater",
        "code": "BLT",
        "class": "aus",
        "airport": "Blackwater Airport",
        "label": "Blackwater, Australia (BLT)"
    }, {
        "country": "Australia",
        "city": "Whyalla",
        "code": "WYA",
        "class": "aus",
        "airport": "Whyalla Airport",
        "label": "Whyalla, Australia (WYA)"
    }, {
        "country": "Australia",
        "city": "Esperance",
        "code": "EPR",
        "class": "aus",
        "airport": "Esperance Airport",
        "label": "Esperance, Australia (EPR)"
    }, {
        "country": "Australia",
        "city": "Weipa",
        "code": "WEI",
        "class": "aus",
        "airport": "Weipa Airport",
        "label": "Weipa, Australia (WEI)"
    }, {
        "country": "Australia",
        "city": "Townsville",
        "code": "TSV",
        "class": "aus",
        "airport": "Townsville Airport",
        "label": "Townsville, Australia (TSV)"
    }, {
        "country": "Australia",
        "city": "Toowoomba",
        "code": "TWB",
        "class": "aus",
        "airport": "Toowoomba Airport",
        "label": "Toowoomba, Australia (TWB)"
    }, {
        "country": "Australia",
        "city": "Taree",
        "code": "TRO",
        "class": "aus",
        "airport": "Taree Airport",
        "label": "Taree, Australia (TRO)"
    }, {
        "country": "Australia",
        "city": "Gove",
        "code": "GOV",
        "class": "aus",
        "airport": "Gove Airport",
        "label": "Gove, Australia (GOV)"
    }, {
        "country": "Australia",
        "city": "Tarcoola",
        "code": "TAQ",
        "class": "aus",
        "airport": "Tarcoola Airport",
        "label": "Tarcoola, Australia (TAQ)"
    }, {
        "country": "Australia",
        "city": "Tamworth",
        "code": "TMW",
        "class": "aus",
        "airport": "Tamworth Airport",
        "label": "Tamworth, Australia (TMW)"
    }, {
        "country": "Australia",
        "city": "Gold Coast",
        "code": "OOL",
        "class": "aus",
        "airport": "Gold Coast Airport",
        "label": "Gold Coast, Australia (OOL)"
    }, {
        "country": "Australia",
        "city": "Thargomindah",
        "code": "XTG",
        "class": "aus",
        "airport": "Thargomindah Airport",
        "label": "Thargomindah, Australia (XTG)"
    }, {
        "country": "Australia",
        "city": "Geraldton",
        "code": "GET",
        "class": "aus",
        "airport": "Geraldton Airport",
        "label": "Geraldton, Australia (GET)"
    }, {
        "country": "Australia",
        "city": "Geraldton",
        "code": "GET",
        "class": "aus",
        "airport": "Geraldton Airport",
        "label": "Geraldton, Australia (GET)"
    }, {
        "country": "Australia",
        "city": "Gladstone",
        "code": "GLT",
        "class": "aus",
        "airport": "Gladstone Airport",
        "label": "Gladstone, Australia (GLT)"
    }, {
        "country": "Australia",
        "city": "Boigu Island",
        "code": "GIC",
        "class": "aus",
        "airport": "Boigu Airport",
        "label": "Boigu Island, Australia (GIC)"
    }, {
        "country": "Australia",
        "city": "Wiluna",
        "code": "WUN",
        "class": "aus",
        "airport": "Wiluna Airport",
        "label": "Wiluna, Australia (WUN)"
    }, {
        "country": "Australia",
        "city": "Broken Hill",
        "code": "BHQ",
        "class": "aus",
        "airport": "Broken Hill Airport",
        "label": "Broken Hill, Australia (BHQ)"
    }, {
        "country": "Australia",
        "city": "Devonport",
        "code": "DPO",
        "class": "aus",
        "airport": "Devonport Airport",
        "label": "Devonport, Australia (DPO)"
    }, {
        "country": "Australia",
        "city": "Doomadgee",
        "code": "DMD",
        "class": "aus",
        "airport": "Doomadgee Airport",
        "label": "Doomadgee, Australia (DMD)"
    }, {
        "country": "Australia",
        "city": "Yam Island",
        "code": "XMY",
        "class": "aus",
        "airport": "Yam Island Airport",
        "label": "Yam Island, Australia (XMY)"
    }, {
        "country": "Australia",
        "city": "Yorke Island",
        "code": "OKR",
        "class": "aus",
        "airport": "Yorke Island Airport",
        "label": "Yorke Island, Australia (OKR)"
    }, {
        "country": "Australia",
        "city": "Broome",
        "code": "BME",
        "class": "aus",
        "airport": "Broome International Airport",
        "label": "Broome, Australia (BME)"
    }, {
        "country": "Australia",
        "city": "Darnley Island",
        "code": "NLF",
        "class": "aus",
        "airport": "Darnley Island Airport",
        "label": "Darnley Island, Australia (NLF)"
    }, {
        "country": "Australia",
        "city": "Darwin",
        "code": "DRW",
        "class": "aus",
        "airport": "Darwin International Airport",
        "label": "Darwin, Australia (DRW)"
    }, {
        "country": "Australia",
        "city": "Charleville",
        "code": "CTL",
        "class": "aus",
        "airport": "Charleville Airport",
        "label": "Charleville, Australia (CTL)"
    }, {
        "country": "Australia",
        "city": "Dubbo",
        "code": "DBO",
        "class": "aus",
        "airport": "Dubbo City Regional Airport",
        "label": "Dubbo, Australia (DBO)"
    }, {
        "country": "Australia",
        "city": "Cunnamulla",
        "code": "CMA",
        "class": "aus",
        "airport": "Cunnamulla Airport",
        "label": "Cunnamulla, Australia (CMA)"
    }, {
        "country": "Australia",
        "city": "Wollongong",
        "code": "WOL",
        "class": "aus",
        "airport": "Wollongong Airport",
        "label": "Wollongong, Australia (WOL)"
    }, {
        "country": "Australia",
        "city": "Winton",
        "code": "WIN",
        "class": "aus",
        "airport": "Winton Airport",
        "label": "Winton, Australia (WIN)"
    }, {
        "country": "Australia",
        "city": "Windorah",
        "code": "WNR",
        "class": "aus",
        "airport": "Windorah Airport",
        "label": "Windorah, Australia (WNR)"
    }, {
        "country": "Australia",
        "city": "Emerald",
        "code": "EMD",
        "class": "aus",
        "airport": "Emerald Airport",
        "label": "Emerald, Australia (EMD)"
    }, {
        "country": "Australia",
        "city": "Elcho Island",
        "code": "ELC",
        "class": "aus",
        "airport": "Elcho Island Airport",
        "label": "Elcho Island, Australia (ELC)"
    }, {
        "country": "Australia",
        "city": "Boulia",
        "code": "BQL",
        "class": "aus",
        "airport": "Boulia Airport",
        "label": "Boulia, Australia (BQL)"
    }, {
        "country": "Australia",
        "city": "Edward River",
        "code": "EDR",
        "class": "aus",
        "airport": "Pormpuraaw Airport",
        "label": "Edward River, Australia (EDR)"
    }, {
        "country": "Australia",
        "city": "Bundaberg",
        "code": "BDB",
        "class": "aus",
        "airport": "Bundaberg Airport",
        "label": "Bundaberg, Australia (BDB)"
    }, {
        "country": "Australia",
        "city": "Grafton",
        "code": "GFN",
        "class": "aus",
        "airport": "Grafton Airport",
        "label": "Grafton, Australia (GFN)"
    }, {
        "country": "Australia",
        "city": "Sydney",
        "code": "SYD",
        "class": "aus",
        "airport": "Sydney Kingsford Smith International Airport",
        "label": "Sydney, Australia (SYD)"
    }, {
        "country": "Australia",
        "city": "Granites",
        "code": "GTS",
        "class": "aus",
        "airport": "Granite Downs Airport",
        "label": "Granites, Australia (GTS)"
    }, {
        "country": "Australia",
        "city": "Griffith",
        "code": "GFF",
        "class": "aus",
        "airport": "Griffith Airport",
        "label": "Griffith, Australia (GFF)"
    }, {
        "country": "Australia",
        "city": "Sue Island",
        "code": "SYU",
        "class": "aus",
        "airport": "Warraber Island Airport",
        "label": "Sue Island, Australia (SYU)"
    }, {
        "country": "Australia",
        "city": "Sunshine Coast",
        "code": "MCY",
        "class": "aus",
        "airport": "Sunshine Coast Airport",
        "label": "Sunshine Coast, Australia (MCY)"
    }, {
        "country": "Australia",
        "city": "St George",
        "code": "SGO",
        "class": "aus",
        "airport": "St George Airport",
        "label": "St George, Australia (SGO)"
    }, {
        "country": "Austria",
        "city": "Linz",
        "code": "LNZ",
        "class": "aus",
        "airport": "Linz Airport",
        "label": "Linz, Austria (LNZ)"
    }, {
        "country": "Austria",
        "city": "Graz",
        "code": "GRZ",
        "class": "aus",
        "airport": "Graz Airport",
        "label": "Graz, Austria (GRZ)"
    }, {
        "country": "Austria",
        "city": "Innsbruck",
        "code": "INN",
        "class": "aus",
        "airport": "Innsbruck Airport",
        "label": "Innsbruck, Austria (INN)"
    }, {
        "country": "Austria",
        "city": "Salzburg",
        "code": "SZG",
        "class": "aus",
        "airport": "Salzburg Airport",
        "label": "Salzburg, Austria (SZG)"
    }, {
        "country": "Austria",
        "city": "Vienna",
        "code": "VIE",
        "class": "aus",
        "airport": "Vienna International Airport",
        "label": "Vienna, Austria (VIE)"
    }, {
        "country": "Austria",
        "city": "Klagenfurt",
        "code": "KLU",
        "class": "aus",
        "airport": "Klagenfurt Airport",
        "label": "Klagenfurt, Austria (KLU)"
    }, {
        "country": "Azerbaijan",
        "city": "Baku",
        "code": "GYD",
        "class": "aze",
        "airport": "Heydar Aliyev International Airport",
        "label": "Baku, Azerbaijan (GYD)"
    }, {
        "country": "Azerbaijan",
        "city": "Nakhichevan",
        "code": "NAJ",
        "class": "aze",
        "airport": "Nakhchivan Airport",
        "label": "Nakhichevan, Azerbaijan (NAJ)"
    }, {
        "country": "Azerbaijan",
        "city": "Gyandzha",
        "code": "KVD",
        "class": "aze",
        "airport": "Ganja Airport",
        "label": "Gyandzha, Azerbaijan (KVD)"
    }, {
        "country": "Bahamas",
        "city": "Nassau",
        "code": "NAS",
        "class": "bah",
        "airport": "Lynden Pindling International Airport",
        "label": "Nassau, Bahamas (NAS)"
    }, {
        "country": "Bahrain",
        "city": "Bahrain",
        "code": "BAH",
        "class": "bah",
        "airport": "Bahrain International Airport",
        "label": "Bahrain, Bahrain (BAH)"
    }, {
        "country": "Bangladesh",
        "city": "Jessore",
        "code": "JSR",
        "class": "ban",
        "airport": "Jessore Airport",
        "label": "Jessore, Bangladesh (JSR)"
    }, {
        "country": "Bangladesh",
        "city": "Dhaka",
        "code": "DAC",
        "class": "ban",
        "airport": "Dhaka \/ Hazrat Shahjalal International Airport",
        "label": "Dhaka, Bangladesh (DAC)"
    }, {
        "country": "Bangladesh",
        "city": "Chittagong",
        "code": "CGP",
        "class": "ban",
        "airport": "Shah Amanat International Airport",
        "label": "Chittagong, Bangladesh (CGP)"
    }, {
        "country": "Bangladesh",
        "city": "Sylhet",
        "code": "ZYL",
        "class": "ban",
        "airport": "Osmany International Airport",
        "label": "Sylhet, Bangladesh (ZYL)"
    }, {
        "country": "Bangladesh",
        "city": "Cox's Bazar",
        "code": "CXB",
        "class": "ban",
        "airport": "Cox's Bazar Airport",
        "label": "Cox's Bazar, Bangladesh (CXB)"
    }, {
        "country": "Barbados",
        "city": "Bridgetown",
        "code": "BGI",
        "class": "bar",
        "airport": "Sir Grantley Adams International Airport",
        "label": "Bridgetown, Barbados (BGI)"
    }, {
        "country": "Belarus",
        "city": "Minsk",
        "code": "MHP",
        "class": "bel",
        "airport": "Minsk 1 Airport",
        "label": "Minsk, Belarus (MHP)"
    }, {
        "country": "Belarus",
        "city": "Gomel",
        "code": "GME",
        "class": "bel",
        "airport": "Gomel Airport",
        "label": "Gomel, Belarus (GME)"
    }, {
        "country": "Belarus",
        "city": "Minsk",
        "code": "MSQ",
        "class": "bel",
        "airport": "Minsk International Airport",
        "label": "Minsk, Belarus (MSQ)"
    }, {
        "country": "Belgium",
        "city": "Brussels",
        "code": "BRU",
        "class": "bel",
        "airport": "Brussels Airport",
        "label": "Brussels, Belgium (BRU)"
    }, {
        "country": "Belgium",
        "city": "Brussels",
        "code": "CRL",
        "class": "bel",
        "airport": "Brussels South Charleroi Airport",
        "label": "Brussels, Belgium (CRL)"
    }, {
        "country": "Belgium",
        "city": "Antwerp",
        "code": "ANR",
        "class": "bel",
        "airport": "Antwerp International Airport (Deurne)",
        "label": "Antwerp, Belgium (ANR)"
    }, {
        "country": "Benin",
        "city": "Cotonou",
        "code": "COO",
        "class": "ben",
        "airport": "Cadjehoun Airport",
        "label": "Cotonou, Benin (COO)"
    }, {
        "country": "Bhutan",
        "city": "Paro",
        "code": "PBH",
        "class": "bhu",
        "airport": "Paro Airport",
        "label": "Paro, Bhutan (PBH)"
    }, {
        "country": "Bolivia",
        "city": "Riberalta",
        "code": "RIB",
        "class": "bol",
        "airport": null,
        "label": "Riberalta, Bolivia (RIB)"
    }, {
        "country": "Bolivia",
        "city": "Guayaramerin",
        "code": "GYA",
        "class": "bol",
        "airport": null,
        "label": "Guayaramerin, Bolivia (GYA)"
    }, {
        "country": "Bolivia",
        "city": "Trinidad",
        "code": "TDD",
        "class": "bol",
        "airport": "Teniente Av. Jorge Henrich Arauz Airport",
        "label": "Trinidad, Bolivia (TDD)"
    }, {
        "country": "Bolivia",
        "city": "La Paz",
        "code": "LPB",
        "class": "bol",
        "airport": "El Alto International Airport",
        "label": "La Paz, Bolivia (LPB)"
    }, {
        "country": "Bolivia",
        "city": "Cochabamba",
        "code": "CBB",
        "class": "bol",
        "airport": "Jorge Wilsterman International Airport",
        "label": "Cochabamba, Bolivia (CBB)"
    }, {
        "country": "Bolivia",
        "city": "Sucre",
        "code": "SRE",
        "class": "bol",
        "airport": "Juana Azurduy De Padilla Airport",
        "label": "Sucre, Bolivia (SRE)"
    }, {
        "country": "Bolivia",
        "city": "Cobija",
        "code": "CIJ",
        "class": "bol",
        "airport": null,
        "label": "Cobija, Bolivia (CIJ)"
    }, {
        "country": "Bolivia",
        "city": "Santa Cruz",
        "code": "SRZ",
        "class": "bol",
        "airport": "El Trompillo Airport",
        "label": "Santa Cruz, Bolivia (SRZ)"
    }, {
        "country": "Bolivia",
        "city": "Puerto Suarez",
        "code": "PSZ",
        "class": "bol",
        "airport": null,
        "label": "Puerto Suarez, Bolivia (PSZ)"
    }, {
        "country": "Bolivia",
        "city": "Santa Cruz",
        "code": "VVI",
        "class": "bol",
        "airport": "Viru Viru International Airport",
        "label": "Santa Cruz, Bolivia (VVI)"
    }, {
        "country": "Bolivia",
        "city": "San Borja",
        "code": "SRJ",
        "class": "bol",
        "airport": null,
        "label": "San Borja, Bolivia (SRJ)"
    }, {
        "country": "Bolivia",
        "city": "Rurrenabaque",
        "code": "RBQ",
        "class": "bol",
        "airport": "Rurenabaque Airport",
        "label": "Rurrenabaque, Bolivia (RBQ)"
    }, {
        "country": "Bolivia",
        "city": "Tarija",
        "code": "TJA",
        "class": "bol",
        "airport": "Capitan Oriel Lea Plaza Airport",
        "label": "Tarija, Bolivia (TJA)"
    }, {
        "country": "Bolivia",
        "city": "Santa Ana",
        "code": "SBL",
        "class": "bol",
        "airport": "Santa Ana Del Yacuma Airport",
        "label": "Santa Ana, Bolivia (SBL)"
    }, {
        "country": "Bosnia and Herzegovina",
        "city": "Mostar",
        "code": "OMO",
        "class": "bos",
        "airport": "Mostar International Airport",
        "label": "Mostar, Bosnia and Herzegovina (OMO)"
    }, {
        "country": "Bosnia and Herzegovina",
        "city": "Banja Luka",
        "code": "BNX",
        "class": "bos",
        "airport": "Banja Luka International Airport",
        "label": "Banja Luka, Bosnia and Herzegovina (BNX)"
    }, {
        "country": "Bosnia and Herzegovina",
        "city": "Sarajevo",
        "code": "SJJ",
        "class": "bos",
        "airport": "Sarajevo International Airport",
        "label": "Sarajevo, Bosnia and Herzegovina (SJJ)"
    }, {
        "country": "Botswana",
        "city": "Gaberone",
        "code": "GBE",
        "class": "bot",
        "airport": "Sir Seretse Khama International Airport",
        "label": "Gaberone, Botswana (GBE)"
    }, {
        "country": "Brazil",
        "city": "Montes Claros",
        "code": "MOC",
        "class": "bra",
        "airport": null,
        "label": "Montes Claros, Brazil (MOC)"
    }, {
        "country": "Brazil",
        "city": "Alta Floresta",
        "code": "AFL",
        "class": "bra",
        "airport": "Alta Floresta Airport",
        "label": "Alta Floresta, Brazil (AFL)"
    }, {
        "country": "Brazil",
        "city": "Porto Alegre",
        "code": "POA",
        "class": "bra",
        "airport": "Salgado Filho Airport",
        "label": "Porto Alegre, Brazil (POA)"
    }, {
        "country": "Brazil",
        "city": "Altamira",
        "code": "ATM",
        "class": "bra",
        "airport": "Altamira Airport",
        "label": "Altamira, Brazil (ATM)"
    }, {
        "country": "Brazil",
        "city": "Uruguaiana",
        "code": "URG",
        "class": "bra",
        "airport": "Rubem Berta Airport",
        "label": "Uruguaiana, Brazil (URG)"
    }, {
        "country": "Brazil",
        "city": "Porto Seguro",
        "code": "BPS",
        "class": "bra",
        "airport": "Porto Seguro Airport",
        "label": "Porto Seguro, Brazil (BPS)"
    }, {
        "country": "Brazil",
        "city": "Porto Velho",
        "code": "PVH",
        "class": "bra",
        "airport": "Governador Jorge Teixeira de Oliveira Airport",
        "label": "Porto Velho, Brazil (PVH)"
    }, {
        "country": "Brazil",
        "city": "Uberaba",
        "code": "UBA",
        "class": "bra",
        "airport": null,
        "label": "Uberaba, Brazil (UBA)"
    }, {
        "country": "Brazil",
        "city": "Fortaleza",
        "code": "FOR",
        "class": "bra",
        "airport": "Pinto Martins International Airport",
        "label": "Fortaleza, Brazil (FOR)"
    }, {
        "country": "Brazil",
        "city": "Bras\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00adlia",
        "code": "BSB",
        "class": "bra",
        "airport": "Presidente Juscelino Kubistschek International Airport",
        "label": "Bras\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00adlia, Brazil (BSB)"
    }, {
        "country": "Brazil",
        "city": "Campo Grande",
        "code": "CGR",
        "class": "bra",
        "airport": "Campo Grande Airport",
        "label": "Campo Grande, Brazil (CGR)"
    }, {
        "country": "Brazil",
        "city": "Livramento",
        "code": "LVB",
        "class": "bra",
        "airport": "Livramento do Brumado Airport",
        "label": "Livramento, Brazil (LVB)"
    }, {
        "country": "Brazil",
        "city": "Franca",
        "code": "FRC",
        "class": "bra",
        "airport": "Franca Airport",
        "label": "Franca, Brazil (FRC)"
    }, {
        "country": "Brazil",
        "city": "Corumba",
        "code": "CMG",
        "class": "bra",
        "airport": "Corumb\u00e1 International Airport",
        "label": "Corumba, Brazil (CMG)"
    }, {
        "country": "Brazil",
        "city": "Presidente Prudente",
        "code": "PPB",
        "class": "bra",
        "airport": "Presidente Prudente Airport",
        "label": "Presidente Prudente, Brazil (PPB)"
    }, {
        "country": "Brazil",
        "city": "Bauru",
        "code": "BAU",
        "class": "bra",
        "airport": "Bauru Airport",
        "label": "Bauru, Brazil (BAU)"
    }, {
        "country": "Brazil",
        "city": "Uberl\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a2ndia",
        "code": "UDI",
        "class": "bra",
        "airport": null,
        "label": "Uberl\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a2ndia, Brazil (UDI)"
    }, {
        "country": "Brazil",
        "city": "Sao Jose do Rio Preto",
        "code": "SJP",
        "class": "bra",
        "airport": null,
        "label": "Sao Jose do Rio Preto, Brazil (SJP)"
    }, {
        "country": "Brazil",
        "city": "Salvador",
        "code": "SSA",
        "class": "bra",
        "airport": "Deputado Lu\u00eds Eduardo Magalh\u00e3es International Airport",
        "label": "Salvador, Brazil (SSA)"
    }, {
        "country": "Brazil",
        "city": "Campinas",
        "code": "CPQ",
        "class": "bra",
        "airport": "Amarais Airport",
        "label": "Campinas, Brazil (CPQ)"
    }, {
        "country": "Brazil",
        "city": "Ilh\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a9us",
        "code": "IOS",
        "class": "bra",
        "airport": "Bahia - Jorge Amado Airport",
        "label": "Ilh\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a9us, Brazil (IOS)"
    }, {
        "country": "Brazil",
        "city": "Barreiras",
        "code": "BRA",
        "class": "bra",
        "airport": "Barreiras Airport",
        "label": "Barreiras, Brazil (BRA)"
    }, {
        "country": "Brazil",
        "city": "Passo Fundo",
        "code": "PFB",
        "class": "bra",
        "airport": "Lauro Kurtz Airport",
        "label": "Passo Fundo, Brazil (PFB)"
    }, {
        "country": "Brazil",
        "city": "Belo Horizonte",
        "code": "CNF",
        "class": "bra",
        "airport": "Tancredo Neves International Airport",
        "label": "Belo Horizonte, Brazil (CNF)"
    }, {
        "country": "Brazil",
        "city": "Palmas",
        "code": "PMW",
        "class": "bra",
        "airport": null,
        "label": "Palmas, Brazil (PMW)"
    }, {
        "country": "Brazil",
        "city": "Manaus",
        "code": "MAO",
        "class": "bra",
        "airport": "Eduardo Gomes International Airport",
        "label": "Manaus, Brazil (MAO)"
    }, {
        "country": "Brazil",
        "city": "Mucuri",
        "code": "MVS",
        "class": "bra",
        "airport": "Mucuri Airport",
        "label": "Mucuri, Brazil (MVS)"
    }, {
        "country": "Brazil",
        "city": "Vilhena",
        "code": "BVH",
        "class": "bra",
        "airport": "Vilhena Airport",
        "label": "Vilhena, Brazil (BVH)"
    }, {
        "country": "Brazil",
        "city": "Parintins",
        "code": "PIN",
        "class": "bra",
        "airport": "Parintins Airport",
        "label": "Parintins, Brazil (PIN)"
    }, {
        "country": "Brazil",
        "city": "Parintins",
        "code": "PIN",
        "class": "bra",
        "airport": "Parintins Airport",
        "label": "Parintins, Brazil (PIN)"
    }, {
        "country": "Brazil",
        "city": "Vit\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00b3ria",
        "code": "VIX",
        "class": "bra",
        "airport": "Eurico de Aguiar Salles Airport",
        "label": "Vit\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00b3ria, Brazil (VIX)"
    }, {
        "country": "Brazil",
        "city": "Vitoria Da Conquista",
        "code": "VDC",
        "class": "bra",
        "airport": null,
        "label": "Vitoria Da Conquista, Brazil (VDC)"
    }, {
        "country": "Brazil",
        "city": "Sao Luiz",
        "code": "SLZ",
        "class": "bra",
        "airport": "Marechal Cunha Machado International Airport",
        "label": "Sao Luiz, Brazil (SLZ)"
    }, {
        "country": "Brazil",
        "city": "Belo Horizonte",
        "code": "PLU",
        "class": "bra",
        "airport": "Pampulha - Carlos Drummond de Andrade Airport",
        "label": "Belo Horizonte, Brazil (PLU)"
    }, {
        "country": "Brazil",
        "city": "Patos De Minas",
        "code": "POJ",
        "class": "bra",
        "airport": "Patos de Minas Airport",
        "label": "Patos De Minas, Brazil (POJ)"
    }, {
        "country": "Brazil",
        "city": "Araguaina",
        "code": "AUX",
        "class": "bra",
        "airport": null,
        "label": "Araguaina, Brazil (AUX)"
    }, {
        "country": "Brazil",
        "city": "Ara\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a7atuba",
        "code": "ARU",
        "class": "bra",
        "airport": "Dario Guarita Airport",
        "label": "Ara\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a7atuba, Brazil (ARU)"
    }, {
        "country": "Brazil",
        "city": "Araxa",
        "code": "AAX",
        "class": "bra",
        "airport": null,
        "label": "Araxa, Brazil (AAX)"
    }, {
        "country": "Brazil",
        "city": "Fernando De Noronha",
        "code": "FEN",
        "class": "bra",
        "airport": "Fernando de Noronha Airport",
        "label": "Fernando De Noronha, Brazil (FEN)"
    }, {
        "country": "Brazil",
        "city": "Sao Jose dos Campos",
        "code": "SJK",
        "class": "bra",
        "airport": "Professor Urbano Ernesto Stumpf Airport",
        "label": "Sao Jose dos Campos, Brazil (SJK)"
    }, {
        "country": "Brazil",
        "city": "Petrolina",
        "code": "PNZ",
        "class": "bra",
        "airport": "Senador Nilo Coelho Airport",
        "label": "Petrolina, Brazil (PNZ)"
    }, {
        "country": "Brazil",
        "city": "Aracaju",
        "code": "AJU",
        "class": "bra",
        "airport": "Santa Maria Airport",
        "label": "Aracaju, Brazil (AJU)"
    }, {
        "country": "Brazil",
        "city": "Santa Maria",
        "code": "RIA",
        "class": "bra",
        "airport": "Santa Maria Airport",
        "label": "Santa Maria, Brazil (RIA)"
    }, {
        "country": "Brazil",
        "city": "Florianapolis",
        "code": "FLN",
        "class": "bra",
        "airport": "Herc\u00edlio Luz International Airport",
        "label": "Florianpolis, Brazil (FLN)"
    }, {
        "country": "Brazil",
        "city": "Pelotas",
        "code": "PET",
        "class": "bra",
        "airport": "Pelotas Airport",
        "label": "Pelotas, Brazil (PET)"
    }, {
        "country": "Brazil",
        "city": "Bel\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a9m",
        "code": "BEL",
        "class": "bra",
        "airport": "Val de Cans International Airport",
        "label": "Bel\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a9m, Brazil (BEL)"
    }, {
        "country": "Brazil",
        "city": "Cuiaba",
        "code": "CGB",
        "class": "bra",
        "airport": "Marechal Rondon Airport",
        "label": "Cuiaba, Brazil (CGB)"
    }, {
        "country": "Brazil",
        "city": "Dourados",
        "code": "DOU",
        "class": "bra",
        "airport": "Dourados Airport",
        "label": "Dourados, Brazil (DOU)"
    }, {
        "country": "Brazil",
        "city": "Cruzeiro Do Sul",
        "code": "CZS",
        "class": "bra",
        "airport": "Cruzeiro do Sul Airport",
        "label": "Cruzeiro Do Sul, Brazil (CZS)"
    }, {
        "country": "Brazil",
        "city": "Sao Paulo",
        "code": "SAO",
        "class": "bra",
        "airport": "Campo de Marte Airport",
        "label": "Sao Paulo, Brazil - All Airports (SAO)"
    }, {
        "country": "Brazil",
        "city": "Goi\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a2nia",
        "code": "GYN",
        "class": "bra",
        "airport": "Santa Genoveva Airport",
        "label": "Goi\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00a2nia, Brazil (GYN)"
    }, {
        "country": "Brazil",
        "city": "Campina Grande",
        "code": "CPV",
        "class": "bra",
        "airport": "Campina Grande Airport",
        "label": "Campina Grande, Brazil (CPV)"
    }, {
        "country": "Brazil",
        "city": "Santar\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00af\u00c3\u0192\u00e2\u20ac\u0161\u00c3\u201a\u00c2\u00bf\u00c3\u0192\u00e2\u20ac\u0161\u00c3\u201a\u00c2\u00bdm",
        "code": "STM",
        "class": "bra",
        "airport": "Maestro Wilson Fonseca Airport",
        "label": "Santar\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00af\u00c3\u0192\u00e2\u20ac\u0161\u00c3\u201a\u00c2\u00bf\u00c3\u0192\u00e2\u20ac\u0161\u00c3\u201a\u00c2\u00bdm, Brazil (STM)"
    }, {
        "country": "Brazil",
        "city": "Sao Paulo",
        "code": "GRU",
        "class": "bra",
        "airport": "S\u00e3o Paulo International Airport",
        "label": "Sao Paulo, Brazil (GRU)"
    }, {
        "country": "Brazil",
        "city": "Sao Paulo",
        "code": "CGH",
        "class": "bra",
        "airport": "Congonhas Airport",
        "label": "Sao Paulo, Brazil (CGH)"
    }, {
        "country": "Brazil",
        "city": "Recife",
        "code": "REC",
        "class": "bra",
        "airport": "Guararapes - Gilberto Freyre International Airport",
        "label": "Recife, Brazil (REC)"
    }, {
        "country": "Brazil",
        "city": "Ipatinga",
        "code": "IPN",
        "class": "bra",
        "airport": "Usiminas Airport",
        "label": "Ipatinga, Brazil (IPN)"
    }, {
        "country": "Brazil",
        "city": "Cascavel",
        "code": "CAC",
        "class": "bra",
        "airport": "Cascavel Airport",
        "label": "Cascavel, Brazil (CAC)"
    }, {
        "country": "Brazil",
        "city": "Sao Paulo",
        "code": "VCP",
        "class": "bra",
        "airport": "Viracopos International Airport",
        "label": "Sao Paulo, Brazil (VCP)"
    }, {
        "country": "Brazil",
        "city": "Ribeirao Preto",
        "code": "RAO",
        "class": "bra",
        "airport": "Leite Lopes Airport",
        "label": "Ribeirao Preto, Brazil (RAO)"
    }, {
        "country": "Brazil",
        "city": "Rio de Janeiro",
        "code": "SDU",
        "class": "bra",
        "airport": "Santos Dumont Airport",
        "label": "Rio de Janeiro, Brazil (SDU)"
    }, {
        "country": "Brazil",
        "city": "Imperatriz",
        "code": "IMP",
        "class": "bra",
        "airport": "Prefeito Renato Moreira Airport",
        "label": "Imperatriz, Brazil (IMP)"
    }, {
        "country": "Brazil",
        "city": "Maringa",
        "code": "MGF",
        "class": "bra",
        "airport": null,
        "label": "Maringa, Brazil (MGF)"
    }, {
        "country": "Brazil",
        "city": "Rio Branco",
        "code": "RBR",
        "class": "bra",
        "airport": "Pl\u00e1cido de Castro International Airport",
        "label": "Rio Branco, Brazil (RBR)"
    }, {
        "country": "Brazil",
        "city": "Marilia",
        "code": "MII",
        "class": "bra",
        "airport": null,
        "label": "Marilia, Brazil (MII)"
    }, {
        "country": "Brazil",
        "city": "Marilia",
        "code": "MII",
        "class": "bra",
        "airport": null,
        "label": "Marilia, Brazil (MII)"
    }, {
        "country": "Brazil",
        "city": "Rondonopolis",
        "code": "ROO",
        "class": "bra",
        "airport": null,
        "label": "Rondonopolis, Brazil (ROO)"
    }, {
        "country": "Brazil",
        "city": "Navegantes",
        "code": "NVT",
        "class": "bra",
        "airport": "Ministro Victor Konder International Airport",
        "label": "Navegantes, Brazil (NVT)"
    }, {
        "country": "Brazil",
        "city": "Maraba",
        "code": "MAB",
        "class": "bra",
        "airport": "Jo\u00e3o Correa da Rocha Airport",
        "label": "Maraba, Brazil (MAB)"
    }, {
        "country": "Brazil",
        "city": "Rio de Janeiro",
        "code": "GIG",
        "class": "bra",
        "airport": "Tom Jobim International Airport",
        "label": "Rio de Janeiro, Brazil (GIG)"
    }, {
        "country": "Brazil",
        "city": "Rio de Janeiro",
        "code": "GIG",
        "class": "bra",
        "airport": "Tom Jobim International Airport",
        "label": "Rio de Janeiro, Brazil (GIG)"
    }, {
        "country": "Brazil",
        "city": "Natal",
        "code": "NAT",
        "class": "bra",
        "airport": "Augusto Severo Airport",
        "label": "Natal, Brazil (NAT)"
    }, {
        "country": "Brazil",
        "city": "Curitiba",
        "code": "CWB",
        "class": "bra",
        "airport": "Afonso Pena Airport",
        "label": "Curitiba, Brazil (CWB)"
    }, {
        "country": "Brazil",
        "city": "Caxias do Sul",
        "code": "CXJ",
        "class": "bra",
        "airport": "Campo dos Bugres Airport",
        "label": "Caxias do Sul, Brazil (CXJ)"
    }, {
        "country": "Brazil",
        "city": "Joinville",
        "code": "JOI",
        "class": "bra",
        "airport": "Lauro Carneiro de Loyola Airport",
        "label": "Joinville, Brazil (JOI)"
    }, {
        "country": "Brazil",
        "city": "Juazeiro Do Norte",
        "code": "JDO",
        "class": "bra",
        "airport": "Colina Verde Heliport",
        "label": "Juazeiro Do Norte, Brazil (JDO)"
    }, {
        "country": "Brazil",
        "city": "Joao Pessoa",
        "code": "JPA",
        "class": "bra",
        "airport": "Presidente Castro Pinto Airport",
        "label": "Joao Pessoa, Brazil (JPA)"
    }, {
        "country": "Brazil",
        "city": "Maceio",
        "code": "MCZ",
        "class": "bra",
        "airport": "Zumbi dos Palmares Airport",
        "label": "Maceio, Brazil (MCZ)"
    }, {
        "country": "Brazil",
        "city": "Macae",
        "code": "MEA",
        "class": "bra",
        "airport": "Benedito Lacerda Airport",
        "label": "Macae, Brazil (MEA)"
    }, {
        "country": "Brazil",
        "city": "Juiz De Fora",
        "code": "JDF",
        "class": "bra",
        "airport": "Francisco de Assis Airport",
        "label": "Juiz De Fora, Brazil (JDF)"
    }, {
        "country": "Brazil",
        "city": "Chapeco",
        "code": "XAP",
        "class": "bra",
        "airport": "Serafin Enoss Bertaso Airport",
        "label": "Chapeco, Brazil (XAP)"
    }, {
        "country": "Brazil",
        "city": "Tucurui",
        "code": "TUR",
        "class": "bra",
        "airport": null,
        "label": "Tucurui, Brazil (TUR)"
    }, {
        "country": "Brazil",
        "city": "Governador Valadares",
        "code": "GVR",
        "class": "bra",
        "airport": "Governador Valadares Airport",
        "label": "Governador Valadares, Brazil (GVR)"
    }, {
        "country": "Brazil",
        "city": "Carajas",
        "code": "CKS",
        "class": "bra",
        "airport": "Carajas Airport",
        "label": "Carajas, Brazil (CKS)"
    }, {
        "country": "Brazil",
        "city": "Trombetas",
        "code": "TMT",
        "class": "bra",
        "airport": "Trombetas Airport",
        "label": "Trombetas, Brazil (TMT)"
    }, {
        "country": "Brazil",
        "city": "Macapa",
        "code": "MCP",
        "class": "bra",
        "airport": "Alberto Alcolumbre Airport",
        "label": "Macapa, Brazil (MCP)"
    }, {
        "country": "Brazil",
        "city": "Sinop",
        "code": "OPS",
        "class": "bra",
        "airport": null,
        "label": "Sinop, Brazil (OPS)"
    }, {
        "country": "Brazil",
        "city": "Ji-Parana",
        "code": "JPR",
        "class": "bra",
        "airport": null,
        "label": "Ji-Parana, Brazil (JPR)"
    }, {
        "country": "Brazil",
        "city": "Teresina",
        "code": "THE",
        "class": "bra",
        "airport": null,
        "label": "Teresina, Brazil (THE)"
    }, {
        "country": "Brazil",
        "city": "Londrina",
        "code": "LDB",
        "class": "bra",
        "airport": "Governador Jos\u00e9 Richa Airport",
        "label": "Londrina, Brazil (LDB)"
    }, {
        "country": "Brazil",
        "city": "Campos",
        "code": "CAW",
        "class": "bra",
        "airport": "Bartolomeu Lisandro Airport",
        "label": "Campos, Brazil (CAW)"
    }, {
        "country": "Brazil",
        "city": "Iguassu Falls",
        "code": "IGU",
        "class": "bra",
        "airport": "Cataratas International Airport",
        "label": "Iguassu Falls, Brazil (IGU)"
    }, {
        "country": "Brazil",
        "city": "Boa Vista",
        "code": "BVB",
        "class": "bra",
        "airport": "Atlas Brasil Cantanhede Airport",
        "label": "Boa Vista, Brazil (BVB)"
    }, {
        "country": "Brazil",
        "city": "Santa Rosa",
        "code": "SRA",
        "class": "bra",
        "airport": "Santa Rosa Airport",
        "label": "Santa Rosa, Brazil (SRA)"
    }, {
        "country": "Brazil",
        "city": "Santo \u00c3\u0192\u00c6\u2019\u00c3\u00a2\u00e2\u201a\u00ac\u00c5\u00a1ngelo",
        "code": "GEL",
        "class": "bra",
        "airport": null,
        "label": "Santo \u00c3\u0192\u00c6\u2019\u00c3\u00a2\u00e2\u201a\u00ac\u00c5\u00a1ngelo, Brazil (GEL)"
    }, {
        "country": "Brunei",
        "city": "Bandar Seri Begawan",
        "code": "BWN",
        "class": "bru",
        "airport": "Brunei International Airport",
        "label": "Bandar Seri Begawan, Brunei (BWN)"
    }, {
        "country": "Bulgaria",
        "city": "Bourgas",
        "code": "BOJ",
        "class": "bul",
        "airport": "Burgas Airport",
        "label": "Bourgas, Bulgaria (BOJ)"
    }, {
        "country": "Bulgaria",
        "city": "Varna",
        "code": "VAR",
        "class": "bul",
        "airport": "Varna Airport",
        "label": "Varna, Bulgaria (VAR)"
    }, {
        "country": "Bulgaria",
        "city": "Sofia",
        "code": "SOF",
        "class": "bul",
        "airport": "Sofia Airport",
        "label": "Sofia, Bulgaria (SOF)"
    }, {
        "country": "Burkina Faso",
        "city": "Bobo Dioulasso",
        "code": "BOY",
        "class": "bur",
        "airport": "Bobo Dioulasso Airport",
        "label": "Bobo Dioulasso, Burkina Faso (BOY)"
    }, {
        "country": "Burkina Faso",
        "city": "Ouagadougou",
        "code": "OUA",
        "class": "bur",
        "airport": "Ouagadougou Airport",
        "label": "Ouagadougou, Burkina Faso (OUA)"
    }, {
        "country": "Burundi",
        "city": "Bujumbura",
        "code": "BJM",
        "class": "bur",
        "airport": "Bujumbura International Airport",
        "label": "Bujumbura, Burundi (BJM)"
    }, {
        "country": "Cambodia",
        "city": "Phnom Penh",
        "code": "PNH",
        "class": "cam",
        "airport": "Phnom Penh International Airport",
        "label": "Phnom Penh, Cambodia (PNH)"
    }, {
        "country": "Cambodia",
        "city": "Siem Reap",
        "code": "REP",
        "class": "cam",
        "airport": "Angkor International Airport",
        "label": "Siem Reap, Cambodia (REP)"
    }, {
        "country": "Cameroon",
        "city": "Douala",
        "code": "DLA",
        "class": "cam",
        "airport": "Douala International Airport",
        "label": "Douala, Cameroon (DLA)"
    }, {
        "country": "Cameroon",
        "city": "Douala",
        "code": "DLA",
        "class": "cam",
        "airport": "Douala International Airport",
        "label": "Douala, Cameroon (DLA)"
    }, {
        "country": "Cameroon",
        "city": "Douala",
        "code": "DLA",
        "class": "cam",
        "airport": "Douala International Airport",
        "label": "Douala, Cameroon (DLA)"
    }, {
        "country": "Canada",
        "city": "La Tabatiere",
        "code": "ZLT",
        "class": "can",
        "airport": null,
        "label": "La Tabatiere, Canada (ZLT)"
    }, {
        "country": "Canada",
        "city": "Hay River",
        "code": "YHY",
        "class": "can",
        "airport": "Hay River \/ Merlyn Carter Airport",
        "label": "Hay River, Canada (YHY)"
    }, {
        "country": "Canada",
        "city": "Anahim Lake",
        "code": "YAA",
        "class": "can",
        "airport": "Anahim Lake Airport",
        "label": "Anahim Lake, Canada (YAA)"
    }, {
        "country": "Canada",
        "city": "Havre St Pierre",
        "code": "YGV",
        "class": "can",
        "airport": "Havre St Pierre Airport",
        "label": "Havre St Pierre, Canada (YGV)"
    }, {
        "country": "Canada",
        "city": "Lansdowne House",
        "code": "YLH",
        "class": "can",
        "airport": "Lansdowne House Airport",
        "label": "Lansdowne House, Canada (YLH)"
    }, {
        "country": "Canada",
        "city": "Lansdowne House",
        "code": "YLH",
        "class": "can",
        "airport": "Lansdowne House Airport",
        "label": "Lansdowne House, Canada (YLH)"
    }, {
        "country": "Canada",
        "city": "Hamilton",
        "code": "YHM",
        "class": "can",
        "airport": "John C. Munro Hamilton International Airport",
        "label": "Hamilton, Canada (YHM)"
    }, {
        "country": "Canada",
        "city": "Alma",
        "code": "YTF",
        "class": "can",
        "airport": "Alma Airport",
        "label": "Alma, Canada (YTF)"
    }, {
        "country": "Canada",
        "city": "Alma",
        "code": "YTF",
        "class": "can",
        "airport": "Alma Airport",
        "label": "Alma, Canada (YTF)"
    }, {
        "country": "Canada",
        "city": "Brochet",
        "code": "YBT",
        "class": "can",
        "airport": "Brochet Airport",
        "label": "Brochet, Canada (YBT)"
    },{
        "country": " Canada",
        "city": "Fox Harbour (St Lewis)",
        "code": "YFX",
        "class": " ca",
        "airport": "St. Lewis (Fox Harbour) Airport",
        "label": "Fox Harbour (St Lewis),  Canada (YFX)"
    }, {
        "country": "Canada",
        "city": "Deer Lake",
        "code": "YDF",
        "class": "can",
        "airport": "Deer Lake Airport",
        "label": "Deer Lake, Canada (YDF)"
    }, {
        "country": "Canada",
        "city": "Deer Lake",
        "code": "YVZ",
        "class": "can",
        "airport": "Deer Lake Airport",
        "label": "Deer Lake, Canada (YVZ)"
    }, {
        "country": "Canada",
        "city": "Dauphin",
        "code": "YDN",
        "class": "can",
        "airport": "Dauphin Barker Airport",
        "label": "Dauphin, Canada (YDN)"
    }, {
        "country": "Canada",
        "city": "Dawson Creek",
        "code": "YDQ",
        "class": "can",
        "airport": "Dawson Creek Airport",
        "label": "Dawson Creek, Canada (YDQ)"
    }, {
        "country": "Canada",
        "city": "Lynn Lake",
        "code": "YYL",
        "class": "can",
        "airport": "Lynn Lake Airport",
        "label": "Lynn Lake, Canada (YYL)"
    }, {
        "country": "Canada",
        "city": "Dawson City",
        "code": "YDA",
        "class": "can",
        "airport": "Dawson City Airport",
        "label": "Dawson City, Canada (YDA)"
    }, {
        "country": "Canada",
        "city": "Lutselke\/Snowdrift",
        "code": "YSG",
        "class": "can",
        "airport": "Lutselk'e Airport",
        "label": "Lutselke\/Snowdrift, Canada (YSG)"
    }, {
        "country": "Canada",
        "city": "Deline",
        "code": "YWJ",
        "class": "can",
        "airport": null,
        "label": "Deline, Canada (YWJ)"
    }, {
        "country": "Canada",
        "city": "Bearskin Lake",
        "code": "XBE",
        "class": "can",
        "airport": "Bearskin Lake Airport",
        "label": "Bearskin Lake, Canada (XBE)"
    }, {
        "country": "Canada",
        "city": "Lethbridge",
        "code": "YQL",
        "class": "can",
        "airport": "Lethbridge County Airport",
        "label": "Lethbridge, Canada (YQL)"
    }, {
        "country": "Canada",
        "city": "Halifax",
        "code": "YHZ",
        "class": "can",
        "airport": "Halifax \/ Stanfield International Airport",
        "label": "Halifax, Canada (YHZ)"
    }, {
        "country": "Canada",
        "city": "Hall Beach",
        "code": "YUX",
        "class": "can",
        "airport": "Hall Beach Airport",
        "label": "Hall Beach, Canada (YUX)"
    }, {
        "country": "Canada",
        "city": "Bathurst",
        "code": "ZBF",
        "class": "can",
        "airport": "Bathurst Airport",
        "label": "Bathurst, Canada (ZBF)"
    }, {
        "country": "Canada",
        "city": "East Main",
        "code": "ZEM",
        "class": "can",
        "airport": "Eastmain River Airport",
        "label": "East Main, Canada (ZEM)"
    }, {
        "country": "Canada",
        "city": "East Main",
        "code": "ZEM",
        "class": "can",
        "airport": "Eastmain River Airport",
        "label": "East Main, Canada (ZEM)"
    }, {
        "country": "Canada",
        "city": "Lloydminster",
        "code": "YLL",
        "class": "can",
        "airport": "Lloydminster Airport",
        "label": "Lloydminster, Canada (YLL)"
    }, {
        "country": "Canada",
        "city": "Dryden",
        "code": "YHD",
        "class": "can",
        "airport": "Dryden Regional Airport",
        "label": "Dryden, Canada (YHD)"
    }, {
        "country": "Canada",
        "city": "Brandon",
        "code": "YBR",
        "class": "can",
        "airport": "Brandon Municipal Airport",
        "label": "Brandon, Canada (YBR)"
    }, {
        "country": "Canada",
        "city": "Bonaventure",
        "code": "YVB",
        "class": "can",
        "airport": "Bonaventure Airport",
        "label": "Bonaventure, Canada (YVB)"
    }, {
        "country": "Canada",
        "city": "Kenora",
        "code": "YQK",
        "class": "can",
        "airport": "Kenora Airport",
        "label": "Kenora, Canada (YQK)"
    }, {
        "country": "Canada",
        "city": "Iqaluit",
        "code": "YFB",
        "class": "can",
        "airport": "Iqaluit Airport",
        "label": "Iqaluit, Canada (YFB)"
    }, {
        "country": "Canada",
        "city": "Bella Coola",
        "code": "QBC",
        "class": "can",
        "airport": "Bella Coola Airport",
        "label": "Bella Coola, Canada (QBC)"
    }, {
        "country": "Canada",
        "city": "Gander",
        "code": "YQX",
        "class": "can",
        "airport": "Gander International Airport",
        "label": "Gander, Canada (YQX)"
    }, {
        "country": "Canada",
        "city": "Gander",
        "code": "YQX",
        "class": "can",
        "airport": "Gander International Airport",
        "label": "Gander, Canada (YQX)"
    }, {
        "country": "Canada",
        "city": "Gander",
        "code": "YQX",
        "class": "can",
        "airport": "Gander International Airport",
        "label": "Gander, Canada (YQX)"
    }, {
        "country": "Canada",
        "city": "Inuvik",
        "code": "YEV",
        "class": "can",
        "airport": "Inuvik Mike Zubko Airport",
        "label": "Inuvik, Canada (YEV)"
    }, {
        "country": "Canada",
        "city": "Grande Prairie",
        "code": "YQU",
        "class": "can",
        "airport": "Grande Prairie Airport",
        "label": "Grande Prairie, Canada (YQU)"
    }, {
        "country": "Canada",
        "city": "Bagotville",
        "code": "YBG",
        "class": "can",
        "airport": "CFB Bagotville",
        "label": "Bagotville, Canada (YBG)"
    }, {
        "country": "Canada",
        "city": "Island Lk",
        "code": "YIV",
        "class": "can",
        "airport": "Island Lake Airport",
        "label": "Island Lk, Canada (YIV)"
    }, {
        "country": "Canada",
        "city": "Big Trout",
        "code": "YTL",
        "class": "can",
        "airport": "Big Trout Lake Airport",
        "label": "Big Trout, Canada (YTL)"
    }, {
        "country": "Canada",
        "city": "Fredericton",
        "code": "YFC",
        "class": "can",
        "airport": "Fredericton Airport",
        "label": "Fredericton, Canada (YFC)"
    }, {
        "country": "Canada",
        "city": "Kamloops",
        "code": "YKA",
        "class": "can",
        "airport": "Kamloops Airport",
        "label": "Kamloops, Canada (YKA)"
    }, {
        "country": "Canada",
        "city": "Kangiqsualujjuaq",
        "code": "XGR",
        "class": "can",
        "airport": "Kangiqsualujjuaq (Georges River) Airport",
        "label": "Kangiqsualujjuaq, Canada (XGR)"
    }, {
        "country": "Canada",
        "city": "Attawapiskat",
        "code": "YAT",
        "class": "can",
        "airport": "Attawapiskat Airport",
        "label": "Attawapiskat, Canada (YAT)"
    }, {
        "country": "Canada",
        "city": "Aupaluk",
        "code": "YPJ",
        "class": "can",
        "airport": "Aupaluk Airport",
        "label": "Aupaluk, Canada (YPJ)"
    }, {
        "country": "Canada",
        "city": "Ivujivik",
        "code": "YIK",
        "class": "can",
        "airport": "Ivujivik Airport",
        "label": "Ivujivik, Canada (YIK)"
    }, {
        "country": "Canada",
        "city": "Ivujivik",
        "code": "YIK",
        "class": "can",
        "airport": "Ivujivik Airport",
        "label": "Ivujivik, Canada (YIK)"
    }, {
        "country": "Canada",
        "city": "Gillam",
        "code": "YGX",
        "class": "can",
        "airport": "Gillam Airport",
        "label": "Gillam, Canada (YGX)"
    }, {
        "country": "Canada",
        "city": "Gillam",
        "code": "YGX",
        "class": "can",
        "airport": "Gillam Airport",
        "label": "Gillam, Canada (YGX)"
    }, {
        "country": "Canada",
        "city": "Gillam",
        "code": "YGX",
        "class": "can",
        "airport": "Gillam Airport",
        "label": "Gillam, Canada (YGX)"
    }, {
        "country": "Canada",
        "city": "Igloolik",
        "code": "YGT",
        "class": "can",
        "airport": "Igloolik Airport",
        "label": "Igloolik, Canada (YGT)"
    }, {
        "country": "Canada",
        "city": "Berens River",
        "code": "YBV",
        "class": "can",
        "airport": "Berens River Airport",
        "label": "Berens River, Canada (YBV)"
    }, {
        "country": "Canada",
        "city": "Goose Bay",
        "code": "YYR",
        "class": "can",
        "airport": "Goose Bay Airport",
        "label": "Goose Bay, Canada (YYR)"
    }, {
        "country": "Canada",
        "city": "High Level",
        "code": "YOJ",
        "class": "can",
        "airport": "High Level Airport",
        "label": "High Level, Canada (YOJ)"
    }, {
        "country": "Canada",
        "city": "Holman",
        "code": "YHI",
        "class": "can",
        "airport": "Ulukhaktok Holman Airport",
        "label": "Holman, Canada (YHI)"
    }, {
        "country": "Canada",
        "city": "Hopedale",
        "code": "YHO",
        "class": "can",
        "airport": "Hopedale Airport",
        "label": "Hopedale, Canada (YHO)"
    }, {
        "country": "Canada",
        "city": "Iles De La Madeleine",
        "code": "YGR",
        "class": "can",
        "airport": null,
        "label": "Iles De La Madeleine, Canada (YGR)"
    }, {
        "country": "Canada",
        "city": "Iles De La Madeleine",
        "code": "YGR",
        "class": "can",
        "airport": null,
        "label": "Iles De La Madeleine, Canada (YGR)"
    }, {
        "country": "Canada",
        "city": "Gjoa Haven",
        "code": "YHK",
        "class": "can",
        "airport": "Gjoa Haven Airport",
        "label": "Gjoa Haven, Canada (YHK)"
    }, {
        "country": "Canada",
        "city": "Inukjuak",
        "code": "YPH",
        "class": "can",
        "airport": "Inukjuak Airport",
        "label": "Inukjuak, Canada (YPH)"
    }, {
        "country": "Canada",
        "city": "Gillies Bay",
        "code": "YGB",
        "class": "can",
        "airport": "Texada Gillies Bay Airport",
        "label": "Gillies Bay, Canada (YGB)"
    }, {
        "country": "Canada",
        "city": "Baie Comeau",
        "code": "YBC",
        "class": "can",
        "airport": "Baie Comeau Airport",
        "label": "Baie Comeau, Canada (YBC)"
    }, {
        "country": "Canada",
        "city": "Baker Lake",
        "code": "YBK",
        "class": "can",
        "airport": "Baker Lake Airport",
        "label": "Baker Lake, Canada (YBK)"
    }, {
        "country": "Canada",
        "city": "Gods River",
        "code": "ZGI",
        "class": "can",
        "airport": "Gods River Airport",
        "label": "Gods River, Canada (ZGI)"
    }, {
        "country": "Canada",
        "city": "Gods Narrows",
        "code": "YGO",
        "class": "can",
        "airport": "Gods Lake Narrows Airport",
        "label": "Gods Narrows, Canada (YGO)"
    }, {
        "country": "Canada",
        "city": "Gods Narrows",
        "code": "YGO",
        "class": "can",
        "airport": "Gods Lake Narrows Airport",
        "label": "Gods Narrows, Canada (YGO)"
    }, {
        "country": "Canada",
        "city": "Kangirsuk",
        "code": "YKG",
        "class": "can",
        "airport": "Kangirsuk Airport",
        "label": "Kangirsuk, Canada (YKG)"
    }, {
        "country": "Canada",
        "city": "Cranbrook",
        "code": "YXC",
        "class": "can",
        "airport": "Cranbrook Airport",
        "label": "Cranbrook, Canada (YXC)"
    }, {
        "country": "Canada",
        "city": "Kitchener\/Waterloo",
        "code": "YKF",
        "class": "can",
        "airport": "Waterloo Airport",
        "label": "Kitchener\/Waterloo, Canada (YKF)"
    }, {
        "country": "Canada",
        "city": "Fort Albany",
        "code": "YFA",
        "class": "can",
        "airport": "Fort Albany Airport",
        "label": "Fort Albany, Canada (YFA)"
    }, {
        "country": "Canada",
        "city": "Kingston",
        "code": "YGK",
        "class": "can",
        "airport": "Kingston Norman Rogers Airport",
        "label": "Kingston, Canada (YGK)"
    }, {
        "country": "Canada",
        "city": "Fort Frances",
        "code": "YAG",
        "class": "can",
        "airport": "Fort Frances Municipal Airport",
        "label": "Fort Frances, Canada (YAG)"
    }, {
        "country": "Canada",
        "city": "Fort Hope",
        "code": "YFH",
        "class": "can",
        "airport": "Fort Hope Airport",
        "label": "Fort Hope, Canada (YFH)"
    }, {
        "country": "Canada",
        "city": "Fort Good Hope",
        "code": "YGH",
        "class": "can",
        "airport": "Fort Good Hope Airport",
        "label": "Fort Good Hope, Canada (YGH)"
    }, {
        "country": "Canada",
        "city": "Fort Good Hope",
        "code": "YGH",
        "class": "can",
        "airport": "Fort Good Hope Airport",
        "label": "Fort Good Hope, Canada (YGH)"
    }, {
        "country": "Canada",
        "city": "Blanc Sablon",
        "code": "YBX",
        "class": "can",
        "airport": "Lourdes de Blanc Sablon Airport",
        "label": "Blanc Sablon, Canada (YBX)"
    }, {
        "country": "Canada",
        "city": "Cross Lake",
        "code": "YCR",
        "class": "can",
        "airport": "Cross Lake (Charlie Sinclair Memorial) Airport",
        "label": "Cross Lake, Canada (YCR)"
    }, {
        "country": "Canada",
        "city": "Kuujjuaq",
        "code": "YVP",
        "class": "can",
        "airport": "Kuujjuaq Airport",
        "label": "Kuujjuaq, Canada (YVP)"
    }, {
        "country": "Canada",
        "city": "Kuujjuarapik",
        "code": "YGW",
        "class": "can",
        "airport": "Kuujjuarapik Airport",
        "label": "Kuujjuarapik, Canada (YGW)"
    }, {
        "country": "Canada",
        "city": "Coral Harbour",
        "code": "YZS",
        "class": "can",
        "airport": "Coral Harbour Airport",
        "label": "Coral Harbour, Canada (YZS)"
    }, {
        "country": "Canada",
        "city": "Angling Lake",
        "code": "YAX",
        "class": "can",
        "airport": "Lac Du Bonnet Airport",
        "label": "Angling Lake, Canada (YAX)"
    }, {
        "country": "Canada",
        "city": "Kugluktuk",
        "code": "YCO",
        "class": "can",
        "airport": "Kugluktuk Airport",
        "label": "Kugluktuk, Canada (YCO)"
    }, {
        "country": "Canada",
        "city": "Kugaaruk",
        "code": "YBB",
        "class": "can",
        "airport": "Kugaaruk Airport",
        "label": "Kugaaruk, Canada (YBB)"
    }, {
        "country": "Canada",
        "city": "Flin Flon",
        "code": "YFO",
        "class": "can",
        "airport": "Flin Flon Airport",
        "label": "Flin Flon, Canada (YFO)"
    }, {
        "country": "Canada",
        "city": "Fort McMurray",
        "code": "YMM",
        "class": "can",
        "airport": "Fort McMurray Airport",
        "label": "Fort McMurray, Canada (YMM)"
    }, {
        "country": "Canada",
        "city": "Kingfisher Lake",
        "code": "KIF",
        "class": "can",
        "airport": "Kingfisher Lake Airport",
        "label": "Kingfisher Lake, Canada (KIF)"
    }, {
        "country": "Canada",
        "city": "Fort Smith",
        "code": "YSM",
        "class": "can",
        "airport": "Fort Smith Airport",
        "label": "Fort Smith, Canada (YSM)"
    }, {
        "country": "Canada",
        "city": "Kasabonika",
        "code": "XKS",
        "class": "can",
        "airport": "Kasabonika Airport",
        "label": "Kasabonika, Canada (XKS)"
    }, {
        "country": "Canada",
        "city": "Fort Simpson",
        "code": "YFS",
        "class": "can",
        "airport": "Fort Simpson Airport",
        "label": "Fort Simpson, Canada (YFS)"
    }, {
        "country": "Canada",
        "city": "Fort St John",
        "code": "YXJ",
        "class": "can",
        "airport": "Fort St John Airport",
        "label": "Fort St John, Canada (YXJ)"
    }, {
        "country": "Canada",
        "city": "Grise Fiord",
        "code": "YGZ",
        "class": "can",
        "airport": "Grise Fiord Airport",
        "label": "Grise Fiord, Canada (YGZ)"
    }, {
        "country": "Canada",
        "city": "Kapuskasing",
        "code": "YYU",
        "class": "can",
        "airport": "Kapuskasing Airport",
        "label": "Kapuskasing, Canada (YYU)"
    }, {
        "country": "Canada",
        "city": "Arviat",
        "code": "YEK",
        "class": "can",
        "airport": "Arviat Airport",
        "label": "Arviat, Canada (YEK)"
    }, {
        "country": "Canada",
        "city": "Fort Severn",
        "code": "YER",
        "class": "can",
        "airport": "Fort Severn Airport",
        "label": "Fort Severn, Canada (YER)"
    }, {
        "country": "Canada",
        "city": "Fort Nelson",
        "code": "YYE",
        "class": "can",
        "airport": "Fort Nelson Airport",
        "label": "Fort Nelson, Canada (YYE)"
    }, {
        "country": "Canada",
        "city": "Kimmirut",
        "code": "YLC",
        "class": "can",
        "airport": "Kimmirut Airport",
        "label": "Kimmirut, Canada (YLC)"
    }, {
        "country": "Canada",
        "city": "Fort Mcpherson",
        "code": "ZFM",
        "class": "can",
        "airport": "Fort Mcpherson Airport",
        "label": "Fort Mcpherson, Canada (ZFM)"
    }, {
        "country": "Canada",
        "city": "Cornwall",
        "code": "YCC",
        "class": "can",
        "airport": "Cornwall Regional Airport",
        "label": "Cornwall, Canada (YCC)"
    }, {
        "country": "Canada",
        "city": "Kelowna",
        "code": "YLW",
        "class": "can",
        "airport": "Kelowna Airport",
        "label": "Kelowna, Canada (YLW)"
    }, {
        "country": "Canada",
        "city": "Kelowna",
        "code": "YLW",
        "class": "can",
        "airport": "Kelowna Airport",
        "label": "Kelowna, Canada (YLW)"
    }, {
        "country": "Canada",
        "city": "Kaschechewan",
        "code": "ZKE",
        "class": "can",
        "airport": "Kashechewan Airport",
        "label": "Kaschechewan, Canada (ZKE)"
    }, {
        "country": "Canada",
        "city": "Kaschechewan",
        "code": "ZKE",
        "class": "can",
        "airport": "Kashechewan Airport",
        "label": "Kaschechewan, Canada (ZKE)"
    }, {
        "country": "Canada",
        "city": "La Grande",
        "code": "YGL",
        "class": "can",
        "airport": null,
        "label": "La Grande, Canada (YGL)"
    }, {
        "country": "Canada",
        "city": "Muskrat Dam",
        "code": "MSA",
        "class": "can",
        "airport": "Muskrat Dam Airport",
        "label": "Muskrat Dam, Canada (MSA)"
    }, {
        "country": "Canada",
        "city": "Saint Catharines",
        "code": "YCM",
        "class": "can",
        "airport": "Niagara District Airport",
        "label": "Saint Catharines, Canada (YCM)"
    }, {
        "country": "Canada",
        "city": "Sachs Harbour",
        "code": "YSY",
        "class": "can",
        "airport": "Sachs Harbour (David Nasogaluak Jr. Saaryuaq) Airport",
        "label": "Sachs Harbour, Canada (YSY)"
    }, {
        "country": "Canada",
        "city": "Saint John",
        "code": "YSJ",
        "class": "can",
        "airport": "Saint John Airport",
        "label": "Saint John, Canada (YSJ)"
    }, {
        "country": "Canada",
        "city": "Salluit",
        "code": "YZG",
        "class": "can",
        "airport": "Salluit Airport",
        "label": "Salluit, Canada (YZG)"
    }, {
        "country": "Canada",
        "city": "Cartwright",
        "code": "YRF",
        "class": "can",
        "airport": "Cartwright Airport",
        "label": "Cartwright, Canada (YRF)"
    }, {
        "country": "Canada",
        "city": "Sachigo Lake",
        "code": "ZPB",
        "class": "can",
        "airport": "Sachigo Lake Airport",
        "label": "Sachigo Lake, Canada (ZPB)"
    }, {
        "country": "Canada",
        "city": "Rouyn",
        "code": "YUY",
        "class": "can",
        "airport": "Rouyn Noranda Airport",
        "label": "Rouyn, Canada (YUY)"
    }, {
        "country": "Canada",
        "city": "Chibougamau",
        "code": "YMT",
        "class": "can",
        "airport": "Chapais Airport",
        "label": "Chibougamau, Canada (YMT)"
    }, {
        "country": "Canada",
        "city": "Roberval",
        "code": "YRJ",
        "class": "can",
        "airport": "Roberval Airport",
        "label": "Roberval, Canada (YRJ)"
    }, {
        "country": "Canada",
        "city": "Round Lake",
        "code": "ZRJ",
        "class": "can",
        "airport": "Round Lake (Weagamow Lake) Airport",
        "label": "Round Lake, Canada (ZRJ)"
    }, {
        "country": "Canada",
        "city": "Calgary",
        "code": "YYC",
        "class": "can",
        "airport": "Calgary International Airport",
        "label": "Calgary, Canada (YYC)"
    }, {
        "country": "Canada",
        "city": "Chevery",
        "code": "YHR",
        "class": "can",
        "airport": "Chevery Airport",
        "label": "Chevery, Canada (YHR)"
    }, {
        "country": "Canada",
        "city": "Sandspit",
        "code": "YZP",
        "class": "can",
        "airport": "Sandspit Airport",
        "label": "Sandspit, Canada (YZP)"
    }, {
        "country": "Canada",
        "city": "Sandspit",
        "code": "YZP",
        "class": "can",
        "airport": "Sandspit Airport",
        "label": "Sandspit, Canada (YZP)"
    }, {
        "country": "Canada",
        "city": "Schefferville",
        "code": "YKL",
        "class": "can",
        "airport": "Schefferville Airport",
        "label": "Schefferville, Canada (YKL)"
    }, {
        "country": "Canada",
        "city": "Sept-Iles",
        "code": "YZV",
        "class": "can",
        "airport": null,
        "label": "Sept-Iles, Canada (YZV)"
    }, {
        "country": "Canada",
        "city": "Shamattawa",
        "code": "ZTM",
        "class": "can",
        "airport": "Shamattawa Airport",
        "label": "Shamattawa, Canada (ZTM)"
    }, {
        "country": "Canada",
        "city": "Sioux Lookout",
        "code": "YXL",
        "class": "can",
        "airport": "Sioux Lookout Airport",
        "label": "Sioux Lookout, Canada (YXL)"
    }, {
        "country": "Canada",
        "city": "Sault Ste Marie",
        "code": "YAM",
        "class": "can",
        "airport": "Sault Ste Marie Airport",
        "label": "Sault Ste Marie, Canada (YAM)"
    }, {
        "country": "Canada",
        "city": "Saskatoon",
        "code": "YXE",
        "class": "can",
        "airport": "Saskatoon John G. Diefenbaker International Airport",
        "label": "Saskatoon, Canada (YXE)"
    }, {
        "country": "Canada",
        "city": "Sandy Lake",
        "code": "ZSJ",
        "class": "can",
        "airport": "Sandy Lake Airport",
        "label": "Sandy Lake, Canada (ZSJ)"
    }, {
        "country": "Canada",
        "city": "Sanikiluaq",
        "code": "YSK",
        "class": "can",
        "airport": "Sanikiluaq Airport",
        "label": "Sanikiluaq, Canada (YSK)"
    }, {
        "country": "Canada",
        "city": "Chesterfield Inlet",
        "code": "YCS",
        "class": "can",
        "airport": "Chesterfield Inlet Airport",
        "label": "Chesterfield Inlet, Canada (YCS)"
    }, {
        "country": "Canada",
        "city": "Sarnia",
        "code": "YZR",
        "class": "can",
        "airport": "Chris Hadfield Airport",
        "label": "Sarnia, Canada (YZR)"
    }, {
        "country": "Canada",
        "city": "Rigolet",
        "code": "YRG",
        "class": "can",
        "airport": "Rigolet Airport",
        "label": "Rigolet, Canada (YRG)"
    }, {
        "country": "Canada",
        "city": "Rigolet",
        "code": "YRG",
        "class": "can",
        "airport": "Rigolet Airport",
        "label": "Rigolet, Canada (YRG)"
    }, {
        "country": "Canada",
        "city": "Rigolet",
        "code": "YRG",
        "class": "can",
        "airport": "Rigolet Airport",
        "label": "Rigolet, Canada (YRG)"
    }, {
        "country": "Canada",
        "city": "Quaqtaq",
        "code": "YQC",
        "class": "can",
        "airport": "Quaqtaq Airport",
        "label": "Quaqtaq, Canada (YQC)"
    }, {
        "country": "Canada",
        "city": "Quebec",
        "code": "YQB",
        "class": "can",
        "airport": "Quebec Jean Lesage International Airport",
        "label": "Quebec, Canada (YQB)"
    }, {
        "country": "Canada",
        "city": "Quesnel",
        "code": "YQZ",
        "class": "can",
        "airport": "Quesnel Airport",
        "label": "Quesnel, Canada (YQZ)"
    }, {
        "country": "Canada",
        "city": "Rae Lakes",
        "code": "YRA",
        "class": "can",
        "airport": "Rae Lakes Airport",
        "label": "Rae Lakes, Canada (YRA)"
    }, {
        "country": "Canada",
        "city": "Rae Lakes",
        "code": "YRA",
        "class": "can",
        "airport": "Rae Lakes Airport",
        "label": "Rae Lakes, Canada (YRA)"
    }, {
        "country": "Canada",
        "city": "Qikiqtarjuaq",
        "code": "YVM",
        "class": "can",
        "airport": "Qikiqtarjuaq Airport",
        "label": "Qikiqtarjuaq, Canada (YVM)"
    }, {
        "country": "Canada",
        "city": "Prince Rupert",
        "code": "YPR",
        "class": "can",
        "airport": "Prince Rupert Airport",
        "label": "Prince Rupert, Canada (YPR)"
    }, {
        "country": "Canada",
        "city": "Clyde River",
        "code": "YCY",
        "class": "can",
        "airport": "Clyde River Airport",
        "label": "Clyde River, Canada (YCY)"
    }, {
        "country": "Canada",
        "city": "Churchill",
        "code": "YYQ",
        "class": "can",
        "airport": "Churchill Airport",
        "label": "Churchill, Canada (YYQ)"
    }, {
        "country": "Canada",
        "city": "Churchill Falls",
        "code": "ZUM",
        "class": "can",
        "airport": "Churchill Falls Airport",
        "label": "Churchill Falls, Canada (ZUM)"
    }, {
        "country": "Canada",
        "city": "Rainbow Lake",
        "code": "YOP",
        "class": "can",
        "airport": "Rainbow Lake Airport",
        "label": "Rainbow Lake, Canada (YOP)"
    }, {
        "country": "Canada",
        "city": "Rankin Inlet",
        "code": "YRT",
        "class": "can",
        "airport": "Rankin Inlet Airport",
        "label": "Rankin Inlet, Canada (YRT)"
    }, {
        "country": "Canada",
        "city": "Regina",
        "code": "YQR",
        "class": "can",
        "airport": "Regina International Airport",
        "label": "Regina, Canada (YQR)"
    }, {
        "country": "Canada",
        "city": "Repulse Bay",
        "code": "YUT",
        "class": "can",
        "airport": "Repulse Bay Airport",
        "label": "Repulse Bay, Canada (YUT)"
    }, {
        "country": "Canada",
        "city": "Resolute",
        "code": "YRB",
        "class": "can",
        "airport": "Resolute Bay Airport",
        "label": "Resolute, Canada (YRB)"
    }, {
        "country": "Canada",
        "city": "Montreal",
        "code": "YUL",
        "class": "can",
        "airport": "Montreal \/ Pierre Elliott Trudeau International Airport",
        "label": "Montreal, Canada (YUL)"
    }, {
        "country": "Canada",
        "city": "Red Sucker Lake",
        "code": "YRS",
        "class": "can",
        "airport": "Red Sucker Lake Airport",
        "label": "Red Sucker Lake, Canada (YRS)"
    }, {
        "country": "Canada",
        "city": "Red Sucker Lake",
        "code": "YRS",
        "class": "can",
        "airport": "Red Sucker Lake Airport",
        "label": "Red Sucker Lake, Canada (YRS)"
    }, {
        "country": "Canada",
        "city": "Chisasibi",
        "code": "YKU",
        "class": "can",
        "airport": "Chisasibi Airport",
        "label": "Chisasibi, Canada (YKU)"
    }, {
        "country": "Canada",
        "city": "Red Deer",
        "code": "YQF",
        "class": "can",
        "airport": "Red Deer Regional Airport",
        "label": "Red Deer, Canada (YQF)"
    }, {
        "country": "Canada",
        "city": "Red Lake",
        "code": "YRL",
        "class": "can",
        "airport": "Red Lake Airport",
        "label": "Red Lake, Canada (YRL)"
    }, {
        "country": "Canada",
        "city": "Edmonton",
        "code": "YEG",
        "class": "can",
        "airport": "Edmonton International Airport",
        "label": "Edmonton, Canada (YEG)"
    }, {
        "country": "Canada",
        "city": "Smith Falls",
        "code": "YSH",
        "class": "can",
        "airport": "Smiths Falls-Montague (Russ Beach) Airport",
        "label": "Smith Falls, Canada (YSH)"
    }, {
        "country": "Canada",
        "city": "Smithers",
        "code": "YYD",
        "class": "can",
        "airport": "Smithers Airport",
        "label": "Smithers, Canada (YYD)"
    }, {
        "country": "Canada",
        "city": "Charlottetown",
        "code": "YYG",
        "class": "can",
        "airport": "Charlottetown Airport",
        "label": "Charlottetown, Canada (YYG)"
    }, {
        "country": "Canada",
        "city": "Victoria",
        "code": "YYJ",
        "class": "can",
        "airport": "Victoria International Airport",
        "label": "Victoria, Canada (YYJ)"
    }, {
        "country": "Canada",
        "city": "Wabush",
        "code": "YWK",
        "class": "can",
        "airport": "Wabush Airport",
        "label": "Wabush, Canada (YWK)"
    }, {
        "country": "Canada",
        "city": "Waskaganish",
        "code": "YKQ",
        "class": "can",
        "airport": "Waskaganish Airport",
        "label": "Waskaganish, Canada (YKQ)"
    }, {
        "country": "Canada",
        "city": "Webequie",
        "code": "YWP",
        "class": "can",
        "airport": "Webequie Airport",
        "label": "Webequie, Canada (YWP)"
    }, {
        "country": "Canada",
        "city": "Webequie",
        "code": "YWP",
        "class": "can",
        "airport": "Webequie Airport",
        "label": "Webequie, Canada (YWP)"
    }, {
        "country": "Canada",
        "city": "Toronto",
        "code": "YYZ",
        "class": "can",
        "airport": "Lester B. Pearson International Airport",
        "label": "Toronto, Canada (YYZ)"
    }, {
        "country": "Canada",
        "city": "Val d'Or",
        "code": "YVO",
        "class": "can",
        "airport": "Val-d'Or Airport",
        "label": "Val d'Or, Canada (YVO)"
    }, {
        "country": "Canada",
        "city": "Cat Lake",
        "code": "YAC",
        "class": "can",
        "airport": "Cat Lake Airport",
        "label": "Cat Lake, Canada (YAC)"
    }, {
        "country": "Canada",
        "city": "Victoria",
        "code": "YWH",
        "class": "can",
        "airport": "Victoria Harbour Seaplane Base",
        "label": "Victoria, Canada (YWH)"
    }, {
        "country": "Canada",
        "city": "Toronto",
        "code": "YTZ",
        "class": "can",
        "airport": "Billy Bishop Toronto City Centre Airport",
        "label": "Toronto, Canada (YTZ)"
    }, {
        "country": "Canada",
        "city": "Wemindji",
        "code": "YNC",
        "class": "can",
        "airport": "Wemindji Airport",
        "label": "Wemindji, Canada (YNC)"
    }, {
        "country": "Canada",
        "city": "Wha Ti",
        "code": "YLE",
        "class": "can",
        "airport": null,
        "label": "Wha Ti, Canada (YLE)"
    }, {
        "country": "Canada",
        "city": "Wunnummin Lake",
        "code": "WNN",
        "class": "can",
        "airport": "Wunnumin Lake Airport",
        "label": "Wunnummin Lake, Canada (WNN)"
    }, {
        "country": "Canada",
        "city": "Yellowknife",
        "code": "YZF",
        "class": "can",
        "airport": "Yellowknife Airport",
        "label": "Yellowknife, Canada (YZF)"
    }, {
        "country": "Canada",
        "city": "York Landing",
        "code": "ZAC",
        "class": "can",
        "airport": "York Landing Airport",
        "label": "York Landing, Canada (ZAC)"
    }, {
        "country": "Canada",
        "city": "York Landing",
        "code": "ZAC",
        "class": "can",
        "airport": "York Landing Airport",
        "label": "York Landing, Canada (ZAC)"
    }, {
        "country": "Canada",
        "city": "Windsor",
        "code": "YQG",
        "class": "can",
        "airport": "Windsor Airport",
        "label": "Windsor, Canada (YQG)"
    }, {
        "country": "Canada",
        "city": "Williams Lake",
        "code": "YWL",
        "class": "can",
        "airport": "Williams Lake Airport",
        "label": "Williams Lake, Canada (YWL)"
    }, {
        "country": "Canada",
        "city": "Whale Cove",
        "code": "YXN",
        "class": "can",
        "airport": "Whale Cove Airport",
        "label": "Whale Cove, Canada (YXN)"
    }, {
        "country": "Canada",
        "city": "London",
        "code": "YXU",
        "class": "can",
        "airport": "London Airport",
        "label": "London, Canada (YXU)"
    }, {
        "country": "Canada",
        "city": "Whitehorse",
        "code": "YXY",
        "class": "can",
        "airport": "Whitehorse \/ Erik Nielsen International Airport",
        "label": "Whitehorse, Canada (YXY)"
    }, {
        "country": "Canada",
        "city": "Williams Harbour",
        "code": "YWM",
        "class": "can",
        "airport": "Williams Harbour Airport",
        "label": "Williams Harbour, Canada (YWM)"
    }, {
        "country": "Canada",
        "city": "Umiujaq",
        "code": "YUD",
        "class": "can",
        "airport": "Umiujaq Airport",
        "label": "Umiujaq, Canada (YUD)"
    }, {
        "country": "Canada",
        "city": "Sydney",
        "code": "YQY",
        "class": "can",
        "airport": "Sydney \/ J.A. Douglas McCurdy Airport",
        "label": "Sydney, Canada (YQY)"
    }, {
        "country": "Canada",
        "city": "Vancouver",
        "code": "CXH",
        "class": "can",
        "airport": "Vancouver Harbour Water Aerodrome",
        "label": "Vancouver, Canada (CXH)"
    }, {
        "country": "Canada",
        "city": "Summer Beaver",
        "code": "SUR",
        "class": "can",
        "airport": "Summer Beaver Airport",
        "label": "Summer Beaver, Canada (SUR)"
    }, {
        "country": "Canada",
        "city": "Vancouver",
        "code": "YVR",
        "class": "can",
        "airport": "Vancouver International Airport",
        "label": "Vancouver, Canada (YVR)"
    }, {
        "country": "Canada",
        "city": "Tadoule Lake",
        "code": "XTL",
        "class": "can",
        "airport": "Tadoule Lake Airport",
        "label": "Tadoule Lake, Canada (XTL)"
    }, {
        "country": "Canada",
        "city": "Taloyoak",
        "code": "YYH",
        "class": "can",
        "airport": "Taloyoak Airport",
        "label": "Taloyoak, Canada (YYH)"
    }, {
        "country": "Canada",
        "city": "Sudbury",
        "code": "YSB",
        "class": "can",
        "airport": "Sudbury Airport",
        "label": "Sudbury, Canada (YSB)"
    }, {
        "country": "Canada",
        "city": "Stephenville",
        "code": "YJT",
        "class": "can",
        "airport": "Stephenville Airport",
        "label": "Stephenville, Canada (YJT)"
    }, {
        "country": "Canada",
        "city": "Stephenville",
        "code": "YJT",
        "class": "can",
        "airport": "Stephenville Airport",
        "label": "Stephenville, Canada (YJT)"
    }, {
        "country": "Canada",
        "city": "Stephenville",
        "code": "YJT",
        "class": "can",
        "airport": "Stephenville Airport",
        "label": "Stephenville, Canada (YJT)"
    }, {
        "country": "Canada",
        "city": "St Anthony",
        "code": "YAY",
        "class": "can",
        "airport": "St Anthony Airport",
        "label": "St Anthony, Canada (YAY)"
    }, {
        "country": "Canada",
        "city": "Ste Therese Point",
        "code": "YST",
        "class": "can",
        "airport": "St. Theresa Point Airport",
        "label": "Ste Therese Point, Canada (YST)"
    }, {
        "country": "Canada",
        "city": "Castlegar",
        "code": "YCG",
        "class": "can",
        "airport": "Castlegar\/West Kootenay Regional Airport",
        "label": "Castlegar, Canada (YCG)"
    }, {
        "country": "Canada",
        "city": "Tasiujuaq",
        "code": "YTQ",
        "class": "can",
        "airport": "Tasiujaq Airport",
        "label": "Tasiujuaq, Canada (YTQ)"
    }, {
        "country": "Canada",
        "city": "Timmins",
        "code": "YTS",
        "class": "can",
        "airport": "Timmins\/Victor M. Power",
        "label": "Timmins, Canada (YTS)"
    }, {
        "country": "Canada",
        "city": "Tuktoyaktuk",
        "code": "YUB",
        "class": "can",
        "airport": "Tuktoyaktuk Airport",
        "label": "Tuktoyaktuk, Canada (YUB)"
    }, {
        "country": "Canada",
        "city": "Tulita\/Fort Norman",
        "code": "ZFN",
        "class": "can",
        "airport": "Tulita Airport",
        "label": "Tulita\/Fort Norman, Canada (ZFN)"
    }, {
        "country": "Canada",
        "city": "Tulita\/Fort Norman",
        "code": "ZFN",
        "class": "can",
        "airport": "Tulita Airport",
        "label": "Tulita\/Fort Norman, Canada (ZFN)"
    }, {
        "country": "Canada",
        "city": "Thunder Bay",
        "code": "YQT",
        "class": "can",
        "airport": "Thunder Bay Airport",
        "label": "Thunder Bay, Canada (YQT)"
    }, {
        "country": "Canada",
        "city": "Thompson",
        "code": "YTH",
        "class": "can",
        "airport": "Thompson Airport",
        "label": "Thompson, Canada (YTH)"
    }, {
        "country": "Canada",
        "city": "Terrace",
        "code": "YXT",
        "class": "can",
        "airport": "Terrace Airport",
        "label": "Terrace, Canada (YXT)"
    }, {
        "country": "Canada",
        "city": "Tete-a-La Baleine",
        "code": "ZTB",
        "class": "can",
        "airport": null,
        "label": "Tete-a-La Baleine, Canada (ZTB)"
    }, {
        "country": "Canada",
        "city": "The Pas",
        "code": "YQD",
        "class": "can",
        "airport": "The Pas Airport",
        "label": "The Pas, Canada (YQD)"
    }, {
        "country": "Canada",
        "city": "Thicket Portage",
        "code": "YTD",
        "class": "can",
        "airport": "Thicket Portage Airport",
        "label": "Thicket Portage, Canada (YTD)"
    }, {
        "country": "Canada",
        "city": "Prince George",
        "code": "YXS",
        "class": "can",
        "airport": "Prince George Airport",
        "label": "Prince George, Canada (YXS)"
    }, {
        "country": "Canada",
        "city": "Saint Johns",
        "code": "YYT",
        "class": "can",
        "airport": "St Johns International Airport",
        "label": "Saint Johns, Canada (YYT)"
    }, {
        "country": "Canada",
        "city": "Pickle Lake",
        "code": "YPL",
        "class": "can",
        "airport": "Pickle Lake Airport",
        "label": "Pickle Lake, Canada (YPL)"
    }, {
        "country": "Canada",
        "city": "Pikangikum",
        "code": "YPM",
        "class": "can",
        "airport": "Pikangikum Airport",
        "label": "Pikangikum, Canada (YPM)"
    }, {
        "country": "Canada",
        "city": "Aklavik",
        "code": "LAK",
        "class": "can",
        "airport": "Aklavik Airport",
        "label": "Aklavik, Canada (LAK)"
    }, {
        "country": "Canada",
        "city": "Penticton",
        "code": "YYF",
        "class": "can",
        "airport": "Penticton Airport",
        "label": "Penticton, Canada (YYF)"
    }, {
        "country": "Canada",
        "city": "Peawanuck",
        "code": "YPO",
        "class": "can",
        "airport": "Peawanuck Airport",
        "label": "Peawanuck, Canada (YPO)"
    }, {
        "country": "Canada",
        "city": "Natashquan",
        "code": "YNA",
        "class": "can",
        "airport": "Natashquan Airport",
        "label": "Natashquan, Canada (YNA)"
    }, {
        "country": "Canada",
        "city": "Pikwitonei",
        "code": "PIW",
        "class": "can",
        "airport": "Pikwitonei Airport",
        "label": "Pikwitonei, Canada (PIW)"
    }, {
        "country": "Canada",
        "city": "Pond Inlet",
        "code": "YIO",
        "class": "can",
        "airport": "Pond Inlet Airport",
        "label": "Pond Inlet, Canada (YIO)"
    }, {
        "country": "Canada",
        "city": "Ogoki",
        "code": "YOG",
        "class": "can",
        "airport": "Ogoki Post Airport",
        "label": "Ogoki, Canada (YOG)"
    }, {
        "country": "Canada",
        "city": "Ogoki",
        "code": "YOG",
        "class": "can",
        "airport": "Ogoki Post Airport",
        "label": "Ogoki, Canada (YOG)"
    }, {
        "country": "Canada",
        "city": "Cape Dorset",
        "code": "YTE",
        "class": "can",
        "airport": "Cape Dorset Airport",
        "label": "Cape Dorset, Canada (YTE)"
    }, {
        "country": "Canada",
        "city": "Masset",
        "code": "ZMT",
        "class": "can",
        "airport": "Masset Airport",
        "label": "Masset, Canada (ZMT)"
    }, {
        "country": "Canada",
        "city": "Mary's Harbour",
        "code": "YMH",
        "class": "can",
        "airport": "Mary's Harbour Airport",
        "label": "Mary's Harbour, Canada (YMH)"
    }, {
        "country": "Canada",
        "city": "Peace River",
        "code": "YPE",
        "class": "can",
        "airport": "Peace River Airport",
        "label": "Peace River, Canada (YPE)"
    }, {
        "country": "Canada",
        "city": "Paulatuk",
        "code": "YPC",
        "class": "can",
        "airport": "Paulatuk (Nora Aliqatchialuk Ruben) Airport",
        "label": "Paulatuk, Canada (YPC)"
    }, {
        "country": "Canada",
        "city": "Old Crow",
        "code": "YOC",
        "class": "can",
        "airport": "Old Crow Airport",
        "label": "Old Crow, Canada (YOC)"
    }, {
        "country": "Canada",
        "city": "Old Crow",
        "code": "YOC",
        "class": "can",
        "airport": "Old Crow Airport",
        "label": "Old Crow, Canada (YOC)"
    }, {
        "country": "Canada",
        "city": "North Bay",
        "code": "YYB",
        "class": "can",
        "airport": "North Bay Airport",
        "label": "North Bay, Canada (YYB)"
    }, {
        "country": "Canada",
        "city": "North Spirit Lake",
        "code": "YNO",
        "class": "can",
        "airport": "North Spirit Lake Airport",
        "label": "North Spirit Lake, Canada (YNO)"
    }, {
        "country": "Canada",
        "city": "Norway House",
        "code": "YNE",
        "class": "can",
        "airport": "Norway House Airport",
        "label": "Norway House, Canada (YNE)"
    }, {
        "country": "Canada",
        "city": "Oshawa",
        "code": "YOO",
        "class": "can",
        "airport": "Oshawa Airport",
        "label": "Oshawa, Canada (YOO)"
    }, {
        "country": "Canada",
        "city": "Oxford House",
        "code": "YOH",
        "class": "can",
        "airport": "Oxford House Airport",
        "label": "Oxford House, Canada (YOH)"
    }, {
        "country": "Canada",
        "city": "Oxford House",
        "code": "YOH",
        "class": "can",
        "airport": "Oxford House Airport",
        "label": "Oxford House, Canada (YOH)"
    }, {
        "country": "Canada",
        "city": "Pangnirtung",
        "code": "YXP",
        "class": "can",
        "airport": "Pangnirtung Airport",
        "label": "Pangnirtung, Canada (YXP)"
    }, {
        "country": "Canada",
        "city": "Pakuashipi",
        "code": "YIF",
        "class": "can",
        "airport": "St Augustin Airport",
        "label": "Pakuashipi, Canada (YIF)"
    }, {
        "country": "Canada",
        "city": "Nemiscau",
        "code": "YNS",
        "class": "can",
        "airport": "Nemiscau Airport",
        "label": "Nemiscau, Canada (YNS)"
    }, {
        "country": "Canada",
        "city": "Norman Wells",
        "code": "YVQ",
        "class": "can",
        "airport": "Norman Wells Airport",
        "label": "Norman Wells, Canada (YVQ)"
    }, {
        "country": "Canada",
        "city": "Ottawa",
        "code": "YOW",
        "class": "can",
        "airport": "Ottawa Macdonald-Cartier International Airport",
        "label": "Ottawa, Canada (YOW)"
    }, {
        "country": "Canada",
        "city": "Poplar Hill",
        "code": "YHP",
        "class": "can",
        "airport": "Poplar Hill Airport",
        "label": "Poplar Hill, Canada (YHP)"
    }, {
        "country": "Canada",
        "city": "Colville Lake",
        "code": "YCK",
        "class": "can",
        "airport": "Colville Lake Airport",
        "label": "Colville Lake, Canada (YCK)"
    }, {
        "country": "Canada",
        "city": "Mont Tremblant",
        "code": "YTM",
        "class": "can",
        "airport": "La Macaza \/ Mont-Tremblant International Inc Airport",
        "label": "Mont Tremblant, Canada (YTM)"
    }, {
        "country": "Canada",
        "city": "Abbotsford",
        "code": "YXX",
        "class": "can",
        "airport": "Abbotsford Airport",
        "label": "Abbotsford, Canada (YXX)"
    }, {
        "country": "Canada",
        "city": "Abbotsford",
        "code": "YXX",
        "class": "can",
        "airport": "Abbotsford Airport",
        "label": "Abbotsford, Canada (YXX)"
    }, {
        "country": "Canada",
        "city": "Makkovik",
        "code": "YMN",
        "class": "can",
        "airport": "Makkovik Airport",
        "label": "Makkovik, Canada (YMN)"
    }, {
        "country": "Canada",
        "city": "Povungnituk",
        "code": "YPX",
        "class": "can",
        "airport": "Puvirnituq Airport",
        "label": "Povungnituk, Canada (YPX)"
    }, {
        "country": "Canada",
        "city": "Mont Joli",
        "code": "YYY",
        "class": "can",
        "airport": "Mont Joli Airport",
        "label": "Mont Joli, Canada (YYY)"
    }, {
        "country": "Canada",
        "city": "Winnipeg",
        "code": "YWG",
        "class": "can",
        "airport": "Winnipeg \/ James Armstrong Richardson International Airport",
        "label": "Winnipeg, Canada (YWG)"
    }, {
        "country": "Canada",
        "city": "Campbell River",
        "code": "YBL",
        "class": "can",
        "airport": "Campbell River Airport",
        "label": "Campbell River, Canada (YBL)"
    }, {
        "country": "Canada",
        "city": "Moncton",
        "code": "YQM",
        "class": "can",
        "airport": "Greater Moncton International Airport",
        "label": "Moncton, Canada (YQM)"
    }, {
        "country": "Canada",
        "city": "Moosonee",
        "code": "YMO",
        "class": "can",
        "airport": "Moosonee Airport",
        "label": "Moosonee, Canada (YMO)"
    }, {
        "country": "Canada",
        "city": "Nain",
        "code": "YDP",
        "class": "can",
        "airport": "Nain Airport",
        "label": "Nain, Canada (YDP)"
    }, {
        "country": "Canada",
        "city": "Cambridge Bay",
        "code": "YCB",
        "class": "can",
        "airport": "Cambridge Bay Airport",
        "label": "Cambridge Bay, Canada (YCB)"
    }, {
        "country": "Canada",
        "city": "Medicine Hat",
        "code": "YXH",
        "class": "can",
        "airport": "Medicine Hat Airport",
        "label": "Medicine Hat, Canada (YXH)"
    }, {
        "country": "Canada",
        "city": "Nanisivik",
        "code": "YSR",
        "class": "can",
        "airport": "Nanisivik Airport",
        "label": "Nanisivik, Canada (YSR)"
    }, {
        "country": "Canada",
        "city": "Port Hardy",
        "code": "YZT",
        "class": "can",
        "airport": "Port Hardy Airport",
        "label": "Port Hardy, Canada (YZT)"
    }, {
        "country": "Canada",
        "city": "Comox",
        "code": "YQQ",
        "class": "can",
        "airport": "Comox Airport",
        "label": "Comox, Canada (YQQ)"
    }, {
        "country": "Canada",
        "city": "Nanaimo",
        "code": "YCD",
        "class": "can",
        "airport": "Nanaimo Airport",
        "label": "Nanaimo, Canada (YCD)"
    }, {
        "country": "Canada",
        "city": "Nanaimo",
        "code": "ZNA",
        "class": "can",
        "airport": "Nanaimo Harbour Water Airport",
        "label": "Nanaimo, Canada (ZNA)"
    }, {
        "country": "Canada",
        "city": "Nakina",
        "code": "YQN",
        "class": "can",
        "airport": "Nakina Airport",
        "label": "Nakina, Canada (YQN)"
    }, {
        "country": "Canada",
        "city": "Port Hope Simpson",
        "code": "YHA",
        "class": "can",
        "airport": "Port Hope Simpson Airport",
        "label": "Port Hope Simpson, Canada (YHA)"
    }, {
        "country": "Canada",
        "city": "Akulivik",
        "code": "AKV",
        "class": "can",
        "airport": "Akulivik Airport",
        "label": "Akulivik, Canada (AKV)"
    }, {
        "country": "Canada",
        "city": "Powell River",
        "code": "YPW",
        "class": "can",
        "airport": "Powell River Airport",
        "label": "Powell River, Canada (YPW)"
    }, {
        "country": "Cape Verde",
        "city": "Sao Nicolau",
        "code": "SNE",
        "class": "cap",
        "airport": null,
        "label": "Sao Nicolau, Cape Verde (SNE)"
    }, {
        "country": "Cape Verde",
        "city": "Sao Filipe",
        "code": "SFL",
        "class": "cap",
        "airport": null,
        "label": "Sao Filipe, Cape Verde (SFL)"
    }, {
        "country": "Cape Verde",
        "city": "Boa Vista",
        "code": "BVC",
        "class": "cap",
        "airport": "Rabil Airport",
        "label": "Boa Vista, Cape Verde (BVC)"
    }, {
        "country": "Cape Verde",
        "city": "Praia",
        "code": "RAI",
        "class": "cap",
        "airport": "Praia International Airport",
        "label": "Praia, Cape Verde (RAI)"
    }, {
        "country": "Cape Verde",
        "city": "Maio",
        "code": "MMO",
        "class": "cap",
        "airport": "Maio Airport",
        "label": "Maio, Cape Verde (MMO)"
    }, {
        "country": "Cape Verde",
        "city": "Sao Vicente",
        "code": "VXE",
        "class": "cap",
        "airport": null,
        "label": "Sao Vicente, Cape Verde (VXE)"
    }, {
        "country": "Cape Verde",
        "city": "Sal",
        "code": "SID",
        "class": "cap",
        "airport": null,
        "label": "Sal, Cape Verde (SID)"
    }, {
        "country": "Central African Republic",
        "city": "Bangui",
        "code": "BGF",
        "class": "cen",
        "airport": "Bangui M'Poko International Airport",
        "label": "Bangui, Central African Republic (BGF)"
    }, {
        "country": "Chad",
        "city": "Abecher",
        "code": "AEH",
        "class": "cha",
        "airport": "Abeche Airport",
        "label": "Abecher, Chad (AEH)"
    }, {
        "country": "Chad",
        "city": "Faya",
        "code": "FYT",
        "class": "cha",
        "airport": "Faya Largeau Airport",
        "label": "Faya, Chad (FYT)"
    }, {
        "country": "Chad",
        "city": "Ndjamena",
        "code": "NDJ",
        "class": "cha",
        "airport": "N'Djamena International Airport",
        "label": "Ndjamena, Chad (NDJ)"
    }, {
        "country": "Chile",
        "city": "Copiapo",
        "code": "CPO",
        "class": "chi",
        "airport": "Chamonate Airport",
        "label": "Copiapo, Chile (CPO)"
    }, {
        "country": "Chile",
        "city": "Valdivia",
        "code": "ZAL",
        "class": "chi",
        "airport": "Pichoy Airport",
        "label": "Valdivia, Chile (ZAL)"
    }, {
        "country": "Chile",
        "city": "La Serena",
        "code": "LSC",
        "class": "chi",
        "airport": "La Florida Airport",
        "label": "La Serena, Chile (LSC)"
    }, {
        "country": "Chile",
        "city": "Temuco",
        "code": "ZCO",
        "class": "chi",
        "airport": "Maquehue Airport",
        "label": "Temuco, Chile (ZCO)"
    }, {
        "country": "Chile",
        "city": "Calama",
        "code": "CJC",
        "class": "chi",
        "airport": "El Loa Airport",
        "label": "Calama, Chile (CJC)"
    }, {
        "country": "Chile",
        "city": "El Salvador",
        "code": "ESR",
        "class": "chi",
        "airport": null,
        "label": "El Salvador, Chile (ESR)"
    }, {
        "country": "Chile",
        "city": "Santiago",
        "code": "SCL",
        "class": "chi",
        "airport": null,
        "label": "Santiago, Chile (SCL)"
    }, {
        "country": "Chile",
        "city": "Easter Island",
        "code": "IPC",
        "class": "chi",
        "airport": "Mataveri Airport",
        "label": "Easter Island, Chile (IPC)"
    }, {
        "country": "Chile",
        "city": "Antofagasta",
        "code": "ANF",
        "class": "chi",
        "airport": "Cerro Moreno Airport",
        "label": "Antofagasta, Chile (ANF)"
    }, {
        "country": "Chile",
        "city": "Puerto Montt",
        "code": "PMC",
        "class": "chi",
        "airport": "El Tepual Airport",
        "label": "Puerto Montt, Chile (PMC)"
    }, {
        "country": "Chile",
        "city": "Arica",
        "code": "ARI",
        "class": "chi",
        "airport": "Chacalluta Airport",
        "label": "Arica, Chile (ARI)"
    }, {
        "country": "Chile",
        "city": "Iquique",
        "code": "IQQ",
        "class": "chi",
        "airport": "Diego Aracena Airport",
        "label": "Iquique, Chile (IQQ)"
    }, {
        "country": "Chile",
        "city": "Balmaceda",
        "code": "BBA",
        "class": "chi",
        "airport": "Balmaceda Airport",
        "label": "Balmaceda, Chile (BBA)"
    }, {
        "country": "Chile",
        "city": "Osorno",
        "code": "ZOS",
        "class": "chi",
        "airport": null,
        "label": "Osorno, Chile (ZOS)"
    }, {
        "country": "Chile",
        "city": "Pucon",
        "code": "ZPC",
        "class": "chi",
        "airport": null,
        "label": "Pucon, Chile (ZPC)"
    }, {
        "country": "Chile",
        "city": "Concepcion",
        "code": "CCP",
        "class": "chi",
        "airport": "Carriel Sur Airport",
        "label": "Concepcion, Chile (CCP)"
    }, {
        "country": "Chile",
        "city": "Punta Arenas",
        "code": "PUQ",
        "class": "chi",
        "airport": null,
        "label": "Punta Arenas, Chile (PUQ)"
    }, {
        "country": "China",
        "city": "Zhanjiang",
        "code": "ZHA",
        "class": "chi",
        "airport": "Zhanjiang Airport",
        "label": "Zhanjiang, China (ZHA)"
    }, {
        "country": "China",
        "city": "Mian Yang",
        "code": "MIG",
        "class": "chi",
        "airport": "Mianyang Airport",
        "label": "Mian Yang, China (MIG)"
    }, {
        "country": "China",
        "city": "Meixian",
        "code": "MXZ",
        "class": "chi",
        "airport": "Meixian Airport",
        "label": "Meixian, China (MXZ)"
    }, {
        "country": "China",
        "city": "Yulin",
        "code": "UYN",
        "class": "chi",
        "airport": "Yulin Airport",
        "label": "Yulin, China (UYN)"
    }, {
        "country": "China",
        "city": "Daxian",
        "code": "DAX",
        "class": "chi",
        "airport": "Dachuan Airport",
        "label": "Daxian, China (DAX)"
    }, {
        "country": "China",
        "city": "Yiwu",
        "code": "YIW",
        "class": "chi",
        "airport": "Yiwu Airport",
        "label": "Yiwu, China (YIW)"
    }, {
        "country": "China",
        "city": "Yichang",
        "code": "YIH",
        "class": "chi",
        "airport": "Yichang Airport",
        "label": "Yichang, China (YIH)"
    }, {
        "country": "China",
        "city": "Changde",
        "code": "CGD",
        "class": "chi",
        "airport": "Changde Airport",
        "label": "Changde, China (CGD)"
    }, {
        "country": "China",
        "city": "Dayong",
        "code": "DYG",
        "class": "chi",
        "airport": "Dayong Airport",
        "label": "Dayong, China (DYG)"
    }, {
        "country": "China",
        "city": "Wanxian",
        "code": "WXN",
        "class": "chi",
        "airport": "Wanxian Airport",
        "label": "Wanxian, China (WXN)"
    }, {
        "country": "China",
        "city": "Yinchuan",
        "code": "INC",
        "class": "chi",
        "airport": "Yinchuan Airport",
        "label": "Yinchuan, China (INC)"
    }, {
        "country": "China",
        "city": "Longyan",
        "code": "LCX",
        "class": "chi",
        "airport": "Longyan Guanzhishan Airport",
        "label": "Longyan, China (LCX)"
    }, {
        "country": "China",
        "city": "Yining",
        "code": "YIN",
        "class": "chi",
        "airport": "Yining Airport",
        "label": "Yining, China (YIN)"
    }, {
        "country": "China",
        "city": "Liuzhou",
        "code": "LZH",
        "class": "chi",
        "airport": "Bailian Airport",
        "label": "Liuzhou, China (LZH)"
    }, {
        "country": "China",
        "city": "Zhuhai",
        "code": "ZUH",
        "class": "chi",
        "airport": "Zhuhai Airport",
        "label": "Zhuhai, China (ZUH)"
    }, {
        "country": "China",
        "city": "Tunxi",
        "code": "TXN",
        "class": "chi",
        "airport": "Tunxi International Airport",
        "label": "Tunxi, China (TXN)"
    }, {
        "country": "China",
        "city": "Linyi",
        "code": "LYI",
        "class": "chi",
        "airport": "Shubuling Airport",
        "label": "Linyi, China (LYI)"
    }, {
        "country": "China",
        "city": "Linyi",
        "code": "LYI",
        "class": "chi",
        "airport": "Shubuling Airport",
        "label": "Linyi, China (LYI)"
    }, {
        "country": "China",
        "city": "Linyi",
        "code": "LYI",
        "class": "chi",
        "airport": "Shubuling Airport",
        "label": "Linyi, China (LYI)"
    }, {
        "country": "China",
        "city": "Linyi",
        "code": "LYI",
        "class": "chi",
        "airport": "Shubuling Airport",
        "label": "Linyi, China (LYI)"
    }, {
        "country": "China",
        "city": "Ulanhot",
        "code": "HLH",
        "class": "chi",
        "airport": "Ulanhot Airport",
        "label": "Ulanhot, China (HLH)"
    }, {
        "country": "China",
        "city": "Zhoushan",
        "code": "HSN",
        "class": "chi",
        "airport": "Zhoushan Airport",
        "label": "Zhoushan, China (HSN)"
    }, {
        "country": "China",
        "city": "Changchun",
        "code": "CGQ",
        "class": "chi",
        "airport": "Longjia Airport",
        "label": "Changchun, China (CGQ)"
    }, {
        "country": "China",
        "city": "Dali City",
        "code": "DLU",
        "class": "chi",
        "airport": "Dali Airport",
        "label": "Dali City, China (DLU)"
    }, {
        "country": "China",
        "city": "Datong",
        "code": "DAT",
        "class": "chi",
        "airport": "Datong Airport",
        "label": "Datong, China (DAT)"
    }, {
        "country": "China",
        "city": "Urumqi",
        "code": "URC",
        "class": "chi",
        "airport": null,
        "label": "Urumqi, China (URC)"
    }, {
        "country": "China",
        "city": "Zhengzhou",
        "code": "CGO",
        "class": "chi",
        "airport": "Xinzheng Airport",
        "label": "Zhengzhou, China (CGO)"
    }, {
        "country": "China",
        "city": "Dalian",
        "code": "DLC",
        "class": "chi",
        "airport": "Zhoushuizi Airport",
        "label": "Dalian, China (DLC)"
    }, {
        "country": "China",
        "city": "Zhaotong",
        "code": "ZAT",
        "class": "chi",
        "airport": "Zhaotong Airport",
        "label": "Zhaotong, China (ZAT)"
    }, {
        "country": "China",
        "city": "Hong Kong",
        "code": "HKG",
        "class": "chi",
        "airport": "Hong Kong International Airport Kai Tak",
        "label": "Hong Kong, China (HKG)"
    }, {
        "country": "China",
        "city": "Xingyi",
        "code": "ACX",
        "class": "chi",
        "airport": "Xingyi Airport",
        "label": "Xingyi, China (ACX)"
    }, {
        "country": "China",
        "city": "Wuxi",
        "code": "WUX",
        "class": "chi",
        "airport": "Sunan Shuofang International Airport",
        "label": "Wuxi, China (WUX)"
    }, {
        "country": "China",
        "city": "Xilin Hot",
        "code": "XIL",
        "class": "chi",
        "airport": "Xilinhot Airport",
        "label": "Xilin Hot, China (XIL)"
    }, {
        "country": "China",
        "city": "Aksu",
        "code": "AKU",
        "class": "chi",
        "airport": "Aksu Airport",
        "label": "Aksu, China (AKU)"
    }, {
        "country": "China",
        "city": "Wuhan",
        "code": "WUH",
        "class": "chi",
        "airport": "Wuhan Tianhe International Airport",
        "label": "Wuhan, China (WUH)"
    }, {
        "country": "China",
        "city": "Wuhan",
        "code": "WUH",
        "class": "chi",
        "airport": "Wuhan Tianhe International Airport",
        "label": "Wuhan, China (WUH)"
    }, {
        "country": "China",
        "city": "Xining",
        "code": "XNN",
        "class": "chi",
        "airport": "Xining Caojiabu Airport",
        "label": "Xining, China (XNN)"
    }, {
        "country": "China",
        "city": "Xichang",
        "code": "XIC",
        "class": "chi",
        "airport": "Xichang Qingshan Airport",
        "label": "Xichang, China (XIC)"
    }, {
        "country": "China",
        "city": "Xiangfan",
        "code": "XFN",
        "class": "chi",
        "airport": "Xiangfan Airport",
        "label": "Xiangfan, China (XFN)"
    }, {
        "country": "China",
        "city": "Fuzhou",
        "code": "FOC",
        "class": "chi",
        "airport": "Fuzhou Changle International Airport",
        "label": "Fuzhou, China (FOC)"
    }, {
        "country": "China",
        "city": "Xiamen",
        "code": "XMN",
        "class": "chi",
        "airport": "Xiamen Gaoqi International Airport",
        "label": "Xiamen, China (XMN)"
    }, {
        "country": "China",
        "city": "Xian",
        "code": "XIY",
        "class": "chi",
        "airport": "Xi'an Xianyang International Airport",
        "label": "Xian, China (XIY)"
    }, {
        "country": "China",
        "city": "Dunhuang",
        "code": "DNH",
        "class": "chi",
        "airport": "Dunhuang Airport",
        "label": "Dunhuang, China (DNH)"
    }, {
        "country": "China",
        "city": "Wuyishan",
        "code": "WUS",
        "class": "chi",
        "airport": "Nanping Wuyishan Airport",
        "label": "Wuyishan, China (WUS)"
    }, {
        "country": "China",
        "city": "Wuzhou",
        "code": "WUZ",
        "class": "chi",
        "airport": "Changzhoudao Airport",
        "label": "Wuzhou, China (WUZ)"
    }, {
        "country": "China",
        "city": "Enshi",
        "code": "ENH",
        "class": "chi",
        "airport": "Enshi Airport",
        "label": "Enshi, China (ENH)"
    }, {
        "country": "China",
        "city": "Xuzhou",
        "code": "XUZ",
        "class": "chi",
        "airport": "Xuzhou Guanyin Airport",
        "label": "Xuzhou, China (XUZ)"
    }, {
        "country": "China",
        "city": "Luoyang",
        "code": "LYA",
        "class": "chi",
        "airport": "Luoyang Airport",
        "label": "Luoyang, China (LYA)"
    }, {
        "country": "China",
        "city": "Yantai",
        "code": "YNT",
        "class": "chi",
        "airport": "Yantai Laishan Airport",
        "label": "Yantai, China (YNT)"
    }, {
        "country": "China",
        "city": "Wenzhou",
        "code": "WNZ",
        "class": "chi",
        "airport": "Wenzhou Yongqiang Airport",
        "label": "Wenzhou, China (WNZ)"
    }, {
        "country": "China",
        "city": "Yibin",
        "code": "YBP",
        "class": "chi",
        "airport": "Yibin Caiba Airport",
        "label": "Yibin, China (YBP)"
    }, {
        "country": "China",
        "city": "Weihai",
        "code": "WEH",
        "class": "chi",
        "airport": "Weihai Airport",
        "label": "Weihai, China (WEH)"
    }, {
        "country": "China",
        "city": "Xian",
        "code": "SIA",
        "class": "chi",
        "airport": "Xiguan Airport",
        "label": "Xian, China (SIA)"
    }, {
        "country": "China",
        "city": "Yanji",
        "code": "YNJ",
        "class": "chi",
        "airport": "Yanji Chaoyangchuan Airport",
        "label": "Yanji, China (YNJ)"
    }, {
        "country": "China",
        "city": "Luxi",
        "code": "LUM",
        "class": "chi",
        "airport": "Mangshi Airport",
        "label": "Luxi, China (LUM)"
    }, {
        "country": "China",
        "city": "Yancheng",
        "code": "YNZ",
        "class": "chi",
        "airport": "Yancheng Airport",
        "label": "Yancheng, China (YNZ)"
    }, {
        "country": "China",
        "city": "Yan'an",
        "code": "ENY",
        "class": "chi",
        "airport": "Yan'an Airport",
        "label": "Yan'an, China (ENY)"
    }, {
        "country": "China",
        "city": "Yan'an",
        "code": "ENY",
        "class": "chi",
        "airport": "Yan'an Airport",
        "label": "Yan'an, China (ENY)"
    }, {
        "country": "China",
        "city": "Dongsheng",
        "code": "DSN",
        "class": "chi",
        "airport": "Ordos Ejin Horo Airport",
        "label": "Dongsheng, China (DSN)"
    }, {
        "country": "China",
        "city": "Luzhou",
        "code": "LZO",
        "class": "chi",
        "airport": "Luzhou Airport",
        "label": "Luzhou, China (LZO)"
    }, {
        "country": "China",
        "city": "Diqing",
        "code": "DIG",
        "class": "chi",
        "airport": "Diqing Airport",
        "label": "Diqing, China (DIG)"
    }, {
        "country": "China",
        "city": "Weifang",
        "code": "WEF",
        "class": "chi",
        "airport": "Weifang Airport",
        "label": "Weifang, China (WEF)"
    }, {
        "country": "China",
        "city": "Nanchong",
        "code": "NAO",
        "class": "chi",
        "airport": "Nanchong Airport",
        "label": "Nanchong, China (NAO)"
    }, {
        "country": "China",
        "city": "Hangzhou",
        "code": "HGH",
        "class": "chi",
        "airport": "Hangzhou Xiaoshan International Airport",
        "label": "Hangzhou, China (HGH)"
    }, {
        "country": "China",
        "city": "Korla",
        "code": "KRL",
        "class": "chi",
        "airport": "Korla Airport",
        "label": "Korla, China (KRL)"
    }, {
        "country": "China",
        "city": "Anqing",
        "code": "AQG",
        "class": "chi",
        "airport": "Anqing Airport",
        "label": "Anqing, China (AQG)"
    }, {
        "country": "China",
        "city": "Bangda",
        "code": "BPX",
        "class": "chi",
        "airport": "Qamdo Bangda Airport",
        "label": "Bangda, China (BPX)"
    }, {
        "country": "China",
        "city": "Changsha",
        "code": "CSX",
        "class": "chi",
        "airport": "Changsha Huanghua Airport",
        "label": "Changsha, China (CSX)"
    }, {
        "country": "China",
        "city": "Chifeng",
        "code": "CIF",
        "class": "chi",
        "airport": "Chifeng Airport",
        "label": "Chifeng, China (CIF)"
    }, {
        "country": "China",
        "city": "Shenzhen",
        "code": "SZX",
        "class": "chi",
        "airport": "Shenzhen Bao'an International Airport",
        "label": "Shenzhen, China (SZX)"
    }, {
        "country": "China",
        "city": "Changzhi",
        "code": "CIH",
        "class": "chi",
        "airport": "Changzhi Airport",
        "label": "Changzhi, China (CIH)"
    }, {
        "country": "China",
        "city": "Changzhi",
        "code": "CIH",
        "class": "chi",
        "airport": "Changzhi Airport",
        "label": "Changzhi, China (CIH)"
    }, {
        "country": "China",
        "city": "Huangyan",
        "code": "HYN",
        "class": "chi",
        "airport": "Huangyan Luqiao Airport",
        "label": "Huangyan, China (HYN)"
    }, {
        "country": "China",
        "city": "Hotan",
        "code": "HTN",
        "class": "chi",
        "airport": "Hotan Airport",
        "label": "Hotan, China (HTN)"
    }, {
        "country": "China",
        "city": "Sanya",
        "code": "SYX",
        "class": "chi",
        "airport": "Sanya Phoenix International Airport",
        "label": "Sanya, China (SYX)"
    }, {
        "country": "China",
        "city": "Heihe",
        "code": "HEK",
        "class": "chi",
        "airport": "Heihe Airport",
        "label": "Heihe, China (HEK)"
    }, {
        "country": "China",
        "city": "Guangzhou",
        "code": "CAN",
        "class": "chi",
        "airport": "Guangzhou Baiyun International Airport",
        "label": "Guangzhou, China (CAN)"
    }, {
        "country": "China",
        "city": "Kuqa",
        "code": "KCA",
        "class": "chi",
        "airport": "Kuqa Airport",
        "label": "Kuqa, China (KCA)"
    }, {
        "country": "China",
        "city": "Hohhot",
        "code": "HET",
        "class": "chi",
        "airport": "Baita International Airport",
        "label": "Hohhot, China (HET)"
    }, {
        "country": "China",
        "city": "Ankang",
        "code": "AKA",
        "class": "chi",
        "airport": "Ankang Airport",
        "label": "Ankang, China (AKA)"
    }, {
        "country": "China",
        "city": "Ankang",
        "code": "AKA",
        "class": "chi",
        "airport": "Ankang Airport",
        "label": "Ankang, China (AKA)"
    }, {
        "country": "China",
        "city": "Baotou",
        "code": "BAV",
        "class": "chi",
        "airport": "Baotou Airport",
        "label": "Baotou, China (BAV)"
    }, {
        "country": "China",
        "city": "Ji An",
        "code": "JGS",
        "class": "chi",
        "airport": "Jinggangshan Airport",
        "label": "Ji An, China (JGS)"
    }, {
        "country": "China",
        "city": "Jiamusi",
        "code": "JMU",
        "class": "chi",
        "airport": "Jiamusi Airport",
        "label": "Jiamusi, China (JMU)"
    }, {
        "country": "China",
        "city": "Qiemo",
        "code": "IQM",
        "class": "chi",
        "airport": "Qiemo Airport",
        "label": "Qiemo, China (IQM)"
    }, {
        "country": "China",
        "city": "Qingdao",
        "code": "TAO",
        "class": "chi",
        "airport": "Liuting Airport",
        "label": "Qingdao, China (TAO)"
    }, {
        "country": "China",
        "city": "Qingyang",
        "code": "IQN",
        "class": "chi",
        "airport": "Qingyang Airport",
        "label": "Qingyang, China (IQN)"
    }, {
        "country": "China",
        "city": "Chongqing",
        "code": "CKG",
        "class": "chi",
        "airport": "Chongqing Jiangbei International Airport",
        "label": "Chongqing, China (CKG)"
    }, {
        "country": "China",
        "city": "Juzhou",
        "code": "JUZ",
        "class": "chi",
        "airport": "Quzhou Airport",
        "label": "Juzhou, China (JUZ)"
    }, {
        "country": "China",
        "city": "Karamay",
        "code": "KRY",
        "class": "chi",
        "airport": "Karamay Airport",
        "label": "Karamay, China (KRY)"
    }, {
        "country": "China",
        "city": "Changzhou",
        "code": "CZX",
        "class": "chi",
        "airport": "Changzhou Airport",
        "label": "Changzhou, China (CZX)"
    }, {
        "country": "China",
        "city": "Kunming",
        "code": "KMG",
        "class": "chi",
        "airport": "Kunming Wujiaba International Airport",
        "label": "Kunming, China (KMG)"
    }, {
        "country": "China",
        "city": "Qinhuangdao",
        "code": "SHP",
        "class": "chi",
        "airport": "Shanhaiguan Airport",
        "label": "Qinhuangdao, China (SHP)"
    }, {
        "country": "China",
        "city": "Jiuquan",
        "code": "JGN",
        "class": "chi",
        "airport": "Jiayuguan Airport",
        "label": "Jiuquan, China (JGN)"
    }, {
        "country": "China",
        "city": "Jingdezhen",
        "code": "JDZ",
        "class": "chi",
        "airport": "Jingdezhen Airport",
        "label": "Jingdezhen, China (JDZ)"
    }, {
        "country": "China",
        "city": "Kashi",
        "code": "KHG",
        "class": "chi",
        "airport": "Kashgar Airport",
        "label": "Kashi, China (KHG)"
    }, {
        "country": "China",
        "city": "Jinan",
        "code": "TNA",
        "class": "chi",
        "airport": "Yaoqiang Airport",
        "label": "Jinan, China (TNA)"
    }, {
        "country": "China",
        "city": "Quanzhou",
        "code": "JJN",
        "class": "chi",
        "airport": "Quanzhou Airport",
        "label": "Quanzhou, China (JJN)"
    }, {
        "country": "China",
        "city": "Jinghong",
        "code": "JHG",
        "class": "chi",
        "airport": "Xishuangbanna Gasa Airport",
        "label": "Jinghong, China (JHG)"
    }, {
        "country": "China",
        "city": "Qiqihar",
        "code": "NDG",
        "class": "chi",
        "airport": "Qiqihar Sanjiazi Airport",
        "label": "Qiqihar, China (NDG)"
    }, {
        "country": "China",
        "city": "Jiujiang",
        "code": "JIU",
        "class": "chi",
        "airport": "Jiujiang Lushan Airport",
        "label": "Jiujiang, China (JIU)"
    }, {
        "country": "China",
        "city": "Jinzhou",
        "code": "JNZ",
        "class": "chi",
        "airport": "Jinzhou Airport",
        "label": "Jinzhou, China (JNZ)"
    }, {
        "country": "China",
        "city": "Ningbo",
        "code": "NGB",
        "class": "chi",
        "airport": "Ningbo Lishe International Airport",
        "label": "Ningbo, China (NGB)"
    }, {
        "country": "China",
        "city": "Hefei",
        "code": "HFE",
        "class": "chi",
        "airport": "Hefei Luogang International Airport",
        "label": "Hefei, China (HFE)"
    }, {
        "country": "China",
        "city": "Dandong",
        "code": "DDG",
        "class": "chi",
        "airport": "Dandong Airport",
        "label": "Dandong, China (DDG)"
    }, {
        "country": "China",
        "city": "Mudanjiang",
        "code": "MDG",
        "class": "chi",
        "airport": "Mudanjiang Hailang International Airport",
        "label": "Mudanjiang, China (MDG)"
    }, {
        "country": "China",
        "city": "Beijing",
        "code": "NAY",
        "class": "chi",
        "airport": "Beijing Nanyuan Airport",
        "label": "Beijing, China - Nanyuan Airport (NAY)"
    }, {
        "country": "China",
        "city": "Taiyuan",
        "code": "TYN",
        "class": "chi",
        "airport": "Taiyuan Wusu Airport",
        "label": "Taiyuan, China (TYN)"
    }, {
        "country": "China",
        "city": "Tacheng",
        "code": "TCG",
        "class": "chi",
        "airport": "Tacheng Airport",
        "label": "Tacheng, China (TCG)"
    }, {
        "country": "China",
        "city": "Harbin",
        "code": "HRB",
        "class": "chi",
        "airport": "Taiping Airport",
        "label": "Harbin, China (HRB)"
    }, {
        "country": "China",
        "city": "Nanchang",
        "code": "KHN",
        "class": "chi",
        "airport": "Nanchang Changbei International Airport",
        "label": "Nanchang, China (KHN)"
    }, {
        "country": "China",
        "city": "Lanzhou",
        "code": "LHW",
        "class": "chi",
        "airport": "Lanzhou City Airport",
        "label": "Lanzhou, China (LHW)"
    }, {
        "country": "China",
        "city": "Beijing",
        "code": "PEK",
        "class": "chi",
        "airport": "Beijing Capital International Airport",
        "label": "Beijing, China - Capital Airport (PEK)"
    }, {
        "country": "China",
        "city": "Beijing",
        "code": "PEK",
        "class": "chi",
        "airport": "Beijing Capital International Airport",
        "label": "Beijing, China - Capital Airport (PEK)"
    }, {
        "country": "China",
        "city": "Shanghai",
        "code": "SHA",
        "class": "chi",
        "airport": "Shanghai Hongqiao International Airport",
        "label": "Shanghai, China - Hongqiao Airport (SHA)"
    }, {
        "country": "China",
        "city": "Shanghai",
        "code": "PVG",
        "class": "chi",
        "airport": "Shanghai Pudong International Airport",
        "label": "Shanghai, China - Pu Dong Airport (PVG)"
    }, {
        "country": "China",
        "city": "Tianjin",
        "code": "TSN",
        "class": "chi",
        "airport": "Tianjin Binhai International Airport",
        "label": "Tianjin, China (TSN)"
    }, {
        "country": "China",
        "city": "Lianyungang",
        "code": "LYG",
        "class": "chi",
        "airport": "Lianyungang Airport",
        "label": "Lianyungang, China (LYG)"
    }, {
        "country": "China",
        "city": "Lhasa",
        "code": "LXA",
        "class": "chi",
        "airport": "Lhasa Gonggar Airport",
        "label": "Lhasa, China (LXA)"
    }, {
        "country": "China",
        "city": "Golmud",
        "code": "GOQ",
        "class": "chi",
        "airport": "Golmud Airport",
        "label": "Golmud, China (GOQ)"
    }, {
        "country": "China",
        "city": "Altay",
        "code": "AAT",
        "class": "chi",
        "airport": "Altay Air Base",
        "label": "Altay, China (AAT)"
    }, {
        "country": "China",
        "city": "Chengdu",
        "code": "CTU",
        "class": "chi",
        "airport": "Chengdu Shuangliu International Airport",
        "label": "Chengdu, China (CTU)"
    }, {
        "country": "China",
        "city": "Nanking\/Nanjing",
        "code": "NKG",
        "class": "chi",
        "airport": "Nanjing Lukou Airport",
        "label": "Nanking\/Nanjing, China (NKG)"
    }, {
        "country": "China",
        "city": "Shijiazhuang",
        "code": "SJW",
        "class": "chi",
        "airport": "Shijiazhuang Daguocun International Airport",
        "label": "Shijiazhuang, China (SJW)"
    }, {
        "country": "China",
        "city": "Hailar",
        "code": "HLD",
        "class": "chi",
        "airport": "Dongshan Airport",
        "label": "Hailar, China (HLD)"
    }, {
        "country": "China",
        "city": "Haikou",
        "code": "HAK",
        "class": "chi",
        "airport": "Haikou Meilan International Airport",
        "label": "Haikou, China (HAK)"
    }, {
        "country": "China",
        "city": "Shenyang",
        "code": "SHE",
        "class": "chi",
        "airport": "Taoxian Airport",
        "label": "Shenyang, China (SHE)"
    }, {
        "country": "China",
        "city": "Tongliao",
        "code": "TGO",
        "class": "chi",
        "airport": "Tongliao Airport",
        "label": "Tongliao, China (TGO)"
    }, {
        "country": "China",
        "city": "Hanzhong",
        "code": "HZG",
        "class": "chi",
        "airport": "Hanzhong Airport",
        "label": "Hanzhong, China (HZG)"
    }, {
        "country": "China",
        "city": "Shantou",
        "code": "SWA",
        "class": "chi",
        "airport": "Shantou Waisha Airport",
        "label": "Shantou, China (SWA)"
    }, {
        "country": "China",
        "city": "Simao",
        "code": "SYM",
        "class": "chi",
        "airport": "Simao Airport",
        "label": "Simao, China (SYM)"
    }, {
        "country": "China",
        "city": "Ganzhou",
        "code": "KOW",
        "class": "chi",
        "airport": "Ganzhou Airport",
        "label": "Ganzhou, China (KOW)"
    }, {
        "country": "China",
        "city": "NanTong",
        "code": "NTG",
        "class": "chi",
        "airport": "Nantong Airport",
        "label": "NanTong, China (NTG)"
    }, {
        "country": "China",
        "city": "Beihai",
        "code": "BHY",
        "class": "chi",
        "airport": "Beihai Airport",
        "label": "Beihai, China (BHY)"
    }, {
        "country": "China",
        "city": "Nanning",
        "code": "NNG",
        "class": "chi",
        "airport": "Nanning Wuxu Airport",
        "label": "Nanning, China (NNG)"
    }, {
        "country": "China",
        "city": "Song Pan",
        "code": "JZH",
        "class": "chi",
        "airport": "Jiuzhai Huanglong Airport",
        "label": "Song Pan, China (JZH)"
    }, {
        "country": "China",
        "city": "Guilin",
        "code": "KWL",
        "class": "chi",
        "airport": "Guilin Liangjiang International Airport",
        "label": "Guilin, China (KWL)"
    }, {
        "country": "China",
        "city": "Guiyang",
        "code": "KWE",
        "class": "chi",
        "airport": "Longdongbao Airport",
        "label": "Guiyang, China (KWE)"
    }, {
        "country": "China",
        "city": "Lijiang City",
        "code": "LJG",
        "class": "chi",
        "airport": "Lijiang Airport",
        "label": "Lijiang City, China (LJG)"
    }, {
        "country": "China",
        "city": "Nanyang",
        "code": "NNY",
        "class": "chi",
        "airport": "Nanyang Airport",
        "label": "Nanyang, China (NNY)"
    }, {
        "country": "Christmas Island",
        "city": "Christmas Island",
        "code": "XCH",
        "class": "chr",
        "airport": "Christmas Island Airport",
        "label": "Christmas Island, Christmas Island (XCH)"
    }, {
        "country": "Cocos Keeling Islands",
        "city": "Cocos Islands",
        "code": "CCK",
        "class": "coc",
        "airport": "Cocos (Keeling) Islands Airport",
        "label": "Cocos Islands, Cocos Keeling Islands (CCK)"
    }, {
        "country": "Colombia",
        "city": "Corozal",
        "code": "CZU",
        "class": "col",
        "airport": "Las Brujas Airport",
        "label": "Corozal, Colombia (CZU)"
    }, {
        "country": "Colombia",
        "city": "Cucuta",
        "code": "CUC",
        "class": "col",
        "airport": "Camilo Daza International Airport",
        "label": "Cucuta, Colombia (CUC)"
    }, {
        "country": "Colombia",
        "city": "Cali",
        "code": "CLO",
        "class": "col",
        "airport": "Alfonso Bonilla Aragon International Airport",
        "label": "Cali, Colombia (CLO)"
    }, {
        "country": "Colombia",
        "city": "Cartagena",
        "code": "CTG",
        "class": "col",
        "airport": null,
        "label": "Cartagena, Colombia (CTG)"
    }, {
        "country": "Colombia",
        "city": "Medellin",
        "code": "MDE",
        "class": "col",
        "airport": null,
        "label": "Medellin, Colombia (MDE)"
    }, {
        "country": "Colombia",
        "city": "Riohacha",
        "code": "RCH",
        "class": "col",
        "airport": "Rocha Airport",
        "label": "Riohacha, Colombia (RCH)"
    }, {
        "country": "Colombia",
        "city": "Medellin",
        "code": "EOH",
        "class": "col",
        "airport": "Enrique Olaya Herrera Airport",
        "label": "Medellin, Colombia (EOH)"
    }, {
        "country": "Colombia",
        "city": "Quibdo",
        "code": "UIB",
        "class": "col",
        "airport": null,
        "label": "Quibdo, Colombia (UIB)"
    }, {
        "country": "Colombia",
        "city": "Mitu",
        "code": "MVP",
        "class": "col",
        "airport": "Fabio Alberto Leon Bentley Airport",
        "label": "Mitu, Colombia (MVP)"
    }, {
        "country": "Colombia",
        "city": "San Andres Island",
        "code": "ADZ",
        "class": "col",
        "airport": "Gustavo Rojas Pinilla International Airport",
        "label": "San Andres Island, Colombia (ADZ)"
    }, {
        "country": "Colombia",
        "city": "Manizales",
        "code": "MZL",
        "class": "col",
        "airport": "La Nubia Airport",
        "label": "Manizales, Colombia (MZL)"
    }, {
        "country": "Colombia",
        "city": "Manizales",
        "code": "MZL",
        "class": "col",
        "airport": "La Nubia Airport",
        "label": "Manizales, Colombia (MZL)"
    }, {
        "country": "Colombia",
        "city": "San Vicente",
        "code": "SVI",
        "class": "col",
        "airport": "Eduardo Falla Solano Airport",
        "label": "San Vicente, Colombia (SVI)"
    }, {
        "country": "Colombia",
        "city": "Leticia",
        "code": "LET",
        "class": "col",
        "airport": null,
        "label": "Leticia, Colombia (LET)"
    }, {
        "country": "Colombia",
        "city": "San Jose Del Gua",
        "code": "SJE",
        "class": "col",
        "airport": "Jorge E. Gonzalez Torres Airport",
        "label": "San Jose Del Gua, Colombia (SJE)"
    }, {
        "country": "Colombia",
        "city": "Puerto Leguizamo",
        "code": "LQM",
        "class": "col",
        "airport": "Caucaya Airport",
        "label": "Puerto Leguizamo, Colombia (LQM)"
    }, {
        "country": "Colombia",
        "city": "Monteria",
        "code": "MTR",
        "class": "col",
        "airport": "Los Garzones Airport",
        "label": "Monteria, Colombia (MTR)"
    }, {
        "country": "Colombia",
        "city": "Puerto Asis",
        "code": "PUU",
        "class": "col",
        "airport": "Tres De Mayo Airport",
        "label": "Puerto Asis, Colombia (PUU)"
    }, {
        "country": "Colombia",
        "city": "Providencia",
        "code": "PVA",
        "class": "col",
        "airport": "El Embrujo Airport",
        "label": "Providencia, Colombia (PVA)"
    }, {
        "country": "Colombia",
        "city": "Popayan",
        "code": "PPN",
        "class": "col",
        "airport": null,
        "label": "Popayan, Colombia (PPN)"
    }, {
        "country": "Colombia",
        "city": "Pasto",
        "code": "PSO",
        "class": "col",
        "airport": "Antonio Narino Airport",
        "label": "Pasto, Colombia (PSO)"
    }, {
        "country": "Colombia",
        "city": "Puerto Carreno",
        "code": "PCR",
        "class": "col",
        "airport": "German Olano Airport",
        "label": "Puerto Carreno, Colombia (PCR)"
    }, {
        "country": "Colombia",
        "city": "Nuqui",
        "code": "NQU",
        "class": "col",
        "airport": "Reyes Murillo Airport",
        "label": "Nuqui, Colombia (NQU)"
    }, {
        "country": "Colombia",
        "city": "Buenaventura",
        "code": "BUN",
        "class": "col",
        "airport": null,
        "label": "Buenaventura, Colombia (BUN)"
    }, {
        "country": "Colombia",
        "city": "Puerto Inirida",
        "code": "PDA",
        "class": "col",
        "airport": "Obando Airport",
        "label": "Puerto Inirida, Colombia (PDA)"
    }, {
        "country": "Colombia",
        "city": "Neiva",
        "code": "NVA",
        "class": "col",
        "airport": "Benito Salas Airport",
        "label": "Neiva, Colombia (NVA)"
    }, {
        "country": "Colombia",
        "city": "La Pedrera",
        "code": "LPD",
        "class": "col",
        "airport": "La Pedrera Airport",
        "label": "La Pedrera, Colombia (LPD)"
    }, {
        "country": "Colombia",
        "city": "La Chorrera",
        "code": "LCR",
        "class": "col",
        "airport": "La Chorrera Airport",
        "label": "La Chorrera, Colombia (LCR)"
    }, {
        "country": "Colombia",
        "city": "Tumaco",
        "code": "TCO",
        "class": "col",
        "airport": "La Florida Airport",
        "label": "Tumaco, Colombia (TCO)"
    }, {
        "country": "Colombia",
        "city": "Bogota",
        "code": "BOG",
        "class": "col",
        "airport": "El Dorado International Airport",
        "label": "Bogota, Colombia (BOG)"
    }, {
        "country": "Colombia",
        "city": "Florencia",
        "code": "FLA",
        "class": "col",
        "airport": "Gustavo Artunduaga Paredes Airport",
        "label": "Florencia, Colombia (FLA)"
    }, {
        "country": "Colombia",
        "city": "Guapi",
        "code": "GPI",
        "class": "col",
        "airport": "Juan Casiano Airport",
        "label": "Guapi, Colombia (GPI)"
    }, {
        "country": "Colombia",
        "city": "Valledupar",
        "code": "VUP",
        "class": "col",
        "airport": null,
        "label": "Valledupar, Colombia (VUP)"
    }, {
        "country": "Colombia",
        "city": "El Yopal",
        "code": "EYP",
        "class": "col",
        "airport": "El Yopal Airport",
        "label": "El Yopal, Colombia (EYP)"
    }, {
        "country": "Colombia",
        "city": "Bucaramanga",
        "code": "BGA",
        "class": "col",
        "airport": "Palonegro Airport",
        "label": "Bucaramanga, Colombia (BGA)"
    }, {
        "country": "Colombia",
        "city": "Villavicencio",
        "code": "VVC",
        "class": "col",
        "airport": "Vanguardia Airport",
        "label": "Villavicencio, Colombia (VVC)"
    }, {
        "country": "Colombia",
        "city": "Villavicencio",
        "code": "VVC",
        "class": "col",
        "airport": "Vanguardia Airport",
        "label": "Villavicencio, Colombia (VVC)"
    }, {
        "country": "Colombia",
        "city": "Barranquilla",
        "code": "BAQ",
        "class": "col",
        "airport": "Ernesto Cortissoz International Airport",
        "label": "Barranquilla, Colombia (BAQ)"
    }, {
        "country": "Colombia",
        "city": "Barrancabermeja",
        "code": "EJA",
        "class": "col",
        "airport": null,
        "label": "Barrancabermeja, Colombia (EJA)"
    }, {
        "country": "Colombia",
        "city": "Armenia",
        "code": "AXM",
        "class": "col",
        "airport": "El Eden Airport",
        "label": "Armenia, Colombia (AXM)"
    }, {
        "country": "Colombia",
        "city": "Arauca",
        "code": "AUC",
        "class": "col",
        "airport": "Santiago Perez Airport",
        "label": "Arauca, Colombia (AUC)"
    }, {
        "country": "Colombia",
        "city": "Apartado",
        "code": "APO",
        "class": "col",
        "airport": null,
        "label": "Apartado, Colombia (APO)"
    }, {
        "country": "Colombia",
        "city": "Santa Marta",
        "code": "SMR",
        "class": "col",
        "airport": null,
        "label": "Santa Marta, Colombia (SMR)"
    }, {
        "country": "Colombia",
        "city": "Santa Marta",
        "code": "SMR",
        "class": "col",
        "airport": null,
        "label": "Santa Marta, Colombia (SMR)"
    }, {
        "country": "Colombia",
        "city": "Tame",
        "code": "TME",
        "class": "col",
        "airport": "Gustavo Vargas Airport",
        "label": "Tame, Colombia (TME)"
    }, {
        "country": "Colombia",
        "city": "Ibague",
        "code": "IBE",
        "class": "col",
        "airport": "Perales Airport",
        "label": "Ibague, Colombia (IBE)"
    }, {
        "country": "Colombia",
        "city": "Bahia Solano",
        "code": "BSC",
        "class": "col",
        "airport": null,
        "label": "Bahia Solano, Colombia (BSC)"
    }, {
        "country": "Colombia",
        "city": "Ipiales",
        "code": "IPI",
        "class": "col",
        "airport": "San Luis Airport",
        "label": "Ipiales, Colombia (IPI)"
    }, {
        "country": "Colombia",
        "city": "Pereira",
        "code": "PEI",
        "class": "col",
        "airport": null,
        "label": "Pereira, Colombia (PEI)"
    }, {
        "country": "Comoros",
        "city": "Moroni",
        "code": "HAH",
        "class": "com",
        "airport": "Prince Said Ibrahim International Airport",
        "label": "Moroni, Comoros (HAH)"
    }, {
        "country": "Comoros",
        "city": "Anjouan",
        "code": "AJN",
        "class": "com",
        "airport": "Ouani Airport",
        "label": "Anjouan, Comoros (AJN)"
    }, {
        "country": "Comoros",
        "city": "Moroni",
        "code": "YVA",
        "class": "com",
        "airport": "Iconi Airport",
        "label": "Moroni, Comoros (YVA)"
    }, {
        "country": "Comoros",
        "city": "Moheli",
        "code": "NWA",
        "class": "com",
        "airport": null,
        "label": "Moheli, Comoros (NWA)"
    }, {
        "country": "Cook Islands",
        "city": "Aitutaki",
        "code": "AIT",
        "class": "coo",
        "airport": "Aitutaki Airport",
        "label": "Aitutaki, Cook Islands (AIT)"
    }, {
        "country": "Cook Islands",
        "city": "Mitiaro Island",
        "code": "MOI",
        "class": "coo",
        "airport": "Mitiaro Island Airport",
        "label": "Mitiaro Island, Cook Islands (MOI)"
    }, {
        "country": "Cook Islands",
        "city": "Mangaia Island",
        "code": "MGS",
        "class": "coo",
        "airport": "Mangaia Island Airport",
        "label": "Mangaia Island, Cook Islands (MGS)"
    }, {
        "country": "Cook Islands",
        "city": "Mauke Island",
        "code": "MUK",
        "class": "coo",
        "airport": "Mauke Airport",
        "label": "Mauke Island, Cook Islands (MUK)"
    }, {
        "country": "Cook Islands",
        "city": "Atiu Island",
        "code": "AIU",
        "class": "coo",
        "airport": "Enua Airport",
        "label": "Atiu Island, Cook Islands (AIU)"
    }, {
        "country": "Cook Islands",
        "city": "Rarotonga",
        "code": "RAR",
        "class": "coo",
        "airport": "Rarotonga International Airport",
        "label": "Rarotonga, Cook Islands (RAR)"
    }, {
        "country": "Costa Rica",
        "city": "San Jose",
        "code": "SJO",
        "class": "cos",
        "airport": "Juan Santamaria International Airport",
        "label": "San Jose, Costa Rica (SJO)"
    }, {
        "country": "Croatia",
        "city": "Bol",
        "code": "BWK",
        "class": "cro",
        "airport": "Bol Airport",
        "label": "Bol, Croatia (BWK)"
    }, {
        "country": "Croatia",
        "city": "Split",
        "code": "SPU",
        "class": "cro",
        "airport": "Split Airport",
        "label": "Split, Croatia (SPU)"
    }, {
        "country": "Croatia",
        "city": "Rijeka",
        "code": "RJK",
        "class": "cro",
        "airport": "Rijeka Airport",
        "label": "Rijeka, Croatia (RJK)"
    }, {
        "country": "Croatia",
        "city": "Osijek",
        "code": "OSI",
        "class": "cro",
        "airport": "Osijek Airport",
        "label": "Osijek, Croatia (OSI)"
    }, {
        "country": "Croatia",
        "city": "Zagreb",
        "code": "ZAG",
        "class": "cro",
        "airport": "Zagreb Airport",
        "label": "Zagreb, Croatia (ZAG)"
    }, {
        "country": "Croatia",
        "city": "Zadar",
        "code": "ZAD",
        "class": "cro",
        "airport": "Zemunik Airport",
        "label": "Zadar, Croatia (ZAD)"
    }, {
        "country": "Croatia",
        "city": "Pula",
        "code": "PUY",
        "class": "cro",
        "airport": "Pula Airport",
        "label": "Pula, Croatia (PUY)"
    }, {
        "country": "Croatia",
        "city": "Dubrovnik",
        "code": "DBV",
        "class": "cro",
        "airport": "Dubrovnik Airport",
        "label": "Dubrovnik, Croatia (DBV)"
    }, {
        "country": "Cyprus",
        "city": "Ercan",
        "code": "ECN",
        "class": "cyp",
        "airport": "Ercan International Airport",
        "label": "Ercan, Cyprus (ECN)"
    }, {
        "country": "Cyprus",
        "city": "Larnaca",
        "code": "LCA",
        "class": "cyp",
        "airport": "Larnaca International Airport",
        "label": "Larnaca, Cyprus (LCA)"
    }, {
        "country": "Cyprus",
        "city": "Paphos",
        "code": "PFO",
        "class": "cyp",
        "airport": "Paphos International Airport",
        "label": "Paphos, Cyprus (PFO)"
    }, {
        "country": "Czech Republic",
        "city": "Brno",
        "code": "BRQ",
        "class": "cze",
        "airport": "Brno-Tu?any Airport",
        "label": "Brno, Czech Republic (BRQ)"
    }, {
        "country": "Czech Republic",
        "city": "Prague",
        "code": "PRG",
        "class": "cze",
        "airport": "Ruzyn? International Airport",
        "label": "Prague, Czech Republic (PRG)"
    }, {
        "country": "Czech Republic",
        "city": "Ostrava",
        "code": "OSR",
        "class": "cze",
        "airport": null,
        "label": "Ostrava, Czech Republic (OSR)"
    }, {
        "country": "Czech Republic",
        "city": "Pardubice",
        "code": "PED",
        "class": "cze",
        "airport": "Pardubice Airport",
        "label": "Pardubice, Czech Republic (PED)"
    }, {
        "country": "Czech Republic",
        "city": "Karlovy Vary",
        "code": "KLV",
        "class": "cze",
        "airport": "Karlovy Vary International Airport",
        "label": "Karlovy Vary, Czech Republic (KLV)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Mbandaka",
        "code": "MDK",
        "class": "dem",
        "airport": "Mbandaka Airport",
        "label": "Mbandaka, Democratic Republic of the Congo (MDK)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Lubumbashi",
        "code": "FBM",
        "class": "dem",
        "airport": "Lubumbashi International Airport",
        "label": "Lubumbashi, Democratic Republic of the Congo (FBM)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Mbuji Mayi",
        "code": "MJM",
        "class": "dem",
        "airport": "Mbuji Mayi Airport",
        "label": "Mbuji Mayi, Democratic Republic of the Congo (MJM)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Kisangani",
        "code": "FKI",
        "class": "dem",
        "airport": "Bangoka International Airport",
        "label": "Kisangani, Democratic Republic of the Congo (FKI)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Kindu",
        "code": "KND",
        "class": "dem",
        "airport": "Kindu Airport",
        "label": "Kindu, Democratic Republic of the Congo (KND)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Kananga",
        "code": "KGA",
        "class": "dem",
        "airport": "Kananga Airport",
        "label": "Kananga, Democratic Republic of the Congo (KGA)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Goma",
        "code": "GOM",
        "class": "dem",
        "airport": "Goma International Airport",
        "label": "Goma, Democratic Republic of the Congo (GOM)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Kinshasa",
        "code": "FIH",
        "class": "dem",
        "airport": "Ndjili International Airport",
        "label": "Kinshasa, Democratic Republic of the Congo (FIH)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Bunia",
        "code": "BUX",
        "class": "dem",
        "airport": "Bunia Airport",
        "label": "Bunia, Democratic Republic of the Congo (BUX)"
    }, {
        "country": "Democratic Republic of the Congo",
        "city": "Bukavu",
        "code": "BKY",
        "class": "dem",
        "airport": "Bukavu Kavumu Airport",
        "label": "Bukavu, Democratic Republic of the Congo (BKY)"
    }, {
        "country": "Denmark",
        "city": "Esbjerg",
        "code": "EBJ",
        "class": "den",
        "airport": "Esbjerg Airport",
        "label": "Esbjerg, Denmark (EBJ)"
    }, {
        "country": "Denmark",
        "city": "Bornholm",
        "code": "RNN",
        "class": "den",
        "airport": "Bornholm Airport",
        "label": "Bornholm, Denmark (RNN)"
    }, {
        "country": "Denmark",
        "city": "Copenhagen",
        "code": "CPH",
        "class": "den",
        "airport": "Copenhagen Kastrup Airport",
        "label": "Copenhagen, Denmark (CPH)"
    }, {
        "country": "Denmark",
        "city": "Aarhus",
        "code": "AAR",
        "class": "den",
        "airport": "Aarhus Airport",
        "label": "Aarhus, Denmark (AAR)"
    }, {
        "country": "Denmark",
        "city": "Karup",
        "code": "KRP",
        "class": "den",
        "airport": "Karup Airport",
        "label": "Karup, Denmark (KRP)"
    }, {
        "country": "Denmark",
        "city": "Billund",
        "code": "BLL",
        "class": "den",
        "airport": "Billund Airport",
        "label": "Billund, Denmark (BLL)"
    }, {
        "country": "Denmark",
        "city": "Aalborg",
        "code": "AAL",
        "class": "den",
        "airport": "Aalborg Airport",
        "label": "Aalborg, Denmark (AAL)"
    }, {
        "country": "Denmark",
        "city": "Sonderborg",
        "code": "SGD",
        "class": "den",
        "airport": null,
        "label": "Sonderborg, Denmark (SGD)"
    }, {
        "country": "Djibouti",
        "city": "Djibouti",
        "code": "JIB",
        "class": "dji",
        "airport": "Djibouti-Ambouli Airport",
        "label": "Djibouti, Djibouti (JIB)"
    }, {
        "country": "East Timor",
        "city": "Kupang",
        "code": "KOE",
        "class": "eas",
        "airport": "El Tari Airport",
        "label": "Kupang, East Timor (KOE)"
    }, {
        "country": "East Timor",
        "city": "Dili",
        "code": "DIL",
        "class": "eas",
        "airport": "Presidente Nicolau Lobato International Airport",
        "label": "Dili, East Timor (DIL)"
    }, {
        "country": "Ecuador",
        "city": "Quito",
        "code": "UIO",
        "class": "ecu",
        "airport": "Mariscal Sucre International Airport",
        "label": "Quito, Ecuador (UIO)"
    }, {
        "country": "Ecuador",
        "city": "San Cristobal",
        "code": "SCY",
        "class": "ecu",
        "airport": null,
        "label": "San Cristobal, Ecuador (SCY)"
    }, {
        "country": "Ecuador",
        "city": "Salinas",
        "code": "SNC",
        "class": "ecu",
        "airport": "General Ulpiano Paez Airport",
        "label": "Salinas, Ecuador (SNC)"
    }, {
        "country": "Ecuador",
        "city": "Manta",
        "code": "MEC",
        "class": "ecu",
        "airport": "Eloy Alfaro International Airport",
        "label": "Manta, Ecuador (MEC)"
    }, {
        "country": "Ecuador",
        "city": "Coca",
        "code": "OCC",
        "class": "ecu",
        "airport": "Francisco De Orellana Airport",
        "label": "Coca, Ecuador (OCC)"
    }, {
        "country": "Ecuador",
        "city": "Lago Agrio",
        "code": "LGQ",
        "class": "ecu",
        "airport": "Nueva Loja Airport",
        "label": "Lago Agrio, Ecuador (LGQ)"
    }, {
        "country": "Ecuador",
        "city": "Guayaquil",
        "code": "GYE",
        "class": "ecu",
        "airport": "Simon Bolivar International Airport",
        "label": "Guayaquil, Ecuador (GYE)"
    }, {
        "country": "Ecuador",
        "city": "Loja",
        "code": "LOH",
        "class": "ecu",
        "airport": "Camilo Ponce Enriquez Airport",
        "label": "Loja, Ecuador (LOH)"
    }, {
        "country": "Ecuador",
        "city": "Macas",
        "code": "XMS",
        "class": "ecu",
        "airport": "Coronel E Carvajal Airport",
        "label": "Macas, Ecuador (XMS)"
    }, {
        "country": "Ecuador",
        "city": "Esmeraldas",
        "code": "ESM",
        "class": "ecu",
        "airport": "General Rivadeneira Airport",
        "label": "Esmeraldas, Ecuador (ESM)"
    }, {
        "country": "Ecuador",
        "city": "Galapagos Is",
        "code": "GPS",
        "class": "ecu",
        "airport": "Seymour Airport",
        "label": "Galapagos Is, Ecuador (GPS)"
    }, {
        "country": "Ecuador",
        "city": "Cuenca",
        "code": "CUE",
        "class": "ecu",
        "airport": "Mariscal Lamar Airport",
        "label": "Cuenca, Ecuador (CUE)"
    }, {
        "country": "Ecuador",
        "city": "Tulcan",
        "code": "TUA",
        "class": "ecu",
        "airport": "Teniente Coronel Luis a Mantilla Airport",
        "label": "Tulcan, Ecuador (TUA)"
    }, {
        "country": "Egypt",
        "city": "Alexandria",
        "code": "ALY",
        "class": "egy",
        "airport": "El Nouzha Airport",
        "label": "Alexandria, Egypt (ALY)"
    }, {
        "country": "Egypt",
        "city": "Cairo",
        "code": "CAI",
        "class": "egy",
        "airport": "Cairo International Airport",
        "label": "Cairo, Egypt (CAI)"
    }, {
        "country": "Egypt",
        "city": "Al Arish",
        "code": "AAC",
        "class": "egy",
        "airport": "El Arish International Airport",
        "label": "Al Arish, Egypt (AAC)"
    }, {
        "country": "Egypt",
        "city": "Taba",
        "code": "TCP",
        "class": "egy",
        "airport": "Taba International Airport",
        "label": "Taba, Egypt (TCP)"
    }, {
        "country": "Egypt",
        "city": "Alexandria",
        "code": "HBE",
        "class": "egy",
        "airport": "Borg El Arab International Airport",
        "label": "Alexandria, Egypt (HBE)"
    }, {
        "country": "Egypt",
        "city": "Hurghada",
        "code": "HRG",
        "class": "egy",
        "airport": "Hurghada International Airport",
        "label": "Hurghada, Egypt (HRG)"
    }, {
        "country": "Egypt",
        "city": "Luxor",
        "code": "LXR",
        "class": "egy",
        "airport": "Luxor International Airport",
        "label": "Luxor, Egypt (LXR)"
    }, {
        "country": "Egypt",
        "city": "Marsa Alam",
        "code": "RMF",
        "class": "egy",
        "airport": "Marsa Alam International Airport",
        "label": "Marsa Alam, Egypt (RMF)"
    }, {
        "country": "Egypt",
        "city": "Abu Simbel",
        "code": "ABS",
        "class": "egy",
        "airport": "Abu Simbel Airport",
        "label": "Abu Simbel, Egypt (ABS)"
    }, {
        "country": "Egypt",
        "city": "Sharm el Sheikh",
        "code": "SSH",
        "class": "egy",
        "airport": "Sharm El Sheikh International Airport",
        "label": "Sharm el Sheikh, Egypt (SSH)"
    }, {
        "country": "Egypt",
        "city": "Assiut",
        "code": "ATZ",
        "class": "egy",
        "airport": "Assiut International Airport",
        "label": "Assiut, Egypt (ATZ)"
    }, {
        "country": "Egypt",
        "city": "Aswan",
        "code": "ASW",
        "class": "egy",
        "airport": "Aswan International Airport",
        "label": "Aswan, Egypt (ASW)"
    }, {
        "country": "Equatorial Guinea",
        "city": "Malabo",
        "code": "SSG",
        "class": "equ",
        "airport": "Malabo Airport",
        "label": "Malabo, Equatorial Guinea (SSG)"
    }, {
        "country": "Eritrea",
        "city": "Asmara",
        "code": "ASM",
        "class": "eri",
        "airport": "Asmara International Airport",
        "label": "Asmara, Eritrea (ASM)"
    }, {
        "country": "Eritrea",
        "city": "Massawa",
        "code": "MSW",
        "class": "eri",
        "airport": "Massawa International Airport",
        "label": "Massawa, Eritrea (MSW)"
    }, {
        "country": "Estonia",
        "city": "Tallinn",
        "code": "TLL",
        "class": "est",
        "airport": "Tallinn Airport",
        "label": "Tallinn, Estonia (TLL)"
    }, {
        "country": "Estonia",
        "city": "Kardla",
        "code": "KDL",
        "class": "est",
        "airport": null,
        "label": "Kardla, Estonia (KDL)"
    }, {
        "country": "Estonia",
        "city": "Kuressaare",
        "code": "URE",
        "class": "est",
        "airport": "Kuressaare Airport",
        "label": "Kuressaare, Estonia (URE)"
    }, {
        "country": "Ethiopia",
        "city": "Gondar",
        "code": "GDQ",
        "class": "eth",
        "airport": "Gonder Airport",
        "label": "Gondar, Ethiopia (GDQ)"
    }, {
        "country": "Ethiopia",
        "city": "Kabri Dar",
        "code": "ABK",
        "class": "eth",
        "airport": "Kabri Dehar Airport",
        "label": "Kabri Dar, Ethiopia (ABK)"
    }, {
        "country": "Ethiopia",
        "city": "Axum",
        "code": "AXU",
        "class": "eth",
        "airport": "Axum Airport",
        "label": "Axum, Ethiopia (AXU)"
    }, {
        "country": "Ethiopia",
        "city": "Axum",
        "code": "AXU",
        "class": "eth",
        "airport": "Axum Airport",
        "label": "Axum, Ethiopia (AXU)"
    }, {
        "country": "Ethiopia",
        "city": "Arba Mintch",
        "code": "AMH",
        "class": "eth",
        "airport": "Arba Minch Airport",
        "label": "Arba Mintch, Ethiopia (AMH)"
    }, {
        "country": "Ethiopia",
        "city": "Bahar Dar",
        "code": "BJR",
        "class": "eth",
        "airport": "Bahir Dar Airport",
        "label": "Bahar Dar, Ethiopia (BJR)"
    }, {
        "country": "Ethiopia",
        "city": "Gambela",
        "code": "GMB",
        "class": "eth",
        "airport": "Gambella Airport",
        "label": "Gambela, Ethiopia (GMB)"
    }, {
        "country": "Ethiopia",
        "city": "Indaselassie",
        "code": "SHC",
        "class": "eth",
        "airport": "Shire Inda Selassie Airport",
        "label": "Indaselassie, Ethiopia (SHC)"
    }, {
        "country": "Ethiopia",
        "city": "Gode\/Iddidole",
        "code": "GDE",
        "class": "eth",
        "airport": "Gode Airport",
        "label": "Gode\/Iddidole, Ethiopia (GDE)"
    }, {
        "country": "Ethiopia",
        "city": "Makale",
        "code": "MQX",
        "class": "eth",
        "airport": "Mekele Airport",
        "label": "Makale, Ethiopia (MQX)"
    }, {
        "country": "Ethiopia",
        "city": "Dire Dawa",
        "code": "DIR",
        "class": "eth",
        "airport": "Aba Tenna Dejazmach Yilma International Airport",
        "label": "Dire Dawa, Ethiopia (DIR)"
    }, {
        "country": "Ethiopia",
        "city": "Addis Ababa",
        "code": "ADD",
        "class": "eth",
        "airport": "Bole International Airport",
        "label": "Addis Ababa, Ethiopia (ADD)"
    }, {
        "country": "Ethiopia",
        "city": "Shillavo",
        "code": "HIL",
        "class": "eth",
        "airport": "Shilavo Airport",
        "label": "Shillavo, Ethiopia (HIL)"
    }, {
        "country": "Falkland Islands ",
        "city": "Mount Pleasant",
        "code": "MPN",
        "class": "fal",
        "airport": "Mount Pleasant Airport",
        "label": "Mount Pleasant, Falkland Islands  (MPN)"
    }, {
        "country": "Faroe Islands",
        "city": "Faroe Islands",
        "code": "FAE",
        "class": "far",
        "airport": "Vagar Airport",
        "label": "Faroe Islands, Faroe Islands (FAE)"
    }, {
        "country": "Fiji",
        "city": "Suva",
        "code": "SUV",
        "class": "fij",
        "airport": "Nausori International Airport",
        "label": "Suva, Fiji (SUV)"
    }, {
        "country": "Fiji",
        "city": "Bureta",
        "code": "LEV",
        "class": "fij",
        "airport": "Levuka Airfield",
        "label": "Bureta, Fiji (LEV)"
    }, {
        "country": "Fiji",
        "city": "Labasa",
        "code": "LBS",
        "class": "fij",
        "airport": "Labasa Airport",
        "label": "Labasa, Fiji (LBS)"
    }, {
        "country": "Fiji",
        "city": "Nadi",
        "code": "NAN",
        "class": "fij",
        "airport": "Nadi International Airport",
        "label": "Nadi, Fiji (NAN)"
    }, {
        "country": "Fiji",
        "city": "Koro Island",
        "code": "KXF",
        "class": "fij",
        "airport": "Koro Island Airport",
        "label": "Koro Island, Fiji (KXF)"
    }, {
        "country": "Fiji",
        "city": "Savusavu",
        "code": "SVU",
        "class": "fij",
        "airport": "Savusavu Airport",
        "label": "Savusavu, Fiji (SVU)"
    }, {
        "country": "Fiji",
        "city": "Rotuma Island",
        "code": "RTA",
        "class": "fij",
        "airport": "Rotuma Airport",
        "label": "Rotuma Island, Fiji (RTA)"
    }, {
        "country": "Fiji",
        "city": "Kandavu",
        "code": "KDV",
        "class": "fij",
        "airport": "Vunisea Airport",
        "label": "Kandavu, Fiji (KDV)"
    }, {
        "country": "Fiji",
        "city": "Vanuabalavu",
        "code": "VBV",
        "class": "fij",
        "airport": "Vanua Balavu Airport",
        "label": "Vanuabalavu, Fiji (VBV)"
    }, {
        "country": "Fiji",
        "city": "Lakeba",
        "code": "LKB",
        "class": "fij",
        "airport": "Lakeba Island Airport",
        "label": "Lakeba, Fiji (LKB)"
    }, {
        "country": "Fiji",
        "city": "Malololailai",
        "code": "PTF",
        "class": "fij",
        "airport": "Malolo Lailai Island Airport",
        "label": "Malololailai, Fiji (PTF)"
    }, {
        "country": "Fiji",
        "city": "Taveuni",
        "code": "TVU",
        "class": "fij",
        "airport": "Matei Airport",
        "label": "Taveuni, Fiji (TVU)"
    }, {
        "country": "Fiji",
        "city": "Cicia",
        "code": "ICI",
        "class": "fij",
        "airport": "Cicia Airport",
        "label": "Cicia, Fiji (ICI)"
    }, {
        "country": "Fiji",
        "city": "Mana Island",
        "code": "MNF",
        "class": "fij",
        "airport": "Mana Island Airport",
        "label": "Mana Island, Fiji (MNF)"
    }, {
        "country": "Fiji",
        "city": "Moala",
        "code": "MFJ",
        "class": "fij",
        "airport": "Moala Airport",
        "label": "Moala, Fiji (MFJ)"
    }, {
        "country": "Fiji",
        "city": "Ngau Island",
        "code": "NGI",
        "class": "fij",
        "airport": "Ngau Airport",
        "label": "Ngau Island, Fiji (NGI)"
    }, {
        "country": "Finland",
        "city": "Kokkola\/Pietarsaari",
        "code": "KOK",
        "class": "fin",
        "airport": "Kruunupyy Airport",
        "label": "Kokkola\/Pietarsaari, Finland (KOK)"
    }, {
        "country": "Finland",
        "city": "Kemi\/Tornio",
        "code": "KEM",
        "class": "fin",
        "airport": "Kemi-Tornio Airport",
        "label": "Kemi\/Tornio, Finland (KEM)"
    }, {
        "country": "Finland",
        "city": "Kittila",
        "code": "KTT",
        "class": "fin",
        "airport": "Kittila Airport",
        "label": "Kittila, Finland (KTT)"
    }, {
        "country": "Finland",
        "city": "Mariehamn",
        "code": "MHQ",
        "class": "fin",
        "airport": "Mariehamn Airport",
        "label": "Mariehamn, Finland (MHQ)"
    }, {
        "country": "Finland",
        "city": "Tampere",
        "code": "TMP",
        "class": "fin",
        "airport": "Tampere-Pirkkala Airport",
        "label": "Tampere, Finland (TMP)"
    }, {
        "country": "Finland",
        "city": "Seinajoki",
        "code": "SJY",
        "class": "fin",
        "airport": null,
        "label": "Seinajoki, Finland (SJY)"
    }, {
        "country": "Finland",
        "city": "Joensuu",
        "code": "JOE",
        "class": "fin",
        "airport": "Joensuu Airport",
        "label": "Joensuu, Finland (JOE)"
    }, {
        "country": "Finland",
        "city": "Savonlinna",
        "code": "SVL",
        "class": "fin",
        "airport": "Savonlinna Airport",
        "label": "Savonlinna, Finland (SVL)"
    }, {
        "country": "Finland",
        "city": "Jyvaskyla",
        "code": "JYV",
        "class": "fin",
        "airport": "Jyvaskyla Airport",
        "label": "Jyvaskyla, Finland (JYV)"
    }, {
        "country": "Finland",
        "city": "Rovaniemi",
        "code": "RVN",
        "class": "fin",
        "airport": "Rovaniemi Airport",
        "label": "Rovaniemi, Finland (RVN)"
    }, {
        "country": "Finland",
        "city": "Ivalo",
        "code": "IVL",
        "class": "fin",
        "airport": "Ivalo Airport",
        "label": "Ivalo, Finland (IVL)"
    }, {
        "country": "Finland",
        "city": "Kajaani",
        "code": "KAJ",
        "class": "fin",
        "airport": "Kajaani Airport",
        "label": "Kajaani, Finland (KAJ)"
    }, {
        "country": "Finland",
        "city": "Helsinki",
        "code": "HEL",
        "class": "fin",
        "airport": "Helsinki Vantaa Airport",
        "label": "Helsinki, Finland (HEL)"
    }, {
        "country": "Finland",
        "city": "Vaasa",
        "code": "VAA",
        "class": "fin",
        "airport": "Vaasa Airport",
        "label": "Vaasa, Finland (VAA)"
    }, {
        "country": "Finland",
        "city": "Enontekio",
        "code": "ENF",
        "class": "fin",
        "airport": "Enontekio Airport",
        "label": "Enontekio, Finland (ENF)"
    }, {
        "country": "Finland",
        "city": "Kuopio",
        "code": "KUO",
        "class": "fin",
        "airport": "Kuopio Airport",
        "label": "Kuopio, Finland (KUO)"
    }, {
        "country": "Finland",
        "city": "Turku",
        "code": "TKU",
        "class": "fin",
        "airport": "Turku Airport",
        "label": "Turku, Finland (TKU)"
    }, {
        "country": "Finland",
        "city": "Pori",
        "code": "POR",
        "class": "fin",
        "airport": "Pori Airport",
        "label": "Pori, Finland (POR)"
    }, {
        "country": "Finland",
        "city": "Kuusamo",
        "code": "KAO",
        "class": "fin",
        "airport": "Kuusamo Airport",
        "label": "Kuusamo, Finland (KAO)"
    }, {
        "country": "Finland",
        "city": "Oulu",
        "code": "OUL",
        "class": "fin",
        "airport": "Oulu Airport",
        "label": "Oulu, Finland (OUL)"
    }, {
        "country": "France",
        "city": "Bergerac",
        "code": "EGC",
        "class": "fra",
        "airport": null,
        "label": "Bergerac, France (EGC)"
    }, {
        "country": "France",
        "city": "Grenoble",
        "code": "GNB",
        "class": "fra",
        "airport": null,
        "label": "Grenoble, France (GNB)"
    }, {
        "country": "France",
        "city": "Dinard",
        "code": "DNR",
        "class": "fra",
        "airport": "Dinard-Pleurtuit-Saint-Malo Airport",
        "label": "Dinard, France (DNR)"
    }, {
        "country": "France",
        "city": "Bastia",
        "code": "BIA",
        "class": "fra",
        "airport": "Bastia-Poretta Airport",
        "label": "Bastia, France (BIA)"
    }, {
        "country": "France",
        "city": "Brest",
        "code": "BES",
        "class": "fra",
        "airport": "Brest Bretagne Airport",
        "label": "Brest, France (BES)"
    }, {
        "country": "France",
        "city": "Bordeaux",
        "code": "BOD",
        "class": "fra",
        "airport": null,
        "label": "Bordeaux, France (BOD)"
    }, {
        "country": "France",
        "city": "Biarritz",
        "code": "BIQ",
        "class": "fra",
        "airport": "Biarritz-Anglet-Bayonne Airport",
        "label": "Biarritz, France (BIQ)"
    }, {
        "country": "France",
        "city": "Brive-La-Gaillarde",
        "code": "BVE",
        "class": "fra",
        "airport": "Brive-La Roche Airport",
        "label": "Brive-La-Gaillarde, France (BVE)"
    }, {
        "country": "France",
        "city": "Avignon",
        "code": "AVN",
        "class": "fra",
        "airport": "Avignon-Caumont Airport",
        "label": "Avignon, France (AVN)"
    }, {
        "country": "France",
        "city": "Figari",
        "code": "FSC",
        "class": "fra",
        "airport": "Figari Sud-Corse Airport",
        "label": "Figari, France (FSC)"
    }, {
        "country": "France",
        "city": "Dijon",
        "code": "DIJ",
        "class": "fra",
        "airport": "Dijon-Bourgogne Airport",
        "label": "Dijon, France (DIJ)"
    }, {
        "country": "France",
        "city": "Beziers",
        "code": "BZR",
        "class": "fra",
        "airport": null,
        "label": "Beziers, France (BZR)"
    }, {
        "country": "France",
        "city": "Lourdes\/Tarbes",
        "code": "LDE",
        "class": "fra",
        "airport": null,
        "label": "Lourdes\/Tarbes, France (LDE)"
    }, {
        "country": "France",
        "city": "Rennes",
        "code": "RNS",
        "class": "fra",
        "airport": "Rennes-Saint-Jacques Airport",
        "label": "Rennes, France (RNS)"
    }, {
        "country": "France",
        "city": "Rodez",
        "code": "RDZ",
        "class": "fra",
        "airport": "Rodez-Marcillac Airport",
        "label": "Rodez, France (RDZ)"
    }, {
        "country": "France",
        "city": "Rouen",
        "code": "URO",
        "class": "fra",
        "airport": "Rouen Airport",
        "label": "Rouen, France (URO)"
    }, {
        "country": "France",
        "city": "Quimper",
        "code": "UIP",
        "class": "fra",
        "airport": "Quimper-Cornouaille Airport",
        "label": "Quimper, France (UIP)"
    }, {
        "country": "France",
        "city": "Nice",
        "code": "NCE",
        "class": "fra",
        "airport": null,
        "label": "Nice, France (NCE)"
    }, {
        "country": "France",
        "city": "Perpignan",
        "code": "PGF",
        "class": "fra",
        "airport": null,
        "label": "Perpignan, France (PGF)"
    }, {
        "country": "France",
        "city": "Poitiers",
        "code": "PIS",
        "class": "fra",
        "airport": "Poitiers-Biard Airport",
        "label": "Poitiers, France (PIS)"
    }, {
        "country": "France",
        "city": "St Nazaire",
        "code": "SNR",
        "class": "fra",
        "airport": "Saint-Nazaire-Montoir Airport",
        "label": "St Nazaire, France (SNR)"
    }, {
        "country": "France",
        "city": "Strasbourg",
        "code": "SXB",
        "class": "fra",
        "airport": "Strasbourg Airport",
        "label": "Strasbourg, France (SXB)"
    }, {
        "country": "France",
        "city": "Strasbourg",
        "code": "SXB",
        "class": "fra",
        "airport": "Strasbourg Airport",
        "label": "Strasbourg, France (SXB)"
    }, {
        "country": "France",
        "city": "Paris",
        "code": "CDG",
        "class": "fra",
        "airport": "Charles de Gaulle International Airport",
        "label": "Paris, France - Charles De Gaulle Airport (CDG)"
    }, {
        "country": "France",
        "city": "Paris",
        "code": "ORY",
        "class": "fra",
        "airport": "Paris-Orly Airport",
        "label": "Paris, France - Orly Airport (ORY)"
    }, {
        "country": "France",
        "city": "Paris",
        "code": "BVA",
        "class": "fra",
        "airport": null,
        "label": "Paris, France - Beauvais-Tille Airport (BVA)"
    }, {
        "country": "France",
        "city": "Paris",
        "code": "BVA",
        "class": "fra",
        "airport": null,
        "label": "Paris, France - Beauvais-Tille Airport (BVA)"
    }, {
        "country": "France",
        "city": "Toulouse",
        "code": "TLS",
        "class": "fra",
        "airport": "Toulouse-Blagnac Airport",
        "label": "Toulouse, France (TLS)"
    }, {
        "country": "France",
        "city": "Pau",
        "code": "PUF",
        "class": "fra",
        "airport": null,
        "label": "Pau, France (PUF)"
    }, {
        "country": "France",
        "city": "Nantes",
        "code": "NTE",
        "class": "fra",
        "airport": "Nantes Atlantique Airport",
        "label": "Nantes, France (NTE)"
    }, {
        "country": "France",
        "city": "Le Havre",
        "code": "LEH",
        "class": "fra",
        "airport": "Le Havre Octeville Airport",
        "label": "Le Havre, France (LEH)"
    }, {
        "country": "France",
        "city": "Le Puy",
        "code": "LPY",
        "class": "fra",
        "airport": "Le Puy-Loudes Airport",
        "label": "Le Puy, France (LPY)"
    }, {
        "country": "France",
        "city": "Lille",
        "code": "LIL",
        "class": "fra",
        "airport": "Lille-Lesquin Airport",
        "label": "Lille, France (LIL)"
    }, {
        "country": "France",
        "city": "Lannion",
        "code": "LAI",
        "class": "fra",
        "airport": null,
        "label": "Lannion, France (LAI)"
    }, {
        "country": "France",
        "city": "La Rochelle",
        "code": "LRH",
        "class": "fra",
        "airport": null,
        "label": "La Rochelle, France (LRH)"
    }, {
        "country": "France",
        "city": "Annecy",
        "code": "NCY",
        "class": "fra",
        "airport": "Annecy-Haute-Savoie-Mont Blanc Airport",
        "label": "Annecy, France (NCY)"
    }, {
        "country": "France",
        "city": "Angers",
        "code": "ANE",
        "class": "fra",
        "airport": "Angers-Loire Airport",
        "label": "Angers, France (ANE)"
    }, {
        "country": "France",
        "city": "Limoges",
        "code": "LIG",
        "class": "fra",
        "airport": "Limoges Airport",
        "label": "Limoges, France (LIG)"
    }, {
        "country": "France",
        "city": "Lorient",
        "code": "LRT",
        "class": "fra",
        "airport": "Lorient South Brittany (Bretagne Sud) Airport",
        "label": "Lorient, France (LRT)"
    }, {
        "country": "France",
        "city": "Montpellier",
        "code": "MPL",
        "class": "fra",
        "airport": null,
        "label": "Montpellier, France (MPL)"
    }, {
        "country": "France",
        "city": "Montpellier",
        "code": "MPL",
        "class": "fra",
        "airport": null,
        "label": "Montpellier, France (MPL)"
    }, {
        "country": "France",
        "city": "Agen",
        "code": "AGF",
        "class": "fra",
        "airport": "Agen-La Garenne Airport",
        "label": "Agen, France (AGF)"
    }, {
        "country": "France",
        "city": "Ajaccio",
        "code": "AJA",
        "class": "fra",
        "airport": null,
        "label": "Ajaccio, France (AJA)"
    }, {
        "country": "France",
        "city": "Lyon",
        "code": "LYS",
        "class": "fra",
        "airport": null,
        "label": "Lyon, France (LYS)"
    }, {
        "country": "France",
        "city": "Marseille",
        "code": "MRS",
        "class": "fra",
        "airport": "Marseille Provence Airport",
        "label": "Marseille, France (MRS)"
    }, {
        "country": "France",
        "city": "Aurillac",
        "code": "AUR",
        "class": "fra",
        "airport": "Aurillac Airport",
        "label": "Aurillac, France (AUR)"
    }, {
        "country": "France",
        "city": "Metz\/Nancy",
        "code": "ETZ",
        "class": "fra",
        "airport": "Metz-Nancy-Lorraine Airport",
        "label": "Metz\/Nancy, France (ETZ)"
    }, {
        "country": "France",
        "city": "Clermont-Ferrand",
        "code": "CFE",
        "class": "fra",
        "airport": "Clermont-Ferrand Auvergne Airport",
        "label": "Clermont-Ferrand, France (CFE)"
    }, {
        "country": "France",
        "city": "Chambery",
        "code": "CMF",
        "class": "fra",
        "airport": null,
        "label": "Chambery, France (CMF)"
    }, {
        "country": "France",
        "city": "Caen",
        "code": "CFR",
        "class": "fra",
        "airport": "Caen-Carpiquet Airport",
        "label": "Caen, France (CFR)"
    }, {
        "country": "France",
        "city": "Cherbourg",
        "code": "CER",
        "class": "fra",
        "airport": "Cherbourg-Maupertus Airport",
        "label": "Cherbourg, France (CER)"
    }, {
        "country": "France",
        "city": "Castres",
        "code": "DCM",
        "class": "fra",
        "airport": "Castres-Mazamet Airport",
        "label": "Castres, France (DCM)"
    }, {
        "country": "France",
        "city": "Calvi",
        "code": "CLY",
        "class": "fra",
        "airport": "Calvi-Sainte-Catherine Airport",
        "label": "Calvi, France (CLY)"
    }, {
        "country": "French Guiana",
        "city": "Cayenne",
        "code": "CAY",
        "class": "fre",
        "airport": "Cayenne-Rochambeau Airport",
        "label": "Cayenne, French Guiana (CAY)"
    }, {
        "country": "French Polynesia",
        "city": "Bora Bora",
        "code": "BOB",
        "class": "fre",
        "airport": "Bora Bora Airport",
        "label": "Bora Bora, French Polynesia (BOB)"
    }, {
        "country": "French Polynesia",
        "city": "Papeete",
        "code": "PPT",
        "class": "fre",
        "airport": "Faa'a International Airport",
        "label": "Papeete - Tahiti, French Polynesia (PPT)"
    }, {
        "country": "Gabon",
        "city": "Oyem",
        "code": "OYE",
        "class": "gab",
        "airport": "Oyem Airport",
        "label": "Oyem, Gabon (OYE)"
    }, {
        "country": "Gabon",
        "city": "Franceville",
        "code": "MVB",
        "class": "gab",
        "airport": "M'Vengue El Hadj Omar Bongo Ondimba International Airport",
        "label": "Franceville, Gabon (MVB)"
    }, {
        "country": "Gabon",
        "city": "Tchibanga",
        "code": "TCH",
        "class": "gab",
        "airport": "Tchibanga Airport",
        "label": "Tchibanga, Gabon (TCH)"
    }, {
        "country": "Gabon",
        "city": "Koulamoutou",
        "code": "KOU",
        "class": "gab",
        "airport": "Koulamoutou Airport",
        "label": "Koulamoutou, Gabon (KOU)"
    }, {
        "country": "Gabon",
        "city": "Mouila",
        "code": "MJL",
        "class": "gab",
        "airport": "Mouilla Ville Airport",
        "label": "Mouila, Gabon (MJL)"
    }, {
        "country": "Gabon",
        "city": "Omboue",
        "code": "OMB",
        "class": "gab",
        "airport": "Omboue Hopital Airport",
        "label": "Omboue, Gabon (OMB)"
    }, {
        "country": "Gabon",
        "city": "Port Gentil",
        "code": "POG",
        "class": "gab",
        "airport": "Port Gentil Airport",
        "label": "Port Gentil, Gabon (POG)"
    }, {
        "country": "Gabon",
        "city": "Gamba",
        "code": "GAX",
        "class": "gab",
        "airport": "Gamba Airport",
        "label": "Gamba, Gabon (GAX)"
    }, {
        "country": "Gabon",
        "city": "Libreville",
        "code": "LBV",
        "class": "gab",
        "airport": "Leon M Ba Airport",
        "label": "Libreville, Gabon (LBV)"
    }, {
        "country": "Gabon",
        "city": "Makokou",
        "code": "MKU",
        "class": "gab",
        "airport": "Makokou Airport",
        "label": "Makokou, Gabon (MKU)"
    }, {
        "country": "Georgia",
        "city": "Batumi",
        "code": "BUS",
        "class": "geo",
        "airport": "Batumi International Airport",
        "label": "Batumi, Georgia (BUS)"
    }, {
        "country": "Georgia",
        "city": "Kutaisi",
        "code": "KUT",
        "class": "geo",
        "airport": "Kopitnari Airport",
        "label": "Kutaisi, Georgia (KUT)"
    }, {
        "country": "Georgia",
        "city": "Tbilisi",
        "code": "TBS",
        "class": "geo",
        "airport": "Tbilisi International Airport",
        "label": "Tbilisi, Georgia (TBS)"
    }, {
        "country": "Germany",
        "city": "Nuremberg",
        "code": "NUE",
        "class": "ger",
        "airport": "Nuremberg Airport",
        "label": "Nuremberg, Germany (NUE)"
    }, {
        "country": "Germany",
        "city": "Nuremberg",
        "code": "NUE",
        "class": "ger",
        "airport": "Nuremberg Airport",
        "label": "Nuremberg, Germany (NUE)"
    }, {
        "country": "Germany",
        "city": "Berlin",
        "code": "TXL",
        "class": "ger",
        "airport": "Berlin-Tegel International Airport",
        "label": "Berlin, Germany (TXL)"
    }, {
        "country": "Germany",
        "city": "Berlin",
        "code": "TXL",
        "class": "ger",
        "airport": "Berlin-Tegel International Airport",
        "label": "Berlin, Germany (TXL)"
    }, {
        "country": "Germany",
        "city": "Dresden",
        "code": "DRS",
        "class": "ger",
        "airport": "Dresden Airport",
        "label": "Dresden, Germany (DRS)"
    }, {
        "country": "Germany",
        "city": "Paderborn",
        "code": "PAD",
        "class": "ger",
        "airport": "Paderborn Lippstadt Airport",
        "label": "Paderborn, Germany (PAD)"
    }, {
        "country": "Germany",
        "city": "Bremen",
        "code": "BRE",
        "class": "ger",
        "airport": "Bremen Airport",
        "label": "Bremen, Germany (BRE)"
    }, {
        "country": "Germany",
        "city": "Berlin",
        "code": "SXF",
        "class": "ger",
        "airport": null,
        "label": "Berlin, Germany - Schonefeld Airport (SXF)"
    }, {
        "country": "Germany",
        "city": "Kassel",
        "code": "KSF",
        "class": "ger",
        "airport": "Kassel-Calden Airport",
        "label": "Kassel, Germany (KSF)"
    }, {
        "country": "Germany",
        "city": "Erfurt",
        "code": "ERF",
        "class": "ger",
        "airport": "Erfurt Airport",
        "label": "Erfurt, Germany (ERF)"
    }, {
        "country": "Germany",
        "city": "Luebeck",
        "code": "LBC",
        "class": "ger",
        "airport": null,
        "label": "Luebeck, Germany (LBC)"
    }, {
        "country": "Germany",
        "city": "Berlin",
        "code": "THF",
        "class": "ger",
        "airport": "Berlin-Tempelhof International Airport",
        "label": "Berlin, Germany (THF)"
    }, {
        "country": "Germany",
        "city": "Memmingen",
        "code": "FMM",
        "class": "ger",
        "airport": "Memmingen Allgau Airport",
        "label": "Memmingen, Germany (FMM)"
    }, {
        "country": "Germany",
        "city": "Hamburg",
        "code": "HAM",
        "class": "ger",
        "airport": "Hamburg Airport",
        "label": "Hamburg, Germany (HAM)"
    }, {
        "country": "Germany",
        "city": "Hamburg",
        "code": "HAM",
        "class": "ger",
        "airport": "Hamburg Airport",
        "label": "Hamburg, Germany (HAM)"
    }, {
        "country": "Germany",
        "city": "Mannheim",
        "code": "MHG",
        "class": "ger",
        "airport": "Mannheim-City Airport",
        "label": "Mannheim, Germany (MHG)"
    }, {
        "country": "Germany",
        "city": "Stuttgart",
        "code": "STR",
        "class": "ger",
        "airport": "Stuttgart Airport",
        "label": "Stuttgart, Germany (STR)"
    }, {
        "country": "Germany",
        "city": "Leipzig\/Halle",
        "code": "LEJ",
        "class": "ger",
        "airport": "Leipzig Halle Airport",
        "label": "Leipzig\/Halle, Germany (LEJ)"
    }, {
        "country": "Germany",
        "city": "Friedrichshafen",
        "code": "FDH",
        "class": "ger",
        "airport": "Friedrichshafen Airport",
        "label": "Friedrichshafen, Germany (FDH)"
    }, {
        "country": "Germany",
        "city": "Cologne",
        "code": "CGN",
        "class": "ger",
        "airport": "Cologne Bonn Airport",
        "label": "Cologne, Germany (CGN)"
    }, {
        "country": "Germany",
        "city": "Saarbruecken",
        "code": "SCN",
        "class": "ger",
        "airport": null,
        "label": "Saarbruecken, Germany (SCN)"
    }, {
        "country": "Germany",
        "city": "Rostock-laage",
        "code": "RLG",
        "class": "ger",
        "airport": "Rostock-Laage Airport",
        "label": "Rostock-laage, Germany (RLG)"
    }, {
        "country": "Germany",
        "city": "Dusseldorf",
        "code": "DUS",
        "class": "ger",
        "airport": "Dusseldorf International Airport",
        "label": "Dusseldorf, Germany (DUS)"
    }, {
        "country": "Germany",
        "city": "Hannover",
        "code": "HAJ",
        "class": "ger",
        "airport": "Hannover Airport",
        "label": "Hannover, Germany (HAJ)"
    }, {
        "country": "Germany",
        "city": "Dortmund",
        "code": "DTM",
        "class": "ger",
        "airport": "Dortmund Airport",
        "label": "Dortmund, Germany (DTM)"
    }, {
        "country": "Germany",
        "city": "Frankfurt",
        "code": "FRA",
        "class": "ger",
        "airport": "Frankfurt am Main International Airport",
        "label": "Frankfurt, Germany (FRA)"
    }, {
        "country": "Germany",
        "city": "Helgoland",
        "code": "HGL",
        "class": "ger",
        "airport": null,
        "label": "Helgoland, Germany (HGL)"
    }, {
        "country": "Germany",
        "city": "Neumuenster",
        "code": "EUM",
        "class": "ger",
        "airport": null,
        "label": "Neumuenster, Germany (EUM)"
    }, {
        "country": "Germany",
        "city": "Muenster",
        "code": "FMO",
        "class": "ger",
        "airport": "Muenster Osnabrueck Airport",
        "label": "Muenster, Germany (FMO)"
    }, {
        "country": "Germany",
        "city": "Muenster",
        "code": "FMO",
        "class": "ger",
        "airport": "Muenster Osnabrueck Airport",
        "label": "Muenster, Germany (FMO)"
    }, {
        "country": "Germany",
        "city": "Frankfurt",
        "code": "HHN",
        "class": "ger",
        "airport": "Frankfurt-Hahn Airport",
        "label": "Frankfurt, Germany (HHN)"
    }, {
        "country": "Germany",
        "city": "Heringsdorf",
        "code": "HDF",
        "class": "ger",
        "airport": "Heringsdorf Airport",
        "label": "Heringsdorf, Germany (HDF)"
    }, {
        "country": "Germany",
        "city": "Hof",
        "code": "HOQ",
        "class": "ger",
        "airport": "Hof-Plauen Airport",
        "label": "Hof, Germany (HOQ)"
    }, {
        "country": "Germany",
        "city": "Munich",
        "code": "MUC",
        "class": "ger",
        "airport": "Munich-Reim Airport",
        "label": "Munich, Germany (MUC)"
    }, {
        "country": "Germany",
        "city": "Karlsruhe\/Baden Baden",
        "code": "FKB",
        "class": "ger",
        "airport": "Karlsruhe Baden-Baden Airport",
        "label": "Karlsruhe\/Baden Baden, Germany (FKB)"
    }, {
        "country": "Germany",
        "city": "Westerland",
        "code": "GWT",
        "class": "ger",
        "airport": "Westerland Sylt Airport",
        "label": "Westerland, Germany (GWT)"
    }, {
        "country": "Ghana",
        "city": "Accra",
        "code": "ACC",
        "class": "gha",
        "airport": "Kotoka International Airport",
        "label": "Accra, Ghana (ACC)"
    }, {
        "country": "Gibraltar",
        "city": "Gibraltar",
        "code": "GIB",
        "class": "gib",
        "airport": "Gibraltar Airport",
        "label": "Gibraltar, Gibraltar (GIB)"
    }, {
        "country": "Greece",
        "city": "Paros",
        "code": "PAS",
        "class": "gre",
        "airport": "Paros Airport",
        "label": "Paros, Greece (PAS)"
    }, {
        "country": "Greece",
        "city": "Milos",
        "code": "MLO",
        "class": "gre",
        "airport": "Milos Airport",
        "label": "Milos, Greece (MLO)"
    }, {
        "country": "Greece",
        "city": "Ioannina",
        "code": "IOA",
        "class": "gre",
        "airport": "Ioannina Airport",
        "label": "Ioannina, Greece (IOA)"
    }, {
        "country": "Greece",
        "city": "Karpathos",
        "code": "AOK",
        "class": "gre",
        "airport": "Karpathos Airport",
        "label": "Karpathos, Greece (AOK)"
    }, {
        "country": "Greece",
        "city": "Kozani",
        "code": "KZI",
        "class": "gre",
        "airport": "Filippos Airport",
        "label": "Kozani, Greece (KZI)"
    }, {
        "country": "Greece",
        "city": "Rhodes",
        "code": "RHO",
        "class": "gre",
        "airport": "Diagoras Airport",
        "label": "Rhodes, Greece (RHO)"
    }, {
        "country": "Greece",
        "city": "Ikaria Island",
        "code": "JIK",
        "class": "gre",
        "airport": "Ikaria Airport",
        "label": "Ikaria Island, Greece (JIK)"
    }, {
        "country": "Greece",
        "city": "Limnos",
        "code": "LXS",
        "class": "gre",
        "airport": "Limnos Airport",
        "label": "Limnos, Greece (LXS)"
    }, {
        "country": "Greece",
        "city": "Naxos",
        "code": "JNX",
        "class": "gre",
        "airport": "Naxos Airport",
        "label": "Naxos, Greece (JNX)"
    }, {
        "country": "Greece",
        "city": "Preveza\/Lefkas",
        "code": "PVK",
        "class": "gre",
        "airport": "Aktion National Airport",
        "label": "Preveza\/Lefkas, Greece (PVK)"
    }, {
        "country": "Greece",
        "city": "Leros",
        "code": "LRS",
        "class": "gre",
        "airport": "Leros Airport",
        "label": "Leros, Greece (LRS)"
    }, {
        "country": "Greece",
        "city": "Heraklion",
        "code": "HER",
        "class": "gre",
        "airport": "Heraklion International Nikos Kazantzakis Airport",
        "label": "Heraklion, Greece (HER)"
    }, {
        "country": "Greece",
        "city": "Chios",
        "code": "JKH",
        "class": "gre",
        "airport": "Chios Island National Airport",
        "label": "Chios, Greece (JKH)"
    }, {
        "country": "Greece",
        "city": "Chania",
        "code": "CHQ",
        "class": "gre",
        "airport": "Chania International Airport",
        "label": "Chania, Greece (CHQ)"
    }, {
        "country": "Greece",
        "city": "Patras",
        "code": "GPA",
        "class": "gre",
        "airport": "Araxos Airport",
        "label": "Patras, Greece (GPA)"
    }, {
        "country": "Greece",
        "city": "Volos",
        "code": "VOL",
        "class": "gre",
        "airport": "Nea Anchialos Airport",
        "label": "Volos, Greece (VOL)"
    }, {
        "country": "Greece",
        "city": "Mikonos",
        "code": "JMK",
        "class": "gre",
        "airport": "Mikonos Airport",
        "label": "Mikonos, Greece (JMK)"
    }, {
        "country": "Greece",
        "city": "Thira",
        "code": "JTR",
        "class": "gre",
        "airport": "Santorini Airport",
        "label": "Thira, Greece (JTR)"
    }, {
        "country": "Greece",
        "city": "Athens",
        "code": "ATH",
        "class": "gre",
        "airport": "Eleftherios Venizelos International Airport",
        "label": "Athens, Greece (ATH)"
    }, {
        "country": "Greece",
        "city": "Syros Island",
        "code": "JSY",
        "class": "gre",
        "airport": "Syros Airport",
        "label": "Syros Island, Greece (JSY)"
    }, {
        "country": "Greece",
        "city": "Kastoria",
        "code": "KSO",
        "class": "gre",
        "airport": "Kastoria National Airport",
        "label": "Kastoria, Greece (KSO)"
    }, {
        "country": "Greece",
        "city": "Kavala",
        "code": "KVA",
        "class": "gre",
        "airport": "Alexander the Great International Airport",
        "label": "Kavala, Greece (KVA)"
    }, {
        "country": "Greece",
        "city": "Kavala",
        "code": "KVA",
        "class": "gre",
        "airport": "Alexander the Great International Airport",
        "label": "Kavala, Greece (KVA)"
    }, {
        "country": "Greece",
        "city": "Kastelorizo",
        "code": "KZS",
        "class": "gre",
        "airport": "Kastelorizo Airport",
        "label": "Kastelorizo, Greece (KZS)"
    }, {
        "country": "Greece",
        "city": "Zakinthos",
        "code": "ZTH",
        "class": "gre",
        "airport": "Dionysios Solomos Airport",
        "label": "Zakinthos, Greece (ZTH)"
    }, {
        "country": "Greece",
        "city": "Skiros",
        "code": "SKU",
        "class": "gre",
        "airport": "Skiros Airport",
        "label": "Skiros, Greece (SKU)"
    }, {
        "country": "Greece",
        "city": "Skiathos",
        "code": "JSI",
        "class": "gre",
        "airport": "Skiathos Island National Airport",
        "label": "Skiathos, Greece (JSI)"
    }, {
        "country": "Greece",
        "city": "Sitia",
        "code": "JSH",
        "class": "gre",
        "airport": "Sitia Airport",
        "label": "Sitia, Greece (JSH)"
    }, {
        "country": "Greece",
        "city": "Kasos Island",
        "code": "KSJ",
        "class": "gre",
        "airport": "Kasos Airport",
        "label": "Kasos Island, Greece (KSJ)"
    }, {
        "country": "Greece",
        "city": "Alexandroupolis",
        "code": "AXD",
        "class": "gre",
        "airport": "Dimokritos Airport",
        "label": "Alexandroupolis, Greece (AXD)"
    }, {
        "country": "Greece",
        "city": "Kalamata",
        "code": "KLX",
        "class": "gre",
        "airport": "Kalamata Airport",
        "label": "Kalamata, Greece (KLX)"
    }, {
        "country": "Greece",
        "city": "Thira",
        "code": "JTR",
        "class": "gre",
        "airport": "Santorini Airport",
        "label": "Thira - Santorini, Greece (JTR)"
    }, {
        "country": "Greece",
        "city": "Samos",
        "code": "SMI",
        "class": "gre",
        "airport": "Samos Airport",
        "label": "Samos, Greece (SMI)"
    }, {
        "country": "Greece",
        "city": "Kos",
        "code": "KGS",
        "class": "gre",
        "airport": "Kos Airport",
        "label": "Kos, Greece (KGS)"
    }, {
        "country": "Greece",
        "city": "Mytilene",
        "code": "MJT",
        "class": "gre",
        "airport": "Mytilene International Airport",
        "label": "Mytilene, Greece (MJT)"
    }, {
        "country": "Greece",
        "city": "Astypalaia Island",
        "code": "JTY",
        "class": "gre",
        "airport": "Astypalaia Airport",
        "label": "Astypalaia Island, Greece (JTY)"
    }, {
        "country": "Greece",
        "city": "Kithira",
        "code": "KIT",
        "class": "gre",
        "airport": "Kithira Airport",
        "label": "Kithira, Greece (KIT)"
    }, {
        "country": "Greece",
        "city": "Corfu",
        "code": "CFU",
        "class": "gre",
        "airport": "Ioannis Kapodistrias International Airport",
        "label": "Corfu, Greece (CFU)"
    }, {
        "country": "Greece",
        "city": "Thessaloniki",
        "code": "SKG",
        "class": "gre",
        "airport": "Thessaloniki Macedonia International Airport",
        "label": "Thessaloniki, Greece (SKG)"
    }, {
        "country": "Greece",
        "city": "Kefallinia",
        "code": "EFL",
        "class": "gre",
        "airport": "Kefallinia Airport",
        "label": "Kefallinia, Greece (EFL)"
    }, {
        "country": "Greenland",
        "city": "Alluitsup Paa",
        "code": "LLU",
        "class": "gre",
        "airport": "Alluitsup Paa Heliport",
        "label": "Alluitsup Paa, Greenland (LLU)"
    }, {
        "country": "Greenland",
        "city": "Nanortalik",
        "code": "JNN",
        "class": "gre",
        "airport": "Nanortalik Heliport",
        "label": "Nanortalik, Greenland (JNN)"
    }, {
        "country": "Greenland",
        "city": "Narsarsuaq",
        "code": "UAK",
        "class": "gre",
        "airport": "Narsarsuaq Airport",
        "label": "Narsarsuaq, Greenland (UAK)"
    }, {
        "country": "Greenland",
        "city": "Paamiut",
        "code": "JFR",
        "class": "gre",
        "airport": "Paamiut Airport",
        "label": "Paamiut, Greenland (JFR)"
    }, {
        "country": "Greenland",
        "city": "Aasiaat",
        "code": "JEG",
        "class": "gre",
        "airport": "Aasiaat Airport",
        "label": "Aasiaat, Greenland (JEG)"
    }, {
        "country": "Greenland",
        "city": "Nuuk",
        "code": "GOH",
        "class": "gre",
        "airport": "Godthaab \/ Nuuk Airport",
        "label": "Nuuk, Greenland (GOH)"
    }, {
        "country": "Greenland",
        "city": "Uummannaq",
        "code": "UMD",
        "class": "gre",
        "airport": "Uummannaq Heliport",
        "label": "Uummannaq, Greenland (UMD)"
    }, {
        "country": "Greenland",
        "city": "Tasiilaq",
        "code": "AGM",
        "class": "gre",
        "airport": "Tasiilaq Heliport",
        "label": "Tasiilaq, Greenland (AGM)"
    }, {
        "country": "Greenland",
        "city": "Kangerlussuaq",
        "code": "SFJ",
        "class": "gre",
        "airport": "Kangerlussuaq Airport",
        "label": "Kangerlussuaq, Greenland (SFJ)"
    }, {
        "country": "Greenland",
        "city": "Sisimiut",
        "code": "JHS",
        "class": "gre",
        "airport": "Sisimiut Airport",
        "label": "Sisimiut, Greenland (JHS)"
    }, {
        "country": "Greenland",
        "city": "Kulusuk",
        "code": "KUS",
        "class": "gre",
        "airport": "Kulusuk Airport",
        "label": "Kulusuk, Greenland (KUS)"
    }, {
        "country": "Greenland",
        "city": "Ilulissat",
        "code": "JAV",
        "class": "gre",
        "airport": "Ilulissat Airport",
        "label": "Ilulissat, Greenland (JAV)"
    }, {
        "country": "Greenland",
        "city": "Neerlerit Inaat",
        "code": "CNP",
        "class": "gre",
        "airport": "Neerlerit Inaat Airport",
        "label": "Neerlerit Inaat, Greenland (CNP)"
    }, {
        "country": "Greenland",
        "city": "Qaanaaq",
        "code": "NAQ",
        "class": "gre",
        "airport": "Qaanaaq Airport",
        "label": "Qaanaaq, Greenland (NAQ)"
    }, {
        "country": "Greenland",
        "city": "Qaarsut",
        "code": "JQA",
        "class": "gre",
        "airport": "Qaarsut Airport",
        "label": "Qaarsut, Greenland (JQA)"
    }, {
        "country": "Greenland",
        "city": "Qeqertarsuaq",
        "code": "JGO",
        "class": "gre",
        "airport": "Qeqertarsuaq Heliport",
        "label": "Qeqertarsuaq, Greenland (JGO)"
    }, {
        "country": "Greenland",
        "city": "Qasigiannguit",
        "code": "JCH",
        "class": "gre",
        "airport": "Qasigiannguit Heliport",
        "label": "Qasigiannguit, Greenland (JCH)"
    }, {
        "country": "Guam",
        "city": "Guam",
        "code": "GUM",
        "class": "gua",
        "airport": "Antonio B. Won Pat International Airport",
        "label": "Guam, Guam (GUM)"
    }, {
        "country": "Guinea",
        "city": "Bissau",
        "code": "OXB",
        "class": "gui",
        "airport": "Osvaldo Vieira International Airport",
        "label": "Bissau, Guinea (OXB)"
    }, {
        "country": "Guinea",
        "city": "Conakry",
        "code": "CKY",
        "class": "gui",
        "airport": "Conakry Airport",
        "label": "Conakry, Guinea (CKY)"
    }, {
        "country": "Guyana",
        "city": "Georgetown",
        "code": "GEO",
        "class": "guy",
        "airport": "Cheddi Jagan International Airport",
        "label": "Georgetown, Guyana (GEO)"
    }, {
        "country": "Haiti",
        "city": "Cap-Haitien",
        "code": "CAP",
        "class": "hai",
        "airport": "Cap Haitien International Airport",
        "label": "Cap-Haitien, Haiti (CAP)"
    }, {
        "country": "Hungary",
        "city": "Budapest",
        "code": "BUD",
        "class": "hun",
        "airport": "Budapest Listz Ferenc international Airport",
        "label": "Budapest, Hungary (BUD)"
    }, {
        "country": "Hungary",
        "city": "Saarmelleek",
        "code": "SOB",
        "class": "hun",
        "airport": null,
        "label": "Saarmelleek, Hungary (SOB)"
    }, {
        "country": "Iceland",
        "city": "Grimsey",
        "code": "GRY",
        "class": "ice",
        "airport": null,
        "label": "Grimsey, Iceland (GRY)"
    }, {
        "country": "Iceland",
        "city": "Reykjav\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00adk",
        "code": "REK",
        "class": "ice",
        "airport": "Reykjavik Airport",
        "label": "Reykjav\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00adk, Iceland (KEF)"
    }, {
        "country": "Iceland",
        "city": "Reykjav\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00adk",
        "code": "KEF",
        "class": "ice",
        "airport": "Keflavik International Airport",
        "label": "Reykjav\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00adk, Iceland - All Airports (REK)"
    }, {
        "country": "Iceland",
        "city": "Vestmannaeyjar",
        "code": "VEY",
        "class": "ice",
        "airport": "Vestmannaeyjar Airport",
        "label": "Vestmannaeyjar, Iceland (VEY)"
    }, {
        "country": "Iceland",
        "city": "Thorshofn",
        "code": "THO",
        "class": "ice",
        "airport": "Thorshofn Airport",
        "label": "Thorshofn, Iceland (THO)"
    }, {
        "country": "Iceland",
        "city": "Isafjordur",
        "code": "IFJ",
        "class": "ice",
        "airport": null,
        "label": "Isafjordur, Iceland (IFJ)"
    }, {
        "country": "Iceland",
        "city": "Akureyri",
        "code": "AEY",
        "class": "ice",
        "airport": "Akureyri Airport",
        "label": "Akureyri, Iceland (AEY)"
    }, {
        "country": "Iceland",
        "city": "Vopnafjordur",
        "code": "VPN",
        "class": "ice",
        "airport": null,
        "label": "Vopnafjordur, Iceland (VPN)"
    }, {
        "country": "Iceland",
        "city": "Vopnafjordur",
        "code": "VPN",
        "class": "ice",
        "airport": null,
        "label": "Vopnafjordur, Iceland (VPN)"
    }, {
        "country": "Iceland",
        "city": "Egilsstadir",
        "code": "EGS",
        "class": "ice",
        "airport": null,
        "label": "Egilsstadir, Iceland (EGS)"
    }, {
        "country": "India",
        "city": "Cochin",
        "code": "COK",
        "class": "ind",
        "airport": "Cochin International Airport",
        "label": "Cochin, India (COK)",
        "isrecent":"111"
    }, {
        "country": "India",
        "city": "Lucknow",
        "code": "LKO",
        "class": "ind",
        "airport": "Chaudhary Charan Singh International Airport",
        "label": "Lucknow, India (LKO)",
        "isrecent":"111"
    }, {
        "country": "India",
        "city": "Ropar",
        "code": "IXC",
        "class": "ind",
        "airport": "Chandigarh Airport",
        "label": "Ropar, India  (nearest airport Chandigarh, IXC)"
    }, {
        "country": "India",
        "city": "New Delhi",
        "code": "DEL",
        "class": "ind",
        "airport": "Indira Gandhi International Airport",
        "label": "New Delhi, India (DEL)",
        "isrecent":"111"
    }, {
        "country": "India",
        "city": "Mahabaleshwar",
        "code": "PNQ",
        "class": "ind",
        "airport": "Pune Airport",
        "label": "Mahabaleshwar, India  (nearest airport Pune, PNQ)"
    }, {
        "country": "India",
        "city": "Ladakh",
        "code": "IXL",
        "class": "ind",
        "airport": "Leh Kushok Bakula Rimpochee Airport",
        "label": "Ladakh, India  (nearest airport Leh, IXL)"
    }, {
        "country": "India",
        "city": "Mussorie",
        "code": "DED",
        "class": "ind",
        "airport": "Dehradun Airport",
        "label": "Mussorie, India  (nearest airport Dehradun, DED)"
    }, {
        "country": "India",
        "city": "Rameswaram",
        "code": "IXM",
        "class": "ind",
        "airport": "Madurai Airport",
        "label": "Rameswaram, India  (nearest airport Madurai, IXM)"
    }, {
        "country": "India",
        "city": "Hyderabad",
        "code": "HYD",
        "class": "ind",
        "airport": "Rajiv Gandhi Airport",
        "label": "Hyderabad, India (HYD)"
    }, {
        "country": "India",
        "city": "Mount Abu",
        "code": "UDR",
        "class": "ind",
        "airport": "Maharana Pratap Airport",
        "label": "Mount Abu, India  (nearest airport Udaipur, UDR)"
    }, {
        "country": "India",
        "city": "Lavasa",
        "code": "BOM",
        "class": "ind",
        "airport": "Chhatrapati Shivaji International Airport",
        "label": "Lavasa, India  (nearest airport Mumbai, BOM)"
    }, {
        "country": "India",
        "city": "Trivandrum",
        "code": "TRV",
        "class": "ind",
        "airport": "Trivandrum International Airport",
        "label": "Trivandrum, India (TRV)"
    }, {
        "country": "India",
        "city": "Pune",
        "code": "PNQ",
        "class": "ind",
        "airport": "Pune Airport",
        "label": "Pune, India (PNQ)"
    }, {
        "country": "India",
        "city": "Yercaud",
        "code": "TRZ",
        "class": "ind",
        "airport": "Tiruchirapally Civil Airport Airport",
        "label": "Yercaud, India  (nearest airport Tiruchirapalli, TRZ)"
    }, {
        "country": "India",
        "city": "Ranthambore",
        "code": "JAI",
        "class": "ind",
        "airport": "Jaipur International Airport",
        "label": "Ranthambore, India  (nearest airport Jaipur, JAI)"
    }, {
        "country": "India",
        "city": "Matheran",
        "code": "BOM",
        "class": "ind",
        "airport": "Chhatrapati Shivaji International Airport",
        "label": "Matheran, India  (nearest airport Mumbai, BOM)"
    }, {
        "country": "India",
        "city": "Ahmedabad",
        "code": "AMD",
        "class": "ind",
        "airport": "Sardar Vallabhbhai Patel International Airport",
        "label": "Ahmedabad, India (AMD)"
    }, {
        "country": "India",
        "city": "Munnar",
        "code": "COK",
        "class": "ind",
        "airport": "Cochin International Airport",
        "label": "Munnar, India  (nearest airport Cochin, COK)"
    }, {
        "country": "India",
        "city": "Lonavala",
        "code": "BOM",
        "class": "ind",
        "airport": "Chhatrapati Shivaji International Airport",
        "label": "Lonavala, India  (nearest airport Mumbai, BOM)"
    }, {
        "country": "India",
        "city": "Coimbatore",
        "code": "CJB",
        "class": "ind",
        "airport": "Coimbatore International Airport",
        "label": "Coimbatore, India (CJB)"
    }, {
        "country": "India",
        "city": "Vishakapatnam",
        "code": "VTZ",
        "class": "ind",
        "airport": "Vishakhapatnam Airport",
        "label": "Vishakapatnam, India (VTZ)"
    }, {
        "country": "India",
        "city": "Srinagar",
        "code": "SXR",
        "class": "ind",
        "airport": "Sheikh ul Alam Airport",
        "label": "Srinagar, India (SXR)"
    }, {
        "country": "India",
        "city": "Margao",
        "code": "GOI",
        "class": "ind",
        "airport": "Dabolim Airport",
        "label": "Margao, India  (nearest airport Goa, GOI)"
    }, {
        "country": "India",
        "city": "Indore",
        "code": "IDR",
        "class": "ind",
        "airport": "Devi Ahilyabai Holkar Airport",
        "label": "Indore, India (IDR)"
    }, {
        "country": "India",
        "city": "Nagpur",
        "code": "NAG",
        "class": "ind",
        "airport": "Dr. Babasaheb Ambedkar International Airport",
        "label": "Nagpur, India (NAG)"
    }, {
        "country": "India",
        "city": "Chandigarh",
        "code": "IXC",
        "class": "ind",
        "airport": "Chandigarh Airport",
        "label": "Chandigarh, India (IXC)"
    }, {
        "country": "India",
        "city": "Guwahati",
        "code": "GAU",
        "class": "ind",
        "airport": "Lokpriya Gopinath Bordoloi International Airport",
        "label": "Guwahati, India (GAU)"
    }, {
        "country": "India",
        "city": "Bhubaneshwar",
        "code": "BBI",
        "class": "ind",
        "airport": "Biju Patnaik Airport",
        "label": "Bhubaneshwar, India (BBI)"
    }, {
        "country": "India",
        "city": "Sikkim",
        "code": "IXB",
        "class": "ind",
        "airport": "Bagdogra Airport",
        "label": "Sikkim, India  (nearest airport Bagdogra, IXB)"
    }, {
        "country": "India",
        "city": "Sawai Madhopur",
        "code": "JAI",
        "class": "ind",
        "airport": "Jaipur International Airport",
        "label": "Sawai Madhopur, India  (nearest airport Jaipur, JAI)"
    }, {
        "country": "India",
        "city": "Shirdi",
        "code": "ISK",
        "class": "ind",
        "airport": "Gandhinagar Airport",
        "label": "Shirdi, India (nearest airport Nasik, ISK)"
    }, {
        "country": "India",
        "city": "Wayanad",
        "code": "CCJ",
        "class": "ind",
        "airport": "Calicut International Airport",
        "label": "Wayanad, India  (nearest airport Calicut, CCJ)"
    }, {
        "country": "India",
        "city": "Leh",
        "code": "IXL",
        "class": "ind",
        "airport": "Leh Kushok Bakula Rimpochee Airport",
        "label": "Leh, India (IXL)"
    }, {
        "country": "India",
        "city": "Lilabari",
        "code": "IXI",
        "class": "ind",
        "airport": "North Lakhimpur Airport",
        "label": "Lilabari, India (IXI)"
    }, {
        "country": "India",
        "city": "Patna",
        "code": "PAT",
        "class": "ind",
        "airport": "Lok Nayak Jayaprakash Airport",
        "label": "Patna, India (PAT)"
    }, {
        "country": "India",
        "city": "Shillong",
        "code": "SHL",
        "class": "ind",
        "airport": "Shillong Airport",
        "label": "Shillong, India (SHL)"
    }, {
        "country": "India",
        "city": "Salem",
        "code": "SXV",
        "class": "ind",
        "airport": "Salem Airport",
        "label": "Salem, India (SXV)"
    }, {
        "country": "India",
        "city": "Jaipur",
        "code": "JAI",
        "class": "ind",
        "airport": "Jaipur International Airport",
        "label": "Jaipur, India (JAI)"
    }, {
        "country": "India",
        "city": "Sholapur",
        "code": "PNQ",
        "class": "ind",
        "airport": "Pune Airport",
        "label": "Sholapur, India  (nearest airport Pune, PNQ)"
    }, {
        "country": "India",
        "city": "Latur",
        "code": "NDC",
        "class": "ind",
        "airport": "Nanded Airport",
        "label": "Latur, India  (nearest airport Nanded, NDC)"
    }, {
        "country": "India",
        "city": "Kausani",
        "code": "PGH",
        "class": "ind",
        "airport": "Pantnagar Airport",
        "label": "Kausani, India  (nearest airport Pantnagar, PGH)"
    }, {
        "country": "India",
        "city": "Pondicherry",
        "code": "PNY",
        "class": "ind",
        "airport": "Pondicherry Airport",
        "label": "Pondicherry, India(PNY)"
    }, {
        "country": "India",
        "city": "Agra",
        "code": "DEL",
        "class": "ind",
        "airport": "Indira Gandhi International Airport",
        "label": "Agra, India  (nearest airport New Delhi, DEL)"
    }, {
        "country": "India",
        "city": "Belgaum",
        "code": "IXG",
        "class": "ind",
        "airport": "Belgaum Airport",
        "label": "Belgaum, India (IXG)"
    }, {
        "country": "India",
        "city": "Nanded",
        "code": "NDC",
        "class": "ind",
        "airport": "Nanded Airport",
        "label": "Nanded, India (NDC)"
    }, {
        "country": "India",
        "city": "Bhavnagar",
        "code": "BHU",
        "class": "ind",
        "airport": "Bhavnagar Airport",
        "label": "Bhavnagar, India (BHU)"
    }, {
        "country": "India",
        "city": "Agra",
        "code": "AGR",
        "class": "ind",
        "airport": "Agra Airport",
        "label": "Agra, India (AGR)"
    }, {
        "country": "India",
        "city": "Manali",
        "code": "KUU",
        "class": "ind",
        "airport": "Kullu Manali Airport",
        "label": "Manali, India (KUU)"
    }, {
        "country": "India",
        "city": "Mysore",
        "code": "MYQ",
        "class": "ind",
        "airport": "Mysore Airport",
        "label": "Mysore, India (MYQ)"
    }, {
        "country": "India",
        "city": "Agatti Island",
        "code": "AGX",
        "class": "ind",
        "airport": "Agatti Airport",
        "label": "Agatti Island, India (AGX)"
    }, {
        "country": "India",
        "city": "Jamnagar",
        "code": "JGA",
        "class": "ind",
        "airport": "Jamnagar Airport",
        "label": "Jamnagar, India (JGA)"
    }, {
        "country": "India",
        "city": "Kullu",
        "code": "KUU",
        "class": "ind",
        "airport": "Kullu Manali Airport",
        "label": "Kullu, India (KUU)"
    }, {
        "country": "India",
        "city": "Madurai",
        "code": "IXM",
        "class": "ind",
        "airport": "Madurai Airport",
        "label": "Madurai, India (IXM)"
    }, {
        "country": "India",
        "city": "Dharamshala",
        "code": "DHM",
        "class": "ind",
        "airport": "Kangra Airport",
        "label": "Dharamshala, India (DHM)"
    }, {
        "country": "India",
        "city": "Sholapur",
        "code": "SSE",
        "class": "ind",
        "airport": "Solapur Airport",
        "label": "Sholapur, India (SSE)"
    }, {
        "country": "India",
        "city": "Siliguri",
        "code": "IXB",
        "class": "ind",
        "airport": "Bagdogra Airport",
        "label": "Siliguri, India  (nearest airport Bagdogra, IXB)"
    }, {
        "country": "India",
        "city": "Shimla",
        "code": "SLV",
        "class": "ind",
        "airport": "Shimla Airport",
        "label": "Shimla, India (SLV)"
    }, {
        "country": "India",
        "city": "Latur",
        "code": "LTU",
        "class": "ind",
        "airport": "Murod Kond Airport",
        "label": "Latur, India (LTU)"
    }, {
        "country": "India",
        "city": "Gaya",
        "code": "GAY",
        "class": "ind",
        "airport": "Gaya Airport",
        "label": "Gaya, India (GAY)"
    }, {
        "country": "India",
        "city": "Ludhiana",
        "code": "LUH",
        "class": "ind",
        "airport": "Ludhiana Airport",
        "label": "Ludhiana, India (LUH)"
    }, {
        "country": "India",
        "city": "Khajuraho",
        "code": "HJR",
        "class": "ind",
        "airport": "Khajuraho Airport",
        "label": "Khajuraho, India (HJR)"
    }, {
        "country": "India",
        "city": "Gwalior",
        "code": "GWL",
        "class": "ind",
        "airport": "Gwalior Airport",
        "label": "Gwalior, India (GWL)"
    }, {
        "country": "India",
        "city": "Porbandar",
        "code": "PBD",
        "class": "ind",
        "airport": "Porbandar Airport",
        "label": "Porbandar, India (PBD)"
    }, {
        "country": "India",
        "city": "Vadodara",
        "code": "BDQ",
        "class": "ind",
        "airport": "Vadodara Airport",
        "label": "Vadodara, India (BDQ)"
    }, {
        "country": "India",
        "city": "Jorhat",
        "code": "JRH",
        "class": "ind",
        "airport": "Jorhat Airport",
        "label": "Jorhat, India (JRH)"
    }, {
        "country": "India",
        "city": "Jorhat",
        "code": "JRH",
        "class": "ind",
        "airport": "Jorhat Airport",
        "label": "Jorhat, India (JRH)"
    }, {
        "country": "India",
        "city": "Aurangabad",
        "code": "IXU",
        "class": "ind",
        "airport": "Aurangabad Airport",
        "label": "Aurangabad, India (IXU)"
    }, {
        "country": "India",
        "city": "Agartala",
        "code": "IXA",
        "class": "ind",
        "airport": "Agartala Airport",
        "label": "Agartala, India (IXA)"
    }, {
        "country": "India",
        "city": "Jodhpur",
        "code": "JDH",
        "class": "ind",
        "airport": "Jodhpur Airport",
        "label": "Jodhpur, India (JDH)"
    }, {
        "country": "India",
        "city": "Surat",
        "code": "STV",
        "class": "ind",
        "airport": "Surat Airport",
        "label": "Surat, India (STV)"
    }, {
        "country": "India",
        "city": "Jabalpur",
        "code": "JLR",
        "class": "ind",
        "airport": "Jabalpur Airport",
        "label": "Jabalpur, India (JLR)"
    }, {
        "country": "India",
        "city": "Udaipur",
        "code": "UDR",
        "class": "ind",
        "airport": "Maharana Pratap Airport",
        "label": "Udaipur, India (UDR)"
    }, {
        "country": "India",
        "city": "Vijaywada",
        "code": "VGA",
        "class": "ind",
        "airport": "Vijayawada Airport",
        "label": "Vijaywada, India (VGA)"
    }, {
        "country": "India",
        "city": "Dehradun",
        "code": "DED",
        "class": "ind",
        "airport": "Dehradun Airport",
        "label": "Dehradun, India (DED)"
    }, {
        "country": "India",
        "city": "Tirupati",
        "code": "TIR",
        "class": "ind",
        "airport": "Tirupati Airport",
        "label": "Tirupati, India (TIR)"
    }, {
        "country": "India",
        "city": "Calicut",
        "code": "CCJ",
        "class": "ind",
        "airport": "Calicut International Airport",
        "label": "Calicut, India (CCJ)"
    }, {
        "country": "India",
        "city": "Imphal",
        "code": "IMF",
        "class": "ind",
        "airport": "Imphal Airport",
        "label": "Imphal, India (IMF)"
    }, {
        "country": "India",
        "city": "Dibrugarh",
        "code": "DIB",
        "class": "ind",
        "airport": "Dibrugarh Airport",
        "label": "Dibrugarh, India (DIB)"
    }, {
        "country": "India",
        "city": "Rajkot",
        "code": "RAJ",
        "class": "ind",
        "airport": "Rajkot Airport",
        "label": "Rajkot, India (RAJ)"
    }, {
        "country": "India",
        "city": "Dimapur",
        "code": "DMU",
        "class": "ind",
        "airport": "Dimapur Airport",
        "label": "Dimapur, India (DMU)"
    }, {
        "country": "India",
        "city": "Bhuj",
        "code": "BHJ",
        "class": "ind",
        "airport": "Bhuj Airport",
        "label": "Bhuj, India (BHJ)"
    }, {
        "country": "India",
        "city": "Amritsar",
        "code": "ATQ",
        "class": "ind",
        "airport": "Sri Guru Ram Dass Jee International Airport, Amritsar",
        "label": "Amritsar, India (ATQ)"
    }, {
        "country": "India",
        "city": "Kanpur",
        "code": "KNU",
        "class": "ind",
        "airport": "Kanpur Airport",
        "label": "Kanpur, India (KNU)"
    }, {
        "country": "India",
        "city": "Hubli",
        "code": "HBX",
        "class": "ind",
        "airport": "Hubli Airport",
        "label": "Hubli, India (HBX)"
    }, {
        "country": "India",
        "city": "Gorakhpur",
        "code": "GOP",
        "class": "ind",
        "airport": "Gorakhpur Airport",
        "label": "Gorakhpur, India (GOP)"
    }, {
        "country": "India",
        "city": "Allahabad",
        "code": "IXD",
        "class": "ind",
        "airport": "Allahabad Airport",
        "label": "Allahabad, India (IXD)"
    }, {
        "country": "India",
        "city": "Silchar",
        "code": "IXS",
        "class": "ind",
        "airport": "Silchar Airport",
        "label": "Silchar, India (IXS)"
    }, {
        "country": "India",
        "city": "Rajahmundry",
        "code": "RJA",
        "class": "ind",
        "airport": "Rajahmundry Airport",
        "label": "Rajahmundry, India (RJA)"
    }, {
        "country": "India",
        "city": "Aizawl",
        "code": "AJL",
        "class": "ind",
        "airport": "Lengpui Airport",
        "label": "Aizawl, India (AJL)"
    }, {
        "country": "India",
        "city": "Kolhapur",
        "code": "KLH",
        "class": "ind",
        "airport": "Kolhapur Airport",
        "label": "Kolhapur, India (KLH)"
    }, {
        "country": "India",
        "city": "Port Blair",
        "code": "IXZ",
        "class": "ind",
        "airport": "Vir Savarkar International Airport",
        "label": "Port Blair, India (IXZ)"
    }, {
        "country": "India",
        "city": "Raipur",
        "code": "RPR",
        "class": "ind",
        "airport": "Raipur Airport",
        "label": "Raipur, India (RPR)"
    }, {
        "country": "India",
        "city": "Tezpur",
        "code": "TEZ",
        "class": "ind",
        "airport": "Tezpur Airport",
        "label": "Tezpur, India (TEZ)"
    }, {
        "country": "India",
        "city": "Thekkady",
        "code": "IXM",
        "class": "ind",
        "airport": "Madurai Airport",
        "label": "Thekkady, India  (nearest airport Madurai, IXM)"
    }, {
        "country": "India",
        "city": "Daman",
        "code": "BOM",
        "class": "ind",
        "airport": "Chhatrapati Shivaji International Airport",
        "label": "Daman, India  (nearest airport Mumbai, BOM)"
    }, {
        "country": "India",
        "city": "Digha",
        "code": "CCU",
        "class": "ind",
        "airport": "Netaji Subhash Chandra Bose International Airport",
        "label": "Digha, India  (nearest airport Kolkata, CCU)"
    }, {
        "country": "India",
        "city": "Tiruchirapalli",
        "code": "TRZ",
        "class": "ind",
        "airport": "Tiruchirapally Civil Airport Airport",
        "label": "Tiruchirapalli, India (TRZ)"
    }, {
        "country": "India",
        "city": "Dindigul",
        "code": "IXM",
        "class": "ind",
        "airport": "Madurai Airport",
        "label": "Dindigul, India  (nearest airport Madurai, IXM)"
    }, {
        "country": "India",
        "city": "Jamshedpur",
        "code": "IXW",
        "class": "ind",
        "airport": "Jamshedpur Airport",
        "label": "Jamshedpur, India (IXW)"
    }, {
        "country": "India",
        "city": "Jaisalmer",
        "code": "JSA",
        "class": "ind",
        "airport": "Jaisalmer Airport",
        "label": "Jaisalmer, India  (JSA)"
    }, {
        "country": "India",
        "city": "Dalhousie",
        "code": "DHM",
        "class": "ind",
        "airport": "Kangra Airport",
        "label": "Dalhousie, India  (nearest airport Dharamshala, DHM)"
    }, {
        "country": "India",
        "city": "Bagdogra",
        "code": "IXB",
        "class": "ind",
        "airport": "Bagdogra Airport",
        "label": "Bagdogra, India (IXB)"
    }, {
        "country": "India",
        "city": "Diu",
        "code": "DIU",
        "class": "ind",
        "airport": "Diu Airport",
        "label": "Diu, India (DIU)"
    }, {
        "country": "India",
        "city": "Jammu",
        "code": "IXJ",
        "class": "ind",
        "airport": "Jammu Airport",
        "label": "Jammu, India (IXJ)"
    }, {
        "country": "India",
        "city": "Pahalgam",
        "code": "SXR",
        "class": "ind",
        "airport": "Sheikh ul Alam Airport",
        "label": "Pahalgam, India  (nearest airport Srinagar, SXR)"
    }, {
        "country": "India",
        "city": "Pelling",
        "code": "IXB",
        "class": "ind",
        "airport": "Bagdogra Airport",
        "label": "Pelling, India  (nearest airport Bagdogra, IXB)"
    }, {
        "country": "India",
        "city": "Puri",
        "code": "BBI",
        "class": "ind",
        "airport": "Biju Patnaik Airport",
        "label": "Puri, India  (nearest airport Bhubaneshwar, BBI)"
    }, {
        "country": "India",
        "city": "Faridabad",
        "code": "DEL",
        "class": "ind",
        "airport": "Indira Gandhi International Airport",
        "label": "Faridabad, India  (nearest airport New Delhi, DEL)"
    }, {
        "country": "India",
        "city": "Pathankot",
        "code": "IXP",
        "class": "ind",
        "airport": "Pathankot Air Force Station",
        "label": "Pathankot, India (IXP)"
    }, {
        "country": "India",
        "city": "Pantnagar",
        "code": "PGH",
        "class": "ind",
        "airport": "Pantnagar Airport",
        "label": "Pantnagar, India (PGH)"
    }, {
        "country": "India",
        "city": "Dwarka",
        "code": "PBD",
        "class": "ind",
        "airport": "Porbandar Airport",
        "label": "Dwarka, India  (nearest airport Porbandar, PBD)"
    }, {
        "country": "India",
        "city": "Nasik",
        "code": "ISK",
        "class": "ind",
        "airport": "Gandhinagar Airport",
        "label": "Nasik, India (ISK)"
    }, {
        "country": "India",
        "city": "Nainital",
        "code": "PGH",
        "class": "ind",
        "airport": "Pantnagar Airport",
        "label": "Nainital, India  (nearest airport Pantnagar, PGH)"
    }, {
        "country": "India",
        "city": "Noida",
        "code": "DEL",
        "class": "ind",
        "airport": "Indira Gandhi International Airport",
        "label": "Noida, India  (nearest airport New Delhi, DEL)"
    }, {
        "country": "India",
        "city": "Varanasi",
        "code": "VNS",
        "class": "ind",
        "airport": "Lal Bahadur Shastri Airport",
        "label": "Varanasi, India (VNS)"
    }, {
        "country": "India",
        "city": "Gulmarg",
        "code": "IXJ",
        "class": "ind",
        "airport": "Jammu Airport",
        "label": "Gulmarg, India  (nearest airport Jammu, IXJ)"
    }, {
        "country": "India",
        "city": "Katra",
        "code": "IXJ",
        "class": "ind",
        "airport": "Jammu Airport",
        "label": "Katra, India (nearest airport Jammu, IXJ)"
    }, {
        "country": "India",
        "city": "Kanyakumari",
        "code": "TRV",
        "class": "ind",
        "airport": "Trivandrum International Airport",
        "label": "Kanyakumari, India  (nearest airport Trivandrum, TRV)"
    }, {
        "country": "India",
        "city": "Kasauli",
        "code": "IXC",
        "class": "ind",
        "airport": "Chandigarh Airport",
        "label": "Kasauli, India  (nearest airport Chandigarh, IXC)"
    }, {
        "country": "India",
        "city": "Mangalore",
        "code": "IXE",
        "class": "ind",
        "airport": "Mangalore International Airport",
        "label": "Mangalore, India (IXE)"
    }, {
        "country": "India",
        "city": "Ooty",
        "code": "CJB",
        "class": "ind",
        "airport": "Coimbatore International Airport",
        "label": "Ooty, India  (nearest airport Coimbatore, CJB)"
    }, {
        "country": "India",
        "city": "Udupi",
        "code": "IXE",
        "class": "ind",
        "airport": "Mangalore International Airport",
        "label": "Udupi, India  (nearest airport Mangalore, IXE)"
    }, {
        "country": "India",
        "city": "Ranchi",
        "code": "IXR",
        "class": "ind",
        "airport": "Birsa Munda Airport",
        "label": "Ranchi, India (IXR)"
    }, {
        "country": "India",
        "city": "Ajmer",
        "code": "JAI",
        "class": "ind",
        "airport": "Jaipur International Airport",
        "label": "Ajmer, India  (nearest airport Jaipur, JAI)"
    }, {
        "country": "India",
        "city": "Alleppey",
        "code": "COK",
        "class": "ind",
        "airport": "Cochin International Airport",
        "label": "Alleppey, India  (nearest airport Cochin, COK)"
    }, {
        "country": "India",
        "city": "Alleppey",
        "code": "COK",
        "class": "ind",
        "airport": "Cochin International Airport",
        "label": "Alleppey, India  (nearest airport Cochin, COK)"
    }, {
        "country": "India",
        "city": "Kandla",
        "code": "IXY",
        "class": "ind",
        "airport": "Kandla Airport",
        "label": "Kandla, India (IXY)"
    }, {
        "country": "India",
        "city": "Kumarakom",
        "code": "COK",
        "class": "ind",
        "airport": "Cochin International Airport",
        "label": "Kumarakom, India  (nearest airport Cochin, COK)"
    }, {
        "country": "India",
        "city": "Bhopal",
        "code": "BHO",
        "class": "ind",
        "airport": "Bhopal Airport",
        "label": "Bhopal, India (BHO)"
    }, {
        "country": "India",
        "city": "Gangtok",
        "code": "IXB",
        "class": "ind",
        "airport": "Bagdogra Airport",
        "label": "Gangtok, India  (nearest airport Bagdogra, IXB)"
    }, {
        "country": "India",
        "city": "Gurgaon",
        "code": "DEL",
        "class": "ind",
        "airport": "Indira Gandhi International Airport",
        "label": "Gurgaon, India  (nearest airport New Delhi, DEL)"
    }, {
        "country": "India",
        "city": "Guruvayoor",
        "code": "COK",
        "class": "ind",
        "airport": "Cochin International Airport",
        "label": "Guruvayoor, India  (nearest airport Cochin, COK)"
    }, {
        "country": "India",
        "city": "Kovalam",
        "code": "TRV",
        "class": "ind",
        "airport": "Trivandrum International Airport",
        "label": "Kovalam, India  (nearest airport Trivandrum, TRV)"
    }, {
        "country": "India",
        "city": "Kolhapur",
        "code": "PNQ",
        "class": "ind",
        "airport": "Pune Airport",
        "label": "Kolhapur, India  (nearest airport Pune, PNQ)"
    }, {
        "country": "India",
        "city": "Coorg",
        "code": "MYQ",
        "class": "ind",
        "airport": "Mysore Airport",
        "label": "Coorg, India  (nearest airport Mysore, MYQ)"
    }, {
        "country": "India",
        "city": "Kerela",
        "code": "CCJ",
        "class": "ind",
        "airport": "Calicut International Airport",
        "label": "Kerela, India  (nearest airport Calicut, CCJ)"
    }, {
        "country": "India",
        "city": "Corbett",
        "code": "DED",
        "class": "ind",
        "airport": "Dehradun Airport",
        "label": "Corbett, India  (nearest airport Dehradun, DED)"
    }, {
        "country": "India",
        "city": "Kodaikanal",
        "code": "IXM",
        "class": "ind",
        "airport": "Madurai Airport",
        "label": "Kodaikanal, India (nearest airport Madurai, IXM)"
    }, {
        "country": "India",
        "city": "Bellary",
        "code": "BEP",
        "class": "ind",
        "airport": "Bellary Airport",
        "label": "Bellary, India (BEP)"
    }, {
        "country": "India",
        "city": "Velankanni",
        "code": "TRZ",
        "class": "ind",
        "airport": "Tiruchirapally Civil Airport Airport",
        "label": "Velankanni, India  (nearest airport Tiruchirapalli, TRZ)"
    }, {
        "country": "India",
        "city": "Kolkata",
        "code": "CCU",
        "class": "ind",
        "airport": "Netaji Subhash Chandra Bose International Airport",
        "label": "Kolkata, India (CCU)"
    }, {
        "country": "India",
        "city": "Mumbai",
        "code": "BOM",
        "class": "ind",
        "airport": "Chhatrapati Shivaji International Airport",
        "label": "Mumbai, India (BOM)"
    }, {
        "country": "India",
        "city": "Goa",
        "code": "GOI",
        "class": "ind",
        "airport": "Dabolim Airport",
        "label": "Goa, India (GOI)"
    }, {
        "country": "India",
        "city": "Bangalore",
        "code": "BLR",
        "class": "ind",
        "airport": "Bengaluru International Airport",
        "label": "Bangalore, India (BLR)"
    }, {
        "country": "Indonesia",
        "city": "Biak",
        "code": "BIK",
        "class": "ind",
        "airport": "Frans Kaisiepo Airport",
        "label": "Biak, Indonesia (BIK)"
    }, {
        "country": "Indonesia",
        "city": "Langgur",
        "code": "LUV",
        "class": "ind",
        "airport": "Dumatumbun Airport",
        "label": "Langgur, Indonesia (LUV)"
    }, {
        "country": "Indonesia",
        "city": "Labuan Bajo",
        "code": "LBJ",
        "class": "ind",
        "airport": "Komodo (Mutiara II) Airport",
        "label": "Labuan Bajo, Indonesia (LBJ)"
    }, {
        "country": "Indonesia",
        "city": "Kendari",
        "code": "KDI",
        "class": "ind",
        "airport": "Wolter Monginsidi Airport",
        "label": "Kendari, Indonesia (KDI)"
    }, {
        "country": "Indonesia",
        "city": "Ambon",
        "code": "AMQ",
        "class": "ind",
        "airport": "Pattimura Airport, Ambon",
        "label": "Ambon, Indonesia (AMQ)"
    }, {
        "country": "Indonesia",
        "city": "Manado",
        "code": "MDC",
        "class": "ind",
        "airport": "Sam Ratulangi Airport",
        "label": "Manado, Indonesia (MDC)"
    }, {
        "country": "Indonesia",
        "city": "Tembagapura",
        "code": "TIM",
        "class": "ind",
        "airport": "Moses Kilangin Airport",
        "label": "Tembagapura, Indonesia (TIM)"
    }, {
        "country": "Indonesia",
        "city": "Ternate",
        "code": "TTE",
        "class": "ind",
        "airport": "Sultan Khairun Babullah Airport",
        "label": "Ternate, Indonesia (TTE)"
    }, {
        "country": "Indonesia",
        "city": "Ujung Pandang",
        "code": "UPG",
        "class": "ind",
        "airport": "Hasanuddin International Airport",
        "label": "Ujung Pandang, Indonesia (UPG)"
    }, {
        "country": "Indonesia",
        "city": "Malang",
        "code": "MLG",
        "class": "ind",
        "airport": "Abdul Rachman Saleh Airport",
        "label": "Malang, Indonesia (MLG)"
    }, {
        "country": "Indonesia",
        "city": "Denpasar Bali",
        "code": "DPS",
        "class": "ind",
        "airport": "Ngurah Rai (Bali) International Airport",
        "label": "Denpasar Bali, Indonesia (DPS)"
    }, {
        "country": "Indonesia",
        "city": "Datadawai",
        "code": "DTD",
        "class": "ind",
        "airport": "Datadawai Airport",
        "label": "Datadawai, Indonesia (DTD)"
    }, {
        "country": "Indonesia",
        "city": "Banjarmasin",
        "code": "BDJ",
        "class": "ind",
        "airport": "Syamsudin Noor Airport",
        "label": "Banjarmasin, Indonesia (BDJ)"
    }, {
        "country": "Indonesia",
        "city": "Bandung",
        "code": "BDO",
        "class": "ind",
        "airport": "Husein Sastranegara International Airport",
        "label": "Bandung, Indonesia (BDO)"
    }, {
        "country": "Indonesia",
        "city": "Yogyakarta",
        "code": "JOG",
        "class": "ind",
        "airport": "Adi Sutjipto International Airport",
        "label": "Yogyakarta, Indonesia (JOG)"
    }, {
        "country": "Indonesia",
        "city": "Gorontalo",
        "code": "GTO",
        "class": "ind",
        "airport": "Jalaluddin Airport",
        "label": "Gorontalo, Indonesia (GTO)"
    }, {
        "country": "Indonesia",
        "city": "Waingapu",
        "code": "WGP",
        "class": "ind",
        "airport": "Waingapu Airport",
        "label": "Waingapu, Indonesia (WGP)"
    }, {
        "country": "Indonesia",
        "city": "Bandar Lampung",
        "code": "TKG",
        "class": "ind",
        "airport": "Radin Inten II (Branti) Airport",
        "label": "Bandar Lampung, Indonesia (TKG)"
    }, {
        "country": "Indonesia",
        "city": "Banda Aceh",
        "code": "BTJ",
        "class": "ind",
        "airport": "Sultan Iskandarmuda Airport",
        "label": "Banda Aceh, Indonesia (BTJ)"
    }, {
        "country": "Indonesia",
        "city": "Manokwari",
        "code": "MKW",
        "class": "ind",
        "airport": "Rendani Airport",
        "label": "Manokwari, Indonesia (MKW)"
    }, {
        "country": "Indonesia",
        "city": "Jayapura",
        "code": "DJJ",
        "class": "ind",
        "airport": "Sentani Airport",
        "label": "Jayapura, Indonesia (DJJ)"
    }, {
        "country": "Indonesia",
        "city": "Jambi",
        "code": "DJB",
        "class": "ind",
        "airport": "Sultan Thaha Airport",
        "label": "Jambi, Indonesia (DJB)"
    }, {
        "country": "Indonesia",
        "city": "Bengkulu",
        "code": "BKS",
        "class": "ind",
        "airport": "Padang Kemiling (Fatmawati Soekarno) Airport",
        "label": "Bengkulu, Indonesia (BKS)"
    }, {
        "country": "Indonesia",
        "city": "Kaimana",
        "code": "KNG",
        "class": "ind",
        "airport": "Kaimana Airport",
        "label": "Kaimana, Indonesia (KNG)"
    }, {
        "country": "Indonesia",
        "city": "Maumere",
        "code": "MOF",
        "class": "ind",
        "airport": "Maumere(Wai Oti) Airport",
        "label": "Maumere, Indonesia (MOF)"
    }, {
        "country": "Indonesia",
        "city": "Palu",
        "code": "PLW",
        "class": "ind",
        "airport": "Mutiara Airport",
        "label": "Palu, Indonesia (PLW)"
    }, {
        "country": "Indonesia",
        "city": "Ende",
        "code": "ENE",
        "class": "ind",
        "airport": "Ende (H Hasan Aroeboesman) Airport",
        "label": "Ende, Indonesia (ENE)"
    }, {
        "country": "Indonesia",
        "city": "Palembang",
        "code": "PLM",
        "class": "ind",
        "airport": "Sultan Mahmud Badaruddin Ii Airport",
        "label": "Palembang, Indonesia (PLM)"
    }, {
        "country": "Indonesia",
        "city": "Palangkaraya",
        "code": "PKY",
        "class": "ind",
        "airport": "Tjilik Riwut Airport",
        "label": "Palangkaraya, Indonesia (PKY)"
    }, {
        "country": "Indonesia",
        "city": "Padang",
        "code": "PDG",
        "class": "ind",
        "airport": "Minangkabau Airport",
        "label": "Padang, Indonesia (PDG)"
    }, {
        "country": "Indonesia",
        "city": "Pangkalpinang",
        "code": "PGK",
        "class": "ind",
        "airport": "Pangkal Pinang (Depati Amir) Airport",
        "label": "Pangkalpinang, Indonesia (PGK)"
    }, {
        "country": "Indonesia",
        "city": "Pekanbaru",
        "code": "PKU",
        "class": "ind",
        "airport": "Sultan Syarif Kasim Ii (Simpang Tiga) Airport",
        "label": "Pekanbaru, Indonesia (PKU)"
    }, {
        "country": "Indonesia",
        "city": "Balikpapan",
        "code": "BPN",
        "class": "ind",
        "airport": "Sepinggan International Airport",
        "label": "Balikpapan, Indonesia (BPN)"
    }, {
        "country": "Indonesia",
        "city": "Lombok",
        "code": "LOP",
        "class": "ind",
        "airport": "Bandara International Lombok Airport",
        "label": "Lombok, Indonesia (LOP)"
    }, {
        "country": "Indonesia",
        "city": "Pontianak",
        "code": "PNK",
        "class": "ind",
        "airport": "Supadio Airport",
        "label": "Pontianak, Indonesia (PNK)"
    }, {
        "country": "Indonesia",
        "city": "Semarang",
        "code": "SRG",
        "class": "ind",
        "airport": "Achmad Yani Airport",
        "label": "Semarang, Indonesia (SRG)"
    }, {
        "country": "Indonesia",
        "city": "Fakfak",
        "code": "FKQ",
        "class": "ind",
        "airport": "Fakfak Airport",
        "label": "Fakfak, Indonesia (FKQ)"
    }, {
        "country": "Indonesia",
        "city": "Solo City",
        "code": "SOC",
        "class": "ind",
        "airport": "Adi Sumarmo Wiryokusumo Airport",
        "label": "Solo City, Indonesia (SOC)"
    }, {
        "country": "Indonesia",
        "city": "Jakarta",
        "code": "CGK",
        "class": "ind",
        "airport": "Soekarno-Hatta International Airport",
        "label": "Jakarta, Indonesia (CGK)"
    }, {
        "country": "Indonesia",
        "city": "Batam",
        "code": "BTH",
        "class": "ind",
        "airport": "Hang Nadim Airport",
        "label": "Batam, Indonesia (BTH)"
    }, {
        "country": "Indonesia",
        "city": "Mataram",
        "code": "AMI",
        "class": "ind",
        "airport": "Selaparang Airport",
        "label": "Mataram, Indonesia (AMI)"
    }, {
        "country": "Indonesia",
        "city": "Tanjung Pandan",
        "code": "TJQ",
        "class": "ind",
        "airport": "Buluh Tumbang (H A S Hanandjoeddin) Airport",
        "label": "Tanjung Pandan, Indonesia (TJQ)"
    }, {
        "country": "Indonesia",
        "city": "Medan",
        "code": "MES",
        "class": "ind",
        "airport": "Polonia International Airport",
        "label": "Medan, Indonesia (MES)"
    }, {
        "country": "Indonesia",
        "city": "Tambolaka",
        "code": "TMC",
        "class": "ind",
        "airport": "Tambolaka Airport",
        "label": "Tambolaka, Indonesia (TMC)"
    }, {
        "country": "Indonesia",
        "city": "Sorong",
        "code": "SOQ",
        "class": "ind",
        "airport": "Sorong (Jefman) Airport",
        "label": "Sorong, Indonesia (SOQ)"
    }, {
        "country": "Indonesia",
        "city": "Surabaya",
        "code": "SUB",
        "class": "ind",
        "airport": "Juanda International Airport",
        "label": "Surabaya, Indonesia (SUB)"
    }, {
        "country": "Indonesia",
        "city": "Bima",
        "code": "BMU",
        "class": "ind",
        "airport": "Muhammad Salahuddin Airport",
        "label": "Bima, Indonesia (BMU)"
    }, {
        "country": "Indonesia",
        "city": "Merauke",
        "code": "MKQ",
        "class": "ind",
        "airport": "Mopah Airport",
        "label": "Merauke, Indonesia (MKQ)"
    }, {
        "country": "Indonesia",
        "city": "Merauke",
        "code": "MKQ",
        "class": "ind",
        "airport": "Mopah Airport",
        "label": "Merauke, Indonesia (MKQ)"
    }, {
        "country": "Indonesia",
        "city": "Tarakan",
        "code": "TRK",
        "class": "ind",
        "airport": "Juwata Airport",
        "label": "Tarakan, Indonesia (TRK)"
    }, {
        "country": "Iraq",
        "city": "Arbil",
        "code": "EBL",
        "class": "ira",
        "airport": "Erbil International Airport",
        "label": "Arbil, Iraq (EBL)"
    }, {
        "country": "Iraq",
        "city": "Arbil",
        "code": "EBL",
        "class": "ira",
        "airport": "Erbil International Airport",
        "label": "Arbil, Iraq (EBL)"
    }, {
        "country": "Iraq",
        "city": "Arbil",
        "code": "EBL",
        "class": "ira",
        "airport": "Erbil International Airport",
        "label": "Arbil, Iraq (EBL)"
    }, {
        "country": "Ireland",
        "city": "Sligo",
        "code": "SXL",
        "class": "ire",
        "airport": "Sligo Airport",
        "label": "Sligo, Ireland (SXL)"
    }, {
        "country": "Ireland",
        "city": "Shannon",
        "code": "SNN",
        "class": "ire",
        "airport": "Shannon Airport",
        "label": "Shannon, Ireland (SNN)"
    }, {
        "country": "Ireland",
        "city": "Donegal",
        "code": "CFN",
        "class": "ire",
        "airport": "Donegal Airport",
        "label": "Donegal, Ireland (CFN)"
    }, {
        "country": "Ireland",
        "city": "Dublin",
        "code": "DUB",
        "class": "ire",
        "airport": "Dublin Airport",
        "label": "Dublin, Ireland (DUB)"
    }, {
        "country": "Ireland",
        "city": "Waterford",
        "code": "WAT",
        "class": "ire",
        "airport": "Waterford Airport",
        "label": "Waterford, Ireland (WAT)"
    }, {
        "country": "Ireland",
        "city": "Knock",
        "code": "NOC",
        "class": "ire",
        "airport": "Ireland West Knock Airport",
        "label": "Knock, Ireland (NOC)"
    }, {
        "country": "Ireland",
        "city": "Kerry County",
        "code": "KIR",
        "class": "ire",
        "airport": "Kerry Airport",
        "label": "Kerry County, Ireland (KIR)"
    }, {
        "country": "Ireland",
        "city": "Cork",
        "code": "ORK",
        "class": "ire",
        "airport": "Cork Airport",
        "label": "Cork, Ireland (ORK)"
    }, {
        "country": "Ireland",
        "city": "Galway",
        "code": "GWY",
        "class": "ire",
        "airport": "Galway Airport",
        "label": "Galway, Ireland (GWY)"
    }, {
        "country": "Israel",
        "city": "Eilat",
        "code": "ETH",
        "class": "isr",
        "airport": "Eilat Airport",
        "label": "Eilat, Israel (ETH)"
    }, {
        "country": "Israel",
        "city": "Tel Aviv Yafo",
        "code": "SDV",
        "class": "isr",
        "airport": "Sde Dov Airport",
        "label": "Tel Aviv Yafo, Israel (SDV)"
    }, {
        "country": "Israel",
        "city": "Tel Aviv Yafo",
        "code": "TLV",
        "class": "isr",
        "airport": "Ben Gurion International Airport",
        "label": "Tel Aviv Yafo, Israel (TLV)"
    }, {
        "country": "Israel",
        "city": "Haifa",
        "code": "HFA",
        "class": "isr",
        "airport": "Haifa International Airport",
        "label": "Haifa, Israel (HFA)"
    }, {
        "country": "Israel",
        "city": "Ovda",
        "code": "VDA",
        "class": "isr",
        "airport": "Ovda International Airport",
        "label": "Ovda, Israel (VDA)"
    }, {
        "country": "Italy",
        "city": "Reggio Calabria",
        "code": "REG",
        "class": "ita",
        "airport": "Reggio Calabria Airport",
        "label": "Reggio Calabria, Italy (REG)"
    }, {
        "country": "Italy",
        "city": "Rome",
        "code": "FCO",
        "class": "ita",
        "airport": "Leonardo Da Vinci (Fiumicino) International Airport",
        "label": "Rome, Italy (FCO)"
    }, {
        "country": "Italy",
        "city": "Rome",
        "code": "CIA",
        "class": "ita",
        "airport": "Ciampino Airport",
        "label": "Rome, Italy (CIA)"
    }, {
        "country": "Italy",
        "city": "Rome",
        "code": "CIA",
        "class": "ita",
        "airport": "Ciampino Airport",
        "label": "Rome, Italy (CIA)"
    }, {
        "country": "Italy",
        "city": "Milan",
        "code": "PMF",
        "class": "ita",
        "airport": "Parma Airport",
        "label": "Milan, Italy - Parma Airport (PMF)"
    }, {
        "country": "Italy",
        "city": "Turin",
        "code": "TRN",
        "class": "ita",
        "airport": "Torino \/ Caselle International Airport",
        "label": "Turin, Italy (TRN)"
    }, {
        "country": "Italy",
        "city": "Forli",
        "code": "FRL",
        "class": "ita",
        "airport": null,
        "label": "Forli, Italy (FRL)"
    }, {
        "country": "Italy",
        "city": "Crotone",
        "code": "CRV",
        "class": "ita",
        "airport": "Crotone Airport",
        "label": "Crotone, Italy (CRV)"
    }, {
        "country": "Italy",
        "city": "Crotone",
        "code": "CRV",
        "class": "ita",
        "airport": "Crotone Airport",
        "label": "Crotone, Italy (CRV)"
    }, {
        "country": "Italy",
        "city": "Milan",
        "code": "MXP",
        "class": "ita",
        "airport": "Malpensa International Airport",
        "label": "Milan, Italy - Malpensa Airport (MXP)"
    }, {
        "country": "Italy",
        "city": "Milan",
        "code": "BGY",
        "class": "ita",
        "airport": "Bergamo \/ Orio Al Serio Airport",
        "label": "Milan, Italy (BGY)"
    }, {
        "country": "Italy",
        "city": "Cagliari",
        "code": "CAG",
        "class": "ita",
        "airport": "Cagliari \/ Elmas Airport",
        "label": "Cagliari, Italy (CAG)"
    }, {
        "country": "Italy",
        "city": "Florence",
        "code": "FLR",
        "class": "ita",
        "airport": "Firenze \/ Peretola Airport",
        "label": "Florence, Italy (FLR)"
    }, {
        "country": "Italy",
        "city": "Catania",
        "code": "CTA",
        "class": "ita",
        "airport": "Catania \/ Fontanarossa Airport",
        "label": "Catania, Italy (CTA)"
    }, {
        "country": "Italy",
        "city": "Foggia",
        "code": "FOG",
        "class": "ita",
        "airport": "Foggia \/ Gino Lisa Airport",
        "label": "Foggia, Italy (FOG)"
    }, {
        "country": "Italy",
        "city": "Bari",
        "code": "BRI",
        "class": "ita",
        "airport": "Bari \/ Palese International Airport",
        "label": "Bari, Italy (BRI)"
    }, {
        "country": "Italy",
        "city": "Naples",
        "code": "NAP",
        "class": "ita",
        "airport": null,
        "label": "Naples, Italy (NAP)"
    }, {
        "country": "Italy",
        "city": "Olbia",
        "code": "OLB",
        "class": "ita",
        "airport": "Olbia \/ Costa Smeralda Airport",
        "label": "Olbia, Italy (OLB)"
    }, {
        "country": "Italy",
        "city": "Rimini",
        "code": "RMI",
        "class": "ita",
        "airport": "Rimini \/ Miramare - Federico Fellini International Airport",
        "label": "Rimini, Italy (RMI)"
    }, {
        "country": "Italy",
        "city": "Trapani",
        "code": "TPS",
        "class": "ita",
        "airport": "Trapani \/ Birgi Airport",
        "label": "Trapani, Italy (TPS)"
    }, {
        "country": "Italy",
        "city": "Bolzano",
        "code": "BZO",
        "class": "ita",
        "airport": "Bolzano Airport",
        "label": "Bolzano, Italy (BZO)"
    }, {
        "country": "Italy",
        "city": "Pescara",
        "code": "PSR",
        "class": "ita",
        "airport": "Pescara International Airport",
        "label": "Pescara, Italy (PSR)"
    }, {
        "country": "Italy",
        "city": "Perugia",
        "code": "PEG",
        "class": "ita",
        "airport": "Perugia \/ San Egidio Airport",
        "label": "Perugia, Italy (PEG)"
    }, {
        "country": "Italy",
        "city": "Ancona",
        "code": "AOI",
        "class": "ita",
        "airport": "Ancona \/ Falconara Airport",
        "label": "Ancona, Italy (AOI)"
    }, {
        "country": "Italy",
        "city": "San Domino Island",
        "code": "TQR",
        "class": "ita",
        "airport": "San Domino Island Heliport",
        "label": "San Domino Island, Italy (TQR)"
    }, {
        "country": "Italy",
        "city": "Pantelleria",
        "code": "PNL",
        "class": "ita",
        "airport": "Pantelleria Airport",
        "label": "Pantelleria, Italy (PNL)"
    }, {
        "country": "Italy",
        "city": "Alghero",
        "code": "AHO",
        "class": "ita",
        "airport": "Alghero \/ Fertilia Airport",
        "label": "Alghero, Italy (AHO)"
    }, {
        "country": "Italy",
        "city": "Pisa",
        "code": "PSA",
        "class": "ita",
        "airport": "Pisa \/ San Giusto - Galileo Galilei International Airport",
        "label": "Pisa, Italy (PSA)"
    }, {
        "country": "Italy",
        "city": "Cuneo",
        "code": "CUF",
        "class": "ita",
        "airport": "Cuneo \/ Levaldigi Airport",
        "label": "Cuneo, Italy (CUF)"
    }, {
        "country": "Italy",
        "city": "Venice",
        "code": "VCE",
        "class": "ita",
        "airport": "Venezia \/ Tessera -  Marco Polo Airport",
        "label": "Venice, Italy (VCE)"
    }, {
        "country": "Italy",
        "city": "Lampedusa",
        "code": "LMP",
        "class": "ita",
        "airport": "Lampedusa Airport",
        "label": "Lampedusa, Italy (LMP)"
    }, {
        "country": "Italy",
        "city": "Aosta",
        "code": "AOT",
        "class": "ita",
        "airport": "Aosta Airport",
        "label": "Aosta, Italy (AOT)"
    }, {
        "country": "Italy",
        "city": "Venice",
        "code": "TSF",
        "class": "ita",
        "airport": "Treviso \/ Sant'Angelo Airport",
        "label": "Venice, Italy (TSF)"
    }, {
        "country": "Italy",
        "city": "Brindisi",
        "code": "BDS",
        "class": "ita",
        "airport": "Brindisi \/ Casale Airport",
        "label": "Brindisi, Italy (BDS)"
    }, {
        "country": "Italy",
        "city": "Milan",
        "code": "LIN",
        "class": "ita",
        "airport": "Linate Airport",
        "label": "Milan, Italy (LIN)"
    }, {
        "country": "Italy",
        "city": "Bologna",
        "code": "BLQ",
        "class": "ita",
        "airport": "Bologna \/ Borgo Panigale Airport",
        "label": "Bologna, Italy (BLQ)"
    }, {
        "country": "Italy",
        "city": "Verona",
        "code": "VRN",
        "class": "ita",
        "airport": "Verona \/ Villafranca Airport",
        "label": "Verona, Italy (VRN)"
    }, {
        "country": "Italy",
        "city": "Lamezia Terme",
        "code": "SUF",
        "class": "ita",
        "airport": "Lamezia Terme Airport",
        "label": "Lamezia Terme, Italy (SUF)"
    }, {
        "country": "Italy",
        "city": "Palermo",
        "code": "PMO",
        "class": "ita",
        "airport": "Palermo \/ Punta Raisi Airport",
        "label": "Palermo, Italy (PMO)"
    }, {
        "country": "Italy",
        "city": "Genoa",
        "code": "GOA",
        "class": "ita",
        "airport": "Genova \/ Sestri Cristoforo Colombo Airport",
        "label": "Genoa, Italy (GOA)"
    }, {
        "country": "Italy",
        "city": "Trieste",
        "code": "TRS",
        "class": "ita",
        "airport": "Trieste \/ Ronchi Dei Legionari",
        "label": "Trieste, Italy (TRS)"
    }, {
        "country": "Jamaica",
        "city": "Montego Bay",
        "code": "MBJ",
        "class": "jam",
        "airport": "Sangster International Airport",
        "label": "Montego Bay, Jamaica (MBJ)"
    }, {
        "country": "Japan",
        "city": "Shirahama",
        "code": "SHM",
        "class": "jap",
        "airport": "Nanki Shirahama Airport",
        "label": "Shirahama, Japan (SHM)"
    }, {
        "country": "Japan",
        "city": "Okinawa",
        "code": "OKA",
        "class": "jap",
        "airport": "Naha Airport",
        "label": "Okinawa, Japan (OKA)"
    }, {
        "country": "Japan",
        "city": "Ishigaki",
        "code": "ISG",
        "class": "jap",
        "airport": "Ishigaki Airport",
        "label": "Ishigaki, Japan (ISG)"
    }, {
        "country": "Japan",
        "city": "Oshima",
        "code": "OIM",
        "class": "jap",
        "airport": "Oshima Airport",
        "label": "Oshima, Japan (OIM)"
    }, {
        "country": "Japan",
        "city": "Shonai",
        "code": "SYO",
        "class": "jap",
        "airport": "Shonai Airport",
        "label": "Shonai, Japan (SYO)"
    }, {
        "country": "Japan",
        "city": "Okayama",
        "code": "OKJ",
        "class": "jap",
        "airport": "Okayama Airport",
        "label": "Okayama, Japan (OKJ)"
    }, {
        "country": "Japan",
        "city": "Izumo",
        "code": "IZO",
        "class": "jap",
        "airport": "Izumo Airport",
        "label": "Izumo, Japan (IZO)"
    }, {
        "country": "Japan",
        "city": "Oita",
        "code": "OIT",
        "class": "jap",
        "airport": "Oita Airport",
        "label": "Oita, Japan (OIT)"
    }, {
        "country": "Japan",
        "city": "Iwami",
        "code": "IWJ",
        "class": "jap",
        "airport": "Iwami Airport",
        "label": "Iwami, Japan (IWJ)"
    }, {
        "country": "Japan",
        "city": "Obihiro",
        "code": "OBO",
        "class": "jap",
        "airport": "Tokachi-Obihiro Airport",
        "label": "Obihiro, Japan (OBO)"
    }, {
        "country": "Japan",
        "city": "Odate Noshiro",
        "code": "ONJ",
        "class": "jap",
        "airport": "Odate Noshiro Airport",
        "label": "Odate Noshiro, Japan (ONJ)"
    }, {
        "country": "Japan",
        "city": "Monbetsu",
        "code": "MBE",
        "class": "jap",
        "airport": "Monbetsu Airport",
        "label": "Monbetsu, Japan (MBE)"
    }, {
        "country": "Japan",
        "city": "Kobe",
        "code": "UKB",
        "class": "jap",
        "airport": "Kobe Airport",
        "label": "Kobe, Japan (UKB)"
    }, {
        "country": "Japan",
        "city": "Yamagata",
        "code": "GAJ",
        "class": "jap",
        "airport": "Yamagata Airport",
        "label": "Yamagata, Japan (GAJ)"
    }, {
        "country": "Japan",
        "city": "Komatsu",
        "code": "KMQ",
        "class": "jap",
        "airport": "Komatsu Airport",
        "label": "Komatsu, Japan (KMQ)"
    }, {
        "country": "Japan",
        "city": "Tsushima",
        "code": "TSJ",
        "class": "jap",
        "airport": "Tsushima Airport",
        "label": "Tsushima, Japan (TSJ)"
    }, {
        "country": "Japan",
        "city": "Kitakyushu",
        "code": "KKJ",
        "class": "jap",
        "airport": "Kitaky?sh? Airport",
        "label": "Kitakyushu, Japan (KKJ)"
    }, {
        "country": "Japan",
        "city": "Akita",
        "code": "AXT",
        "class": "jap",
        "airport": "Akita Airport",
        "label": "Akita, Japan (AXT)"
    }, {
        "country": "Japan",
        "city": "Aomori",
        "code": "AOJ",
        "class": "jap",
        "airport": "Aomori Airport",
        "label": "Aomori, Japan (AOJ)"
    }, {
        "country": "Japan",
        "city": "Amami O Shima",
        "code": "ASJ",
        "class": "jap",
        "airport": "Amami Airport",
        "label": "Amami O Shima, Japan (ASJ)"
    }, {
        "country": "Japan",
        "city": "Tokunoshima",
        "code": "TKN",
        "class": "jap",
        "airport": "Tokunoshima Airport",
        "label": "Tokunoshima, Japan (TKN)"
    }, {
        "country": "Japan",
        "city": "Kushiro",
        "code": "KUH",
        "class": "jap",
        "airport": "Kushiro Airport",
        "label": "Kushiro, Japan (KUH)"
    }, {
        "country": "Japan",
        "city": "Tottori",
        "code": "TTJ",
        "class": "jap",
        "airport": "Tottori Airport",
        "label": "Tottori, Japan (TTJ)"
    }, {
        "country": "Japan",
        "city": "Kumejima",
        "code": "UEO",
        "class": "jap",
        "airport": "Kumejima Airport",
        "label": "Kumejima, Japan (UEO)"
    }, {
        "country": "Japan",
        "city": "Kumamoto",
        "code": "KMJ",
        "class": "jap",
        "airport": "Kumamoto Airport",
        "label": "Kumamoto, Japan (KMJ)"
    }, {
        "country": "Japan",
        "city": "Toyama",
        "code": "TOY",
        "class": "jap",
        "airport": "Toyama Airport",
        "label": "Toyama, Japan (TOY)"
    }, {
        "country": "Japan",
        "city": "Tokushima",
        "code": "TKS",
        "class": "jap",
        "airport": "Tokushima Airport",
        "label": "Tokushima, Japan (TKS)"
    }, {
        "country": "Japan",
        "city": "Matsuyama",
        "code": "MYJ",
        "class": "jap",
        "airport": "Matsuyama Airport",
        "label": "Matsuyama, Japan (MYJ)"
    }, {
        "country": "Japan",
        "city": "Memanbetsu",
        "code": "MMB",
        "class": "jap",
        "airport": "Memanbetsu Airport",
        "label": "Memanbetsu, Japan (MMB)"
    }, {
        "country": "Japan",
        "city": "Miyazaki",
        "code": "KMI",
        "class": "jap",
        "airport": "Miyazaki Airport",
        "label": "Miyazaki, Japan (KMI)"
    }, {
        "country": "Japan",
        "city": "Miyako Jima",
        "code": "MMY",
        "class": "jap",
        "airport": "Miyako Airport",
        "label": "Miyako Jima, Japan (MMY)"
    }, {
        "country": "Japan",
        "city": "Hachijo Jima",
        "code": "HAC",
        "class": "jap",
        "airport": "Hachijojima Airport",
        "label": "Hachijo Jima, Japan (HAC)"
    }, {
        "country": "Japan",
        "city": "Kagoshima",
        "code": "KOJ",
        "class": "jap",
        "airport": "Kagoshima Airport",
        "label": "Kagoshima, Japan (KOJ)"
    }, {
        "country": "Japan",
        "city": "Nakashibetsu",
        "code": "SHB",
        "class": "jap",
        "airport": "Nakashibetsu Airport",
        "label": "Nakashibetsu, Japan (SHB)"
    }, {
        "country": "Japan",
        "city": "Nagoya",
        "code": "NGO",
        "class": "jap",
        "airport": "Chubu Centrair International Airport",
        "label": "Nagoya, Japan (NGO)"
    }, {
        "country": "Japan",
        "city": "Miyake Jima",
        "code": "MYE",
        "class": "jap",
        "airport": "Miyakejima Airport",
        "label": "Miyake Jima, Japan (MYE)"
    }, {
        "country": "Japan",
        "city": "Asahikawa",
        "code": "AKJ",
        "class": "jap",
        "airport": "Asahikawa Airport",
        "label": "Asahikawa, Japan (AKJ)"
    }, {
        "country": "Japan",
        "city": "Ube",
        "code": "UBJ",
        "class": "jap",
        "airport": "Yamaguchi Ube Airport",
        "label": "Ube, Japan (UBJ)"
    }, {
        "country": "Japan",
        "city": "Fukushima",
        "code": "FKS",
        "class": "jap",
        "airport": "Fukushima Airport",
        "label": "Fukushima, Japan (FKS)"
    }, {
        "country": "Japan",
        "city": "Fukuoka",
        "code": "FUK",
        "class": "jap",
        "airport": "Fukuoka Airport",
        "label": "Fukuoka, Japan (FUK)"
    }, {
        "country": "Japan",
        "city": "Takamatsu",
        "code": "TAK",
        "class": "jap",
        "airport": "Takamatsu Airport",
        "label": "Takamatsu, Japan (TAK)"
    }, {
        "country": "Japan",
        "city": "Misawa",
        "code": "MSJ",
        "class": "jap",
        "airport": "Misawa Air Base",
        "label": "Misawa, Japan (MSJ)"
    }, {
        "country": "Japan",
        "city": "Fukue",
        "code": "FUJ",
        "class": "jap",
        "airport": "Fukue Airport",
        "label": "Fukue, Japan (FUJ)"
    }, {
        "country": "Japan",
        "city": "Niigata",
        "code": "KIJ",
        "class": "jap",
        "airport": "Niigata Airport",
        "label": "Niigata, Japan (KIJ)"
    }, {
        "country": "Japan",
        "city": "Nagasaki",
        "code": "NGS",
        "class": "jap",
        "airport": "Nagasaki Airport",
        "label": "Nagasaki, Japan (NGS)"
    }, {
        "country": "Japan",
        "city": "Sendai",
        "code": "SDJ",
        "class": "jap",
        "airport": "Sendai Airport",
        "label": "Sendai, Japan (SDJ)"
    }, {
        "country": "Japan",
        "city": "Sendai",
        "code": "SDJ",
        "class": "jap",
        "airport": "Sendai Airport",
        "label": "Sendai, Japan (SDJ)"
    }, {
        "country": "Japan",
        "city": "Tokyo",
        "code": "HND",
        "class": "jap",
        "airport": "Tokyo International Airport",
        "label": "Tokyo, Japan - Haneda (HND)"
    }, {
        "country": "Japan",
        "city": "Hanamaki",
        "code": "HNA",
        "class": "jap",
        "airport": "Hanamaki Airport",
        "label": "Hanamaki, Japan (HNA)"
    }, {
        "country": "Japan",
        "city": "Kochi",
        "code": "KCZ",
        "class": "jap",
        "airport": "K?chi Ry?ma Airport",
        "label": "Kochi, Japan (KCZ)"
    }, {
        "country": "Japan",
        "city": "Kochi",
        "code": "KCZ",
        "class": "jap",
        "airport": "K?chi Ry?ma Airport",
        "label": "Kochi, Japan (KCZ)"
    }, {
        "country": "Japan",
        "city": "Saga",
        "code": "HSG",
        "class": "jap",
        "airport": "Saga Airport",
        "label": "Saga, Japan (HSG)"
    }, {
        "country": "Japan",
        "city": "Yonaguni Jima",
        "code": "OGN",
        "class": "jap",
        "airport": "Yonaguni Airport",
        "label": "Yonaguni Jima, Japan (OGN)"
    }, {
        "country": "Japan",
        "city": "Sapporo",
        "code": "OKD",
        "class": "jap",
        "airport": "Okadama Airport",
        "label": "Sapporo, Japan (OKD)"
    }, {
        "country": "Japan",
        "city": "Tokyo",
        "code": "NRT",
        "class": "jap",
        "airport": "Narita International Airport",
        "label": "Tokyo, Japan - Narita (NRT)"
    }, {
        "country": "Japan",
        "city": "Osaka",
        "code": "ITM",
        "class": "jap",
        "airport": "Osaka International Airport",
        "label": "Osaka, Japan (ITM)"
    }, {
        "country": "Japan",
        "city": "Yonago",
        "code": "YGJ",
        "class": "jap",
        "airport": "Miho Yonago Airport",
        "label": "Yonago, Japan (YGJ)"
    }, {
        "country": "Japan",
        "city": "Hiroshima",
        "code": "HIJ",
        "class": "jap",
        "airport": "Hiroshima Airport",
        "label": "Hiroshima, Japan (HIJ)"
    }, {
        "country": "Japan",
        "city": "Hiroshima",
        "code": "HIJ",
        "class": "jap",
        "airport": "Hiroshima Airport",
        "label": "Hiroshima, Japan (HIJ)"
    }, {
        "country": "Japan",
        "city": "Hakodate",
        "code": "HKD",
        "class": "jap",
        "airport": "Hakodate Airport",
        "label": "Hakodate, Japan (HKD)"
    }, {
        "country": "Japan",
        "city": "Rishiri",
        "code": "RIS",
        "class": "jap",
        "airport": "Rishiri Airport",
        "label": "Rishiri, Japan (RIS)"
    }, {
        "country": "Japan",
        "city": "Osaka",
        "code": "KIX",
        "class": "jap",
        "airport": "Kansai International Airport",
        "label": "Osaka, Japan (KIX)"
    }, {
        "country": "Japan",
        "city": "Wakkanai",
        "code": "WKJ",
        "class": "jap",
        "airport": "Wakkanai Airport",
        "label": "Wakkanai, Japan (WKJ)"
    }, {
        "country": "Japan",
        "city": "Sapporo",
        "code": "CTS",
        "class": "jap",
        "airport": "New Chitose Airport",
        "label": "Sapporo, Japan (CTS)"
    }, {
        "country": "Japan",
        "city": "Wajima",
        "code": "NTQ",
        "class": "jap",
        "airport": "Noto Airport",
        "label": "Wajima, Japan (NTQ)"
    }, {
        "country": "Jordan",
        "city": "Amman",
        "code": "AMM",
        "class": "jor",
        "airport": "Queen Alia International Airport",
        "label": "Amman - Queen Alia Intl Apt, Jordan (AMM)"
    }, {
        "country": "Jordan",
        "city": "Aqaba",
        "code": "AQJ",
        "class": "jor",
        "airport": "Aqaba King Hussein International Airport",
        "label": "Aqaba, Jordan (AQJ)"
    }, {
        "country": "Jordan",
        "city": "Amman",
        "code": "ADJ",
        "class": "jor",
        "airport": "Amman-Marka International Airport",
        "label": "Amman - Marka Intl Apt, Jordan (ADJ)"
    }, {
        "country": "Kazakhstan",
        "city": "Pavlodar",
        "code": "PWQ",
        "class": "kaz",
        "airport": "Pavlodar Airport",
        "label": "Pavlodar, Kazakhstan (PWQ)"
    }, {
        "country": "Kazakhstan",
        "city": "Petropavlovsk",
        "code": "PPK",
        "class": "kaz",
        "airport": "Petropavlosk South Airport",
        "label": "Petropavlovsk, Kazakhstan (PPK)"
    }, {
        "country": "Kazakhstan",
        "city": "Uralsk",
        "code": "URA",
        "class": "kaz",
        "airport": "Uralsk Airport",
        "label": "Uralsk, Kazakhstan (URA)"
    }, {
        "country": "Kazakhstan",
        "city": "Shimkent",
        "code": "CIT",
        "class": "kaz",
        "airport": "Shymkent Airport",
        "label": "Shimkent, Kazakhstan (CIT)"
    }, {
        "country": "Kazakhstan",
        "city": "Kzyl-Orda",
        "code": "KZO",
        "class": "kaz",
        "airport": "Kzyl-Orda Southwest Airport",
        "label": "Kzyl-Orda, Kazakhstan (KZO)"
    }, {
        "country": "Kazakhstan",
        "city": "Karaganda",
        "code": "KGF",
        "class": "kaz",
        "airport": "Sary-Arka Airport",
        "label": "Karaganda, Kazakhstan (KGF)"
    }, {
        "country": "Kazakhstan",
        "city": "Almaty",
        "code": "ALA",
        "class": "kaz",
        "airport": "Almaty Airport",
        "label": "Almaty, Kazakhstan (ALA)"
    }, {
        "country": "Kazakhstan",
        "city": "Astana",
        "code": "TSE",
        "class": "kaz",
        "airport": "Astana International Airport",
        "label": "Astana, Kazakhstan (TSE)"
    }, {
        "country": "Kazakhstan",
        "city": "Ust-kamenogorsk",
        "code": "UKK",
        "class": "kaz",
        "airport": "Ust-Kamennogorsk Airport",
        "label": "Ust-kamenogorsk, Kazakhstan (UKK)"
    }, {
        "country": "Kazakhstan",
        "city": "Zhezkazgan",
        "code": "DZN",
        "class": "kaz",
        "airport": "Zhezkazgan Airport",
        "label": "Zhezkazgan, Kazakhstan (DZN)"
    }, {
        "country": "Kazakhstan",
        "city": "Zhambyl",
        "code": "DMB",
        "class": "kaz",
        "airport": "Taraz Airport",
        "label": "Zhambyl, Kazakhstan (DMB)"
    }, {
        "country": "Kazakhstan",
        "city": "Kostanai",
        "code": "KSN",
        "class": "kaz",
        "airport": "Kostanay West Airport",
        "label": "Kostanai, Kazakhstan (KSN)"
    }, {
        "country": "Kazakhstan",
        "city": "Atyrau",
        "code": "GUW",
        "class": "kaz",
        "airport": "Atyrau Airport",
        "label": "Atyrau, Kazakhstan (GUW)"
    }, {
        "country": "Kazakhstan",
        "city": "Aktau",
        "code": "SCO",
        "class": "kaz",
        "airport": "Aktau Airport",
        "label": "Aktau, Kazakhstan (SCO)"
    }, {
        "country": "Kazakhstan",
        "city": "Aktyubinsk",
        "code": "AKX",
        "class": "kaz",
        "airport": "Aktobe Airport",
        "label": "Aktyubinsk, Kazakhstan (AKX)"
    }, {
        "country": "Kazakhstan",
        "city": "Aktyubinsk",
        "code": "AKX",
        "class": "kaz",
        "airport": "Aktobe Airport",
        "label": "Aktyubinsk, Kazakhstan (AKX)"
    }, {
        "country": "Kenya",
        "city": "Mombasa",
        "code": "MBA",
        "class": "ken",
        "airport": "Mombasa Moi International Airport",
        "label": "Mombasa, Kenya (MBA)"
    }, {
        "country": "Kenya",
        "city": "Malindi",
        "code": "MYD",
        "class": "ken",
        "airport": "Malindi Airport",
        "label": "Malindi, Kenya (MYD)"
    }, {
        "country": "Kenya",
        "city": "Nairobi",
        "code": "WIL",
        "class": "ken",
        "airport": "Nairobi Wilson Airport",
        "label": "Nairobi, Kenya (WIL)"
    }, {
        "country": "Kenya",
        "city": "Lokichoggio",
        "code": "LKG",
        "class": "ken",
        "airport": "Lokichoggio Airport",
        "label": "Lokichoggio, Kenya (LKG)"
    }, {
        "country": "Kenya",
        "city": "Samburu",
        "code": "UAS",
        "class": "ken",
        "airport": "Samburu South Airport",
        "label": "Samburu, Kenya (UAS)"
    }, {
        "country": "Kenya",
        "city": "Amboseli",
        "code": "ASV",
        "class": "ken",
        "airport": "Amboseli Airport",
        "label": "Amboseli, Kenya (ASV)"
    }, {
        "country": "Kenya",
        "city": "Eldoret",
        "code": "EDL",
        "class": "ken",
        "airport": "Eldoret International Airport",
        "label": "Eldoret, Kenya (EDL)"
    }, {
        "country": "Kenya",
        "city": "Nanyuki",
        "code": "NYK",
        "class": "ken",
        "airport": "Nanyuki Airport",
        "label": "Nanyuki, Kenya (NYK)"
    }, {
        "country": "Kenya",
        "city": "Kisumu",
        "code": "KIS",
        "class": "ken",
        "airport": "Kisumu Airport",
        "label": "Kisumu, Kenya (KIS)"
    }, {
        "country": "Kenya",
        "city": "Lamu",
        "code": "LAU",
        "class": "ken",
        "airport": "Manda Airstrip",
        "label": "Lamu, Kenya (LAU)"
    }, {
        "country": "Kenya",
        "city": "Mara Lodges",
        "code": "MRE",
        "class": "ken",
        "airport": "Mara Lodges Airport",
        "label": "Mara Lodges, Kenya (MRE)"
    }, {
        "country": "Kenya",
        "city": "Nairobi",
        "code": "NBO",
        "class": "ken",
        "airport": "Jomo Kenyatta International Airport",
        "label": "Nairobi, Kenya (NBO)"
    }, {
        "country": "Kiribati",
        "city": "Tarawa",
        "code": "TRW",
        "class": "kir",
        "airport": "Bonriki International Airport",
        "label": "Tarawa, Kiribati (TRW)"
    }, {
        "country": "Kiribati",
        "city": "Christmas Island",
        "code": "CXI",
        "class": "kir",
        "airport": "Cassidy International Airport",
        "label": "Christmas Island, Kiribati (CXI)"
    }, {
        "country": "Kuwait",
        "city": "Kuwait",
        "code": "KWI",
        "class": "kuw",
        "airport": "Kuwait International Airport",
        "label": "Kuwait, Kuwait (KWI)"
    }, {
        "country": "Kyrgyzstan",
        "city": "Osh",
        "code": "OSS",
        "class": "kyr",
        "airport": "Osh Airport",
        "label": "Osh, Kyrgyzstan (OSS)"
    }, {
        "country": "Kyrgyzstan",
        "city": "Bishkek",
        "code": "FRU",
        "class": "kyr",
        "airport": "Manas International Airport",
        "label": "Bishkek, Kyrgyzstan (FRU)"
    }, {
        "country": "Laos",
        "city": "Luang Prabang",
        "code": "LPQ",
        "class": "lao",
        "airport": "Luang Phabang International Airport",
        "label": "Luang Prabang, Laos (LPQ)"
    }, {
        "country": "Laos",
        "city": "Pakse",
        "code": "PKZ",
        "class": "lao",
        "airport": "Pakse International Airport",
        "label": "Pakse, Laos (PKZ)"
    }, {
        "country": "Laos",
        "city": "Oudomxay",
        "code": "ODY",
        "class": "lao",
        "airport": "Oudomsay Airport",
        "label": "Oudomxay, Laos (ODY)"
    }, {
        "country": "Laos",
        "city": "Oudomxay",
        "code": "ODY",
        "class": "lao",
        "airport": "Oudomsay Airport",
        "label": "Oudomxay, Laos (ODY)"
    }, {
        "country": "Laos",
        "city": "Vientiane",
        "code": "VTE",
        "class": "lao",
        "airport": "Wattay International Airport",
        "label": "Vientiane, Laos (VTE)"
    }, {
        "country": "Laos",
        "city": "Xieng Khouang",
        "code": "XKH",
        "class": "lao",
        "airport": "Xieng Khouang Airport",
        "label": "Xieng Khouang, Laos (XKH)"
    }, {
        "country": "Latvia",
        "city": "Liepaya",
        "code": "LPX",
        "class": "lat",
        "airport": "Liep?ja International Airport",
        "label": "Liepaya, Latvia (LPX)"
    }, {
        "country": "Latvia",
        "city": "Riga",
        "code": "RIX",
        "class": "lat",
        "airport": "Riga International Airport",
        "label": "Riga, Latvia (RIX)"
    }, {
        "country": "Lebanon",
        "city": "Beirut",
        "code": "BEY",
        "class": "leb",
        "airport": "Beirut Rafic Hariri International Airport",
        "label": "Beirut, Lebanon (BEY)"
    }, {
        "country": "Lesotho",
        "city": "Maseru",
        "code": "MSU",
        "class": "les",
        "airport": "Moshoeshoe I International Airport",
        "label": "Maseru, Lesotho (MSU)"
    }, {
        "country": "Liberia",
        "city": "Monrovia",
        "code": "ROB",
        "class": "lib",
        "airport": "Roberts International Airport",
        "label": "Monrovia, Liberia (ROB)"
    }, {
        "country": "Liberia",
        "city": "Monrovia",
        "code": "MLW",
        "class": "lib",
        "airport": "Spriggs Payne Airport",
        "label": "Monrovia, Liberia (MLW)"
    }, {
        "country": "Lithuania",
        "city": "Vilnius",
        "code": "VNO",
        "class": "lit",
        "airport": "Vilnius International Airport",
        "label": "Vilnius, Lithuania (VNO)"
    }, {
        "country": "Lithuania",
        "city": "Klaipeda\/Palanga",
        "code": "PLQ",
        "class": "lit",
        "airport": "Palanga International Airport",
        "label": "Klaipeda\/Palanga, Lithuania (PLQ)"
    }, {
        "country": "Luxembourg",
        "city": "Luxembourg",
        "code": "LUX",
        "class": "lux",
        "airport": "Luxembourg-Findel International Airport",
        "label": "Luxembourg, Luxembourg (LUX)"
    }, {
        "country": "Macao",
        "city": "Macau",
        "code": "MFM",
        "class": "mac",
        "airport": "Macau International Airport",
        "label": "Macau, Macao (MFM)"
    }, {
        "country": "Macao",
        "city": "Macau",
        "code": "MFM",
        "class": "mac",
        "airport": "Macau International Airport",
        "label": "Macau, Macao (MFM)"
    }, {
        "country": "Macedonia",
        "city": "Skopje",
        "code": "SKP",
        "class": "mac",
        "airport": "Skopje Alexander the Great Airport",
        "label": "Skopje, Macedonia (SKP)"
    }, {
        "country": "Macedonia",
        "city": "Ohrid",
        "code": "OHD",
        "class": "mac",
        "airport": "Ohrid St. Paul the Apostle Airport",
        "label": "Ohrid, Macedonia (OHD)"
    }, {
        "country": "Madagascar",
        "city": "Besalampy",
        "code": "BPY",
        "class": "mad",
        "airport": "Besalampy Airport",
        "label": "Besalampy, Madagascar (BPY)"
    }, {
        "country": "Madagascar",
        "city": "Sambava",
        "code": "SVB",
        "class": "mad",
        "airport": "Sambava Airport",
        "label": "Sambava, Madagascar (SVB)"
    }, {
        "country": "Madagascar",
        "city": "Antananarivo",
        "code": "TNR",
        "class": "mad",
        "airport": "Ivato Airport",
        "label": "Antananarivo, Madagascar (TNR)"
    }, {
        "country": "Madagascar",
        "city": "Maintirano",
        "code": "MXT",
        "class": "mad",
        "airport": "Maintirano Airport",
        "label": "Maintirano, Madagascar (MXT)"
    }, {
        "country": "Madagascar",
        "city": "Maroantsetra",
        "code": "WMN",
        "class": "mad",
        "airport": "Maroantsetra Airport",
        "label": "Maroantsetra, Madagascar (WMN)"
    }, {
        "country": "Madagascar",
        "city": "Farafangana",
        "code": "RVA",
        "class": "mad",
        "airport": "Farafangana Airport",
        "label": "Farafangana, Madagascar (RVA)"
    }, {
        "country": "Madagascar",
        "city": "Analalava",
        "code": "HVA",
        "class": "mad",
        "airport": "Analalava Airport",
        "label": "Analalava, Madagascar (HVA)"
    }, {
        "country": "Madagascar",
        "city": "Soalala",
        "code": "DWB",
        "class": "mad",
        "airport": "Soalala Airport",
        "label": "Soalala, Madagascar (DWB)"
    }, {
        "country": "Madagascar",
        "city": "Morondava",
        "code": "MOQ",
        "class": "mad",
        "airport": "Morondava Airport",
        "label": "Morondava, Madagascar (MOQ)"
    }, {
        "country": "Madagascar",
        "city": "Ankavandra",
        "code": "JVA",
        "class": "mad",
        "airport": "Ankavandra Airport",
        "label": "Ankavandra, Madagascar (JVA)"
    }, {
        "country": "Madagascar",
        "city": "Manja",
        "code": "MJA",
        "class": "mad",
        "airport": "Manja Airport",
        "label": "Manja, Madagascar (MJA)"
    }, {
        "country": "Madagascar",
        "city": "Morombe",
        "code": "MXM",
        "class": "mad",
        "airport": "Morombe Airport",
        "label": "Morombe, Madagascar (MXM)"
    }, {
        "country": "Madagascar",
        "city": "Fort Dauphin",
        "code": "FTU",
        "class": "mad",
        "airport": null,
        "label": "Fort Dauphin, Madagascar (FTU)"
    }, {
        "country": "Madagascar",
        "city": "Sainte Marie",
        "code": "SMS",
        "class": "mad",
        "airport": "Sainte Marie Airport",
        "label": "Sainte Marie, Madagascar (SMS)"
    }, {
        "country": "Madagascar",
        "city": "Morafenobe",
        "code": "TVA",
        "class": "mad",
        "airport": "Morafenobe Airport",
        "label": "Morafenobe, Madagascar (TVA)"
    }, {
        "country": "Madagascar",
        "city": "Antalaha",
        "code": "ANM",
        "class": "mad",
        "airport": "Antsirabato Airport",
        "label": "Antalaha, Madagascar (ANM)"
    }, {
        "country": "Madagascar",
        "city": "Tulear",
        "code": "TLE",
        "class": "mad",
        "airport": "Toliara Airport",
        "label": "Tulear, Madagascar (TLE)"
    }, {
        "country": "Madagascar",
        "city": "Tamatave",
        "code": "TMM",
        "class": "mad",
        "airport": "Toamasina Airport",
        "label": "Tamatave, Madagascar (TMM)"
    }, {
        "country": "Madagascar",
        "city": "Tsiroanomandidy",
        "code": "WTS",
        "class": "mad",
        "airport": "Tsiroanomandidy Airport",
        "label": "Tsiroanomandidy, Madagascar (WTS)"
    }, {
        "country": "Madagascar",
        "city": "Nossi-be",
        "code": "NOS",
        "class": "mad",
        "airport": "Fascene Airport",
        "label": "Nossi-be, Madagascar (NOS)"
    }, {
        "country": "Madagascar",
        "city": "Antsalova",
        "code": "WAQ",
        "class": "mad",
        "airport": "Antsalova Airport",
        "label": "Antsalova, Madagascar (WAQ)"
    }, {
        "country": "Madagascar",
        "city": "Mananjary",
        "code": "MNJ",
        "class": "mad",
        "airport": "Mananjary Airport",
        "label": "Mananjary, Madagascar (MNJ)"
    }, {
        "country": "Madagascar",
        "city": "Majunga",
        "code": "MJN",
        "class": "mad",
        "airport": "Amborovy Airport",
        "label": "Majunga, Madagascar (MJN)"
    }, {
        "country": "Madagascar",
        "city": "Belo",
        "code": "BMD",
        "class": "mad",
        "airport": "Belo sur Tsiribihina Airport",
        "label": "Belo, Madagascar (BMD)"
    }, {
        "country": "Malawi",
        "city": "Club Makokola",
        "code": "CMK",
        "class": "mal",
        "airport": "Club Makokola Airport",
        "label": "Club Makokola, Malawi (CMK)"
    }, {
        "country": "Malawi",
        "city": "Lilongwe",
        "code": "LLW",
        "class": "mal",
        "airport": "Lilongwe International Airport",
        "label": "Lilongwe, Malawi (LLW)"
    }, {
        "country": "Malawi",
        "city": "Blantyre",
        "code": "BLZ",
        "class": "mal",
        "airport": "Chileka International Airport",
        "label": "Blantyre, Malawi (BLZ)"
    }, {
        "country": "Malawi",
        "city": "Mzuzu",
        "code": "ZZU",
        "class": "mal",
        "airport": "Mzuzu Airport",
        "label": "Mzuzu, Malawi (ZZU)"
    }, {
        "country": "Malaysia",
        "city": "Bario",
        "code": "BBN",
        "class": "mal",
        "airport": "Bario Airport",
        "label": "Bario, Malaysia (BBN)"
    }, {
        "country": "Malaysia",
        "city": "Tawau",
        "code": "TWU",
        "class": "mal",
        "airport": "Tawau Airport",
        "label": "Tawau, Malaysia (TWU)"
    }, {
        "country": "Malaysia",
        "city": "Ipoh",
        "code": "IPH",
        "class": "mal",
        "airport": "Sultan Azlan Shah Airport",
        "label": "Ipoh, Malaysia (IPH)"
    }, {
        "country": "Malaysia",
        "city": "Kuala Lumpur",
        "code": "KUL",
        "class": "mal",
        "airport": "Kuala Lumpur International Airport",
        "label": "Kuala Lumpur, Malaysia (KUL)"
    }, {
        "country": "Malaysia",
        "city": "Pangkor",
        "code": "PKG",
        "class": "mal",
        "airport": "Pulau Pangkor Airport",
        "label": "Pangkor, Malaysia (PKG)"
    }, {
        "country": "Malaysia",
        "city": "Sandakan",
        "code": "SDK",
        "class": "mal",
        "airport": "Sandakan Airport",
        "label": "Sandakan, Malaysia (SDK)"
    }, {
        "country": "Malaysia",
        "city": "Long Akah",
        "code": "LKH",
        "class": "mal",
        "airport": "Long Akah Airport",
        "label": "Long Akah, Malaysia (LKH)"
    }, {
        "country": "Malaysia",
        "city": "Long Banga",
        "code": "LBP",
        "class": "mal",
        "airport": "Long Banga Airport",
        "label": "Long Banga, Malaysia (LBP)"
    }, {
        "country": "Malaysia",
        "city": "Long Lellang",
        "code": "LGL",
        "class": "mal",
        "airport": "Long Lellang Airport",
        "label": "Long Lellang, Malaysia (LGL)"
    }, {
        "country": "Malaysia",
        "city": "Alor Setar",
        "code": "AOR",
        "class": "mal",
        "airport": "Sultan Abdul Halim Airport",
        "label": "Alor Setar, Malaysia (AOR)"
    }, {
        "country": "Malaysia",
        "city": "Redang",
        "code": "RDN",
        "class": "mal",
        "airport": "LTS Pulau Redang Airport",
        "label": "Redang, Malaysia (RDN)"
    }, {
        "country": "Malaysia",
        "city": "Kota Bharu",
        "code": "KBR",
        "class": "mal",
        "airport": "Sultan Ismail Petra Airport",
        "label": "Kota Bharu, Malaysia (KBR)"
    }, {
        "country": "Malaysia",
        "city": "Miri",
        "code": "MYY",
        "class": "mal",
        "airport": "Miri Airport",
        "label": "Miri, Malaysia (MYY)"
    }, {
        "country": "Malaysia",
        "city": "Sibu",
        "code": "SBW",
        "class": "mal",
        "airport": "Sibu Airport",
        "label": "Sibu, Malaysia (SBW)"
    }, {
        "country": "Malaysia",
        "city": "Limbang",
        "code": "LMN",
        "class": "mal",
        "airport": "Limbang Airport",
        "label": "Limbang, Malaysia (LMN)"
    }, {
        "country": "Malaysia",
        "city": "Kota Kinabalu",
        "code": "BKI",
        "class": "mal",
        "airport": "Kota Kinabalu International Airport",
        "label": "Kota Kinabalu, Malaysia (BKI)"
    }, {
        "country": "Malaysia",
        "city": "Genting",
        "code": "KUL",
        "class": "mal",
        "airport": "Kuala Lumpur International Airport",
        "label": "Genting, Malaysia  (nearest airport Kuala Lumpur, KUL)"
    }, {
        "country": "Malaysia",
        "city": "Kudat",
        "code": "KUD",
        "class": "mal",
        "airport": "Kudat Airport",
        "label": "Kudat, Malaysia (KUD)"
    }, {
        "country": "Malaysia",
        "city": "Mulu",
        "code": "MZV",
        "class": "mal",
        "airport": "Mulu Airport",
        "label": "Mulu, Malaysia (MZV)"
    }, {
        "country": "Malaysia",
        "city": "Kuching",
        "code": "KCH",
        "class": "mal",
        "airport": "Kuching International Airport",
        "label": "Kuching, Malaysia (KCH)"
    }, {
        "country": "Malaysia",
        "city": "Bintulu",
        "code": "BTU",
        "class": "mal",
        "airport": "Bintulu Airport",
        "label": "Bintulu, Malaysia (BTU)"
    }, {
        "country": "Malaysia",
        "city": "Marudi",
        "code": "MUR",
        "class": "mal",
        "airport": "Marudi Airport",
        "label": "Marudi, Malaysia (MUR)"
    }, {
        "country": "Malaysia",
        "city": "Langkawi",
        "code": "LGK",
        "class": "mal",
        "airport": "Langkawi International Airport",
        "label": "Langkawi, Malaysia (LGK)"
    }, {
        "country": "Malaysia",
        "city": "Labuan",
        "code": "LBU",
        "class": "mal",
        "airport": "Labuan Airport",
        "label": "Labuan, Malaysia (LBU)"
    }, {
        "country": "Malaysia",
        "city": "Johor Bahru",
        "code": "JHB",
        "class": "mal",
        "airport": "Senai International Airport",
        "label": "Johor Bahru, Malaysia (JHB)"
    }, {
        "country": "Malaysia",
        "city": "Lahad Datu",
        "code": "LDU",
        "class": "mal",
        "airport": "Lahad Datu Airport",
        "label": "Lahad Datu, Malaysia (LDU)"
    }, {
        "country": "Malaysia",
        "city": "Penang",
        "code": "PEN",
        "class": "mal",
        "airport": "Penang International Airport",
        "label": "Penang, Malaysia (PEN)"
    }, {
        "country": "Malaysia",
        "city": "Mukah",
        "code": "MKM",
        "class": "mal",
        "airport": "Mukah Airport",
        "label": "Mukah, Malaysia (MKM)"
    }, {
        "country": "Malaysia",
        "city": "Tioman",
        "code": "TOD",
        "class": "mal",
        "airport": "Pulau Tioman Airport",
        "label": "Tioman, Malaysia (TOD)"
    }, {
        "country": "Malaysia",
        "city": "Kuantan",
        "code": "KUA",
        "class": "mal",
        "airport": "Kuantan Airport",
        "label": "Kuantan, Malaysia (KUA)"
    }, {
        "country": "Malaysia",
        "city": "Kuala Lumpur",
        "code": "SZB",
        "class": "mal",
        "airport": "Sultan Abdul Aziz Shah International Airport",
        "label": "Kuala Lumpur, Malaysia (SZB)"
    }, {
        "country": "Malaysia",
        "city": "Lawas",
        "code": "LWY",
        "class": "mal",
        "airport": "Lawas Airport",
        "label": "Lawas, Malaysia (LWY)"
    }, {
        "country": "Malaysia",
        "city": "Long Seridan",
        "code": "ODN",
        "class": "mal",
        "airport": "Long Seridan Airport",
        "label": "Long Seridan, Malaysia (ODN)"
    }, {
        "country": "Malaysia",
        "city": "Bakalalan",
        "code": "BKM",
        "class": "mal",
        "airport": "Bakalalan Airport",
        "label": "Bakalalan, Malaysia (BKM)"
    }, {
        "country": "Malaysia",
        "city": "Kuala Terengganu",
        "code": "TGG",
        "class": "mal",
        "airport": "Sultan Mahmud Airport",
        "label": "Kuala Terengganu, Malaysia (TGG)"
    }, {
        "country": "Maldives",
        "city": "Gan Island",
        "code": "GAN",
        "class": "mal",
        "airport": "Gan International Airport",
        "label": "Gan Island, Maldives (GAN)"
    }, {
        "country": "Maldives",
        "city": "Kadhdhoo",
        "code": "KDO",
        "class": "mal",
        "airport": "Kadhdhoo Airport",
        "label": "Kadhdhoo, Maldives (KDO)"
    }, {
        "country": "Maldives",
        "city": "Hanimaadhoo",
        "code": "HAQ",
        "class": "mal",
        "airport": "Hanimaadhoo Airport",
        "label": "Hanimaadhoo, Maldives (HAQ)"
    }, {
        "country": "Maldives",
        "city": "Kaadedhdhoo",
        "code": "KDM",
        "class": "mal",
        "airport": "Kaadedhdhoo Airport",
        "label": "Kaadedhdhoo, Maldives (KDM)"
    }, {
        "country": "Maldives",
        "city": "Male",
        "code": "MLE",
        "class": "mal",
        "airport": null,
        "label": "Male, Maldives (MLE)"
    }, {
        "country": "Mali",
        "city": "Bamako",
        "code": "BKO",
        "class": "mal",
        "airport": "Senou Airport",
        "label": "Bamako, Mali (BKO)"
    }, {
        "country": "Mali",
        "city": "Tombouctou",
        "code": "TOM",
        "class": "mal",
        "airport": "Timbuktu Airport",
        "label": "Tombouctou, Mali (TOM)"
    }, {
        "country": "Mali",
        "city": "Mopti",
        "code": "MZI",
        "class": "mal",
        "airport": "Ambodedjo Airport",
        "label": "Mopti, Mali (MZI)"
    }, {
        "country": "Mali",
        "city": "Kayes",
        "code": "KYS",
        "class": "mal",
        "airport": "Kayes Dag Dag Airport",
        "label": "Kayes, Mali (KYS)"
    }, {
        "country": "Malta",
        "city": "Malta",
        "code": "MLA",
        "class": "mal",
        "airport": "Luqa Airport",
        "label": "Malta, Malta (MLA)"
    }, {
        "country": "Marshall Islands",
        "city": "Majuro",
        "code": "MAJ",
        "class": "mar",
        "airport": "Marshall Islands International Airport",
        "label": "Majuro, Marshall Islands (MAJ)"
    }, {
        "country": "Marshall Islands",
        "city": "Rongelap Island",
        "code": "RNP",
        "class": "mar",
        "airport": "Rongelap Island Airport",
        "label": "Rongelap Island, Marshall Islands (RNP)"
    }, {
        "country": "Marshall Islands",
        "city": "Woja",
        "code": "WJA",
        "class": "mar",
        "airport": "Woja Airport",
        "label": "Woja, Marshall Islands (WJA)"
    }, {
        "country": "Marshall Islands",
        "city": "Bikini Atoll",
        "code": "BII",
        "class": "mar",
        "airport": "Enyu Airfield",
        "label": "Bikini Atoll, Marshall Islands (BII)"
    }, {
        "country": "Marshall Islands",
        "city": "Bikini Atoll",
        "code": "BII",
        "class": "mar",
        "airport": "Enyu Airfield",
        "label": "Bikini Atoll, Marshall Islands (BII)"
    }, {
        "country": "Marshall Islands",
        "city": "Kwajalein",
        "code": "KWA",
        "class": "mar",
        "airport": "Bucholz Army Air Field",
        "label": "Kwajalein, Marshall Islands (KWA)"
    }, {
        "country": "Marshall Islands",
        "city": "Jeh",
        "code": "JEJ",
        "class": "mar",
        "airport": "Jeh Airport",
        "label": "Jeh, Marshall Islands (JEJ)"
    }, {
        "country": "Mauritania",
        "city": "Zouerate",
        "code": "OUZ",
        "class": "mau",
        "airport": "Tazadit Airport",
        "label": "Zouerate, Mauritania (OUZ)"
    }, {
        "country": "Mauritania",
        "city": "Nouakchott",
        "code": "NKC",
        "class": "mau",
        "airport": "Nouakchott International Airport",
        "label": "Nouakchott, Mauritania (NKC)"
    }, {
        "country": "Mauritania",
        "city": "Nouadhibou",
        "code": "NDB",
        "class": "mau",
        "airport": "Nouadhibou International Airport",
        "label": "Nouadhibou, Mauritania (NDB)"
    }, {
        "country": "Mauritius",
        "city": "Mauritius",
        "code": "MRU",
        "class": "mau",
        "airport": "Sir Seewoosagur Ramgoolam International Airport",
        "label": "Mauritius, Mauritius (MRU)"
    }, {
        "country": "Mauritius",
        "city": "Rodrigues Is",
        "code": "RRG",
        "class": "mau",
        "airport": "Sir Charles Gaetan Duval Airport",
        "label": "Rodrigues Is, Mauritius (RRG)"
    }, {
        "country": "Mayotte",
        "city": "Dzaoudzi",
        "code": "DZA",
        "class": "may",
        "airport": "Dzaoudzi Pamandzi International Airport",
        "label": "Dzaoudzi, Mayotte (DZA)"
    }, {
        "country": "Mexico",
        "city": "Cancun",
        "code": "CUN",
        "class": "mex",
        "airport": null,
        "label": "Cancun, Mexico (CUN)"
    }, {
        "country": "Mexico",
        "city": "Durango",
        "code": "DGO",
        "class": "mex",
        "airport": "General Guadalupe Victoria International Airport",
        "label": "Durango, Mexico (DGO)"
    }, {
        "country": "Mexico",
        "city": "San Jose Cabo",
        "code": "SJD",
        "class": "mex",
        "airport": "Los Cabos International Airport",
        "label": "San Jose Cabo, Mexico (SJD)"
    }, {
        "country": "Mexico",
        "city": "Salina Cruz",
        "code": "SCX",
        "class": "mex",
        "airport": "Salina Cruz Naval Air Station",
        "label": "Salina Cruz, Mexico (SCX)"
    }, {
        "country": "Mexico",
        "city": "Ciudad Del Carmen",
        "code": "CME",
        "class": "mex",
        "airport": "Ciudad del Carmen International Airport",
        "label": "Ciudad Del Carmen, Mexico (CME)"
    }, {
        "country": "Mexico",
        "city": "Colima",
        "code": "CLQ",
        "class": "mex",
        "airport": "Lic. Miguel de la Madrid Airport",
        "label": "Colima, Mexico (CLQ)"
    }, {
        "country": "Mexico",
        "city": "Guaymas",
        "code": "GYM",
        "class": "mex",
        "airport": null,
        "label": "Guaymas, Mexico (GYM)"
    }, {
        "country": "Mexico",
        "city": "Campeche",
        "code": "CPE",
        "class": "mex",
        "airport": null,
        "label": "Campeche, Mexico (CPE)"
    }, {
        "country": "Mexico",
        "city": "Saltillo",
        "code": "SLW",
        "class": "mex",
        "airport": "Plan De Guadalupe International Airport",
        "label": "Saltillo, Mexico (SLW)"
    }, {
        "country": "Mexico",
        "city": "Chetumal",
        "code": "CTM",
        "class": "mex",
        "airport": "Chetumal International Airport",
        "label": "Chetumal, Mexico (CTM)"
    }, {
        "country": "Mexico",
        "city": "Leon\/Guanajuato",
        "code": "BJX",
        "class": "mex",
        "airport": null,
        "label": "Leon\/Guanajuato, Mexico (BJX)"
    }, {
        "country": "Mexico",
        "city": "Ciudad Victoria",
        "code": "CVM",
        "class": "mex",
        "airport": "General Pedro Jose Mendez International Airport",
        "label": "Ciudad Victoria, Mexico (CVM)"
    }, {
        "country": "Mexico",
        "city": "Tijuana",
        "code": "TIJ",
        "class": "mex",
        "airport": null,
        "label": "Tijuana, Mexico (TIJ)"
    }, {
        "country": "Mexico",
        "city": "Los Mochis",
        "code": "LMM",
        "class": "mex",
        "airport": "Valle del Fuerte International Airport",
        "label": "Los Mochis, Mexico (LMM)"
    }, {
        "country": "Mexico",
        "city": "Veracruz",
        "code": "VER",
        "class": "mex",
        "airport": "General Heriberto Jara International Airport",
        "label": "Veracruz, Mexico (VER)"
    }, {
        "country": "Mexico",
        "city": "Lazaro Cardenas",
        "code": "LZC",
        "class": "mex",
        "airport": null,
        "label": "Lazaro Cardenas, Mexico (LZC)"
    }, {
        "country": "Mexico",
        "city": "Piedras Negras",
        "code": "PDS",
        "class": "mex",
        "airport": "Piedras Negras International Airport",
        "label": "Piedras Negras, Mexico (PDS)"
    }, {
        "country": "Mexico",
        "city": "Loreto",
        "code": "LTO",
        "class": "mex",
        "airport": "Loreto International Airport",
        "label": "Loreto, Mexico (LTO)"
    }, {
        "country": "Mexico",
        "city": "Ciudad Juarez",
        "code": "CJS",
        "class": "mex",
        "airport": null,
        "label": "Ciudad Juarez, Mexico (CJS)"
    }, {
        "country": "Mexico",
        "city": "Ciudad Obregon",
        "code": "CEN",
        "class": "mex",
        "airport": null,
        "label": "Ciudad Obregon, Mexico (CEN)"
    }, {
        "country": "Mexico",
        "city": "La Paz",
        "code": "LAP",
        "class": "mex",
        "airport": null,
        "label": "La Paz, Mexico (LAP)"
    }, {
        "country": "Mexico",
        "city": "Tepic",
        "code": "TPQ",
        "class": "mex",
        "airport": "Amado Nervo National Airport",
        "label": "Tepic, Mexico (TPQ)"
    }, {
        "country": "Mexico",
        "city": "Toluca",
        "code": "TLC",
        "class": "mex",
        "airport": "Licenciado Adolfo Lopez Mateos International Airport",
        "label": "Toluca, Mexico (TLC)"
    }, {
        "country": "Mexico",
        "city": "Huatulco",
        "code": "HUX",
        "class": "mex",
        "airport": null,
        "label": "Huatulco, Mexico (HUX)"
    }, {
        "country": "Mexico",
        "city": "Culiacan",
        "code": "CUL",
        "class": "mex",
        "airport": "Federal de Bachigualato International Airport",
        "label": "Culiacan, Mexico (CUL)"
    }, {
        "country": "Mexico",
        "city": "Monterrey",
        "code": "MTY",
        "class": "mex",
        "airport": "General Mariano Escobedo International Airport",
        "label": "Monterrey, Mexico (MTY)"
    }, {
        "country": "Mexico",
        "city": "Matamoros",
        "code": "MAM",
        "class": "mex",
        "airport": "General Servando Canales International Airport",
        "label": "Matamoros, Mexico (MAM)"
    }, {
        "country": "Mexico",
        "city": "Acapulco",
        "code": "ACA",
        "class": "mex",
        "airport": "General Juan N Alvarez International Airport",
        "label": "Acapulco, Mexico (ACA)"
    }, {
        "country": "Mexico",
        "city": "Mexicali",
        "code": "MXL",
        "class": "mex",
        "airport": null,
        "label": "Mexicali, Mexico (MXL)"
    }, {
        "country": "Mexico",
        "city": "Puebla",
        "code": "PBC",
        "class": "mex",
        "airport": null,
        "label": "Puebla, Mexico (PBC)"
    }, {
        "country": "Mexico",
        "city": "Jalapa",
        "code": "JAL",
        "class": "mex",
        "airport": "El Lencero Airport",
        "label": "Jalapa, Mexico (JAL)"
    }, {
        "country": "Mexico",
        "city": "Morelia",
        "code": "MLM",
        "class": "mex",
        "airport": "General Francisco J. Mujica International Airport",
        "label": "Morelia, Mexico (MLM)"
    }, {
        "country": "Mexico",
        "city": "Minatitlan",
        "code": "MTT",
        "class": "mex",
        "airport": null,
        "label": "Minatitlan, Mexico (MTT)"
    }, {
        "country": "Mexico",
        "city": "Guadalajara",
        "code": "GDL",
        "class": "mex",
        "airport": "Don Miguel Hidalgo Y Costilla International Airport",
        "label": "Guadalajara, Mexico (GDL)"
    }, {
        "country": "Mexico",
        "city": "Ixtapa\/Zihuatanejo",
        "code": "ZIH",
        "class": "mex",
        "airport": "Ixtapa Zihuatanejo International Airport",
        "label": "Ixtapa\/Zihuatanejo, Mexico (ZIH)"
    }, {
        "country": "Mexico",
        "city": "Ixtapa\/Zihuatanejo",
        "code": "ZIH",
        "class": "mex",
        "airport": "Ixtapa Zihuatanejo International Airport",
        "label": "Ixtapa\/Zihuatanejo, Mexico (ZIH)"
    }, {
        "country": "Mexico",
        "city": "Poza Rica",
        "code": "PAZ",
        "class": "mex",
        "airport": null,
        "label": "Poza Rica, Mexico (PAZ)"
    }, {
        "country": "Mexico",
        "city": "Oaxaca",
        "code": "OAX",
        "class": "mex",
        "airport": null,
        "label": "Oaxaca, Mexico (OAX)"
    }, {
        "country": "Mexico",
        "city": "Aguascalientes",
        "code": "AGU",
        "class": "mex",
        "airport": "Jesus Teran International Airport",
        "label": "Aguascalientes, Mexico (AGU)"
    }, {
        "country": "Mexico",
        "city": "Monclova",
        "code": "LOV",
        "class": "mex",
        "airport": "Monclova International Airport",
        "label": "Monclova, Mexico (LOV)"
    }, {
        "country": "Mexico",
        "city": "Mazatlan",
        "code": "MZT",
        "class": "mex",
        "airport": "General Rafael Buelna International Airport",
        "label": "Mazatlan, Mexico (MZT)"
    }, {
        "country": "Mexico",
        "city": "Hermosillo",
        "code": "HMO",
        "class": "mex",
        "airport": "General Ignacio P. Garcia International Airport",
        "label": "Hermosillo, Mexico (HMO)"
    }, {
        "country": "Mexico",
        "city": "Tapachula",
        "code": "TAP",
        "class": "mex",
        "airport": "Tapachula International Airport",
        "label": "Tapachula, Mexico (TAP)"
    }, {
        "country": "Mexico",
        "city": "Puerto Penasco",
        "code": "PPE",
        "class": "mex",
        "airport": "Puerto Penasco Airport",
        "label": "Puerto Penasco, Mexico (PPE)"
    }, {
        "country": "Mexico",
        "city": "Merida",
        "code": "MID",
        "class": "mex",
        "airport": "Licenciado Manuel Crescencio Rejon Int Airport",
        "label": "Merida, Mexico (MID)"
    }, {
        "country": "Mexico",
        "city": "Reynosa",
        "code": "REX",
        "class": "mex",
        "airport": "General Lucio Blanco International Airport",
        "label": "Reynosa, Mexico (REX)"
    }, {
        "country": "Mexico",
        "city": "Chihuahua",
        "code": "CUU",
        "class": "mex",
        "airport": "General Roberto Fierro Villalobos International Airport",
        "label": "Chihuahua, Mexico (CUU)"
    }, {
        "country": "Mexico",
        "city": "Mexico City",
        "code": "MEX",
        "class": "mex",
        "airport": "Licenciado Benito Juarez International Airport",
        "label": "Mexico City, Mexico (MEX)"
    }, {
        "country": "Mexico",
        "city": "Puerto Vallarta",
        "code": "PVR",
        "class": "mex",
        "airport": null,
        "label": "Puerto Vallarta, Mexico (PVR)"
    }, {
        "country": "Mexico",
        "city": "Cozumel",
        "code": "CZM",
        "class": "mex",
        "airport": "Cozumel International Airport",
        "label": "Cozumel, Mexico (CZM)"
    }, {
        "country": "Mexico",
        "city": "Manzanillo",
        "code": "ZLO",
        "class": "mex",
        "airport": "Playa De Oro International Airport",
        "label": "Manzanillo, Mexico (ZLO)"
    }, {
        "country": "Mexico",
        "city": "Tampico",
        "code": "TAM",
        "class": "mex",
        "airport": "General Francisco Javier Mina International Airport",
        "label": "Tampico, Mexico (TAM)"
    }, {
        "country": "Mexico",
        "city": "Villahermosa",
        "code": "VSA",
        "class": "mex",
        "airport": null,
        "label": "Villahermosa, Mexico (VSA)"
    }, {
        "country": "Mexico",
        "city": "Puerto Escondido",
        "code": "PXM",
        "class": "mex",
        "airport": "Puerto Escondido International Airport",
        "label": "Puerto Escondido, Mexico (PXM)"
    }, {
        "country": "Mexico",
        "city": "Queretaro",
        "code": "QRO",
        "class": "mex",
        "airport": null,
        "label": "Queretaro, Mexico (QRO)"
    }, {
        "country": "Mexico",
        "city": "Torreon",
        "code": "TRC",
        "class": "mex",
        "airport": "Francisco Sarabia International Airport",
        "label": "Torreon, Mexico (TRC)"
    }, {
        "country": "Mexico",
        "city": "Uruapan",
        "code": "UPN",
        "class": "mex",
        "airport": "Licenciado y General Ignacio Lopez Rayon Airport",
        "label": "Uruapan, Mexico (UPN)"
    }, {
        "country": "Mexico",
        "city": "Zacatecas",
        "code": "ZCL",
        "class": "mex",
        "airport": "General Leobardo C. Ruiz International Airport",
        "label": "Zacatecas, Mexico (ZCL)"
    }, {
        "country": "Mexico",
        "city": "Nuevo Laredo",
        "code": "NLD",
        "class": "mex",
        "airport": null,
        "label": "Nuevo Laredo, Mexico (NLD)"
    }, {
        "country": "Mexico",
        "city": "San Luis Potosa",
        "code": "SLP",
        "class": "mex",
        "airport": "Ponciano Arriaga International Airport",
        "label": "San Luis Potosa, Mexico (SLP)"
    }, {
        "country": "Moldova",
        "city": "Chisinau",
        "code": "KIV",
        "class": "mol",
        "airport": "Chi?in?u International Airport",
        "label": "Chisinau, Moldova (KIV)"
    }, {
        "country": "Mongolia",
        "city": "Ulaanbaatar",
        "code": "ULN",
        "class": "mon",
        "airport": "Chinggis Khaan International Airport",
        "label": "Ulaanbaatar, Mongolia (ULN)"
    }, {
        "country": "Montenegro",
        "city": "Tivat",
        "code": "TIV",
        "class": "mon",
        "airport": "Tivat Airport",
        "label": "Tivat, Montenegro (TIV)"
    }, {
        "country": "Montenegro",
        "city": "Podgorica",
        "code": "TGD",
        "class": "mon",
        "airport": "Podgorica Airport",
        "label": "Podgorica, Montenegro (TGD)"
    }, {
        "country": "Montserrat",
        "city": "Montserrat",
        "code": "MNI",
        "class": "mon",
        "airport": "W. H. Bramble Airport",
        "label": "Montserrat, Montserrat (MNI)"
    }, {
        "country": "Morocco",
        "city": "Fez",
        "code": "FEZ",
        "class": "mor",
        "airport": null,
        "label": "Fez, Morocco (FEZ)"
    }, {
        "country": "Morocco",
        "city": "Laayoune",
        "code": "EUN",
        "class": "mor",
        "airport": "Hassan I Airport",
        "label": "Laayoune, Morocco (EUN)"
    }, {
        "country": "Morocco",
        "city": "Nador",
        "code": "NDR",
        "class": "mor",
        "airport": "Nador International Airport",
        "label": "Nador, Morocco (NDR)"
    }, {
        "country": "Morocco",
        "city": "Rabat",
        "code": "RBA",
        "class": "mor",
        "airport": null,
        "label": "Rabat, Morocco (RBA)"
    }, {
        "country": "Morocco",
        "city": "Essaouira",
        "code": "ESU",
        "class": "mor",
        "airport": "Mogador Airport",
        "label": "Essaouira, Morocco (ESU)"
    }, {
        "country": "Morocco",
        "city": "Tan Tan",
        "code": "TTA",
        "class": "mor",
        "airport": "Tan Tan Airport",
        "label": "Tan Tan, Morocco (TTA)"
    }, {
        "country": "Morocco",
        "city": "Al Hoceima",
        "code": "AHU",
        "class": "mor",
        "airport": "Cherif Al Idrissi Airport",
        "label": "Al Hoceima, Morocco (AHU)"
    }, {
        "country": "Morocco",
        "city": "Tetouan",
        "code": "TTU",
        "class": "mor",
        "airport": "Saniat Rmel Airport",
        "label": "Tetouan, Morocco (TTU)"
    }, {
        "country": "Morocco",
        "city": "Marrakesh",
        "code": "RAK",
        "class": "mor",
        "airport": "Menara Airport",
        "label": "Marrakesh, Morocco (RAK)"
    }, {
        "country": "Morocco",
        "city": "Casablanca",
        "code": "CMN",
        "class": "mor",
        "airport": "Mohammed V International Airport",
        "label": "Casablanca, Morocco (CMN)"
    }, {
        "country": "Morocco",
        "city": "Tangier",
        "code": "TNG",
        "class": "mor",
        "airport": "Ibn Batouta Airport",
        "label": "Tangier, Morocco (TNG)"
    }, {
        "country": "Morocco",
        "city": "Errachidia",
        "code": "ERH",
        "class": "mor",
        "airport": "Moulay Ali Cherif Airport",
        "label": "Errachidia, Morocco (ERH)"
    }, {
        "country": "Morocco",
        "city": "Dakhla",
        "code": "VIL",
        "class": "mor",
        "airport": "Dakhla Airport",
        "label": "Dakhla, Morocco (VIL)"
    }, {
        "country": "Morocco",
        "city": "Agadir",
        "code": "AGA",
        "class": "mor",
        "airport": "Al Massira Airport",
        "label": "Agadir, Morocco (AGA)"
    }, {
        "country": "Morocco",
        "city": "Ouarzazate",
        "code": "OZZ",
        "class": "mor",
        "airport": "Ouarzazate Airport",
        "label": "Ouarzazate, Morocco (OZZ)"
    }, {
        "country": "Morocco",
        "city": "Goulimime",
        "code": "GLN",
        "class": "mor",
        "airport": "Goulimime Airport",
        "label": "Goulimime, Morocco (GLN)"
    }, {
        "country": "Morocco",
        "city": "Oujda",
        "code": "OUD",
        "class": "mor",
        "airport": "Angads Airport",
        "label": "Oujda, Morocco (OUD)"
    }, {
        "country": "Mozambique",
        "city": "Inhambane",
        "code": "INH",
        "class": "moz",
        "airport": "Inhambane Airport",
        "label": "Inhambane, Mozambique (INH)"
    }, {
        "country": "Mozambique",
        "city": "Bazaruto Island",
        "code": "BZB",
        "class": "moz",
        "airport": "Bazaruto Island Airport",
        "label": "Bazaruto Island, Mozambique (BZB)"
    }, {
        "country": "Mozambique",
        "city": "Beira",
        "code": "BEW",
        "class": "moz",
        "airport": "Beira Airport",
        "label": "Beira, Mozambique (BEW)"
    }, {
        "country": "Mozambique",
        "city": "Chimoio",
        "code": "VPY",
        "class": "moz",
        "airport": "Chimoio Airport",
        "label": "Chimoio, Mozambique (VPY)"
    }, {
        "country": "Mozambique",
        "city": "Vilanculos",
        "code": "VNX",
        "class": "moz",
        "airport": "Vilankulo Airport",
        "label": "Vilanculos, Mozambique (VNX)"
    }, {
        "country": "Mozambique",
        "city": "Tete",
        "code": "TET",
        "class": "moz",
        "airport": "Chingozi Airport",
        "label": "Tete, Mozambique (TET)"
    }, {
        "country": "Mozambique",
        "city": "Maputo",
        "code": "MPM",
        "class": "moz",
        "airport": "Maputo Airport",
        "label": "Maputo, Mozambique (MPM)"
    }, {
        "country": "Mozambique",
        "city": "Pemba",
        "code": "POL",
        "class": "moz",
        "airport": "Pemba Airport",
        "label": "Pemba, Mozambique (POL)"
    }, {
        "country": "Mozambique",
        "city": "Nampula",
        "code": "APL",
        "class": "moz",
        "airport": "Nampula Airport",
        "label": "Nampula, Mozambique (APL)"
    }, {
        "country": "Mozambique",
        "city": "Lichinga",
        "code": "VXC",
        "class": "moz",
        "airport": "Lichinga Airport",
        "label": "Lichinga, Mozambique (VXC)"
    }, {
        "country": "Myanmar",
        "city": "Yangon",
        "code": "RGN",
        "class": "mya",
        "airport": "Yangon International Airport",
        "label": "Yangon International Airport"
    }, {
        "country": "Namibia",
        "city": "Mpacha",
        "code": "MPA",
        "class": "nam",
        "airport": "Katima Mulilo Airport",
        "label": "Mpacha, Namibia (MPA)"
    }, {
        "country": "Namibia",
        "city": "Luderitz",
        "code": "LUD",
        "class": "nam",
        "airport": "Luderitz Airport",
        "label": "Luderitz, Namibia (LUD)"
    }, {
        "country": "Namibia",
        "city": "Oranjemund",
        "code": "OMD",
        "class": "nam",
        "airport": "Oranjemund Airport",
        "label": "Oranjemund, Namibia (OMD)"
    }, {
        "country": "Namibia",
        "city": "Walvis Bay",
        "code": "WVB",
        "class": "nam",
        "airport": "Walvis Bay Airport",
        "label": "Walvis Bay, Namibia (WVB)"
    }, {
        "country": "Namibia",
        "city": "Ondangwa",
        "code": "OND",
        "class": "nam",
        "airport": "Ondangwa Airport",
        "label": "Ondangwa, Namibia (OND)"
    }, {
        "country": "Namibia",
        "city": "Windhoek",
        "code": "WDH",
        "class": "nam",
        "airport": "Hosea Kutako International Airport",
        "label": "Windhoek, Namibia (WDH)"
    }, {
        "country": "Namibia",
        "city": "Windhoek",
        "code": "ERS",
        "class": "nam",
        "airport": "Eros Airport",
        "label": "Windhoek, Namibia (ERS)"
    }, {
        "country": "Nauru",
        "city": "Nauru Island",
        "code": "INU",
        "class": "nau",
        "airport": "Nauru International Airport",
        "label": "Nauru Island, Nauru (INU)"
    }, {
        "country": "Nepal",
        "city": "Rumjatar",
        "code": "RUM",
        "class": "nep",
        "airport": "Rumjatar Airport",
        "label": "Rumjatar, Nepal (RUM)"
    }, {
        "country": "Nepal",
        "city": "Bharatpur",
        "code": "BHR",
        "class": "nep",
        "airport": "Bharatpur Airport",
        "label": "Bharatpur, Nepal (BHR)"
    }, {
        "country": "Nepal",
        "city": "Rukumkot",
        "code": "RUK",
        "class": "nep",
        "airport": "Rukumkot Airport",
        "label": "Rukumkot, Nepal (RUK)"
    }, {
        "country": "Nepal",
        "city": "Lukla",
        "code": "LUA",
        "class": "nep",
        "airport": "Lukla Airport",
        "label": "Lukla, Nepal (LUA)"
    }, {
        "country": "Nepal",
        "city": "Nepalganj",
        "code": "KEP",
        "class": "nep",
        "airport": "Nepalgunj Airport",
        "label": "Nepalganj, Nepal (KEP)"
    }, {
        "country": "Nepal",
        "city": "Bhadrapur",
        "code": "BDP",
        "class": "nep",
        "airport": "Bhadrapur Airport",
        "label": "Bhadrapur, Nepal (BDP)"
    }, {
        "country": "Nepal",
        "city": "Simikot",
        "code": "IMK",
        "class": "nep",
        "airport": "Simikot Airport",
        "label": "Simikot, Nepal (IMK)"
    }, {
        "country": "Nepal",
        "city": "Kathmandu",
        "code": "KTM",
        "class": "nep",
        "airport": "Tribhuvan International Airport",
        "label": "Kathmandu, Nepal (KTM)"
    }, {
        "country": "Nepal",
        "city": "Simara",
        "code": "SIF",
        "class": "nep",
        "airport": "Simara Airport",
        "label": "Simara, Nepal (SIF)"
    }, {
        "country": "Nepal",
        "city": "Jumla",
        "code": "JUM",
        "class": "nep",
        "airport": "Jumla Airport",
        "label": "Jumla, Nepal (JUM)"
    }, {
        "country": "Nepal",
        "city": "Lamidanda",
        "code": "LDN",
        "class": "nep",
        "airport": "Lamidanda Airport",
        "label": "Lamidanda, Nepal (LDN)"
    }, {
        "country": "Nepal",
        "city": "Biratnagar",
        "code": "BIR",
        "class": "nep",
        "airport": "Biratnagar Airport",
        "label": "Biratnagar, Nepal (BIR)"
    }, {
        "country": "Nepal",
        "city": "Pokhara",
        "code": "PKR",
        "class": "nep",
        "airport": "Pokhara Airport",
        "label": "Pokhara, Nepal (PKR)"
    }, {
        "country": "Nepal",
        "city": "Surkhet",
        "code": "SKH",
        "class": "nep",
        "airport": "Surkhet Airport",
        "label": "Surkhet, Nepal (SKH)"
    }, {
        "country": "Nepal",
        "city": "Meghauli",
        "code": "MEY",
        "class": "nep",
        "airport": "Meghauli Airport",
        "label": "Meghauli, Nepal (MEY)"
    }, {
        "country": "Nepal",
        "city": "Bhairawa",
        "code": "BWA",
        "class": "nep",
        "airport": "Bhairahawa Airport",
        "label": "Bhairawa, Nepal (BWA)"
    }, {
        "country": "Nepal",
        "city": "Taplejung",
        "code": "TPJ",
        "class": "nep",
        "airport": "Taplejung Airport",
        "label": "Taplejung, Nepal (TPJ)"
    }, {
        "country": "Nepal",
        "city": "Dolpa",
        "code": "DOP",
        "class": "nep",
        "airport": "Dolpa Airport",
        "label": "Dolpa, Nepal (DOP)"
    }, {
        "country": "Nepal",
        "city": "Phaplu",
        "code": "PPL",
        "class": "nep",
        "airport": "Phaplu Airport",
        "label": "Phaplu, Nepal (PPL)"
    }, {
        "country": "Netherlands",
        "city": "Maastricht",
        "code": "MST",
        "class": "net",
        "airport": "Maastricht Aachen Airport",
        "label": "Maastricht, Netherlands (MST)"
    }, {
        "country": "Netherlands",
        "city": "Groningen",
        "code": "GRQ",
        "class": "net",
        "airport": "Eelde Airport",
        "label": "Groningen, Netherlands (GRQ)"
    }, {
        "country": "Netherlands",
        "city": "Eindhoven",
        "code": "EIN",
        "class": "net",
        "airport": "Eindhoven Airport",
        "label": "Eindhoven, Netherlands (EIN)"
    }, {
        "country": "Netherlands",
        "city": "Amsterdam",
        "code": "AMS",
        "class": "net",
        "airport": "Amsterdam Airport Schiphol",
        "label": "Amsterdam, Netherlands (AMS)"
    }, {
        "country": "Netherlands",
        "city": "Rotterdam",
        "code": "RTM",
        "class": "net",
        "airport": "Rotterdam Airport",
        "label": "Rotterdam, Netherlands (RTM)"
    }, {
        "country": "Netherlands Antilles",
        "city": "Curacao",
        "code": "CUR",
        "class": "net",
        "airport": "Hato International Airport",
        "label": "Curacao (CUR)"
    }, {
        "country": "New Caledonia",
        "city": "Noumea",
        "code": "NOU",
        "class": "new",
        "airport": "La Tontouta International Airport",
        "label": "Noumea, New Caledonia (NOU)"
    }, {
        "country": "New Caledonia",
        "city": "Tanjung Warukin",
        "code": "TJG",
        "class": "new",
        "airport": "Warukin Airport",
        "label": "Tanjung Warukin, New Caledonia (TJG)"
    }, {
        "country": "New Caledonia",
        "city": "Noumea",
        "code": "GEA",
        "class": "new",
        "airport": null,
        "label": "Noumea, New Caledonia (GEA)"
    }, {
        "country": "New Caledonia",
        "city": "Tiga",
        "code": "TGJ",
        "class": "new",
        "airport": "Tiga Airport",
        "label": "Tiga, New Caledonia (TGJ)"
    }, {
        "country": "New Caledonia",
        "city": "Lifou",
        "code": "LIF",
        "class": "new",
        "airport": "Lifou Airport",
        "label": "Lifou, New Caledonia (LIF)"
    }, {
        "country": "New Caledonia",
        "city": "Mare",
        "code": "MEE",
        "class": "new",
        "airport": null,
        "label": "Mare, New Caledonia (MEE)"
    }, {
        "country": "New Caledonia",
        "city": "Ouvea",
        "code": "UVE",
        "class": "new",
        "airport": null,
        "label": "Ouvea, New Caledonia (UVE)"
    }, {
        "country": "New Caledonia",
        "city": "Belep Island",
        "code": "BMY",
        "class": "new",
        "airport": null,
        "label": "Belep Island, New Caledonia (BMY)"
    }, {
        "country": "New Caledonia",
        "city": "Ile Des Pins",
        "code": "ILP",
        "class": "new",
        "airport": null,
        "label": "Ile Des Pins, New Caledonia (ILP)"
    }, {
        "country": "New Caledonia",
        "city": "Touho",
        "code": "TOU",
        "class": "new",
        "airport": "Touho Airport",
        "label": "Touho, New Caledonia (TOU)"
    }, {
        "country": "New Caledonia",
        "city": "Kone",
        "code": "KNQ",
        "class": "new",
        "airport": null,
        "label": "Kone, New Caledonia (KNQ)"
    }, {
        "country": "New Caledonia",
        "city": "Koumac",
        "code": "KOC",
        "class": "new",
        "airport": "Koumac Airport",
        "label": "Koumac, New Caledonia (KOC)"
    }, {
        "country": "New Zealand",
        "city": "Whakatane",
        "code": "WHK",
        "class": "new",
        "airport": "Whakatane Airport",
        "label": "Whakatane, New Zealand (WHK)"
    }, {
        "country": "New Zealand",
        "city": "Blenheim",
        "code": "BHE",
        "class": "new",
        "airport": "Woodbourne Airport",
        "label": "Blenheim, New Zealand (BHE)"
    }, {
        "country": "New Zealand",
        "city": "Gisborne",
        "code": "GIS",
        "class": "new",
        "airport": "Gisborne Airport",
        "label": "Gisborne, New Zealand (GIS)"
    }, {
        "country": "New Zealand",
        "city": "Kerikeri",
        "code": "KKE",
        "class": "new",
        "airport": "Kerikeri Airport",
        "label": "Kerikeri, New Zealand (KKE)"
    }, {
        "country": "New Zealand",
        "city": "Kaitaia",
        "code": "KAT",
        "class": "new",
        "airport": "Kaitaia Airport",
        "label": "Kaitaia, New Zealand (KAT)"
    }, {
        "country": "New Zealand",
        "city": "Tauranga",
        "code": "TRG",
        "class": "new",
        "airport": "Tauranga Airport",
        "label": "Tauranga, New Zealand (TRG)"
    }, {
        "country": "New Zealand",
        "city": "Wanganui",
        "code": "WAG",
        "class": "new",
        "airport": "Wanganui Airport",
        "label": "Wanganui, New Zealand (WAG)"
    }, {
        "country": "New Zealand",
        "city": "Timaru",
        "code": "TIU",
        "class": "new",
        "airport": "Timaru Airport",
        "label": "Timaru, New Zealand (TIU)"
    }, {
        "country": "New Zealand",
        "city": "Auckland",
        "code": "AKL",
        "class": "new",
        "airport": "Auckland International Airport",
        "label": "Auckland, New Zealand (AKL)"
    }, {
        "country": "New Zealand",
        "city": "Whangarei",
        "code": "WRE",
        "class": "new",
        "airport": "Whangarei Airport",
        "label": "Whangarei, New Zealand (WRE)"
    }, {
        "country": "New Zealand",
        "city": "Chatham Island",
        "code": "CHT",
        "class": "new",
        "airport": "Chatham Islands-Tuuta Airport",
        "label": "Chatham Island, New Zealand (CHT)"
    }, {
        "country": "New Zealand",
        "city": "Taupo",
        "code": "TUO",
        "class": "new",
        "airport": "Taupo Airport",
        "label": "Taupo, New Zealand (TUO)"
    }, {
        "country": "New Zealand",
        "city": "Nelson",
        "code": "NSN",
        "class": "new",
        "airport": "Nelson Airport",
        "label": "Nelson, New Zealand (NSN)"
    }, {
        "country": "New Zealand",
        "city": "Queenstown",
        "code": "ZQN",
        "class": "new",
        "airport": "Queenstown International Airport",
        "label": "Queenstown, New Zealand (ZQN)"
    }, {
        "country": "New Zealand",
        "city": "Hokitika",
        "code": "HKK",
        "class": "new",
        "airport": "Hokitika Airfield",
        "label": "Hokitika, New Zealand (HKK)"
    }, {
        "country": "New Zealand",
        "city": "Rotorua",
        "code": "ROT",
        "class": "new",
        "airport": "Rotorua Regional Airport",
        "label": "Rotorua, New Zealand (ROT)"
    }, {
        "country": "New Zealand",
        "city": "Dunedin",
        "code": "DUD",
        "class": "new",
        "airport": "Dunedin Airport",
        "label": "Dunedin, New Zealand (DUD)"
    }, {
        "country": "New Zealand",
        "city": "Hamilton",
        "code": "HLZ",
        "class": "new",
        "airport": "Hamilton International Airport",
        "label": "Hamilton, New Zealand (HLZ)"
    }, {
        "country": "New Zealand",
        "city": "Wellington",
        "code": "WLG",
        "class": "new",
        "airport": "Wellington International Airport",
        "label": "Wellington, New Zealand (WLG)"
    }, {
        "country": "New Zealand",
        "city": "Christchurch",
        "code": "CHC",
        "class": "new",
        "airport": "Christchurch International Airport",
        "label": "Christchurch, New Zealand (CHC)"
    }, {
        "country": "New Zealand",
        "city": "Oamaru",
        "code": "OAM",
        "class": "new",
        "airport": "Oamaru Airport",
        "label": "Oamaru, New Zealand (OAM)"
    }, {
        "country": "New Zealand",
        "city": "Wanaka",
        "code": "WKA",
        "class": "new",
        "airport": "Wanaka Airport",
        "label": "Wanaka, New Zealand (WKA)"
    }, {
        "country": "New Zealand",
        "city": "Westport",
        "code": "WSZ",
        "class": "new",
        "airport": "Westport Airport",
        "label": "Westport, New Zealand (WSZ)"
    }, {
        "country": "New Zealand",
        "city": "Palmerston North",
        "code": "PMR",
        "class": "new",
        "airport": "Palmerston North Airport",
        "label": "Palmerston North, New Zealand (PMR)"
    }, {
        "country": "New Zealand",
        "city": "Invercargill",
        "code": "IVC",
        "class": "new",
        "airport": "Invercargill Airport",
        "label": "Invercargill, New Zealand (IVC)"
    }, {
        "country": "New Zealand",
        "city": "Napier",
        "code": "NPE",
        "class": "new",
        "airport": "Napier Airport",
        "label": "Napier, New Zealand (NPE)"
    }, {
        "country": "New Zealand",
        "city": "New Plymouth",
        "code": "NPL",
        "class": "new",
        "airport": "New Plymouth Airport",
        "label": "New Plymouth, New Zealand (NPL)"
    }, {
        "country": "Nigeria",
        "city": "Lagos",
        "code": "LOS",
        "class": "nig",
        "airport": "Murtala Muhammed International Airport",
        "label": "Lagos, Nigeria (LOS)"
    }, {
        "country": "Nigeria",
        "city": "Abuja",
        "code": "ABV",
        "class": "nig",
        "airport": "Nnamdi Azikiwe International Airport",
        "label": "Abuja, Nigeria (ABV)"
    }, {
        "country": "Niue",
        "city": "Niue Island",
        "code": "IUE",
        "class": "niu",
        "airport": "Niue International Airport",
        "label": "Niue Island, Niue (IUE)"
    }, {
        "country": "Norfolk Island",
        "city": "Norfolk Island",
        "code": "NLK",
        "class": "nor",
        "airport": "Norfolk Island International Airport",
        "label": "Norfolk Island, Norfolk Island (NLK)"
    }, {
        "country": "Northern Mariana Islands",
        "city": "Tinian",
        "code": "TIQ",
        "class": "nor",
        "airport": "Tinian International Airport",
        "label": "Tinian, Northern Mariana Islands (TIQ)"
    }, {
        "country": "Northern Mariana Islands",
        "city": "Saipan",
        "code": "SPN",
        "class": "nor",
        "airport": "Francisco C. Ada Saipan International Airport",
        "label": "Saipan, Northern Mariana Islands (SPN)"
    }, {
        "country": "Northern Mariana Islands",
        "city": "Rota",
        "code": "ROP",
        "class": "nor",
        "airport": "Rota International Airport",
        "label": "Rota, Northern Mariana Islands (ROP)"
    }, {
        "country": "Norway",
        "city": "Vaeroy",
        "code": "VRY",
        "class": "nor",
        "airport": null,
        "label": "Vaeroy, Norway (VRY)"
    }, {
        "country": "Norway",
        "city": "Fagernes",
        "code": "VDB",
        "class": "nor",
        "airport": "Leirin Airport",
        "label": "Fagernes, Norway (VDB)"
    }, {
        "country": "Norway",
        "city": "Berlevag",
        "code": "BJF",
        "class": "nor",
        "airport": null,
        "label": "Berlevag, Norway (BJF)"
    }, {
        "country": "Norway",
        "city": "Vadso",
        "code": "VDS",
        "class": "nor",
        "airport": null,
        "label": "Vadso, Norway (VDS)"
    }, {
        "country": "Norway",
        "city": "Alta",
        "code": "ALF",
        "class": "nor",
        "airport": "Alta Airport",
        "label": "Alta, Norway (ALF)"
    }, {
        "country": "Norway",
        "city": "Bronnoysund",
        "code": "BNN",
        "class": "nor",
        "airport": null,
        "label": "Bronnoysund, Norway (BNN)"
    }, {
        "country": "Norway",
        "city": "Aalesund",
        "code": "AES",
        "class": "nor",
        "airport": null,
        "label": "Aalesund, Norway (AES)"
    }, {
        "country": "Norway",
        "city": "Bodo",
        "code": "BOO",
        "class": "nor",
        "airport": null,
        "label": "Bodo, Norway (BOO)"
    }, {
        "country": "Norway",
        "city": "Orsta-Volda",
        "code": "HOV",
        "class": "nor",
        "airport": null,
        "label": "Orsta-Volda, Norway (HOV)"
    }, {
        "country": "Norway",
        "city": "Sogndal",
        "code": "SOG",
        "class": "nor",
        "airport": "Sogndal Airport",
        "label": "Sogndal, Norway (SOG)"
    }, {
        "country": "Norway",
        "city": "Orland",
        "code": "OLA",
        "class": "nor",
        "airport": null,
        "label": "Orland, Norway (OLA)"
    }, {
        "country": "Norway",
        "city": "Skien",
        "code": "SKE",
        "class": "nor",
        "airport": "Skien Airport",
        "label": "Skien, Norway (SKE)"
    }, {
        "country": "Norway",
        "city": "Stavanger",
        "code": "SVG",
        "class": "nor",
        "airport": "Stavanger Airport, Sola",
        "label": "Stavanger, Norway (SVG)"
    }, {
        "country": "Norway",
        "city": "Mosjoen",
        "code": "MJF",
        "class": "nor",
        "airport": null,
        "label": "Mosjoen, Norway (MJF)"
    }, {
        "country": "Norway",
        "city": "Namsos",
        "code": "OSY",
        "class": "nor",
        "airport": null,
        "label": "Namsos, Norway (OSY)"
    }, {
        "country": "Norway",
        "city": "Svolvaer",
        "code": "SVJ",
        "class": "nor",
        "airport": null,
        "label": "Svolvaer, Norway (SVJ)"
    }, {
        "country": "Norway",
        "city": "Mo i Rana",
        "code": "MQN",
        "class": "nor",
        "airport": null,
        "label": "Mo i Rana, Norway (MQN)"
    }, {
        "country": "Norway",
        "city": "Molde",
        "code": "MOL",
        "class": "nor",
        "airport": "Molde Airport",
        "label": "Molde, Norway (MOL)"
    }, {
        "country": "Norway",
        "city": "Berlevag",
        "code": "BVG",
        "class": "nor",
        "airport": null,
        "label": "Berlevag, Norway (BVG)"
    }, {
        "country": "Norway",
        "city": "Mehamn",
        "code": "MEH",
        "class": "nor",
        "airport": "Mehamn Airport",
        "label": "Mehamn, Norway (MEH)"
    }, {
        "country": "Norway",
        "city": "Forde",
        "code": "FDE",
        "class": "nor",
        "airport": "Bringeland Airport",
        "label": "Forde, Norway (FDE)"
    }, {
        "country": "Norway",
        "city": "Stokmarknes",
        "code": "SKN",
        "class": "nor",
        "airport": "Stokmarknes Skagen Airport",
        "label": "Stokmarknes, Norway (SKN)"
    }, {
        "country": "Norway",
        "city": "Lakselv",
        "code": "LKL",
        "class": "nor",
        "airport": "Banak Airport",
        "label": "Lakselv, Norway (LKL)"
    }, {
        "country": "Norway",
        "city": "Narvik",
        "code": "NVK",
        "class": "nor",
        "airport": "Narvik Framnes Airport",
        "label": "Narvik, Norway (NVK)"
    }, {
        "country": "Norway",
        "city": "Stord",
        "code": "SRP",
        "class": "nor",
        "airport": "Stord Airport",
        "label": "Stord, Norway (SRP)"
    }, {
        "country": "Norway",
        "city": "Floro",
        "code": "FRO",
        "class": "nor",
        "airport": null,
        "label": "Floro, Norway (FRO)"
    }, {
        "country": "Norway",
        "city": "Sorkjosen",
        "code": "SOJ",
        "class": "nor",
        "airport": null,
        "label": "Sorkjosen, Norway (SOJ)"
    }, {
        "country": "Norway",
        "city": "Bergen",
        "code": "BGO",
        "class": "nor",
        "airport": "Bergen Airport, Flesland",
        "label": "Bergen, Norway (BGO)"
    }, {
        "country": "Norway",
        "city": "Roervik",
        "code": "RVK",
        "class": "nor",
        "airport": null,
        "label": "Roervik, Norway (RVK)"
    }, {
        "country": "Norway",
        "city": "Roros",
        "code": "RRS",
        "class": "nor",
        "airport": null,
        "label": "Roros, Norway (RRS)"
    }, {
        "country": "Norway",
        "city": "Sandane",
        "code": "SDN",
        "class": "nor",
        "airport": "Sandane Airport, Anda",
        "label": "Sandane, Norway (SDN)"
    }, {
        "country": "Norway",
        "city": "Sandnessjoen",
        "code": "SSJ",
        "class": "nor",
        "airport": null,
        "label": "Sandnessjoen, Norway (SSJ)"
    }, {
        "country": "Norway",
        "city": "Oslo",
        "code": "TRF",
        "class": "nor",
        "airport": "Sandefjord Airport, Torp",
        "label": "Oslo, Norway (TRF)"
    }, {
        "country": "Norway",
        "city": "Oslo",
        "code": "OSL",
        "class": "nor",
        "airport": "Oslo Gardermoen Airport",
        "label": "Oslo, Norway (OSL)"
    }, {
        "country": "Norway",
        "city": "Kristiansund",
        "code": "KSU",
        "class": "nor",
        "airport": "Kristiansund Airport, Kvernberget",
        "label": "Kristiansund, Norway (KSU)"
    }, {
        "country": "Norway",
        "city": "Rost",
        "code": "RET",
        "class": "nor",
        "airport": null,
        "label": "Rost, Norway (RET)"
    }, {
        "country": "Norway",
        "city": "Hammerfest",
        "code": "HFT",
        "class": "nor",
        "airport": "Hammerfest Airport",
        "label": "Hammerfest, Norway (HFT)"
    }, {
        "country": "Norway",
        "city": "Andenes",
        "code": "ANX",
        "class": "nor",
        "airport": null,
        "label": "Andenes, Norway (ANX)"
    }, {
        "country": "Norway",
        "city": "Harstad-Narvik",
        "code": "EVE",
        "class": "nor",
        "airport": "Harstad\/Narvik Airport, Evenes",
        "label": "Harstad-Narvik, Norway (EVE)"
    }, {
        "country": "Norway",
        "city": "Hasvik",
        "code": "HAA",
        "class": "nor",
        "airport": "Hasvik Airport",
        "label": "Hasvik, Norway (HAA)"
    }, {
        "country": "Norway",
        "city": "Haugesund",
        "code": "HAU",
        "class": "nor",
        "airport": "Haugesund Airport",
        "label": "Haugesund, Norway (HAU)"
    }, {
        "country": "Norway",
        "city": "Kristiansand",
        "code": "KRS",
        "class": "nor",
        "airport": "Kristiansand Airport",
        "label": "Kristiansand, Norway (KRS)"
    }, {
        "country": "Norway",
        "city": "Kirkenes",
        "code": "KKN",
        "class": "nor",
        "airport": null,
        "label": "Kirkenes, Norway (KKN)"
    }, {
        "country": "Norway",
        "city": "Leknes",
        "code": "LKN",
        "class": "nor",
        "airport": "Leknes Airport",
        "label": "Leknes, Norway (LKN)"
    }, {
        "country": "Norway",
        "city": "Bardufoss",
        "code": "BDU",
        "class": "nor",
        "airport": "Bardufoss Airport",
        "label": "Bardufoss, Norway (BDU)"
    }, {
        "country": "Norway",
        "city": "Honningsvag",
        "code": "HVG",
        "class": "nor",
        "airport": "Valan Airport",
        "label": "Honningsvag, Norway (HVG)"
    }, {
        "country": "Norway",
        "city": "Tromso",
        "code": "TOS",
        "class": "nor",
        "airport": null,
        "label": "Tromso, Norway (TOS)"
    }, {
        "country": "Norway",
        "city": "Trondheim",
        "code": "TRD",
        "class": "nor",
        "airport": null,
        "label": "Trondheim, Norway (TRD)"
    }, {
        "country": "Norway",
        "city": "Vardoe",
        "code": "VAW",
        "class": "nor",
        "airport": null,
        "label": "Vardoe, Norway (VAW)"
    }, {
        "country": "Oman",
        "city": "Salalah",
        "code": "SLL",
        "class": "oma",
        "airport": "Salalah Airport",
        "label": "Salalah, Oman (SLL)"
    }, {
        "country": "Oman",
        "city": "Khasab",
        "code": "KHS",
        "class": "oma",
        "airport": "Khasab Air Base",
        "label": "Khasab, Oman (KHS)"
    }, {
        "country": "Oman",
        "city": "Muscat",
        "code": "MCT",
        "class": "oma",
        "airport": "Muscat International Airport",
        "label": "Muscat, Oman (MCT)"
    }, {
        "country": "Pakistan",
        "city": "Lahore",
        "code": "LHE",
        "class": "pak",
        "airport": "Alama Iqbal International Airport",
        "label": "Lahore, Pakistan (LHE)"
    }, {
        "country": "Pakistan",
        "city": "Islamabad",
        "code": "ISB",
        "class": "pak",
        "airport": "Benazir Bhutto International Airport",
        "label": "Islamabad, Pakistan (ISB)"
    }, {
        "country": "Pakistan",
        "city": "Karachi",
        "code": "KHI",
        "class": "pak",
        "airport": "Jinnah International Airport",
        "label": "Karachi, Pakistan (KHI)"
    }, {
        "country": "Papua New Guinea",
        "city": "Mendi",
        "code": "MDU",
        "class": "pap",
        "airport": "Mendi Airport",
        "label": "Mendi, Papua New Guinea (MDU)"
    }, {
        "country": "Papua New Guinea",
        "city": "Misima Island",
        "code": "MIS",
        "class": "pap",
        "airport": "Misima Island Airport",
        "label": "Misima Island, Papua New Guinea (MIS)"
    }, {
        "country": "Papua New Guinea",
        "city": "Misima Island",
        "code": "MIS",
        "class": "pap",
        "airport": "Misima Island Airport",
        "label": "Misima Island, Papua New Guinea (MIS)"
    }, {
        "country": "Papua New Guinea",
        "city": "Madang",
        "code": "MAG",
        "class": "pap",
        "airport": "Madang Airport",
        "label": "Madang, Papua New Guinea (MAG)"
    }, {
        "country": "Papua New Guinea",
        "city": "Tufi",
        "code": "TFI",
        "class": "pap",
        "airport": "Tufi Airport",
        "label": "Tufi, Papua New Guinea (TFI)"
    }, {
        "country": "Papua New Guinea",
        "city": "Kavieng",
        "code": "KVG",
        "class": "pap",
        "airport": "Kavieng Airport",
        "label": "Kavieng, Papua New Guinea (KVG)"
    }, {
        "country": "Papua New Guinea",
        "city": "Kerema",
        "code": "KMA",
        "class": "pap",
        "airport": "Kerema Airport",
        "label": "Kerema, Papua New Guinea (KMA)"
    }, {
        "country": "Papua New Guinea",
        "city": "Manus Island",
        "code": "MAS",
        "class": "pap",
        "airport": "Momote Airport",
        "label": "Manus Island, Papua New Guinea (MAS)"
    }, {
        "country": "Papua New Guinea",
        "city": "Wapenamanda",
        "code": "WBM",
        "class": "pap",
        "airport": "Wapenamanda Airport",
        "label": "Wapenamanda, Papua New Guinea (WBM)"
    }, {
        "country": "Papua New Guinea",
        "city": "Tari",
        "code": "TIZ",
        "class": "pap",
        "airport": "Tari Airport",
        "label": "Tari, Papua New Guinea (TIZ)"
    }, {
        "country": "Papua New Guinea",
        "city": "Lake Murray",
        "code": "LMY",
        "class": "pap",
        "airport": "Lake Murray Airport",
        "label": "Lake Murray, Papua New Guinea (LMY)"
    }, {
        "country": "Papua New Guinea",
        "city": "Lake Murray",
        "code": "LMY",
        "class": "pap",
        "airport": "Lake Murray Airport",
        "label": "Lake Murray, Papua New Guinea (LMY)"
    }, {
        "country": "Papua New Guinea",
        "city": "Kikori",
        "code": "KRI",
        "class": "pap",
        "airport": "Kikori Airport",
        "label": "Kikori, Papua New Guinea (KRI)"
    }, {
        "country": "Papua New Guinea",
        "city": "Jacquinot Bay",
        "code": "JAQ",
        "class": "pap",
        "airport": "Jacquinot Bay Airport",
        "label": "Jacquinot Bay, Papua New Guinea (JAQ)"
    }, {
        "country": "Papua New Guinea",
        "city": "Popondetta",
        "code": "PNP",
        "class": "pap",
        "airport": "Girua Airport",
        "label": "Popondetta, Papua New Guinea (PNP)"
    }, {
        "country": "Papua New Guinea",
        "city": "Buka",
        "code": "BUA",
        "class": "pap",
        "airport": "Buka Airport",
        "label": "Buka, Papua New Guinea (BUA)"
    }, {
        "country": "Papua New Guinea",
        "city": "Balimo",
        "code": "OPU",
        "class": "pap",
        "airport": "Balimo Airport",
        "label": "Balimo, Papua New Guinea (OPU)"
    }, {
        "country": "Papua New Guinea",
        "city": "Daru",
        "code": "DAU",
        "class": "pap",
        "airport": "Daru Airport",
        "label": "Daru, Papua New Guinea (DAU)"
    }, {
        "country": "Papua New Guinea",
        "city": "Port Moresby",
        "code": "POM",
        "class": "pap",
        "airport": "Port Moresby Jacksons International Airport",
        "label": "Port Moresby, Papua New Guinea (POM)"
    }, {
        "country": "Papua New Guinea",
        "city": "Hoskins",
        "code": "HKN",
        "class": "pap",
        "airport": "Kimbe Airport",
        "label": "Hoskins, Papua New Guinea (HKN)"
    }, {
        "country": "Papua New Guinea",
        "city": "Wipim",
        "code": "WPM",
        "class": "pap",
        "airport": "Wipim Airport",
        "label": "Wipim, Papua New Guinea (WPM)"
    }, {
        "country": "Papua New Guinea",
        "city": "Goroka",
        "code": "GKA",
        "class": "pap",
        "airport": "Goroka Airport",
        "label": "Goroka, Papua New Guinea (GKA)"
    }, {
        "country": "Papua New Guinea",
        "city": "Rabaul",
        "code": "RAB",
        "class": "pap",
        "airport": "Tokua Airport",
        "label": "Rabaul, Papua New Guinea (RAB)"
    }, {
        "country": "Papua New Guinea",
        "city": "Gasmata Island",
        "code": "GMI",
        "class": "pap",
        "airport": "Gasmata Island Airport",
        "label": "Gasmata Island, Papua New Guinea (GMI)"
    }, {
        "country": "Papua New Guinea",
        "city": "Vanimo",
        "code": "VAI",
        "class": "pap",
        "airport": "Vanimo Airport",
        "label": "Vanimo, Papua New Guinea (VAI)"
    }, {
        "country": "Papua New Guinea",
        "city": "Obo",
        "code": "OBX",
        "class": "pap",
        "airport": "Obo Airport",
        "label": "Obo, Papua New Guinea (OBX)"
    }, {
        "country": "Papua New Guinea",
        "city": "Suki",
        "code": "SKC",
        "class": "pap",
        "airport": "Suki Airport",
        "label": "Suki, Papua New Guinea (SKC)"
    }, {
        "country": "Papua New Guinea",
        "city": "Mount Hagen",
        "code": "HGU",
        "class": "pap",
        "airport": "Mount Hagen Kagamuga Airport",
        "label": "Mount Hagen, Papua New Guinea (HGU)"
    }, {
        "country": "Papua New Guinea",
        "city": "Moro",
        "code": "MXH",
        "class": "pap",
        "airport": "Moro Airport",
        "label": "Moro, Papua New Guinea (MXH)"
    }, {
        "country": "Papua New Guinea",
        "city": "Tabubil",
        "code": "TBG",
        "class": "pap",
        "airport": "Tabubil Airport",
        "label": "Tabubil, Papua New Guinea (TBG)"
    }, {
        "country": "Papua New Guinea",
        "city": "Tabubil",
        "code": "TBG",
        "class": "pap",
        "airport": "Tabubil Airport",
        "label": "Tabubil, Papua New Guinea (TBG)"
    }, {
        "country": "Papua New Guinea",
        "city": "Wewak",
        "code": "WWK",
        "class": "pap",
        "airport": "Wewak International Airport",
        "label": "Wewak, Papua New Guinea (WWK)"
    }, {
        "country": "Papua New Guinea",
        "city": "Kiunga",
        "code": "UNG",
        "class": "pap",
        "airport": "Kiunga Airport",
        "label": "Kiunga, Papua New Guinea (UNG)"
    }, {
        "country": "Papua New Guinea",
        "city": "Awaba",
        "code": "AWB",
        "class": "pap",
        "airport": "Awaba Airport",
        "label": "Awaba, Papua New Guinea (AWB)"
    }, {
        "country": "Papua New Guinea",
        "city": "Kundiawa",
        "code": "CMU",
        "class": "pap",
        "airport": "Chimbu Airport",
        "label": "Kundiawa, Papua New Guinea (CMU)"
    }, {
        "country": "Papua New Guinea",
        "city": "Lae",
        "code": "LAE",
        "class": "pap",
        "airport": "Lae Nadzab Airport",
        "label": "Lae, Papua New Guinea (LAE)"
    }, {
        "country": "Papua New Guinea",
        "city": "Kandrian",
        "code": "KDR",
        "class": "pap",
        "airport": "Kandrian Airport",
        "label": "Kandrian, Papua New Guinea (KDR)"
    }, {
        "country": "Papua New Guinea",
        "city": "Nissan Island",
        "code": "IIS",
        "class": "pap",
        "airport": "Nissan Island Airport",
        "label": "Nissan Island, Papua New Guinea (IIS)"
    }, {
        "country": "Papua New Guinea",
        "city": "Losuia",
        "code": "LSA",
        "class": "pap",
        "airport": "Losuia Airport",
        "label": "Losuia, Papua New Guinea (LSA)"
    }, {
        "country": "Papua New Guinea",
        "city": "Lihir Island",
        "code": "LNV",
        "class": "pap",
        "airport": "Londolovit Airport",
        "label": "Lihir Island, Papua New Guinea (LNV)"
    }, {
        "country": "Papua New Guinea",
        "city": "Kokoda",
        "code": "KKD",
        "class": "pap",
        "airport": "Kokoda Airport",
        "label": "Kokoda, Papua New Guinea (KKD)"
    }, {
        "country": "Papua New Guinea",
        "city": "Alotau",
        "code": "GUR",
        "class": "pap",
        "airport": "Gurney Airport",
        "label": "Alotau, Papua New Guinea (GUR)"
    }, {
        "country": "Paraguay",
        "city": "Ciudad Del Este",
        "code": "AGT",
        "class": "par",
        "airport": "Guarani International Airport",
        "label": "Ciudad Del Este, Paraguay (AGT)"
    }, {
        "country": "Paraguay",
        "city": "Asuncion",
        "code": "ASU",
        "class": "par",
        "airport": "Silvio Pettirossi International Airport",
        "label": "Asuncion, Paraguay (ASU)"
    }, {
        "country": "Peru",
        "city": "Tumbes",
        "code": "TBP",
        "class": "per",
        "airport": "Capitan FAP Pedro Canga Rodriguez Airport",
        "label": "Tumbes, Peru (TBP)"
    }, {
        "country": "Peru",
        "city": "Cuzco",
        "code": "CUZ",
        "class": "per",
        "airport": "Alejandro Velasco Astete International Airport",
        "label": "Cuzco, Peru (CUZ)"
    }, {
        "country": "Peru",
        "city": "Pisco",
        "code": "PIO",
        "class": "per",
        "airport": null,
        "label": "Pisco, Peru (PIO)"
    }, {
        "country": "Peru",
        "city": "Piura",
        "code": "PIU",
        "class": "per",
        "airport": null,
        "label": "Piura, Peru (PIU)"
    }, {
        "country": "Peru",
        "city": "Trujillo",
        "code": "TRU",
        "class": "per",
        "airport": "Capitan FAP Carlos Martinez De Pinillos International Airport",
        "label": "Trujillo, Peru (TRU)"
    }, {
        "country": "Peru",
        "city": "Chiclayo",
        "code": "CIX",
        "class": "per",
        "airport": "Capitan FAP Jose A Quinones Gonzales International Airport",
        "label": "Chiclayo, Peru (CIX)"
    }, {
        "country": "Peru",
        "city": "Tarapoto",
        "code": "TPP",
        "class": "per",
        "airport": "Cadete FAP Guillermo Del Castillo Paredes Airport",
        "label": "Tarapoto, Peru (TPP)"
    }, {
        "country": "Peru",
        "city": "Iquitos",
        "code": "IQT",
        "class": "per",
        "airport": "Coronel FAP Francisco Secada Vignetta International Airport",
        "label": "Iquitos, Peru (IQT)"
    }, {
        "country": "Peru",
        "city": "Talara",
        "code": "TYL",
        "class": "per",
        "airport": "Capitan Montes Airport",
        "label": "Talara, Peru (TYL)"
    }, {
        "country": "Peru",
        "city": "Cajamarca",
        "code": "CJA",
        "class": "per",
        "airport": "Mayor General FAP Armando Revoredo Iglesias Airport",
        "label": "Cajamarca, Peru (CJA)"
    }, {
        "country": "Peru",
        "city": "Juliaca",
        "code": "JUL",
        "class": "per",
        "airport": "Inca Manco Capac International Airport",
        "label": "Juliaca, Peru (JUL)"
    }, {
        "country": "Peru",
        "city": "Arequipa",
        "code": "AQP",
        "class": "per",
        "airport": null,
        "label": "Arequipa, Peru (AQP)"
    }, {
        "country": "Peru",
        "city": "Tacna",
        "code": "TCQ",
        "class": "per",
        "airport": "Coronel FAP Carlos Ciriani Santa Rosa International Airport",
        "label": "Tacna, Peru (TCQ)"
    }, {
        "country": "Peru",
        "city": "Lima",
        "code": "LIM",
        "class": "per",
        "airport": "Las Palmas Airport",
        "label": "Lima, Peru (LIM)"
    }, {
        "country": "Peru",
        "city": "Andahuaylas",
        "code": "ANS",
        "class": "per",
        "airport": "Andahuaylas Airport",
        "label": "Andahuaylas, Peru (ANS)"
    }, {
        "country": "Peru",
        "city": "Ayacucho",
        "code": "AYP",
        "class": "per",
        "airport": "Coronel FAP Alfredo Mendivil Duarte Airport",
        "label": "Ayacucho, Peru (AYP)"
    }, {
        "country": "Peru",
        "city": "Pucallpa",
        "code": "PCL",
        "class": "per",
        "airport": "Cap FAP David Abenzur Rengifo International Airport",
        "label": "Pucallpa, Peru (PCL)"
    }, {
        "country": "Peru",
        "city": "Puerto Maldonado",
        "code": "PEM",
        "class": "per",
        "airport": "Padre Aldamiz International Airport",
        "label": "Puerto Maldonado, Peru (PEM)"
    }, {
        "country": "Philippines",
        "city": "Cagayan De Oro",
        "code": "CGY",
        "class": "phi",
        "airport": "Cagayan De Oro Airport",
        "label": "Cagayan De Oro, Philippines (CGY)"
    }, {
        "country": "Philippines",
        "city": "Masbate",
        "code": "MBT",
        "class": "phi",
        "airport": "Moises R. Espinosa Airport",
        "label": "Masbate, Philippines (MBT)"
    }, {
        "country": "Philippines",
        "city": "Caticlan",
        "code": "MPH",
        "class": "phi",
        "airport": "Godofredo P. Ramos Airport",
        "label": "Caticlan, Philippines (MPH)"
    }, {
        "country": "Philippines",
        "city": "San Jose",
        "code": "SJI",
        "class": "phi",
        "airport": "San Jose Airport",
        "label": "San Jose, Philippines (SJI)"
    }, {
        "country": "Philippines",
        "city": "Camiguin",
        "code": "CGM",
        "class": "phi",
        "airport": "Camiguin Airport",
        "label": "Camiguin, Philippines (CGM)"
    }, {
        "country": "Philippines",
        "city": "Cotabato",
        "code": "CBO",
        "class": "phi",
        "airport": "Awang Airport",
        "label": "Cotabato, Philippines (CBO)"
    }, {
        "country": "Philippines",
        "city": "Bacolod",
        "code": "BCD",
        "class": "phi",
        "airport": "Bacolod City Domestic Airport",
        "label": "Bacolod, Philippines (BCD)"
    }, {
        "country": "Philippines",
        "city": "Dumaguete",
        "code": "DGT",
        "class": "phi",
        "airport": "Sibulan Airport",
        "label": "Dumaguete, Philippines (DGT)"
    }, {
        "country": "Philippines",
        "city": "Luzon Is",
        "code": "CRK",
        "class": "phi",
        "airport": "Diosdado Macapagal International Airport",
        "label": "Luzon Is, Philippines (CRK)"
    }, {
        "country": "Philippines",
        "city": "Iloilo",
        "code": "ILO",
        "class": "phi",
        "airport": "Iloilo International Airport",
        "label": "Iloilo, Philippines (ILO)"
    }, {
        "country": "Philippines",
        "city": "Baguio",
        "code": "BAG",
        "class": "phi",
        "airport": "Loakan Airport",
        "label": "Baguio, Philippines (BAG)"
    }, {
        "country": "Philippines",
        "city": "Manila",
        "code": "MNL",
        "class": "phi",
        "airport": "Ninoy Aquino International Airport",
        "label": "Manila, Philippines (MNL)"
    }, {
        "country": "Philippines",
        "city": "Ozamis City",
        "code": "OZC",
        "class": "phi",
        "airport": "Labo Airport",
        "label": "Ozamis City, Philippines (OZC)"
    }, {
        "country": "Philippines",
        "city": "Pagadian",
        "code": "PAG",
        "class": "phi",
        "airport": "Pagadian Airport",
        "label": "Pagadian, Philippines (PAG)"
    }, {
        "country": "Philippines",
        "city": "Zamboanga",
        "code": "ZAM",
        "class": "phi",
        "airport": "Zamboanga International Airport",
        "label": "Zamboanga, Philippines (ZAM)"
    }, {
        "country": "Philippines",
        "city": "Puerto Princesa",
        "code": "PPS",
        "class": "phi",
        "airport": "Puerto Princesa Airport",
        "label": "Puerto Princesa, Philippines (PPS)"
    }, {
        "country": "Philippines",
        "city": "Butuan City",
        "code": "BXU",
        "class": "phi",
        "airport": "Bancasi Airport",
        "label": "Butuan City, Philippines (BXU)"
    }, {
        "country": "Philippines",
        "city": "Tacloban City",
        "code": "TAC",
        "class": "phi",
        "airport": "Daniel Z. Romualdez Airport",
        "label": "Tacloban City, Philippines (TAC)"
    }, {
        "country": "Philippines",
        "city": "Naga City",
        "code": "WNP",
        "class": "phi",
        "airport": "Naga Airport",
        "label": "Naga City, Philippines (WNP)"
    }, {
        "country": "Philippines",
        "city": "Roxas",
        "code": "RXS",
        "class": "phi",
        "airport": "Roxas Airport",
        "label": "Roxas, Philippines (RXS)"
    }, {
        "country": "Philippines",
        "city": "Catarman",
        "code": "CRM",
        "class": "phi",
        "airport": "Catarman National Airport",
        "label": "Catarman, Philippines (CRM)"
    }, {
        "country": "Philippines",
        "city": "Kalibo",
        "code": "KLO",
        "class": "phi",
        "airport": "Kalibo International Airport",
        "label": "Kalibo, Philippines (KLO)"
    }, {
        "country": "Philippines",
        "city": "Surigao",
        "code": "SUG",
        "class": "phi",
        "airport": "Surigao Airport",
        "label": "Surigao, Philippines (SUG)"
    }, {
        "country": "Philippines",
        "city": "San Fernando",
        "code": "SFE",
        "class": "phi",
        "airport": "San Fernando Airport",
        "label": "San Fernando, Philippines (SFE)"
    }, {
        "country": "Philippines",
        "city": "Tagbilaran",
        "code": "TAG",
        "class": "phi",
        "airport": "Tagbilaran Airport",
        "label": "Tagbilaran, Philippines (TAG)"
    }, {
        "country": "Philippines",
        "city": "Laoag",
        "code": "LAO",
        "class": "phi",
        "airport": "Laoag International Airport",
        "label": "Laoag, Philippines (LAO)"
    }, {
        "country": "Philippines",
        "city": "Basco",
        "code": "BSO",
        "class": "phi",
        "airport": "Basco Airport",
        "label": "Basco, Philippines (BSO)"
    }, {
        "country": "Philippines",
        "city": "Jolo",
        "code": "JOL",
        "class": "phi",
        "airport": "Jolo Airport",
        "label": "Jolo, Philippines (JOL)"
    }, {
        "country": "Philippines",
        "city": "General Santos",
        "code": "GES",
        "class": "phi",
        "airport": "General Santos International Airport",
        "label": "General Santos, Philippines (GES)"
    }, {
        "country": "Philippines",
        "city": "Dipolog",
        "code": "DPL",
        "class": "phi",
        "airport": "Dipolog Airport",
        "label": "Dipolog, Philippines (DPL)"
    }, {
        "country": "Philippines",
        "city": "Calbayog",
        "code": "CYP",
        "class": "phi",
        "airport": "Calbayog Airport",
        "label": "Calbayog, Philippines (CYP)"
    }, {
        "country": "Philippines",
        "city": "Calbayog",
        "code": "CYP",
        "class": "phi",
        "airport": "Calbayog Airport",
        "label": "Calbayog, Philippines (CYP)"
    }, {
        "country": "Philippines",
        "city": "Cebu",
        "code": "CEB",
        "class": "phi",
        "airport": "Mactan Cebu International Airport",
        "label": "Cebu, Philippines (CEB)"
    }, {
        "country": "Philippines",
        "city": "Busuanga",
        "code": "USU",
        "class": "phi",
        "airport": "Francisco B. Reyes Airport",
        "label": "Busuanga, Philippines (USU)"
    }, {
        "country": "Philippines",
        "city": "Virac",
        "code": "VRC",
        "class": "phi",
        "airport": "Virac Airport",
        "label": "Virac, Philippines (VRC)"
    }, {
        "country": "Philippines",
        "city": "El Nido",
        "code": "ENI",
        "class": "phi",
        "airport": "El Nido Airport",
        "label": "El Nido, Philippines (ENI)"
    }, {
        "country": "Philippines",
        "city": "Tuguegarao City",
        "code": "TUG",
        "class": "phi",
        "airport": "Tuguegarao Airport",
        "label": "Tuguegarao City, Philippines (TUG)"
    }, {
        "country": "Philippines",
        "city": "Davao",
        "code": "DVO",
        "class": "phi",
        "airport": "Francisco Bangoy International Airport",
        "label": "Davao, Philippines (DVO)"
    }, {
        "country": "Philippines",
        "city": "Legaspi",
        "code": "LGP",
        "class": "phi",
        "airport": "Legazpi City International Airport",
        "label": "Legaspi, Philippines (LGP)"
    }, {
        "country": "Poland",
        "city": "Wroclaw",
        "code": "WRO",
        "class": "pol",
        "airport": "Copernicus Wroc?aw Airport",
        "label": "Wroclaw, Poland (WRO)"
    }, {
        "country": "Poland",
        "city": "Zielona Gora",
        "code": "IEG",
        "class": "pol",
        "airport": null,
        "label": "Zielona Gora, Poland (IEG)"
    }, {
        "country": "Poland",
        "city": "Krakow",
        "code": "KRK",
        "class": "pol",
        "airport": null,
        "label": "Krakow, Poland (KRK)"
    }, {
        "country": "Poland",
        "city": "Poznan",
        "code": "POZ",
        "class": "pol",
        "airport": "Pozna?-?awica Airport",
        "label": "Poznan, Poland (POZ)"
    }, {
        "country": "Poland",
        "city": "Rzeszow",
        "code": "RZE",
        "class": "pol",
        "airport": null,
        "label": "Rzeszow, Poland (RZE)"
    }, {
        "country": "Poland",
        "city": "Gdansk",
        "code": "GDN",
        "class": "pol",
        "airport": "Gda?sk Lech Wa??sa Airport",
        "label": "Gdansk, Poland (GDN)"
    }, {
        "country": "Poland",
        "city": "Koszalin",
        "code": "OSZ",
        "class": "pol",
        "airport": "Koszalin Zegrze Airport",
        "label": "Koszalin, Poland (OSZ)"
    }, {
        "country": "Poland",
        "city": "Lodz",
        "code": "LCJ",
        "class": "pol",
        "airport": null,
        "label": "Lodz, Poland (LCJ)"
    }, {
        "country": "Poland",
        "city": "Katowice",
        "code": "KTW",
        "class": "pol",
        "airport": "Katowice International Airport",
        "label": "Katowice, Poland (KTW)"
    }, {
        "country": "Poland",
        "city": "Warsaw",
        "code": "WAW",
        "class": "pol",
        "airport": "Warsaw Chopin Airport",
        "label": "Warsaw, Poland (WAW)"
    }, {
        "country": "Poland",
        "city": "Szczecin",
        "code": "SZZ",
        "class": "pol",
        "airport": null,
        "label": "Szczecin, Poland (SZZ)"
    }, {
        "country": "Poland",
        "city": "Bydgoszcz",
        "code": "BZG",
        "class": "pol",
        "airport": "Bydgoszcz Ignacy Jan Paderewski Airport",
        "label": "Bydgoszcz, Poland (BZG)"
    }, {
        "country": "Portugal",
        "city": "Faro",
        "code": "FAO",
        "class": "por",
        "airport": "Faro Airport",
        "label": "Faro, Portugal (FAO)"
    }, {
        "country": "Portugal",
        "city": "Porto Santo",
        "code": "PXO",
        "class": "por",
        "airport": "Porto Santo Airport",
        "label": "Porto Santo, Portugal (PXO)"
    }, {
        "country": "Portugal",
        "city": "Ponta Delgada",
        "code": "PDL",
        "class": "por",
        "airport": null,
        "label": "Ponta Delgada, Portugal (PDL)"
    }, {
        "country": "Portugal",
        "city": "Porto",
        "code": "OPO",
        "class": "por",
        "airport": null,
        "label": "Porto, Portugal (OPO)"
    }, {
        "country": "Portugal",
        "city": "Terceira Island",
        "code": "TER",
        "class": "por",
        "airport": "Lajes Field",
        "label": "Terceira Island, Portugal (TER)"
    }, {
        "country": "Portugal",
        "city": "Corvo Island",
        "code": "CVU",
        "class": "por",
        "airport": "Corvo Airport",
        "label": "Corvo Island, Portugal (CVU)"
    }, {
        "country": "Portugal",
        "city": "Flores Island",
        "code": "FLW",
        "class": "por",
        "airport": "Flores Airport",
        "label": "Flores Island, Portugal (FLW)"
    }, {
        "country": "Portugal",
        "city": "Horta",
        "code": "HOR",
        "class": "por",
        "airport": "Horta Airport",
        "label": "Horta, Portugal (HOR)"
    }, {
        "country": "Portugal",
        "city": "Madeira",
        "code": "FNC",
        "class": "por",
        "airport": "Madeira Airport",
        "label": "Madeira, Portugal (FNC)"
    }, {
        "country": "Portugal",
        "city": "Santa Maria",
        "code": "SMA",
        "class": "por",
        "airport": "Santa Maria Airport",
        "label": "Santa Maria, Portugal (SMA)"
    }, {
        "country": "Portugal",
        "city": "Graciosa Island",
        "code": "GRW",
        "class": "por",
        "airport": "Graciosa Airport",
        "label": "Graciosa Island, Portugal (GRW)"
    }, {
        "country": "Portugal",
        "city": "Pico Island",
        "code": "PIX",
        "class": "por",
        "airport": "Pico Airport",
        "label": "Pico Island, Portugal (PIX)"
    }, {
        "country": "Portugal",
        "city": "Sao Jorge Island",
        "code": "SJZ",
        "class": "por",
        "airport": null,
        "label": "Sao Jorge Island, Portugal (SJZ)"
    }, {
        "country": "Portugal",
        "city": "Lisbon",
        "code": "LIS",
        "class": "por",
        "airport": "Lisbon Portela Airport",
        "label": "Lisbon, Portugal (LIS)"
    }, {
        "country": "Puerto Rico",
        "city": "San Juan",
        "code": "SJU",
        "class": "pue",
        "airport": "Luis Munoz Marin International Airport",
        "label": "San Juan, Puerto Rico (SJU)"
    }, {
        "country": "Qatar",
        "city": "Doha",
        "code": "DOH",
        "class": "qat",
        "airport": "Doha International Airport",
        "label": "Doha, Qatar (DOH)"
    }, {
        "country": "Republic of the Congo",
        "city": "Brazzaville",
        "code": "BZV",
        "class": "rep",
        "airport": "Maya-Maya Airport",
        "label": "Brazzaville, Republic of the Congo (BZV)"
    }, {
        "country": "Romania",
        "city": "Constanta",
        "code": "CND",
        "class": "rom",
        "airport": "Mihail Kog?lniceanu International Airport",
        "label": "Constanta, Romania (CND)"
    }, {
        "country": "Romania",
        "city": "Oradea",
        "code": "OMR",
        "class": "rom",
        "airport": "Oradea International Airport",
        "label": "Oradea, Romania (OMR)"
    }, {
        "country": "Romania",
        "city": "Suceava",
        "code": "SCV",
        "class": "rom",
        "airport": "Suceava Stefan cel Mare Airport",
        "label": "Suceava, Romania (SCV)"
    }, {
        "country": "Romania",
        "city": "Satu Mare",
        "code": "SUJ",
        "class": "rom",
        "airport": "Satu Mare Airport",
        "label": "Satu Mare, Romania (SUJ)"
    }, {
        "country": "Romania",
        "city": "Tirgu Mures",
        "code": "TGM",
        "class": "rom",
        "airport": null,
        "label": "Tirgu Mures, Romania (TGM)"
    }, {
        "country": "Romania",
        "city": "Iasi",
        "code": "IAS",
        "class": "rom",
        "airport": "Ia?i Airport",
        "label": "Iasi, Romania (IAS)"
    }, {
        "country": "Romania",
        "city": "Cluj Napoca",
        "code": "CLJ",
        "class": "rom",
        "airport": "Cluj-Napoca International Airport",
        "label": "Cluj Napoca, Romania (CLJ)"
    }, {
        "country": "Romania",
        "city": "Arad",
        "code": "ARW",
        "class": "rom",
        "airport": "Arad International Airport",
        "label": "Arad, Romania (ARW)"
    }, {
        "country": "Romania",
        "city": "Bucharest",
        "code": "OTP",
        "class": "rom",
        "airport": "Henri Coand? International Airport",
        "label": "Bucharest, Romania (OTP)"
    }, {
        "country": "Romania",
        "city": "Bacau",
        "code": "BCM",
        "class": "rom",
        "airport": "Bac?u Airport",
        "label": "Bacau, Romania (BCM)"
    }, {
        "country": "Romania",
        "city": "Timisoara",
        "code": "TSR",
        "class": "rom",
        "airport": "Timi?oara Traian Vuia Airport",
        "label": "Timisoara, Romania (TSR)"
    }, {
        "country": "Romania",
        "city": "Craiova",
        "code": "CRA",
        "class": "rom",
        "airport": "Craiova Airport",
        "label": "Craiova, Romania (CRA)"
    }, {
        "country": "Romania",
        "city": "Sibiu",
        "code": "SBZ",
        "class": "rom",
        "airport": "Sibiu International Airport",
        "label": "Sibiu, Romania (SBZ)"
    }, {
        "country": "Romania",
        "city": "Baia Mare",
        "code": "BAY",
        "class": "rom",
        "airport": "Tautii Magheraus Airport",
        "label": "Baia Mare, Romania (BAY)"
    }, {
        "country": "Romania",
        "city": "Baia Mare",
        "code": "BAY",
        "class": "rom",
        "airport": "Tautii Magheraus Airport",
        "label": "Baia Mare, Romania (BAY)"
    }, {
        "country": "Romania",
        "city": "Bucharest",
        "code": "BBU",
        "class": "rom",
        "airport": "B?neasa International Airport",
        "label": "Bucharest, Romania (BBU)"
    }, {
        "country": "Russia",
        "city": "Stavropol",
        "code": "STW",
        "class": "rus",
        "airport": "Stavropol Shpakovskoye Airport",
        "label": "Stavropol, Russia (STW)"
    }, {
        "country": "Russia",
        "city": "Salekhard",
        "code": "SLY",
        "class": "rus",
        "airport": "Salekhard Airport",
        "label": "Salekhard, Russia (SLY)"
    }, {
        "country": "Russia",
        "city": "Surgut",
        "code": "SGC",
        "class": "rus",
        "airport": "Surgut Airport",
        "label": "Surgut, Russia (SGC)"
    }, {
        "country": "Russia",
        "city": "Kursk",
        "code": "URS",
        "class": "rus",
        "airport": "Kursk East Airport",
        "label": "Kursk, Russia (URS)"
    }, {
        "country": "Russia",
        "city": "Mineralnye Vody",
        "code": "MRV",
        "class": "rus",
        "airport": "Mineralnyye Vody Airport",
        "label": "Mineralnye Vody, Russia (MRV)"
    }, {
        "country": "Russia",
        "city": "Mineralnye Vody",
        "code": "MRV",
        "class": "rus",
        "airport": "Mineralnyye Vody Airport",
        "label": "Mineralnye Vody, Russia (MRV)"
    }, {
        "country": "Russia",
        "city": "Tomsk",
        "code": "TOF",
        "class": "rus",
        "airport": "Bogashevo Airport",
        "label": "Tomsk, Russia (TOF)"
    }, {
        "country": "Russia",
        "city": "Naryan-Mar",
        "code": "NNM",
        "class": "rus",
        "airport": "Naryan Mar Airport",
        "label": "Naryan-Mar, Russia (NNM)"
    }, {
        "country": "Russia",
        "city": "Ulan Ude",
        "code": "UUD",
        "class": "rus",
        "airport": "Ulan-Ude Airport (Mukhino)",
        "label": "Ulan Ude, Russia (UUD)"
    }, {
        "country": "Russia",
        "city": "Volgograd",
        "code": "VOG",
        "class": "rus",
        "airport": "Volgograd International Airport",
        "label": "Volgograd, Russia (VOG)"
    }, {
        "country": "Russia",
        "city": "Rostov On Don",
        "code": "ROV",
        "class": "rus",
        "airport": "Rostov-na-Donu Airport",
        "label": "Rostov On Don, Russia (ROV)"
    }, {
        "country": "Russia",
        "city": "Yuzhno-Sakhalinsk",
        "code": "UUS",
        "class": "rus",
        "airport": "Yuzhno-Sakhalinsk Airport",
        "label": "Yuzhno-Sakhalinsk, Russia (UUS)"
    }, {
        "country": "Russia",
        "city": "Krasnojarsk",
        "code": "KJA",
        "class": "rus",
        "airport": "Yemelyanovo Airport",
        "label": "Krasnojarsk, Russia (KJA)"
    }, {
        "country": "Russia",
        "city": "Kaliningrad",
        "code": "KGD",
        "class": "rus",
        "airport": "Khrabrovo Airport",
        "label": "Kaliningrad, Russia (KGD)"
    }, {
        "country": "Russia",
        "city": "Bratsk",
        "code": "BTK",
        "class": "rus",
        "airport": "Bratsk Airport",
        "label": "Bratsk, Russia (BTK)"
    }, {
        "country": "Russia",
        "city": "Bratsk",
        "code": "BTK",
        "class": "rus",
        "airport": "Bratsk Airport",
        "label": "Bratsk, Russia (BTK)"
    }, {
        "country": "Russia",
        "city": "Saratov",
        "code": "RTW",
        "class": "rus",
        "airport": "Saratov Central Airport",
        "label": "Saratov, Russia (RTW)"
    }, {
        "country": "Russia",
        "city": "Usinsk",
        "code": "USK",
        "class": "rus",
        "airport": "Usinsk Airport",
        "label": "Usinsk, Russia (USK)"
    }, {
        "country": "Russia",
        "city": "Chita",
        "code": "HTA",
        "class": "rus",
        "airport": "Chita-Kadala Airport",
        "label": "Chita, Russia (HTA)"
    }, {
        "country": "Russia",
        "city": "Murmansk",
        "code": "MMK",
        "class": "rus",
        "airport": "Murmansk Airport",
        "label": "Murmansk, Russia (MMK)"
    }, {
        "country": "Russia",
        "city": "Mirnyj",
        "code": "MJZ",
        "class": "rus",
        "airport": "Mirny Airport",
        "label": "Mirnyj, Russia (MJZ)"
    }, {
        "country": "Russia",
        "city": "Blagoveschensk",
        "code": "BQS",
        "class": "rus",
        "airport": "Ignatyevo Airport",
        "label": "Blagoveschensk, Russia (BQS)"
    }, {
        "country": "Russia",
        "city": "Naberezhnye Chelny",
        "code": "NBC",
        "class": "rus",
        "airport": "Begishevo Airport",
        "label": "Naberezhnye Chelny, Russia (NBC)"
    }, {
        "country": "Russia",
        "city": "Astrakhan",
        "code": "ASF",
        "class": "rus",
        "airport": "Astrakhan Airport",
        "label": "Astrakhan, Russia (ASF)"
    }, {
        "country": "Russia",
        "city": "Ulyanovsk",
        "code": "ULY",
        "class": "rus",
        "airport": "Ulyanovsk East Airport",
        "label": "Ulyanovsk, Russia (ULY)"
    }, {
        "country": "Russia",
        "city": "Ekaterinburg",
        "code": "SVX",
        "class": "rus",
        "airport": "Koltsovo Airport",
        "label": "Ekaterinburg, Russia (SVX)"
    }, {
        "country": "Russia",
        "city": "Ukhta",
        "code": "UCT",
        "class": "rus",
        "airport": "Ukhta Airport",
        "label": "Ukhta, Russia (UCT)"
    }, {
        "country": "Russia",
        "city": "Saint Petersburg",
        "code": "LED",
        "class": "rus",
        "airport": "Pulkovo Airport",
        "label": "Saint Petersburg, Russia (LED)"
    }, {
        "country": "Russia",
        "city": "Nadym",
        "code": "NYM",
        "class": "rus",
        "airport": "Nadym Airport",
        "label": "Nadym, Russia (NYM)"
    }, {
        "country": "Russia",
        "city": "Lipetsk",
        "code": "LPK",
        "class": "rus",
        "airport": "Lipetsk Airport",
        "label": "Lipetsk, Russia (LPK)"
    }, {
        "country": "Russia",
        "city": "Dikson",
        "code": "DKS",
        "class": "rus",
        "airport": "Dikson Airport",
        "label": "Dikson, Russia (DKS)"
    }, {
        "country": "Russia",
        "city": "Magnitogorsk",
        "code": "MQF",
        "class": "rus",
        "airport": "Magnitogorsk International Airport",
        "label": "Magnitogorsk, Russia (MQF)"
    }, {
        "country": "Russia",
        "city": "Vladivostok",
        "code": "VVO",
        "class": "rus",
        "airport": "Vladivostok International Airport",
        "label": "Vladivostok, Russia (VVO)"
    }, {
        "country": "Russia",
        "city": "Hatanga",
        "code": "HTG",
        "class": "rus",
        "airport": "Khatanga Airport",
        "label": "Hatanga, Russia (HTG)"
    }, {
        "country": "Russia",
        "city": "Vorkuta",
        "code": "VKT",
        "class": "rus",
        "airport": "Vorkuta Airport",
        "label": "Vorkuta, Russia (VKT)"
    }, {
        "country": "Russia",
        "city": "Uraj",
        "code": "URJ",
        "class": "rus",
        "airport": "Uray Airport",
        "label": "Uraj, Russia (URJ)"
    }, {
        "country": "Russia",
        "city": "Abakan",
        "code": "ABA",
        "class": "rus",
        "airport": "Abakan Airport",
        "label": "Abakan, Russia (ABA)"
    }, {
        "country": "Russia",
        "city": "Magadan",
        "code": "GDX",
        "class": "rus",
        "airport": "Sokol Airport",
        "label": "Magadan, Russia (GDX)"
    }, {
        "country": "Russia",
        "city": "Voronezh",
        "code": "VOZ",
        "class": "rus",
        "airport": "Voronezh International Airport",
        "label": "Voronezh, Russia (VOZ)"
    }, {
        "country": "Russia",
        "city": "Ufa",
        "code": "UFA",
        "class": "rus",
        "airport": "Ufa International Airport",
        "label": "Ufa, Russia (UFA)"
    }, {
        "country": "Russia",
        "city": "Nizhniy Novgorod",
        "code": "GOJ",
        "class": "rus",
        "airport": "Nizhny Novgorod International Airport",
        "label": "Nizhniy Novgorod, Russia (GOJ)"
    }, {
        "country": "Russia",
        "city": "Irkutsk",
        "code": "IKT",
        "class": "rus",
        "airport": "Irkutsk Airport",
        "label": "Irkutsk, Russia (IKT)"
    }, {
        "country": "Russia",
        "city": "Tiksi",
        "code": "IKS",
        "class": "rus",
        "airport": "Tiksi Airport",
        "label": "Tiksi, Russia (IKS)"
    }, {
        "country": "Russia",
        "city": "Kemerovo",
        "code": "KEJ",
        "class": "rus",
        "airport": "Kemerovo Airport",
        "label": "Kemerovo, Russia (KEJ)"
    }, {
        "country": "Russia",
        "city": "Cherskiy",
        "code": "CYX",
        "class": "rus",
        "airport": "Cherskiy Airport",
        "label": "Cherskiy, Russia (CYX)"
    }, {
        "country": "Russia",
        "city": "Samara",
        "code": "KUF",
        "class": "rus",
        "airport": "Kurumoch International Airport",
        "label": "Samara, Russia (KUF)"
    }, {
        "country": "Russia",
        "city": "Pskov",
        "code": "PKV",
        "class": "rus",
        "airport": "Pskov Airport",
        "label": "Pskov, Russia (PKV)"
    }, {
        "country": "Russia",
        "city": "Orsk",
        "code": "OSW",
        "class": "rus",
        "airport": "Orsk Airport",
        "label": "Orsk, Russia (OSW)"
    }, {
        "country": "Russia",
        "city": "Chokurdah",
        "code": "CKH",
        "class": "rus",
        "airport": "Chokurdakh Airport",
        "label": "Chokurdah, Russia (CKH)"
    }, {
        "country": "Russia",
        "city": "Kogalym",
        "code": "KGP",
        "class": "rus",
        "airport": "Kogalym International Airport",
        "label": "Kogalym, Russia (KGP)"
    }, {
        "country": "Russia",
        "city": "Omsk",
        "code": "OMS",
        "class": "rus",
        "airport": "Omsk Central Airport",
        "label": "Omsk, Russia (OMS)"
    }, {
        "country": "Russia",
        "city": "Syktyvkar",
        "code": "SCW",
        "class": "rus",
        "airport": "Syktyvkar Airport",
        "label": "Syktyvkar, Russia (SCW)"
    }, {
        "country": "Russia",
        "city": "Kazan",
        "code": "KZN",
        "class": "rus",
        "airport": "Kazan International Airport",
        "label": "Kazan, Russia (KZN)"
    }, {
        "country": "Russia",
        "city": "Orenburg",
        "code": "REN",
        "class": "rus",
        "airport": "Orenburg Central Airport",
        "label": "Orenburg, Russia (REN)"
    }, {
        "country": "Russia",
        "city": "Polyarnyj",
        "code": "PYJ",
        "class": "rus",
        "airport": "Polyarny Airport",
        "label": "Polyarnyj, Russia (PYJ)"
    }, {
        "country": "Russia",
        "city": "Kurgan",
        "code": "KRO",
        "class": "rus",
        "airport": "Kurgan Airport",
        "label": "Kurgan, Russia (KRO)"
    }, {
        "country": "Russia",
        "city": "Pechora",
        "code": "PEX",
        "class": "rus",
        "airport": "Pechora Airport",
        "label": "Pechora, Russia (PEX)"
    }, {
        "country": "Russia",
        "city": "Cheboksary",
        "code": "CSY",
        "class": "rus",
        "airport": "Cheboksary Airport",
        "label": "Cheboksary, Russia (CSY)"
    }, {
        "country": "Russia",
        "city": "Anadyr",
        "code": "DYR",
        "class": "rus",
        "airport": "Ugolny Airport",
        "label": "Anadyr, Russia (DYR)"
    }, {
        "country": "Russia",
        "city": "Perm",
        "code": "PEE",
        "class": "rus",
        "airport": "Bolshoye Savino Airport",
        "label": "Perm, Russia (PEE)"
    }, {
        "country": "Russia",
        "city": "Petropavlovsk-Kamchats",
        "code": "PKC",
        "class": "rus",
        "airport": "Yelizovo Airport",
        "label": "Petropavlovsk-Kamchats, Russia (PKC)"
    }, {
        "country": "Russia",
        "city": "Igarka",
        "code": "IAA",
        "class": "rus",
        "airport": "Igarka Airport",
        "label": "Igarka, Russia (IAA)"
    }, {
        "country": "Russia",
        "city": "Igarka",
        "code": "IAA",
        "class": "rus",
        "airport": "Igarka Airport",
        "label": "Igarka, Russia (IAA)"
    }, {
        "country": "Russia",
        "city": "Khanty-Mansiysk",
        "code": "HMA",
        "class": "rus",
        "airport": "Khanty Mansiysk Airport",
        "label": "Khanty-Mansiysk, Russia (HMA)"
    }, {
        "country": "Russia",
        "city": "Eniseysk",
        "code": "EIE",
        "class": "rus",
        "airport": "Yeniseysk Airport",
        "label": "Eniseysk, Russia (EIE)"
    }, {
        "country": "Russia",
        "city": "Chelyabinsk",
        "code": "CEK",
        "class": "rus",
        "airport": "Chelyabinsk Balandino Airport",
        "label": "Chelyabinsk, Russia (CEK)"
    }, {
        "country": "Russia",
        "city": "Amderma",
        "code": "AMV",
        "class": "rus",
        "airport": "Amderma Airport",
        "label": "Amderma, Russia (AMV)"
    }, {
        "country": "Russia",
        "city": "Belgorod",
        "code": "EGO",
        "class": "rus",
        "airport": "Belgorod International Airport",
        "label": "Belgorod, Russia (EGO)"
    }, {
        "country": "Russia",
        "city": "Khabarovsk",
        "code": "KHV",
        "class": "rus",
        "airport": "Khabarovsk-Novy Airport",
        "label": "Khabarovsk, Russia (KHV)"
    }, {
        "country": "Russia",
        "city": "Petrozavodsk",
        "code": "PES",
        "class": "rus",
        "airport": "Petrozavodsk Airport",
        "label": "Petrozavodsk, Russia (PES)"
    }, {
        "country": "Russia",
        "city": "Kyzyl",
        "code": "KYZ",
        "class": "rus",
        "airport": "Kyzyl Airport",
        "label": "Kyzyl, Russia (KYZ)"
    }, {
        "country": "Russia",
        "city": "Tambov",
        "code": "TBW",
        "class": "rus",
        "airport": "Donskoye Airport",
        "label": "Tambov, Russia (TBW)"
    }, {
        "country": "Russia",
        "city": "Komsomolsk Na Amure",
        "code": "KXK",
        "class": "rus",
        "airport": "Komsomolsk-on-Amur Airport",
        "label": "Komsomolsk Na Amure, Russia (KXK)"
    }, {
        "country": "Russia",
        "city": "Nizhnevartovsk",
        "code": "NJC",
        "class": "rus",
        "airport": "Nizhnevartovsk Airport",
        "label": "Nizhnevartovsk, Russia (NJC)"
    }, {
        "country": "Russia",
        "city": "Arkhangelsk",
        "code": "ARH",
        "class": "rus",
        "airport": "Talagi Airport",
        "label": "Arkhangelsk, Russia (ARH)"
    }, {
        "country": "Russia",
        "city": "Nojabrxsk",
        "code": "NOJ",
        "class": "rus",
        "airport": "Noyabrsk Airport",
        "label": "Nojabrxsk, Russia (NOJ)"
    }, {
        "country": "Russia",
        "city": "Pevek",
        "code": "PWE",
        "class": "rus",
        "airport": "Pevek Airport",
        "label": "Pevek, Russia (PWE)"
    }, {
        "country": "Russia",
        "city": "Makhachkala",
        "code": "MCX",
        "class": "rus",
        "airport": "Uytash Airport",
        "label": "Makhachkala, Russia (MCX)"
    }, {
        "country": "Russia",
        "city": "Moscow",
        "code": "VKO",
        "class": "rus",
        "airport": "Vnukovo International Airport",
        "label": "Moscow, Russia (VKO)"
    }, {
        "country": "Russia",
        "city": "Moscow",
        "code": "DME",
        "class": "rus",
        "airport": "Domodedovo International Airport",
        "label": "Moscow, Russia (DME)"
    }, {
        "country": "Russia",
        "city": "Moscow",
        "code": "SVO",
        "class": "rus",
        "airport": "Sheremetyevo International Airport",
        "label": "Moscow, Russia - Sheremetyevo Airport (SVO)"
    }, {
        "country": "Russia",
        "city": "Tyumen",
        "code": "TJM",
        "class": "rus",
        "airport": "Roshchino International Airport",
        "label": "Tyumen, Russia (TJM)"
    }, {
        "country": "Russia",
        "city": "Vladikavkaz",
        "code": "OGZ",
        "class": "rus",
        "airport": "Beslan Airport",
        "label": "Vladikavkaz, Russia (OGZ)"
    }, {
        "country": "Russia",
        "city": "Cherepovets",
        "code": "CEE",
        "class": "rus",
        "airport": "Cherepovets Airport",
        "label": "Cherepovets, Russia (CEE)"
    }, {
        "country": "Russia",
        "city": "Okhotsk",
        "code": "OHO",
        "class": "rus",
        "airport": "Okhotsk Airport",
        "label": "Okhotsk, Russia (OHO)"
    }, {
        "country": "Russia",
        "city": "Moscow",
        "code": "BKA",
        "class": "rus",
        "airport": "Bykovo Airport",
        "label": "Moscow, Russia (BKA)"
    }, {
        "country": "Russia",
        "city": "Kotlas",
        "code": "KSZ",
        "class": "rus",
        "airport": "Kotlas Airport",
        "label": "Kotlas, Russia (KSZ)"
    }, {
        "country": "Russia",
        "city": "Solovetsky",
        "code": "CSH",
        "class": "rus",
        "airport": "Solovki Airport",
        "label": "Solovetsky, Russia (CSH)"
    }, {
        "country": "Russia",
        "city": "Novokuznetsk",
        "code": "NOZ",
        "class": "rus",
        "airport": "Spichenkovo Airport",
        "label": "Novokuznetsk, Russia (NOZ)"
    }, {
        "country": "Russia",
        "city": "Novosibirsk",
        "code": "OVB",
        "class": "rus",
        "airport": "Tolmachevo Airport",
        "label": "Novosibirsk, Russia (OVB)"
    }, {
        "country": "Russia",
        "city": "Anapa",
        "code": "AAQ",
        "class": "rus",
        "airport": "Anapa Airport",
        "label": "Anapa, Russia (AAQ)"
    }, {
        "country": "Russia",
        "city": "Novy Urengoy",
        "code": "NUX",
        "class": "rus",
        "airport": "Novy Urengoy Airport",
        "label": "Novy Urengoy, Russia (NUX)"
    }, {
        "country": "Russia",
        "city": "Groznyj",
        "code": "GRV",
        "class": "rus",
        "airport": "Grozny North Airport",
        "label": "Groznyj, Russia (GRV)"
    }, {
        "country": "Russia",
        "city": "Noril'sk",
        "code": "NSK",
        "class": "rus",
        "airport": "Norilsk-Alykel Airport",
        "label": "Noril'sk, Russia (NSK)"
    }, {
        "country": "Russia",
        "city": "Krasnodar",
        "code": "KRR",
        "class": "rus",
        "airport": "Krasnodar International Airport",
        "label": "Krasnodar, Russia (KRR)"
    }, {
        "country": "Russia",
        "city": "Yakutsk",
        "code": "YKS",
        "class": "rus",
        "airport": "Yakutsk Airport",
        "label": "Yakutsk, Russia (YKS)"
    }, {
        "country": "Russia",
        "city": "Barnaul",
        "code": "BAX",
        "class": "rus",
        "airport": "Barnaul Airport",
        "label": "Barnaul, Russia (BAX)"
    }, {
        "country": "Russia",
        "city": "Adler",
        "code": "AER",
        "class": "rus",
        "airport": "Sochi International Airport",
        "label": "Adler, Russia (AER)"
    }, {
        "country": "Rwanda",
        "city": "Kigali",
        "code": "KGL",
        "class": "rwa",
        "airport": "Kigali International Airport",
        "label": "Kigali, Rwanda (KGL)"
    }, {
        "country": "R\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00af\u00c3\u0192\u00e2\u20ac\u0161\u00c3\u201a\u00c2\u00bf\u00c3\u0192\u00e2\u20ac\u0161\u00c3\u201a\u00c2\u00bdunion",
        "city": "Saint Denis",
        "code": "RUN",
        "class": "r\u00c3",
        "airport": "Roland Garros Airport",
        "label": "Saint Denis, R\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00af\u00c3\u0192\u00e2\u20ac\u0161\u00c3\u201a\u00c2\u00bf\u00c3\u0192\u00e2\u20ac\u0161\u00c3\u201a\u00c2\u00bdunion (RUN)"
    }, {
        "country": "Saint Helena",
        "city": "Georgetown",
        "code": "ASI",
        "class": "sai",
        "airport": "RAF Ascension Island",
        "label": "Georgetown, Saint Helena (ASI)"
    }, {
        "country": "Saint Pierre and Miquelon",
        "city": "St Pierre",
        "code": "FSP",
        "class": "sai",
        "airport": "St Pierre Airport",
        "label": "St Pierre, Saint Pierre and Miquelon (FSP)"
    }, {
        "country": "Samoa",
        "city": "Apia",
        "code": "APW",
        "class": "sam",
        "airport": "Faleolo International Airport",
        "label": "Apia, Samoa (APW)"
    }, {
        "country": "Sao Tome",
        "city": "Sao Tome",
        "code": "TMS",
        "class": "sao",
        "airport": null,
        "label": "Sao Tome, Sao Tome (TMS)"
    }, {
        "country": "Sao Tome",
        "city": "Principe",
        "code": "PCP",
        "class": "sao",
        "airport": "Principe Airport",
        "label": "Principe, Sao Tome (PCP)"
    }, {
        "country": "Saudi Arabia",
        "city": "Dammam",
        "code": "DMM",
        "class": "sau",
        "airport": "King Fahd International Airport",
        "label": "Dammam, Saudi Arabia (DMM)"
    }, {
        "country": "Saudi Arabia",
        "city": "Hafr Albatin",
        "code": "HBT",
        "class": "sau",
        "airport": "King Khaled Military City Airport",
        "label": "Hafr Albatin, Saudi Arabia (HBT)"
    }, {
        "country": "Saudi Arabia",
        "city": "Al-Baha",
        "code": "ABT",
        "class": "sau",
        "airport": "Al Baha Airport",
        "label": "Al-Baha, Saudi Arabia (ABT)"
    }, {
        "country": "Saudi Arabia",
        "city": "Bisha",
        "code": "BHH",
        "class": "sau",
        "airport": "Bisha Airport",
        "label": "Bisha, Saudi Arabia (BHH)"
    }, {
        "country": "Saudi Arabia",
        "city": "Madinah",
        "code": "MED",
        "class": "sau",
        "airport": "Prince Mohammad Bin Abdulaziz Airport",
        "label": "Madinah, Saudi Arabia (MED)"
    }, {
        "country": "Saudi Arabia",
        "city": "Dawadmi",
        "code": "DWD",
        "class": "sau",
        "airport": "Dawadmi Domestic Airport",
        "label": "Dawadmi, Saudi Arabia (DWD)"
    }, {
        "country": "Saudi Arabia",
        "city": "Tabuk",
        "code": "TUU",
        "class": "sau",
        "airport": "Tabuk Airport",
        "label": "Tabuk, Saudi Arabia (TUU)"
    }, {
        "country": "Saudi Arabia",
        "city": "Alahsa",
        "code": "HOF",
        "class": "sau",
        "airport": "Al Ahsa Airport",
        "label": "Alahsa, Saudi Arabia (HOF)"
    }, {
        "country": "Saudi Arabia",
        "city": "Alahsa",
        "code": "HOF",
        "class": "sau",
        "airport": "Al Ahsa Airport",
        "label": "Alahsa, Saudi Arabia (HOF)"
    }, {
        "country": "Saudi Arabia",
        "city": "Riyadh",
        "code": "RUH",
        "class": "sau",
        "airport": "King Khaled International Airport",
        "label": "Riyadh, Saudi Arabia (RUH)"
    }, {
        "country": "Saudi Arabia",
        "city": "Taif",
        "code": "TIF",
        "class": "sau",
        "airport": "Taif Airport",
        "label": "Taif, Saudi Arabia (TIF)"
    }, {
        "country": "Saudi Arabia",
        "city": "Gassim",
        "code": "ELQ",
        "class": "sau",
        "airport": "Gassim Airport",
        "label": "Gassim, Saudi Arabia (ELQ)"
    }, {
        "country": "Saudi Arabia",
        "city": "Abha",
        "code": "AHB",
        "class": "sau",
        "airport": "Abha Regional Airport",
        "label": "Abha, Saudi Arabia (AHB)"
    }, {
        "country": "Saudi Arabia",
        "city": "Jouf",
        "code": "AJF",
        "class": "sau",
        "airport": "Al-Jawf Domestic Airport",
        "label": "Jouf, Saudi Arabia (AJF)"
    }, {
        "country": "Saudi Arabia",
        "city": "Nejran",
        "code": "EAM",
        "class": "sau",
        "airport": "Nejran Airport",
        "label": "Nejran, Saudi Arabia (EAM)"
    }, {
        "country": "Saudi Arabia",
        "city": "Ha'il",
        "code": "HAS",
        "class": "sau",
        "airport": "Hail Airport",
        "label": "Ha'il, Saudi Arabia (HAS)"
    }, {
        "country": "Saudi Arabia",
        "city": "Ha'il",
        "code": "HAS",
        "class": "sau",
        "airport": "Hail Airport",
        "label": "Ha'il, Saudi Arabia (HAS)"
    }, {
        "country": "Saudi Arabia",
        "city": "Rafha",
        "code": "RAH",
        "class": "sau",
        "airport": "Rafha Domestic Airport",
        "label": "Rafha, Saudi Arabia (RAH)"
    }, {
        "country": "Saudi Arabia",
        "city": "Turaif",
        "code": "TUI",
        "class": "sau",
        "airport": "Turaif Domestic Airport",
        "label": "Turaif, Saudi Arabia (TUI)"
    }, {
        "country": "Saudi Arabia",
        "city": "Sharurah",
        "code": "SHW",
        "class": "sau",
        "airport": "Sharurah Airport",
        "label": "Sharurah, Saudi Arabia (SHW)"
    }, {
        "country": "Saudi Arabia",
        "city": "Jazan",
        "code": "GIZ",
        "class": "sau",
        "airport": "Jizan Regional Airport",
        "label": "Jazan, Saudi Arabia (GIZ)"
    }, {
        "country": "Saudi Arabia",
        "city": "Yanbu",
        "code": "YNB",
        "class": "sau",
        "airport": "Yenbo Airport",
        "label": "Yanbu, Saudi Arabia (YNB)"
    }, {
        "country": "Saudi Arabia",
        "city": "Arar",
        "code": "RAE",
        "class": "sau",
        "airport": "Arar Domestic Airport",
        "label": "Arar, Saudi Arabia (RAE)"
    }, {
        "country": "Saudi Arabia",
        "city": "Gurayat",
        "code": "URY",
        "class": "sau",
        "airport": "Guriat Domestic Airport",
        "label": "Gurayat, Saudi Arabia (URY)"
    }, {
        "country": "Saudi Arabia",
        "city": "Qaisumah",
        "code": "AQI",
        "class": "sau",
        "airport": "Hafr Al Batin Airport",
        "label": "Qaisumah, Saudi Arabia (AQI)"
    }, {
        "country": "Saudi Arabia",
        "city": "Jeddah",
        "code": "JED",
        "class": "sau",
        "airport": "King Abdulaziz International Airport",
        "label": "Jeddah, Saudi Arabia (JED)"
    }, {
        "country": "Saudi Arabia",
        "city": "Wedjh",
        "code": "EJH",
        "class": "sau",
        "airport": "Al Wajh Domestic Airport",
        "label": "Wedjh, Saudi Arabia (EJH)"
    }, {
        "country": "Senegal",
        "city": "Ziguinchor",
        "code": "ZIG",
        "class": "sen",
        "airport": "Ziguinchor Airport",
        "label": "Ziguinchor, Senegal (ZIG)"
    }, {
        "country": "Senegal",
        "city": "Saint Louis",
        "code": "XLS",
        "class": "sen",
        "airport": "Saint Louis Airport",
        "label": "Saint Louis, Senegal (XLS)"
    }, {
        "country": "Senegal",
        "city": "Cap Skirring",
        "code": "CSK",
        "class": "sen",
        "airport": "Cap Skirring Airport",
        "label": "Cap Skirring, Senegal (CSK)"
    }, {
        "country": "Senegal",
        "city": "Dakar",
        "code": "DKR",
        "class": "sen",
        "airport": null,
        "label": "Dakar, Senegal (DKR)"
    }, {
        "country": "Senegal",
        "city": "Tambacounda",
        "code": "TUD",
        "class": "sen",
        "airport": "Tambacounda Airport",
        "label": "Tambacounda, Senegal (TUD)"
    }, {
        "country": "Serbia",
        "city": "Belgrade",
        "code": "BEG",
        "class": "ser",
        "airport": "Belgrade Nikola Tesla Airport",
        "label": "Belgrade, Serbia (BEG)"
    }, {
        "country": "Serbia",
        "city": "Nis",
        "code": "INI",
        "class": "ser",
        "airport": "Nis Airport",
        "label": "Nis, Serbia (INI)"
    }, {
        "country": "Serbia",
        "city": "Pristina",
        "code": "PRN",
        "class": "ser",
        "airport": null,
        "label": "Pristina, Serbia (PRN)"
    }, {
        "country": "Seychelles",
        "city": "Mahe Island",
        "code": "SEZ",
        "class": "sey",
        "airport": "Seychelles International Airport",
        "label": "Mahe Island, Seychelles (SEZ)"
    }, {
        "country": "Seychelles",
        "city": "Praslin Island",
        "code": "PRI",
        "class": "sey",
        "airport": "Praslin Island Airport",
        "label": "Praslin Island, Seychelles (PRI)"
    }, {
        "country": "Sierra Leone",
        "city": "Freetown",
        "code": "FNA",
        "class": "sie",
        "airport": "Lungi International Airport",
        "label": "Freetown, Sierra Leone (FNA)"
    }, {
        "country": "Slovakia",
        "city": "Kosice",
        "code": "KSC",
        "class": "slo",
        "airport": null,
        "label": "Kosice, Slovakia (KSC)"
    }, {
        "country": "Slovakia",
        "city": "Kosice",
        "code": "KSC",
        "class": "slo",
        "airport": null,
        "label": "Kosice, Slovakia (KSC)"
    }, {
        "country": "Slovakia",
        "city": "Sliac",
        "code": "SLD",
        "class": "slo",
        "airport": "Slia? Airport",
        "label": "Sliac, Slovakia (SLD)"
    }, {
        "country": "Slovakia",
        "city": "Bratislava",
        "code": "BTS",
        "class": "slo",
        "airport": null,
        "label": "Bratislava, Slovakia (BTS)"
    }, {
        "country": "Slovakia",
        "city": "Zilina",
        "code": "ILZ",
        "class": "slo",
        "airport": null,
        "label": "Zilina, Slovakia (ILZ)"
    }, {
        "country": "Slovenia",
        "city": "Ljubljana",
        "code": "LJU",
        "class": "slo",
        "airport": null,
        "label": "Ljubljana, Slovenia (LJU)"
    }, {
        "country": "Solomon Islands",
        "city": "Ramata",
        "code": "RBV",
        "class": "sol",
        "airport": "Ramata Airport",
        "label": "Ramata, Solomon Islands (RBV)"
    }, {
        "country": "Solomon Islands",
        "city": "Mbambanakira",
        "code": "MBU",
        "class": "sol",
        "airport": "Babanakira Airport",
        "label": "Mbambanakira, Solomon Islands (MBU)"
    }, {
        "country": "Solomon Islands",
        "city": "Suavanao",
        "code": "VAO",
        "class": "sol",
        "airport": "Suavanao Airport",
        "label": "Suavanao, Solomon Islands (VAO)"
    }, {
        "country": "Solomon Islands",
        "city": "Santa Cruz Is",
        "code": "SCZ",
        "class": "sol",
        "airport": "Santa Cruz\/Graciosa Bay\/Luova Airport",
        "label": "Santa Cruz Is, Solomon Islands (SCZ)"
    }, {
        "country": "Solomon Islands",
        "city": "Sege",
        "code": "EGM",
        "class": "sol",
        "airport": "Sege Airport",
        "label": "Sege, Solomon Islands (EGM)"
    }, {
        "country": "Solomon Islands",
        "city": "Gatokae",
        "code": "GTA",
        "class": "sol",
        "airport": "Gatokae Airport",
        "label": "Gatokae, Solomon Islands (GTA)"
    }, {
        "country": "Solomon Islands",
        "city": "Atoifi",
        "code": "ATD",
        "class": "sol",
        "airport": "Uru Harbour Airport",
        "label": "Atoifi, Solomon Islands (ATD)"
    }, {
        "country": "Solomon Islands",
        "city": "Fera Island",
        "code": "FRE",
        "class": "sol",
        "airport": "Fera\/Maringe Airport",
        "label": "Fera Island, Solomon Islands (FRE)"
    }, {
        "country": "Solomon Islands",
        "city": "Fera Island",
        "code": "FRE",
        "class": "sol",
        "airport": "Fera\/Maringe Airport",
        "label": "Fera Island, Solomon Islands (FRE)"
    }, {
        "country": "Solomon Islands",
        "city": "Fera Island",
        "code": "FRE",
        "class": "sol",
        "airport": "Fera\/Maringe Airport",
        "label": "Fera Island, Solomon Islands (FRE)"
    }, {
        "country": "Solomon Islands",
        "city": "Gizo",
        "code": "GZO",
        "class": "sol",
        "airport": "Nusatupe Airport",
        "label": "Gizo, Solomon Islands (GZO)"
    }, {
        "country": "Solomon Islands",
        "city": "Mono",
        "code": "MNY",
        "class": "sol",
        "airport": "Mono Airport",
        "label": "Mono, Solomon Islands (MNY)"
    }, {
        "country": "Solomon Islands",
        "city": "Auki",
        "code": "AKS",
        "class": "sol",
        "airport": "Auki Airport",
        "label": "Auki, Solomon Islands (AKS)"
    }, {
        "country": "Solomon Islands",
        "city": "Balalae",
        "code": "BAS",
        "class": "sol",
        "airport": "Ballalae Airport",
        "label": "Balalae, Solomon Islands (BAS)"
    }, {
        "country": "Solomon Islands",
        "city": "Kirakira",
        "code": "IRA",
        "class": "sol",
        "airport": "Ngorangora Airport",
        "label": "Kirakira, Solomon Islands (IRA)"
    }, {
        "country": "Solomon Islands",
        "city": "Rennell",
        "code": "RNL",
        "class": "sol",
        "airport": "Rennell\/Tingoa Airport",
        "label": "Rennell, Solomon Islands (RNL)"
    }, {
        "country": "Solomon Islands",
        "city": "Munda",
        "code": "MUA",
        "class": "sol",
        "airport": "Munda Airport",
        "label": "Munda, Solomon Islands (MUA)"
    }, {
        "country": "Solomon Islands",
        "city": "Honiara",
        "code": "HIR",
        "class": "sol",
        "airport": "Honiara International Airport",
        "label": "Honiara, Solomon Islands (HIR)"
    }, {
        "country": "Solomon Islands",
        "city": "Honiara",
        "code": "HIR",
        "class": "sol",
        "airport": "Honiara International Airport",
        "label": "Honiara, Solomon Islands (HIR)"
    }, {
        "country": "Solomon Islands",
        "city": "Kagau",
        "code": "KGE",
        "class": "sol",
        "airport": "Kagau Island Airport",
        "label": "Kagau, Solomon Islands (KGE)"
    }, {
        "country": "Solomon Islands",
        "city": "Kagau",
        "code": "KGE",
        "class": "sol",
        "airport": "Kagau Island Airport",
        "label": "Kagau, Solomon Islands (KGE)"
    }, {
        "country": "Solomon Islands",
        "city": "Afutara",
        "code": "AFT",
        "class": "sol",
        "airport": "Afutara Aerodrome",
        "label": "Afutara, Solomon Islands (AFT)"
    }, {
        "country": "Solomon Islands",
        "city": "Afutara",
        "code": "AFT",
        "class": "sol",
        "airport": "Afutara Aerodrome",
        "label": "Afutara, Solomon Islands (AFT)"
    }, {
        "country": "Solomon Islands",
        "city": "Afutara",
        "code": "AFT",
        "class": "sol",
        "airport": "Afutara Aerodrome",
        "label": "Afutara, Solomon Islands (AFT)"
    }, {
        "country": "Solomon Islands",
        "city": "Marau Sound",
        "code": "RUS",
        "class": "sol",
        "airport": "Marau Airport",
        "label": "Marau Sound, Solomon Islands (RUS)"
    }, {
        "country": "South Africa",
        "city": "Margate",
        "code": "MGH",
        "class": "sou",
        "airport": "Margate Airport",
        "label": "Margate, South Africa (MGH)"
    }, {
        "country": "South Africa",
        "city": "Phalaborwa",
        "code": "PHW",
        "class": "sou",
        "airport": "Hendrik Van Eck Airport",
        "label": "Phalaborwa, South Africa (PHW)"
    }, {
        "country": "South Africa",
        "city": "Nelspruit",
        "code": "MQP",
        "class": "sou",
        "airport": "Kruger Mpumalanga International Airport",
        "label": "Nelspruit, South Africa (MQP)"
    }, {
        "country": "South Africa",
        "city": "George",
        "code": "GRJ",
        "class": "sou",
        "airport": "George Airport",
        "label": "George, South Africa (GRJ)"
    }, {
        "country": "South Africa",
        "city": "Cape Town",
        "code": "CPT",
        "class": "sou",
        "airport": "Cape Town International Airport",
        "label": "Cape Town, South Africa (CPT)"
    }, {
        "country": "South Africa",
        "city": "Pietermaritzburg",
        "code": "PZB",
        "class": "sou",
        "airport": "Pietermaritzburg Airport",
        "label": "Pietermaritzburg, South Africa (PZB)"
    }, {
        "country": "South Africa",
        "city": "Bloemfontein",
        "code": "BFN",
        "class": "sou",
        "airport": "J B M Hertzog International Airport",
        "label": "Bloemfontein, South Africa (BFN)"
    }, {
        "country": "South Africa",
        "city": "Kimberley",
        "code": "KIM",
        "class": "sou",
        "airport": "Kimberley Airport",
        "label": "Kimberley, South Africa (KIM)"
    }, {
        "country": "South Africa",
        "city": "Richards Bay",
        "code": "RCB",
        "class": "sou",
        "airport": "Richards Bay Airport",
        "label": "Richards Bay, South Africa (RCB)"
    }, {
        "country": "South Africa",
        "city": "Polokwane",
        "code": "PTG",
        "class": "sou",
        "airport": "Polokwane International Airport",
        "label": "Polokwane, South Africa (PTG)"
    }, {
        "country": "South Africa",
        "city": "Port Elizabeth",
        "code": "PLZ",
        "class": "sou",
        "airport": "Port Elizabeth Airport",
        "label": "Port Elizabeth, South Africa (PLZ)"
    }, {
        "country": "South Africa",
        "city": "Mala Mala",
        "code": "AAM",
        "class": "sou",
        "airport": "Malamala Airport",
        "label": "Mala Mala, South Africa (AAM)"
    }, {
        "country": "South Africa",
        "city": "Mmabatho",
        "code": "MBD",
        "class": "sou",
        "airport": "Mmabatho International Airport",
        "label": "Mmabatho, South Africa (MBD)"
    }, {
        "country": "South Africa",
        "city": "Lanseria",
        "code": "HLA",
        "class": "sou",
        "airport": "Lanseria Airport",
        "label": "Lanseria, South Africa (HLA)"
    }, {
        "country": "South Africa",
        "city": "Upington",
        "code": "UTN",
        "class": "sou",
        "airport": "Pierre Van Ryneveld Airport",
        "label": "Upington, South Africa (UTN)"
    }, {
        "country": "South Africa",
        "city": "Hoedspruit",
        "code": "HDS",
        "class": "sou",
        "airport": "Hoedspruit Air Force Base Airport",
        "label": "Hoedspruit, South Africa (HDS)"
    }, {
        "country": "South Africa",
        "city": "Durban",
        "code": "DUR",
        "class": "sou",
        "airport": "King Shaka International Airport",
        "label": "Durban, South Africa (DUR)"
    }, {
        "country": "South Africa",
        "city": "East london",
        "code": "ELS",
        "class": "sou",
        "airport": "Ben Schoeman Airport",
        "label": "East london, South Africa (ELS)"
    }, {
        "country": "South Africa",
        "city": "Umtata",
        "code": "UTT",
        "class": "sou",
        "airport": "K. D. Matanzima Airport",
        "label": "Umtata, South Africa (UTT)"
    }, {
        "country": "South Africa",
        "city": "Johannesburg",
        "code": "JNB",
        "class": "sou",
        "airport": "OR Tambo International Airport",
        "label": "Johannesburg, South Africa (JNB)"
    }, {
        "country": "South Korea",
        "city": "Gunsan",
        "code": "KUV",
        "class": "sou",
        "airport": "Kunsan Air Base",
        "label": "Gunsan, South Korea (KUV)"
    }, {
        "country": "South Korea",
        "city": "Wonju",
        "code": "WJU",
        "class": "sou",
        "airport": "Wonju Airport",
        "label": "Wonju, South Korea (WJU)"
    }, {
        "country": "South Korea",
        "city": "Wonju",
        "code": "WJU",
        "class": "sou",
        "airport": "Wonju Airport",
        "label": "Wonju, South Korea (WJU)"
    }, {
        "country": "South Korea",
        "city": "Ulsan",
        "code": "USN",
        "class": "sou",
        "airport": "Ulsan Airport",
        "label": "Ulsan, South Korea (USN)"
    }, {
        "country": "South Korea",
        "city": "Jinju",
        "code": "HIN",
        "class": "sou",
        "airport": "Sacheon Air Base",
        "label": "Jinju, South Korea (HIN)"
    }, {
        "country": "South Korea",
        "city": "Pohang",
        "code": "KPO",
        "class": "sou",
        "airport": "Pohang Airport",
        "label": "Pohang, South Korea (KPO)"
    }, {
        "country": "South Korea",
        "city": "Yeosu",
        "code": "RSU",
        "class": "sou",
        "airport": "Yeosu Airport",
        "label": "Yeosu, South Korea (RSU)"
    }, {
        "country": "South Korea",
        "city": "Seoul",
        "code": "ICN",
        "class": "sou",
        "airport": "Incheon International Airport",
        "label": "Seoul, South Korea - Incheon Airport (ICN)"
    }, {
        "country": "South Korea",
        "city": "Yangyang",
        "code": "YNY",
        "class": "sou",
        "airport": "Yangyang International Airport",
        "label": "Yangyang, South Korea (YNY)"
    }, {
        "country": "South Korea",
        "city": "Busan",
        "code": "PUS",
        "class": "sou",
        "airport": "Gimhae International Airport",
        "label": "Busan, South Korea (PUS)"
    }, {
        "country": "South Korea",
        "city": "Gwangju",
        "code": "KWJ",
        "class": "sou",
        "airport": "Gwangju Airport",
        "label": "Gwangju, South Korea (KWJ)"
    }, {
        "country": "South Korea",
        "city": "Jeju",
        "code": "CJU",
        "class": "sou",
        "airport": "Jeju International Airport",
        "label": "Jeju, South Korea (CJU)"
    }, {
        "country": "South Korea",
        "city": "Cheongju",
        "code": "CJJ",
        "class": "sou",
        "airport": "Cheongju International Airport",
        "label": "Cheongju, South Korea (CJJ)"
    }, {
        "country": "South Korea",
        "city": "Daegu",
        "code": "TAE",
        "class": "sou",
        "airport": "Daegu Airport",
        "label": "Daegu, South Korea (TAE)"
    }, {
        "country": "South Korea",
        "city": "Seoul",
        "code": "GMP",
        "class": "sou",
        "airport": "Gimpo International Airport",
        "label": "Seoul, South Korea - Gimpo Airport (GMP)"
    }, {
        "country": "Spain",
        "city": "Valverde",
        "code": "VDE",
        "class": "spa",
        "airport": "Hierro Airport",
        "label": "Valverde, Spain (VDE)"
    }, {
        "country": "Spain",
        "city": "Santiago de Compostela",
        "code": "SCQ",
        "class": "spa",
        "airport": "Santiago de Compostela Airport",
        "label": "Santiago de Compostela, Spain (SCQ)"
    }, {
        "country": "Spain",
        "city": "Melilla",
        "code": "MLN",
        "class": "spa",
        "airport": "Melilla Airport",
        "label": "Melilla, Spain (MLN)"
    }, {
        "country": "Spain",
        "city": "Valladolid",
        "code": "VLL",
        "class": "spa",
        "airport": "Valladolid Airport",
        "label": "Valladolid, Spain (VLL)"
    }, {
        "country": "Spain",
        "city": "Valencia",
        "code": "VLC",
        "class": "spa",
        "airport": "Valencia Airport",
        "label": "Valencia, Spain (VLC)"
    }, {
        "country": "Spain",
        "city": "Vitoria",
        "code": "VIT",
        "class": "spa",
        "airport": "Vitoria\/Foronda Airport",
        "label": "Vitoria, Spain (VIT)"
    }, {
        "country": "Spain",
        "city": "Asturias",
        "code": "OVD",
        "class": "spa",
        "airport": "Asturias Airport",
        "label": "Asturias, Spain (OVD)"
    }, {
        "country": "Spain",
        "city": "Bilbao",
        "code": "BIO",
        "class": "spa",
        "airport": "Bilbao Airport",
        "label": "Bilbao, Spain (BIO)"
    }, {
        "country": "Spain",
        "city": "Las Palmas",
        "code": "LPA",
        "class": "spa",
        "airport": "Gran Canaria Airport",
        "label": "Las Palmas, Spain (LPA)"
    }, {
        "country": "Spain",
        "city": "Jerez de la Frontera",
        "code": "XRY",
        "class": "spa",
        "airport": "Jerez Airport",
        "label": "Jerez de la Frontera, Spain (XRY)"
    }, {
        "country": "Spain",
        "city": "Badajoz",
        "code": "BJZ",
        "class": "spa",
        "airport": "Badajoz Airport",
        "label": "Badajoz, Spain (BJZ)"
    }, {
        "country": "Spain",
        "city": "Santander",
        "code": "SDR",
        "class": "spa",
        "airport": "Santander Airport",
        "label": "Santander, Spain (SDR)"
    }, {
        "country": "Spain",
        "city": "San Sebas de la Gomera",
        "code": "GMZ",
        "class": "spa",
        "airport": "La Gomera Airport",
        "label": "San Sebas de la Gomera, Spain (GMZ)"
    }, {
        "country": "Spain",
        "city": "Palma de Mallorca",
        "code": "PMI",
        "class": "spa",
        "airport": "Palma De Mallorca Airport",
        "label": "Palma de Mallorca, Spain (PMI)"
    }, {
        "country": "Spain",
        "city": "Pamplona",
        "code": "PNA",
        "class": "spa",
        "airport": "Pamplona Airport",
        "label": "Pamplona, Spain (PNA)"
    }, {
        "country": "Spain",
        "city": "Alicante",
        "code": "ALC",
        "class": "spa",
        "airport": "Alicante International Airport",
        "label": "Alicante, Spain (ALC)"
    }, {
        "country": "Spain",
        "city": "La Coruna",
        "code": "LCG",
        "class": "spa",
        "airport": null,
        "label": "La Coruna, Spain (LCG)"
    }, {
        "country": "Spain",
        "city": "Gerona",
        "code": "GRO",
        "class": "spa",
        "airport": "Girona Airport",
        "label": "Gerona, Spain (GRO)"
    }, {
        "country": "Spain",
        "city": "Reus",
        "code": "REU",
        "class": "spa",
        "airport": "Reus Air Base",
        "label": "Reus, Spain (REU)"
    }, {
        "country": "Spain",
        "city": "Tenerife",
        "code": "TFN",
        "class": "spa",
        "airport": "Tenerife Norte Airport",
        "label": "Tenerife, Spain (TFN)"
    }, {
        "country": "Spain",
        "city": "Salamanca",
        "code": "SLM",
        "class": "spa",
        "airport": "Salamanca Airport",
        "label": "Salamanca, Spain (SLM)"
    }, {
        "country": "Spain",
        "city": "Fuerteventura",
        "code": "FUE",
        "class": "spa",
        "airport": "Fuerteventura Airport",
        "label": "Fuerteventura, Spain (FUE)"
    }, {
        "country": "Spain",
        "city": "Albacete",
        "code": "ABC",
        "class": "spa",
        "airport": "Albacete-Los Llanos Airport",
        "label": "Albacete, Spain (ABC)"
    }, {
        "country": "Spain",
        "city": "Albacete",
        "code": "ABC",
        "class": "spa",
        "airport": "Albacete-Los Llanos Airport",
        "label": "Albacete, Spain (ABC)"
    }, {
        "country": "Spain",
        "city": "San Sebastian",
        "code": "EAS",
        "class": "spa",
        "airport": "San Sebastian Airport",
        "label": "San Sebastian, Spain (EAS)"
    }, {
        "country": "Spain",
        "city": "Ibiza",
        "code": "IBZ",
        "class": "spa",
        "airport": "Ibiza Airport",
        "label": "Ibiza, Spain (IBZ)"
    }, {
        "country": "Spain",
        "city": "Sevilla",
        "code": "SVQ",
        "class": "spa",
        "airport": "Sevilla Airport",
        "label": "Sevilla, Spain (SVQ)"
    }, {
        "country": "Spain",
        "city": "Zaragoza",
        "code": "ZAZ",
        "class": "spa",
        "airport": "Zaragoza Air Base",
        "label": "Zaragoza, Spain (ZAZ)"
    }, {
        "country": "Spain",
        "city": "Leon",
        "code": "LEN",
        "class": "spa",
        "airport": "Leon Airport",
        "label": "Leon, Spain (LEN)"
    }, {
        "country": "Spain",
        "city": "Santa Cruz De La Palma",
        "code": "SPC",
        "class": "spa",
        "airport": "La Palma Airport",
        "label": "Santa Cruz De La Palma, Spain (SPC)"
    }, {
        "country": "Spain",
        "city": "Malaga",
        "code": "AGP",
        "class": "spa",
        "airport": null,
        "label": "Malaga, Spain (AGP)"
    }, {
        "country": "Spain",
        "city": "Almeria",
        "code": "LEI",
        "class": "spa",
        "airport": null,
        "label": "Almeria, Spain (LEI)"
    }, {
        "country": "Spain",
        "city": "Lanzarote",
        "code": "ACE",
        "class": "spa",
        "airport": "Lanzarote Airport",
        "label": "Lanzarote, Spain (ACE)"
    }, {
        "country": "Spain",
        "city": "Barcelona",
        "code": "BCN",
        "class": "spa",
        "airport": "Barcelona International Airport",
        "label": "Barcelona, Spain (BCN)"
    }, {
        "country": "Spain",
        "city": "Tenerife",
        "code": "TFS",
        "class": "spa",
        "airport": "Tenerife South Airport",
        "label": "Tenerife, Spain (TFS)"
    }, {
        "country": "Spain",
        "city": "Logrono",
        "code": "RJL",
        "class": "spa",
        "airport": null,
        "label": "Logrono, Spain (RJL)"
    }, {
        "country": "Spain",
        "city": "Granada",
        "code": "GRX",
        "class": "spa",
        "airport": "Federico Garcia Lorca Airport",
        "label": "Granada, Spain (GRX)"
    }, {
        "country": "Spain",
        "city": "Menorca",
        "code": "MAH",
        "class": "spa",
        "airport": "Menorca Airport",
        "label": "Menorca, Spain (MAH)"
    }, {
        "country": "Spain",
        "city": "Madrid",
        "code": "MAD",
        "class": "spa",
        "airport": "Madrid Barajas International Airport",
        "label": "Madrid, Spain (MAD)"
    }, {
        "country": "Spain",
        "city": "Murcia",
        "code": "MJV",
        "class": "spa",
        "airport": "San Javier Airport",
        "label": "Murcia, Spain (MJV)"
    }, {
        "country": "Spain",
        "city": "Vigo",
        "code": "VGO",
        "class": "spa",
        "airport": "Vigo Airport",
        "label": "Vigo, Spain (VGO)"
    }, {
        "country": "Suriname",
        "city": "Paramaribo",
        "code": "PBM",
        "class": "sur",
        "airport": "Johan Adolf Pengel International Airport",
        "label": "Paramaribo, Suriname (PBM)"
    }, {
        "country": "Svalbard",
        "city": "Longyearbyen",
        "code": "LYR",
        "class": "sva",
        "airport": "Svalbard Airport, Longyear",
        "label": "Longyearbyen, Svalbard (LYR)"
    }, {
        "country": "Swaziland",
        "city": "Manzini",
        "code": "MTS",
        "class": "swa",
        "airport": "Matsapha Airport",
        "label": "Manzini, Swaziland (MTS)"
    }, {
        "country": "Sweden",
        "city": "G\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00b6teborg",
        "code": "GOT",
        "class": "swe",
        "airport": "Gothenburg-Landvetter Airport",
        "label": "G\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00b6teborg, Sweden (GOT)"
    }, {
        "country": "Sweden",
        "city": "Orebro",
        "code": "ORB",
        "class": "swe",
        "airport": null,
        "label": "Orebro, Sweden (ORB)"
    }, {
        "country": "Sweden",
        "city": "Skelleftea",
        "code": "SFT",
        "class": "swe",
        "airport": null,
        "label": "Skelleftea, Sweden (SFT)"
    }, {
        "country": "Sweden",
        "city": "Sk\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00b6vde",
        "code": "KVB",
        "class": "swe",
        "airport": null,
        "label": "Sk\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00b6vde, Sweden (KVB)"
    }, {
        "country": "Sweden",
        "city": "Ostersund",
        "code": "OSD",
        "class": "swe",
        "airport": null,
        "label": "Ostersund, Sweden (OSD)"
    }, {
        "country": "Sweden",
        "city": "Ornskoldsvik",
        "code": "OER",
        "class": "swe",
        "airport": null,
        "label": "Ornskoldsvik, Sweden (OER)"
    }, {
        "country": "Sweden",
        "city": "Kalmar",
        "code": "KLR",
        "class": "swe",
        "airport": "Kalmar Airport",
        "label": "Kalmar, Sweden (KLR)"
    }, {
        "country": "Sweden",
        "city": "Vaxjo",
        "code": "VXO",
        "class": "swe",
        "airport": null,
        "label": "Vaxjo, Sweden (VXO)"
    }, {
        "country": "Sweden",
        "city": "Hudiksvall",
        "code": "HUV",
        "class": "swe",
        "airport": "Hudiksvall Airport",
        "label": "Hudiksvall, Sweden (HUV)"
    }, {
        "country": "Sweden",
        "city": "Hudiksvall",
        "code": "HUV",
        "class": "swe",
        "airport": "Hudiksvall Airport",
        "label": "Hudiksvall, Sweden (HUV)"
    }, {
        "country": "Sweden",
        "city": "Halmstad",
        "code": "HAD",
        "class": "swe",
        "airport": "Halmstad Airport",
        "label": "Halmstad, Sweden (HAD)"
    }, {
        "country": "Sweden",
        "city": "Halmstad",
        "code": "HAD",
        "class": "swe",
        "airport": "Halmstad Airport",
        "label": "Halmstad, Sweden (HAD)"
    }, {
        "country": "Sweden",
        "city": "Halmstad",
        "code": "HAD",
        "class": "swe",
        "airport": "Halmstad Airport",
        "label": "Halmstad, Sweden (HAD)"
    }, {
        "country": "Sweden",
        "city": "Borlange\/Falun",
        "code": "BLE",
        "class": "swe",
        "airport": "Borlange Airport",
        "label": "Borlange\/Falun, Sweden (BLE)"
    }, {
        "country": "Sweden",
        "city": "Lycksele",
        "code": "LYC",
        "class": "swe",
        "airport": "Lycksele Airport",
        "label": "Lycksele, Sweden (LYC)"
    }, {
        "country": "Sweden",
        "city": "Kramfors",
        "code": "KRF",
        "class": "swe",
        "airport": null,
        "label": "Kramfors, Sweden (KRF)"
    }, {
        "country": "Sweden",
        "city": "Kiruna",
        "code": "KRN",
        "class": "swe",
        "airport": "Kiruna Airport",
        "label": "Kiruna, Sweden (KRN)"
    }, {
        "country": "Sweden",
        "city": "G\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00b6teborg",
        "code": "GSE",
        "class": "swe",
        "airport": "Gothenburg City Airport",
        "label": "G\u00c3\u0192\u00c6\u2019\u00c3\u201a\u00c2\u00b6teborg, Sweden (GSE)"
    }, {
        "country": "Sweden",
        "city": "Lulea",
        "code": "LLA",
        "class": "swe",
        "airport": null,
        "label": "Lulea, Sweden (LLA)"
    }, {
        "country": "Sweden",
        "city": "Vilhelmina",
        "code": "VHM",
        "class": "swe",
        "airport": "Vilhelmina Airport",
        "label": "Vilhelmina, Sweden (VHM)"
    }, {
        "country": "Sweden",
        "city": "Malmo",
        "code": "MMX",
        "class": "swe",
        "airport": null,
        "label": "Malmo, Sweden (MMX)"
    }, {
        "country": "Sweden",
        "city": "Malmo",
        "code": "MMX",
        "class": "swe",
        "airport": null,
        "label": "Malmo, Sweden (MMX)"
    }, {
        "country": "Sweden",
        "city": "Angelholm\/Helsingborg",
        "code": "AGH",
        "class": "swe",
        "airport": null,
        "label": "Angelholm\/Helsingborg, Sweden (AGH)"
    }, {
        "country": "Sweden",
        "city": "Hemavan",
        "code": "HMV",
        "class": "swe",
        "airport": "Hemavan Airport",
        "label": "Hemavan, Sweden (HMV)"
    }, {
        "country": "Sweden",
        "city": "Hemavan",
        "code": "HMV",
        "class": "swe",
        "airport": "Hemavan Airport",
        "label": "Hemavan, Sweden (HMV)"
    }, {
        "country": "Sweden",
        "city": "Hemavan",
        "code": "HMV",
        "class": "swe",
        "airport": "Hemavan Airport",
        "label": "Hemavan, Sweden (HMV)"
    }, {
        "country": "Sweden",
        "city": "Trollhattan",
        "code": "THN",
        "class": "swe",
        "airport": null,
        "label": "Trollhattan, Sweden (THN)"
    }, {
        "country": "Sweden",
        "city": "Kristianstad",
        "code": "KID",
        "class": "swe",
        "airport": "Airport Drakslerov salas Kikinda",
        "label": "Kristianstad, Sweden (KID)"
    }, {
        "country": "Sweden",
        "city": "Torsby",
        "code": "TYF",
        "class": "swe",
        "airport": "Torsby Airport",
        "label": "Torsby, Sweden (TYF)"
    }, {
        "country": "Sweden",
        "city": "Visby",
        "code": "VBY",
        "class": "swe",
        "airport": "Visby Airport",
        "label": "Visby, Sweden (VBY)"
    }, {
        "country": "Sweden",
        "city": "Visby",
        "code": "VBY",
        "class": "swe",
        "airport": "Visby Airport",
        "label": "Visby, Sweden (VBY)"
    }, {
        "country": "Sweden",
        "city": "Gallivare",
        "code": "GEV",
        "class": "swe",
        "airport": null,
        "label": "Gallivare, Sweden (GEV)"
    }, {
        "country": "Sweden",
        "city": "Hagfors",
        "code": "HFS",
        "class": "swe",
        "airport": "Hagfors Airport",
        "label": "Hagfors, Sweden (HFS)"
    }, {
        "country": "Sweden",
        "city": "Pajala",
        "code": "PJA",
        "class": "swe",
        "airport": "Pajala Airport",
        "label": "Pajala, Sweden (PJA)"
    }, {
        "country": "Sweden",
        "city": "Oskarshamn",
        "code": "OSK",
        "class": "swe",
        "airport": "Oskarshamn Airport",
        "label": "Oskarshamn, Sweden (OSK)"
    }, {
        "country": "Sweden",
        "city": "Storuman",
        "code": "SQO",
        "class": "swe",
        "airport": "Storuman Airport",
        "label": "Storuman, Sweden (SQO)"
    }, {
        "country": "Sweden",
        "city": "Jonkoping",
        "code": "JKG",
        "class": "swe",
        "airport": null,
        "label": "Jonkoping, Sweden (JKG)"
    }, {
        "country": "Sweden",
        "city": "Stockholm",
        "code": "BMA",
        "class": "swe",
        "airport": "Stockholm-Bromma Airport",
        "label": "Stockholm, Sweden (BMA)"
    }, {
        "country": "Sweden",
        "city": "Stockholm",
        "code": "BMA",
        "class": "swe",
        "airport": "Stockholm-Bromma Airport",
        "label": "Stockholm, Sweden (BMA)"
    }, {
        "country": "Sweden",
        "city": "Linkoping",
        "code": "LPI",
        "class": "swe",
        "airport": null,
        "label": "Linkoping, Sweden (LPI)"
    }, {
        "country": "Sweden",
        "city": "Norrkoping",
        "code": "NRK",
        "class": "swe",
        "airport": null,
        "label": "Norrkoping, Sweden (NRK)"
    }, {
        "country": "Sweden",
        "city": "Stockholm",
        "code": "VST",
        "class": "swe",
        "airport": null,
        "label": "Stockholm, Sweden (VST)"
    }, {
        "country": "Sweden",
        "city": "Soderhamn",
        "code": "SOO",
        "class": "swe",
        "airport": null,
        "label": "Soderhamn, Sweden (SOO)"
    }, {
        "country": "Sweden",
        "city": "Soderhamn",
        "code": "SOO",
        "class": "swe",
        "airport": null,
        "label": "Soderhamn, Sweden (SOO)"
    }, {
        "country": "Sweden",
        "city": "Stockholm",
        "code": "NYO",
        "class": "swe",
        "airport": "Stockholm Skavsta Airport",
        "label": "Stockholm, Sweden (NYO)"
    }, {
        "country": "Sweden",
        "city": "Stockholm",
        "code": "NYO",
        "class": "swe",
        "airport": "Stockholm Skavsta Airport",
        "label": "Stockholm, Sweden (NYO)"
    }, {
        "country": "Sweden",
        "city": "Sundsvall",
        "code": "SDL",
        "class": "swe",
        "airport": null,
        "label": "Sundsvall, Sweden (SDL)"
    }, {
        "country": "Sweden",
        "city": "Umea",
        "code": "UME",
        "class": "swe",
        "airport": null,
        "label": "Umea, Sweden (UME)"
    }, {
        "country": "Sweden",
        "city": "Stockholm",
        "code": "ARN",
        "class": "swe",
        "airport": "Stockholm-Arlanda Airport",
        "label": "Stockholm, Sweden (ARN)"
    }, {
        "country": "Sweden",
        "city": "Ronneby",
        "code": "RNB",
        "class": "swe",
        "airport": "Ronneby Airport",
        "label": "Ronneby, Sweden (RNB)"
    }, {
        "country": "Sweden",
        "city": "Ronneby",
        "code": "RNB",
        "class": "swe",
        "airport": "Ronneby Airport",
        "label": "Ronneby, Sweden (RNB)"
    }, {
        "country": "Sweden",
        "city": "Hassleholm",
        "code": "XWP",
        "class": "swe",
        "airport": null,
        "label": "Hassleholm, Sweden (XWP)"
    }, {
        "country": "Sweden",
        "city": "Arvidsjaur",
        "code": "AJR",
        "class": "swe",
        "airport": "Arvidsjaur Airport",
        "label": "Arvidsjaur, Sweden (AJR)"
    }, {
        "country": "Sweden",
        "city": "Mora",
        "code": "MXX",
        "class": "swe",
        "airport": "Mora Airport",
        "label": "Mora, Sweden (MXX)"
    }, {
        "country": "Sweden",
        "city": "Karlstad",
        "code": "KSD",
        "class": "swe",
        "airport": "Karlstad Airport",
        "label": "Karlstad, Sweden (KSD)"
    }, {
        "country": "Sweden",
        "city": "Sveg",
        "code": "EVG",
        "class": "swe",
        "airport": "Sveg Airport",
        "label": "Sveg, Sweden (EVG)"
    }, {
        "country": "Switzerland",
        "city": "Bern",
        "code": "BRN",
        "class": "swi",
        "airport": "Bern Belp Airport",
        "label": "Bern, Switzerland (BRN)"
    }, {
        "country": "Switzerland",
        "city": "Basel\/Mulhouse",
        "code": "BSL",
        "class": "swi",
        "airport": "EuroAirport Basel-Mulhouse-Freiburg Airport",
        "label": "Basel\/Mulhouse, Switzerland (BSL)"
    }, {
        "country": "Switzerland",
        "city": "Altenrhein",
        "code": "ACH",
        "class": "swi",
        "airport": "St Gallen Altenrhein Airport",
        "label": "Altenrhein, Switzerland (ACH)"
    }, {
        "country": "Switzerland",
        "city": "Lugano",
        "code": "LUG",
        "class": "swi",
        "airport": "Lugano Airport",
        "label": "Lugano, Switzerland (LUG)"
    }, {
        "country": "Switzerland",
        "city": "Geneva",
        "code": "GVA",
        "class": "swi",
        "airport": "Geneva Cointrin International Airport",
        "label": "Geneva, Switzerland (GVA)"
    }, {
        "country": "Switzerland",
        "city": "Zurich",
        "code": "ZRH",
        "class": "swi",
        "airport": null,
        "label": "Zurich, Switzerland (ZRH)"
    }, {
        "country": "Taiwan",
        "city": "Taipei",
        "code": "TSA",
        "class": "tai",
        "airport": "Taipei Songshan Airport",
        "label": "Taipei, Taiwan (TSA)"
    }, {
        "country": "Taiwan",
        "city": "Hua lien",
        "code": "HUN",
        "class": "tai",
        "airport": "Hualien Airport",
        "label": "Hua lien, Taiwan (HUN)"
    }, {
        "country": "Taiwan",
        "city": "Pingtung",
        "code": "PIF",
        "class": "tai",
        "airport": "Pingtung North Airport",
        "label": "Pingtung, Taiwan (PIF)"
    }, {
        "country": "Taiwan",
        "city": "Makung",
        "code": "MZG",
        "class": "tai",
        "airport": "Makung Airport",
        "label": "Makung, Taiwan (MZG)"
    }, {
        "country": "Taiwan",
        "city": "Tainan",
        "code": "TNN",
        "class": "tai",
        "airport": "Tainan Airport",
        "label": "Tainan, Taiwan (TNN)"
    }, {
        "country": "Taiwan",
        "city": "Nangan",
        "code": "LZN",
        "class": "tai",
        "airport": "Matsu Nangan Airport",
        "label": "Nangan, Taiwan (LZN)"
    }, {
        "country": "Taiwan",
        "city": "Taitung",
        "code": "TTT",
        "class": "tai",
        "airport": "Taitung Airport",
        "label": "Taitung, Taiwan (TTT)"
    }, {
        "country": "Taiwan",
        "city": "Kaohsiung",
        "code": "KHH",
        "class": "tai",
        "airport": "Kaohsiung International Airport",
        "label": "Kaohsiung, Taiwan (KHH)"
    }, {
        "country": "Taiwan",
        "city": "Hengchun",
        "code": "HCN",
        "class": "tai",
        "airport": "Hengchun Airport",
        "label": "Hengchun, Taiwan (HCN)"
    }, {
        "country": "Taiwan",
        "city": "Kinmen",
        "code": "KNH",
        "class": "tai",
        "airport": "Kinmen Airport",
        "label": "Kinmen, Taiwan (KNH)"
    }, {
        "country": "Taiwan",
        "city": "Taichung",
        "code": "RMQ",
        "class": "tai",
        "airport": "Taichung Ching Chuang Kang Airport",
        "label": "Taichung, Taiwan (RMQ)"
    }, {
        "country": "Taiwan",
        "city": "Matsu",
        "code": "MFK",
        "class": "tai",
        "airport": "Matsu Beigan Airport",
        "label": "Matsu, Taiwan (MFK)"
    }, {
        "country": "Taiwan",
        "city": "Taipei",
        "code": "TPE",
        "class": "tai",
        "airport": "Taiwan Taoyuan International Airport",
        "label": "Taipei, Taiwan (TPE)"
    }, {
        "country": "Taiwan",
        "city": "Chiayi",
        "code": "CYI",
        "class": "tai",
        "airport": "Chiayi Airport",
        "label": "Chiayi, Taiwan (CYI)"
    }, {
        "country": "Tajikistan",
        "city": "Dushanbe",
        "code": "DYU",
        "class": "taj",
        "airport": "Dushanbe Airport",
        "label": "Dushanbe, Tajikistan (DYU)"
    }, {
        "country": "Tajikistan",
        "city": "Khujand",
        "code": "LBD",
        "class": "taj",
        "airport": "Khudzhand Airport",
        "label": "Khujand, Tajikistan (LBD)"
    }, {
        "country": "Tanzania",
        "city": "Musoma",
        "code": "MUZ",
        "class": "tan",
        "airport": "Musoma Airport",
        "label": "Musoma, Tanzania (MUZ)"
    }, {
        "country": "Tanzania",
        "city": "Arusha",
        "code": "ARK",
        "class": "tan",
        "airport": "Arusha Airport",
        "label": "Arusha, Tanzania (ARK)"
    }, {
        "country": "Tanzania",
        "city": "Mwanza",
        "code": "MWZ",
        "class": "tan",
        "airport": "Mwanza Airport",
        "label": "Mwanza, Tanzania (MWZ)"
    }, {
        "country": "Tanzania",
        "city": "Dar Es Salaam",
        "code": "DAR",
        "class": "tan",
        "airport": "Mwalimu Julius K. Nyerere International Airport",
        "label": "Dar Es Salaam, Tanzania (DAR)"
    }, {
        "country": "Tanzania",
        "city": "Lindi",
        "code": "LDI",
        "class": "tan",
        "airport": "Kikwetu Airport",
        "label": "Lindi, Tanzania (LDI)"
    }, {
        "country": "Tanzania",
        "city": "Kilimanjaro",
        "code": "JRO",
        "class": "tan",
        "airport": "Kilimanjaro International Airport",
        "label": "Kilimanjaro, Tanzania (JRO)"
    }, {
        "country": "Tanzania",
        "city": "Bukoba",
        "code": "BKZ",
        "class": "tan",
        "airport": "Bukoba Airport",
        "label": "Bukoba, Tanzania (BKZ)"
    }, {
        "country": "Tanzania",
        "city": "Shinyanga",
        "code": "SHY",
        "class": "tan",
        "airport": "Shinyanga Airport",
        "label": "Shinyanga, Tanzania (SHY)"
    }, {
        "country": "Tanzania",
        "city": "Mtwara",
        "code": "MYW",
        "class": "tan",
        "airport": "Mtwara Airport",
        "label": "Mtwara, Tanzania (MYW)"
    }, {
        "country": "Tanzania",
        "city": "Zanzibar",
        "code": "ZNZ",
        "class": "tan",
        "airport": "Zanzibar Airport",
        "label": "Zanzibar, Tanzania (ZNZ)"
    }, {
        "country": "Thailand",
        "city": "Surat Thani",
        "code": "URT",
        "class": "tha",
        "airport": "Surat Thani Airport",
        "label": "Surat Thani, Thailand (URT)"
    }, {
        "country": "Thailand",
        "city": "Nan",
        "code": "NNT",
        "class": "tha",
        "airport": "Nan Airport",
        "label": "Nan, Thailand (NNT)"
    }, {
        "country": "Thailand",
        "city": "Phitsanulok",
        "code": "PHS",
        "class": "tha",
        "airport": "Phitsanulok Airport",
        "label": "Phitsanulok, Thailand (PHS)"
    }, {
        "country": "Thailand",
        "city": "Ranong",
        "code": "UNN",
        "class": "tha",
        "airport": "Ranong Airport",
        "label": "Ranong, Thailand (UNN)"
    }, {
        "country": "Thailand",
        "city": "Pattaya",
        "code": "BKK",
        "class": "tha",
        "airport": "Suvarnabhumi Airport",
        "label": "Pattaya, Thailand  (nearest airport Bangkok, BKK)"
    }, {
        "country": "Thailand",
        "city": "Trat",
        "code": "TDX",
        "class": "tha",
        "airport": "Trat Airport",
        "label": "Trat, Thailand (TDX)"
    }, {
        "country": "Thailand",
        "city": "Trang",
        "code": "TST",
        "class": "tha",
        "airport": "Trang Airport",
        "label": "Trang, Thailand (TST)"
    }, {
        "country": "Thailand",
        "city": "Hua Hin",
        "code": "HHQ",
        "class": "tha",
        "airport": "Hua Hin Airport",
        "label": "Hua Hin, Thailand (HHQ)"
    }, {
        "country": "Thailand",
        "city": "Krabi",
        "code": "KBV",
        "class": "tha",
        "airport": "Krabi Airport",
        "label": "Krabi, Thailand (KBV)"
    }, {
        "country": "Thailand",
        "city": "Phuket",
        "code": "HKT",
        "class": "tha",
        "airport": "Phuket International Airport",
        "label": "Phuket, Thailand (HKT)"
    }, {
        "country": "Thailand",
        "city": "Lampang",
        "code": "LPT",
        "class": "tha",
        "airport": "Lampang Airport",
        "label": "Lampang, Thailand (LPT)"
    }, {
        "country": "Thailand",
        "city": "Narathiwat",
        "code": "NAW",
        "class": "tha",
        "airport": "Narathiwat Airport",
        "label": "Narathiwat, Thailand (NAW)"
    }, {
        "country": "Thailand",
        "city": "Koh Samui",
        "code": "USM",
        "class": "tha",
        "airport": "Samui Airport",
        "label": "Koh Samui, Thailand (USM)"
    }, {
        "country": "Thailand",
        "city": "Hat Yai",
        "code": "HDY",
        "class": "tha",
        "airport": "Hat Yai International Airport",
        "label": "Hat Yai, Thailand (HDY)"
    }, {
        "country": "Thailand",
        "city": "Bangkok",
        "code": "DMK",
        "class": "tha",
        "airport": "Don Mueang International Airport",
        "label": "Bangkok, Thailand - Don Mueang Apt (DMK)"
    }, {
        "country": "Thailand",
        "city": "Khon Kaen",
        "code": "KKC",
        "class": "tha",
        "airport": "Khon Kaen Airport",
        "label": "Khon Kaen, Thailand (KKC)"
    }, {
        "country": "Thailand",
        "city": "Utapao",
        "code": "UTP",
        "class": "tha",
        "airport": "U-Tapao International Airport",
        "label": "Utapao, Thailand (UTP)"
    }, {
        "country": "Thailand",
        "city": "Sukhothai",
        "code": "THS",
        "class": "tha",
        "airport": "Sukhothai Airport",
        "label": "Sukhothai, Thailand (THS)"
    }, {
        "country": "Thailand",
        "city": "Bangkok",
        "code": "BKK",
        "class": "tha",
        "airport": "Suvarnabhumi Airport",
        "label": "Bangkok, Thailand (BKK)"
    }, {
        "country": "Thailand",
        "city": "Mae Hong Son",
        "code": "HGN",
        "class": "tha",
        "airport": "Mae Hong Son Airport",
        "label": "Mae Hong Son, Thailand (HGN)"
    }, {
        "country": "Thailand",
        "city": "Nakorn Panom",
        "code": "KOP",
        "class": "tha",
        "airport": "Nakhon Phanom Airport",
        "label": "Nakorn Panom, Thailand (KOP)"
    }, {
        "country": "Thailand",
        "city": "Chiang Mai",
        "code": "CNX",
        "class": "tha",
        "airport": "Chiang Mai International Airport",
        "label": "Chiang Mai, Thailand (CNX)"
    }, {
        "country": "Thailand",
        "city": "Nakhon Si Thammarat",
        "code": "NST",
        "class": "tha",
        "airport": "Cha Ian Airport",
        "label": "Nakhon Si Thammarat, Thailand (NST)"
    }, {
        "country": "Thailand",
        "city": "Ubon Ratchathani",
        "code": "UBP",
        "class": "tha",
        "airport": "Ubon Ratchathani Airport",
        "label": "Ubon Ratchathani, Thailand (UBP)"
    }, {
        "country": "Thailand",
        "city": "Sakon Nakhon",
        "code": "SNO",
        "class": "tha",
        "airport": "Sakon Nakhon Airport",
        "label": "Sakon Nakhon, Thailand (SNO)"
    }, {
        "country": "Thailand",
        "city": "Udon Thani",
        "code": "UTH",
        "class": "tha",
        "airport": "Udon Thani Airport",
        "label": "Udon Thani, Thailand (UTH)"
    }, {
        "country": "Thailand",
        "city": "Chiang Rai",
        "code": "CEI",
        "class": "tha",
        "airport": "Chiang Rai International Airport",
        "label": "Chiang Rai, Thailand (CEI)"
    }, {
        "country": "Thailand",
        "city": "Roi Et",
        "code": "ROI",
        "class": "tha",
        "airport": "Roi Et Airport",
        "label": "Roi Et, Thailand (ROI)"
    }, {
        "country": "Thailand",
        "city": "Buri Ram",
        "code": "BFV",
        "class": "tha",
        "airport": "Buri Ram Airport",
        "label": "Buri Ram, Thailand (BFV)"
    }, {
        "country": "The Gambia",
        "city": "Banjul",
        "code": "BJL",
        "class": "the",
        "airport": "Banjul International Airport",
        "label": "Banjul, The Gambia (BJL)"
    }, {
        "country": "Togo",
        "city": "Lome",
        "code": "LFW",
        "class": "tog",
        "airport": null,
        "label": "Lome, Togo (LFW)"
    }, {
        "country": "Tonga",
        "city": "Eua",
        "code": "EUA",
        "class": "ton",
        "airport": "Kaufana Airport",
        "label": "Eua, Tonga (EUA)"
    }, {
        "country": "Tonga",
        "city": "Niuatoputapu",
        "code": "NTT",
        "class": "ton",
        "airport": "Kuini Lavenia Airport",
        "label": "Niuatoputapu, Tonga (NTT)"
    }, {
        "country": "Tonga",
        "city": "Nuku'Alofa",
        "code": "TBU",
        "class": "ton",
        "airport": null,
        "label": "Nuku'Alofa, Tonga (TBU)"
    }, {
        "country": "Tonga",
        "city": "Ha'Apai",
        "code": "HPA",
        "class": "ton",
        "airport": "Lifuka Island Airport",
        "label": "Ha'Apai, Tonga (HPA)"
    }, {
        "country": "Tonga",
        "city": "Vava'u",
        "code": "VAV",
        "class": "ton",
        "airport": "Vava'u International Airport",
        "label": "Vava'u, Tonga (VAV)"
    }, {
        "country": "Tonga",
        "city": "Niuafo'ou",
        "code": "NFO",
        "class": "ton",
        "airport": "Mata'aho Airport",
        "label": "Niuafo'ou, Tonga (NFO)"
    }, {
        "country": "Trinidad",
        "city": "Piarco\/Port of Spain",
        "code": "POS",
        "class": "tri",
        "airport": "Piarco International Airport",
        "label": "Piarco\/Port of Spain, Trinidad (POS)"
    }, {
        "country": "Trinidad and Tobago",
        "city": "Tobago",
        "code": "TAB",
        "class": "tri",
        "airport": "Tobago-Crown Point Airport",
        "label": "Tobago, Trinidad and Tobago (TAB)"
    }, {
        "country": "Tunisia",
        "city": "Tozeur",
        "code": "TOE",
        "class": "tun",
        "airport": "Tozeur Nefta International Airport",
        "label": "Tozeur, Tunisia (TOE)"
    }, {
        "country": "Tunisia",
        "city": "Djerba",
        "code": "DJE",
        "class": "tun",
        "airport": "Djerba Zarzis International Airport",
        "label": "Djerba, Tunisia (DJE)"
    }, {
        "country": "Tunisia",
        "city": "Gafsa",
        "code": "GAF",
        "class": "tun",
        "airport": "Gafsa Ksar International Airport",
        "label": "Gafsa, Tunisia (GAF)"
    }, {
        "country": "Tunisia",
        "city": "Tunis",
        "code": "TUN",
        "class": "tun",
        "airport": "Tunis Carthage International Airport",
        "label": "Tunis, Tunisia (TUN)"
    }, {
        "country": "Tunisia",
        "city": "Sfax",
        "code": "SFA",
        "class": "tun",
        "airport": "Sfax Thyna International Airport",
        "label": "Sfax, Tunisia (SFA)"
    }, {
        "country": "Tunisia",
        "city": "Monastir",
        "code": "MIR",
        "class": "tun",
        "airport": "Monastir Habib Bourguiba International Airport",
        "label": "Monastir, Tunisia (MIR)"
    }, {
        "country": "Turkey",
        "city": "Dalaman",
        "code": "DLM",
        "class": "tur",
        "airport": "Dalaman International Airport",
        "label": "Dalaman, Turkey (DLM)"
    }, {
        "country": "Turkey",
        "city": "Ankara",
        "code": "ESB",
        "class": "tur",
        "airport": "Esenbo?a International Airport",
        "label": "Ankara, Turkey (ESB)"
    }, {
        "country": "Turkey",
        "city": "Antalya",
        "code": "AYT",
        "class": "tur",
        "airport": "Antalya International Airport",
        "label": "Antalya, Turkey (AYT)"
    }, {
        "country": "Turkey",
        "city": "Mus",
        "code": "MSR",
        "class": "tur",
        "airport": "Mu? Airport",
        "label": "Mus, Turkey (MSR)"
    }, {
        "country": "Turkey",
        "city": "Istanbul",
        "code": "IST",
        "class": "tur",
        "airport": null,
        "label": "Istanbul, Turkey (IST)"
    }, {
        "country": "Turkey",
        "city": "Kahramanmaras",
        "code": "KCM",
        "class": "tur",
        "airport": "Kahramanmara? Airport",
        "label": "Kahramanmaras, Turkey (KCM)"
    }, {
        "country": "Turkey",
        "city": "Edremit\/Korfez",
        "code": "EDO",
        "class": "tur",
        "airport": null,
        "label": "Edremit\/Korfez, Turkey (EDO)"
    }, {
        "country": "Turkey",
        "city": "Konya",
        "code": "KYA",
        "class": "tur",
        "airport": "Konya Airport",
        "label": "Konya, Turkey (KYA)"
    }, {
        "country": "Turkey",
        "city": "Usak",
        "code": "USQ",
        "class": "tur",
        "airport": "U?ak Airport",
        "label": "Usak, Turkey (USQ)"
    }, {
        "country": "Turkey",
        "city": "Malatya",
        "code": "MLX",
        "class": "tur",
        "airport": null,
        "label": "Malatya, Turkey (MLX)"
    }, {
        "country": "Turkey",
        "city": "Canakkale",
        "code": "CKZ",
        "class": "tur",
        "airport": null,
        "label": "Canakkale, Turkey (CKZ)"
    }, {
        "country": "Turkey",
        "city": "Istanbul",
        "code": "SAW",
        "class": "tur",
        "airport": null,
        "label": "Istanbul, Turkey - Sabiha Gokcen (SAW)"
    }, {
        "country": "Turkey",
        "city": "Elazig",
        "code": "EZS",
        "class": "tur",
        "airport": "Elaz?? Airport",
        "label": "Elazig, Turkey (EZS)"
    }, {
        "country": "Turkey",
        "city": "Diyarbakir",
        "code": "DIY",
        "class": "tur",
        "airport": "Diyarbakir Airport",
        "label": "Diyarbakir, Turkey (DIY)"
    }, {
        "country": "Turkey",
        "city": "Van",
        "code": "VAN",
        "class": "tur",
        "airport": "Van Ferit Melen Airport",
        "label": "Van, Turkey (VAN)"
    }, {
        "country": "Turkey",
        "city": "Sivas",
        "code": "VAS",
        "class": "tur",
        "airport": "Sivas Airport",
        "label": "Sivas, Turkey (VAS)"
    }, {
        "country": "Turkey",
        "city": "Eskisehir",
        "code": "AOE",
        "class": "tur",
        "airport": "Anadolu University Airport",
        "label": "Eskisehir, Turkey (AOE)"
    }, {
        "country": "Turkey",
        "city": "Gaziantep",
        "code": "GZT",
        "class": "tur",
        "airport": "Gaziantep International Airport",
        "label": "Gaziantep, Turkey (GZT)"
    }, {
        "country": "Turkey",
        "city": "Batman",
        "code": "BAL",
        "class": "tur",
        "airport": "Batman Airport",
        "label": "Batman, Turkey (BAL)"
    }, {
        "country": "Turkey",
        "city": "Erzurum",
        "code": "ERZ",
        "class": "tur",
        "airport": "Erzurum International Airport",
        "label": "Erzurum, Turkey (ERZ)"
    }, {
        "country": "Turkey",
        "city": "Erzincan",
        "code": "ERC",
        "class": "tur",
        "airport": "Erzincan Airport",
        "label": "Erzincan, Turkey (ERC)"
    }, {
        "country": "Turkey",
        "city": "Samsun",
        "code": "SZF",
        "class": "tur",
        "airport": null,
        "label": "Samsun, Turkey (SZF)"
    }, {
        "country": "Turkey",
        "city": "Mardin",
        "code": "MQM",
        "class": "tur",
        "airport": "Mardin Airport",
        "label": "Mardin, Turkey (MQM)"
    }, {
        "country": "Turkey",
        "city": "Denizli",
        "code": "DNZ",
        "class": "tur",
        "airport": null,
        "label": "Denizli, Turkey (DNZ)"
    }, {
        "country": "Turkey",
        "city": "Adiyaman",
        "code": "ADF",
        "class": "tur",
        "airport": "Ad?yaman Airport",
        "label": "Adiyaman, Turkey (ADF)"
    }, {
        "country": "Turkey",
        "city": "Adana",
        "code": "ADA",
        "class": "tur",
        "airport": "Adana Airport",
        "label": "Adana, Turkey (ADA)"
    }, {
        "country": "Turkey",
        "city": "Kayseri",
        "code": "ASR",
        "class": "tur",
        "airport": "Kayseri Erkilet Airport",
        "label": "Kayseri, Turkey (ASR)"
    }, {
        "country": "Turkey",
        "city": "Trabzon",
        "code": "TZX",
        "class": "tur",
        "airport": "Trabzon International Airport",
        "label": "Trabzon, Turkey (TZX)"
    }, {
        "country": "Turkey",
        "city": "Izmir",
        "code": "ADB",
        "class": "tur",
        "airport": "Adnan Menderes International Airport",
        "label": "Izmir, Turkey (ADB)"
    }, {
        "country": "Turkey",
        "city": "Izmir",
        "code": "ADB",
        "class": "tur",
        "airport": "Adnan Menderes International Airport",
        "label": "Izmir, Turkey (ADB)"
    }, {
        "country": "Turkey",
        "city": "Bursa",
        "code": "YEI",
        "class": "tur",
        "airport": "Bursa Yeni?ehir Airport",
        "label": "Bursa, Turkey (YEI)"
    }, {
        "country": "Turkey",
        "city": "Nevsehir",
        "code": "NAV",
        "class": "tur",
        "airport": "Nev?ehir Kapadokya International Airport",
        "label": "Nevsehir, Turkey (NAV)"
    }, {
        "country": "Turkey",
        "city": "Kars",
        "code": "KSY",
        "class": "tur",
        "airport": "Kars Airport",
        "label": "Kars, Turkey (KSY)"
    }, {
        "country": "Turkmenistan",
        "city": "Ashgabat",
        "code": "ASB",
        "class": "tur",
        "airport": "Ashgabat Airport",
        "label": "Ashgabat, Turkmenistan (ASB)"
    }, {
        "country": "Tuvalu",
        "city": "Funafuti Atol",
        "code": "FUN",
        "class": "tuv",
        "airport": "Funafuti International Airport",
        "label": "Funafuti Atol, Tuvalu (FUN)"
    }, {
        "country": "UAE",
        "city": "Al Ain",
        "code": "AAN",
        "class": "uae",
        "airport": "Al Ain International Airport",
        "label": "Al Ain, UAE (AAN)"
    }, {
        "country": "UAE",
        "city": "Dubai",
        "code": "DXB",
        "class": "uae",
        "airport": "Dubai International Airport",
        "label": "Dubai, UAE (DXB)"
    }, {
        "country": "UAE",
        "city": "Ras Al Khaimah",
        "code": "RKT",
        "class": "uae",
        "airport": "Ras Al Khaimah International Airport",
        "label": "Ras Al Khaimah, UAE (RKT)"
    }, {
        "country": "UAE",
        "city": "Sharjah",
        "code": "SHJ",
        "class": "uae",
        "airport": "Sharjah International Airport",
        "label": "Sharjah, UAE (SHJ)"
    }, {
        "country": "UAE",
        "city": "Abu Dhabi",
        "code": "AUH",
        "class": "uae",
        "airport": "Abu Dhabi International Airport",
        "label": "Abu Dhabi, UAE (AUH)"
    }, {
        "country": "UK",
        "city": "Inverness",
        "code": "INV",
        "class": "uk",
        "airport": "Inverness Airport",
        "label": "Inverness, UK (INV)"
    }, {
        "country": "UK",
        "city": "Manchester",
        "code": "MAN",
        "class": "uk",
        "airport": "Manchester Airport",
        "label": "Manchester, UK (MAN)"
    }, {
        "country": "UK",
        "city": "Gloucester",
        "code": "GLO",
        "class": "uk",
        "airport": "Gloucestershire Airport",
        "label": "Gloucester, UK (GLO)"
    }, {
        "country": "UK",
        "city": "Oxford",
        "code": "OXF",
        "class": "uk",
        "airport": "Oxford (Kidlington) Airport",
        "label": "Oxford, UK (OXF)"
    }, {
        "country": "UK",
        "city": "Swansea",
        "code": "SWS",
        "class": "uk",
        "airport": "Swansea Airport",
        "label": "Swansea, UK (SWS)"
    }, {
        "country": "UK",
        "city": "London",
        "code": "LGW",
        "class": "uk",
        "airport": "London Gatwick Airport",
        "label": "London, UK - Gatwick Airport (LGW)"
    }, {
        "country": "UK",
        "city": "Nottingham",
        "code": "EMA",
        "class": "uk",
        "airport": "East Midlands Airport",
        "label": "Nottingham, UK (EMA)"
    }, {
        "country": "UK",
        "city": "London",
        "code": "LCY",
        "class": "uk",
        "airport": "London City Airport",
        "label": "London, UK - City Airport (LCY)"
    }, {
        "country": "UK",
        "city": "Blackpool",
        "code": "BLK",
        "class": "uk",
        "airport": "Blackpool International Airport",
        "label": "Blackpool, UK (BLK)"
    }, {
        "country": "UK",
        "city": "Glasgow",
        "code": "GLA",
        "class": "uk",
        "airport": "Glasgow International Airport",
        "label": "Glasgow, UK (GLA)"
    }, {
        "country": "UK",
        "city": "Jersey",
        "code": "JER",
        "class": "uk",
        "airport": "Jersey Airport",
        "label": "Jersey, UK (JER)"
    }, {
        "country": "UK",
        "city": "Glasgow",
        "code": "PIK",
        "class": "uk",
        "airport": "Glasgow Prestwick Airport",
        "label": "Glasgow, UK (PIK)"
    }, {
        "country": "UK",
        "city": "Glasgow",
        "code": "PIK",
        "class": "uk",
        "airport": "Glasgow Prestwick Airport",
        "label": "Glasgow, UK (PIK)"
    }, {
        "country": "UK",
        "city": "Cambridge",
        "code": "CBG",
        "class": "uk",
        "airport": "Cambridge Airport",
        "label": "Cambridge, UK (CBG)"
    }, {
        "country": "UK",
        "city": "Carlisle",
        "code": "CAX",
        "class": "uk",
        "airport": "Carlisle Airport",
        "label": "Carlisle, UK (CAX)"
    }, {
        "country": "UK",
        "city": "Bristol",
        "code": "BRS",
        "class": "uk",
        "airport": "Bristol International Airport",
        "label": "Bristol, UK (BRS)"
    }, {
        "country": "UK",
        "city": "Alderney",
        "code": "ACI",
        "class": "uk",
        "airport": "Alderney Airport",
        "label": "Alderney, UK (ACI)"
    }, {
        "country": "UK",
        "city": "Leeds",
        "code": "LBA",
        "class": "uk",
        "airport": "Leeds Bradford Airport",
        "label": "Leeds, UK (LBA)"
    }, {
        "country": "UK",
        "city": "Brize Norton",
        "code": "BZZ",
        "class": "uk",
        "airport": "RAF Brize Norton",
        "label": "Brize Norton, UK (BZZ)"
    }, {
        "country": "UK",
        "city": "Coventry",
        "code": "CVT",
        "class": "uk",
        "airport": "Coventry Airport",
        "label": "Coventry, UK (CVT)"
    }, {
        "country": "UK",
        "city": "Holyhead",
        "code": "HLY",
        "class": "uk",
        "airport": "Anglesey Airport",
        "label": "Holyhead, UK (HLY)"
    }, {
        "country": "UK",
        "city": "Islay",
        "code": "ILY",
        "class": "uk",
        "airport": "Islay Airport",
        "label": "Islay, UK (ILY)"
    }, {
        "country": "UK",
        "city": "Edinburgh",
        "code": "EDI",
        "class": "uk",
        "airport": "Edinburgh Airport",
        "label": "Edinburgh, UK (EDI)"
    }, {
        "country": "UK",
        "city": "Belfast",
        "code": "BHD",
        "class": "uk",
        "airport": "George Best Belfast City Airport",
        "label": "Belfast, UK (BHD)"
    }, {
        "country": "UK",
        "city": "Chester",
        "code": "CEG",
        "class": "uk",
        "airport": "Hawarden Airport",
        "label": "Chester, UK (CEG)"
    }, {
        "country": "UK",
        "city": "Chester",
        "code": "CEG",
        "class": "uk",
        "airport": "Hawarden Airport",
        "label": "Chester, UK (CEG)"
    }, {
        "country": "UK",
        "city": "Exeter",
        "code": "EXT",
        "class": "uk",
        "airport": "Exeter International Airport",
        "label": "Exeter, UK (EXT)"
    }, {
        "country": "UK",
        "city": "Barra",
        "code": "BRR",
        "class": "uk",
        "airport": "Barra Airport",
        "label": "Barra, UK (BRR)"
    }, {
        "country": "UK",
        "city": "Benbecula",
        "code": "BEB",
        "class": "uk",
        "airport": "Benbecula Airport",
        "label": "Benbecula, UK (BEB)"
    }, {
        "country": "UK",
        "city": "Harrogate",
        "code": "HRT",
        "class": "uk",
        "airport": "RAF Linton-On-Ouse",
        "label": "Harrogate, UK (HRT)"
    }, {
        "country": "UK",
        "city": "Harrogate",
        "code": "HRT",
        "class": "uk",
        "airport": "RAF Linton-On-Ouse",
        "label": "Harrogate, UK (HRT)"
    }, {
        "country": "UK",
        "city": "Cardiff",
        "code": "CWL",
        "class": "uk",
        "airport": "Cardiff International Airport",
        "label": "Cardiff, UK (CWL)"
    }, {
        "country": "UK",
        "city": "Liverpool",
        "code": "LPL",
        "class": "uk",
        "airport": "Liverpool John Lennon Airport",
        "label": "Liverpool, UK (LPL)"
    }, {
        "country": "UK",
        "city": "Isle Of Man",
        "code": "IOM",
        "class": "uk",
        "airport": "Isle of Man Airport",
        "label": "Isle Of Man, UK (IOM)"
    }, {
        "country": "UK",
        "city": "Kirkwall",
        "code": "KOI",
        "class": "uk",
        "airport": "Kirkwall Airport",
        "label": "Kirkwall, UK (KOI)"
    }, {
        "country": "UK",
        "city": "Barrow in Furness",
        "code": "BWF",
        "class": "uk",
        "airport": "Barrow Walney Island Airport",
        "label": "Barrow in Furness, UK (BWF)"
    }, {
        "country": "UK",
        "city": "Norwich",
        "code": "NWI",
        "class": "uk",
        "airport": "Norwich International Airport",
        "label": "Norwich, UK (NWI)"
    }, {
        "country": "UK",
        "city": "Plymouth",
        "code": "PLH",
        "class": "uk",
        "airport": "Plymouth City Airport",
        "label": "Plymouth, UK (PLH)"
    }, {
        "country": "UK",
        "city": "London",
        "code": "STN",
        "class": "uk",
        "airport": "London Stansted Airport",
        "label": "London, UK - Stansted Airport (STN)"
    }, {
        "country": "UK",
        "city": "Teesside",
        "code": "MME",
        "class": "uk",
        "airport": "Durham Tees Valley Airport",
        "label": "Teesside, UK (MME)"
    }, {
        "country": "UK",
        "city": "Shetland Islands",
        "code": "LSI",
        "class": "uk",
        "airport": "Sumburgh Airport",
        "label": "Shetland Islands, UK (LSI)"
    }, {
        "country": "UK",
        "city": "Southend",
        "code": "SEN",
        "class": "uk",
        "airport": "Southend Airport",
        "label": "Southend, UK (SEN)"
    }, {
        "country": "UK",
        "city": "Bournemouth",
        "code": "BOH",
        "class": "uk",
        "airport": "Bournemouth Airport",
        "label": "Bournemouth, UK (BOH)"
    }, {
        "country": "UK",
        "city": "Londonderry",
        "code": "LDY",
        "class": "uk",
        "airport": "City of Derry Airport",
        "label": "Londonderry, UK (LDY)"
    }, {
        "country": "UK",
        "city": "Stornoway",
        "code": "SYY",
        "class": "uk",
        "airport": "Stornoway Airport",
        "label": "Stornoway, UK (SYY)"
    }, {
        "country": "UK",
        "city": "Belfast",
        "code": "BFS",
        "class": "uk",
        "airport": "Belfast International Airport",
        "label": "Belfast, UK (BFS)"
    }, {
        "country": "UK",
        "city": "Southampton",
        "code": "SOU",
        "class": "uk",
        "airport": "Southampton Airport",
        "label": "Southampton, UK (SOU)"
    }, {
        "country": "UK",
        "city": "Southampton",
        "code": "SOU",
        "class": "uk",
        "airport": "Southampton Airport",
        "label": "Southampton, UK (SOU)"
    }, {
        "country": "UK",
        "city": "Grimsby",
        "code": "GSY",
        "class": "uk",
        "airport": "Binbrook Airfield",
        "label": "Grimsby, UK (GSY)"
    }, {
        "country": "UK",
        "city": "Grimsby",
        "code": "GSY",
        "class": "uk",
        "airport": "Binbrook Airfield",
        "label": "Grimsby, UK (GSY)"
    }, {
        "country": "UK",
        "city": "London",
        "code": "LHR",
        "class": "uk",
        "airport": "London Heathrow Airport",
        "label": "London, UK - Heathrow Airport (LHR)"
    }, {
        "country": "UK",
        "city": "Dundee",
        "code": "DND",
        "class": "uk",
        "airport": "Dundee Airport",
        "label": "Dundee, UK (DND)"
    }, {
        "country": "UK",
        "city": "Tiree",
        "code": "TRE",
        "class": "uk",
        "airport": "Tiree Airport",
        "label": "Tiree, UK (TRE)"
    }, {
        "country": "UK",
        "city": "Penzance",
        "code": "PZE",
        "class": "uk",
        "airport": "Penzance Heliport",
        "label": "Penzance, UK (PZE)"
    }, {
        "country": "UK",
        "city": "Penzance",
        "code": "PZE",
        "class": "uk",
        "airport": "Penzance Heliport",
        "label": "Penzance, UK (PZE)"
    }, {
        "country": "UK",
        "city": "Filton",
        "code": "FZO",
        "class": "uk",
        "airport": "Bristol Filton Airport",
        "label": "Filton, UK (FZO)"
    }, {
        "country": "UK",
        "city": "Newcastle",
        "code": "NCL",
        "class": "uk",
        "airport": "Newcastle Airport",
        "label": "Newcastle, UK (NCL)"
    }, {
        "country": "UK",
        "city": "Newquay",
        "code": "NQY",
        "class": "uk",
        "airport": "Newquay Cornwall Airport",
        "label": "Newquay, UK (NQY)"
    }, {
        "country": "UK",
        "city": "St Andrews",
        "code": "ADX",
        "class": "uk",
        "airport": "RAF Leuchars",
        "label": "St Andrews, UK (ADX)"
    }, {
        "country": "UK",
        "city": "London",
        "code": "LTN",
        "class": "uk",
        "airport": "London Luton Airport",
        "label": "London, UK - Luton Airport (LTN)"
    }, {
        "country": "UK",
        "city": "Humberside",
        "code": "HUY",
        "class": "uk",
        "airport": "Humberside Airport",
        "label": "Humberside, UK (HUY)"
    }, {
        "country": "UK",
        "city": "Farnborough",
        "code": "FAB",
        "class": "uk",
        "airport": "Farnborough Airport",
        "label": "Farnborough, UK (FAB)"
    }, {
        "country": "UK",
        "city": "Campbeltown",
        "code": "CAL",
        "class": "uk",
        "airport": "Campbeltown Airport",
        "label": "Campbeltown, UK (CAL)"
    }, {
        "country": "UK",
        "city": "Birmingham",
        "code": "BHX",
        "class": "uk",
        "airport": "Birmingham International Airport",
        "label": "Birmingham, UK (BHX)"
    }, {
        "country": "UK",
        "city": "Aberdeen",
        "code": "ABZ",
        "class": "uk",
        "airport": "Aberdeen Dyce Airport",
        "label": "Aberdeen, UK (ABZ)"
    }, {
        "country": "UK",
        "city": "Doncaster",
        "code": "DSA",
        "class": "uk",
        "airport": "Robin Hood Doncaster Sheffield Airport",
        "label": "Doncaster, UK (DSA)"
    }, {
        "country": "UK",
        "city": "Doncaster",
        "code": "DSA",
        "class": "uk",
        "airport": "Robin Hood Doncaster Sheffield Airport",
        "label": "Doncaster, UK (DSA)"
    }, {
        "country": "UK",
        "city": "Guernsey",
        "code": "GCI",
        "class": "uk",
        "airport": "Guernsey Airport",
        "label": "Guernsey, UK (GCI)"
    }, {
        "country": "UK",
        "city": "Guernsey",
        "code": "GCI",
        "class": "uk",
        "airport": "Guernsey Airport",
        "label": "Guernsey, UK (GCI)"
    }, {
        "country": "UK",
        "city": "Northampton",
        "code": "ORM",
        "class": "uk",
        "airport": "Sywell Aerodrome",
        "label": "Northampton, UK (ORM)"
    }, {
        "country": "US",
        "city": "San Luis Obispo",
        "code": "SBP",
        "class": "us",
        "airport": "San Luis County Regional Airport",
        "label": "San Luis Obispo, US (SBP)"
    }, {
        "country": "US",
        "city": "Waco",
        "code": "ACT",
        "class": "us",
        "airport": "Waco Regional Airport",
        "label": "Waco, US (ACT)"
    }, {
        "country": "US",
        "city": "Bradford",
        "code": "BFD",
        "class": "us",
        "airport": "Bradford Regional Airport",
        "label": "Bradford, US (BFD)"
    }, {
        "country": "US",
        "city": "Bradford",
        "code": "BFD",
        "class": "us",
        "airport": "Bradford Regional Airport",
        "label": "Bradford, US (BFD)"
    }, {
        "country": "US",
        "city": "Bradford",
        "code": "BFD",
        "class": "us",
        "airport": "Bradford Regional Airport",
        "label": "Bradford, US (BFD)"
    }, {
        "country": "US",
        "city": "Bradford",
        "code": "BFD",
        "class": "us",
        "airport": "Bradford Regional Airport",
        "label": "Bradford, US (BFD)"
    }, {
        "country": "US",
        "city": "Salisbury-Ocean City",
        "code": "SBY",
        "class": "us",
        "airport": "Salisbury Ocean City Wicomico Regional Airport",
        "label": "Salisbury-Ocean City, US (SBY)"
    }, {
        "country": "US",
        "city": "Salisbury-Ocean City",
        "code": "SBY",
        "class": "us",
        "airport": "Salisbury Ocean City Wicomico Regional Airport",
        "label": "Salisbury-Ocean City, US (SBY)"
    }, {
        "country": "US",
        "city": "Dubois",
        "code": "DUJ",
        "class": "us",
        "airport": "DuBois Regional Airport",
        "label": "Dubois, US (DUJ)"
    }, {
        "country": "US",
        "city": "Sand Point",
        "code": "SDP",
        "class": "us",
        "airport": "Sand Point Airport",
        "label": "Sand Point, US (SDP)"
    }, {
        "country": "US",
        "city": "San Antonio",
        "code": "SAT",
        "class": "us",
        "airport": "San Antonio International Airport",
        "label": "San Antonio, US (SAT)"
    }, {
        "country": "US",
        "city": "Toledo",
        "code": "TOL",
        "class": "us",
        "airport": "Toledo Express Airport",
        "label": "Toledo, US (TOL)"
    }, {
        "country": "US",
        "city": "Santa Ana",
        "code": "SNA",
        "class": "us",
        "airport": "John Wayne Airport-Orange County Airport",
        "label": "Santa Ana, US (SNA)"
    }, {
        "country": "US",
        "city": "Bradenton\/Sarasota",
        "code": "SRQ",
        "class": "us",
        "airport": "Sarasota Bradenton International Airport",
        "label": "Bradenton\/Sarasota, US (SRQ)"
    }, {
        "country": "US",
        "city": "Bradenton\/Sarasota",
        "code": "SRQ",
        "class": "us",
        "airport": "Sarasota Bradenton International Airport",
        "label": "Bradenton\/Sarasota, US (SRQ)"
    }, {
        "country": "US",
        "city": "San Angelo",
        "code": "SJT",
        "class": "us",
        "airport": "San Angelo Regional Mathis Field",
        "label": "San Angelo, US (SJT)"
    }, {
        "country": "US",
        "city": "Santa Maria",
        "code": "SMX",
        "class": "us",
        "airport": "Santa Maria Pub\/Capt G Allan Hancock Field",
        "label": "Santa Maria, US (SMX)"
    }, {
        "country": "US",
        "city": "Dubuque",
        "code": "DBQ",
        "class": "us",
        "airport": "Dubuque Regional Airport",
        "label": "Dubuque, US (DBQ)"
    }, {
        "country": "US",
        "city": "Houston",
        "code": "IAH",
        "class": "us",
        "airport": "George Bush Intercontinental Houston Airport",
        "label": "Houston, US (IAH)"
    }, {
        "country": "US",
        "city": "Duluth",
        "code": "DLH",
        "class": "us",
        "airport": "Duluth International Airport",
        "label": "Duluth, US (DLH)"
    }, {
        "country": "US",
        "city": "Sanford",
        "code": "SFB",
        "class": "us",
        "airport": "Orlando Sanford International Airport",
        "label": "Sanford, US (SFB)"
    }, {
        "country": "US",
        "city": "Houston",
        "code": "HOU",
        "class": "us",
        "airport": "William P Hobby Airport",
        "label": "Houston, US - All Airports (HOU)"
    }, {
        "country": "US",
        "city": "Wilmington",
        "code": "ILM",
        "class": "us",
        "airport": "Wilmington International Airport",
        "label": "Wilmington, US (ILM)"
    }, {
        "country": "US",
        "city": "Wainwright",
        "code": "AIN",
        "class": "us",
        "airport": "Wainwright Airport",
        "label": "Wainwright, US (AIN)"
    }, {
        "country": "US",
        "city": "Tok",
        "code": "TKJ",
        "class": "us",
        "airport": "Tok Airport",
        "label": "Tok, US (TKJ)"
    }, {
        "country": "US",
        "city": "Togiak Village",
        "code": "TOG",
        "class": "us",
        "airport": "Togiak Airport",
        "label": "Togiak Village, US (TOG)"
    }, {
        "country": "US",
        "city": "Togiak Village",
        "code": "TOG",
        "class": "us",
        "airport": "Togiak Airport",
        "label": "Togiak Village, US (TOG)"
    }, {
        "country": "US",
        "city": "Westchester County",
        "code": "HPN",
        "class": "us",
        "airport": "Westchester County Airport",
        "label": "Westchester County, US (HPN)"
    }, {
        "country": "US",
        "city": "Salt Lake City",
        "code": "SLC",
        "class": "us",
        "airport": "Salt Lake City International Airport",
        "label": "Salt Lake City, US (SLC)"
    }, {
        "country": "US",
        "city": "Salt Lake City",
        "code": "SLC",
        "class": "us",
        "airport": "Salt Lake City International Airport",
        "label": "Salt Lake City, US (SLC)"
    }, {
        "country": "US",
        "city": "Santa Barbara",
        "code": "SBA",
        "class": "us",
        "airport": "Santa Barbara Municipal Airport",
        "label": "Santa Barbara, US (SBA)"
    }, {
        "country": "US",
        "city": "Vail\/Eagle",
        "code": "EGE",
        "class": "us",
        "airport": "Eagle County Regional Airport",
        "label": "Vail\/Eagle, US (EGE)"
    }, {
        "country": "US",
        "city": "Vail\/Eagle",
        "code": "EGE",
        "class": "us",
        "airport": "Eagle County Regional Airport",
        "label": "Vail\/Eagle, US (EGE)"
    }, {
        "country": "US",
        "city": "Atlanta",
        "code": "ATL",
        "class": "us",
        "airport": "Hartsfield Jackson Atlanta International Airport",
        "label": "Atlanta, US (ATL)"
    }, {
        "country": "US",
        "city": "Atlanta",
        "code": "ATL",
        "class": "us",
        "airport": "Hartsfield Jackson Atlanta International Airport",
        "label": "Atlanta, US (ATL)"
    }, {
        "country": "US",
        "city": "Burbank",
        "code": "BUR",
        "class": "us",
        "airport": "Bob Hope Airport",
        "label": "Burbank, US (BUR)"
    }, {
        "country": "US",
        "city": "Decatur",
        "code": "DEC",
        "class": "us",
        "airport": "Decatur Airport",
        "label": "Decatur, US (DEC)"
    }, {
        "country": "US",
        "city": "Decatur",
        "code": "DEC",
        "class": "us",
        "airport": "Decatur Airport",
        "label": "Decatur, US (DEC)"
    }, {
        "country": "US",
        "city": "Decatur",
        "code": "DEC",
        "class": "us",
        "airport": "Decatur Airport",
        "label": "Decatur, US (DEC)"
    }, {
        "country": "US",
        "city": "Decatur",
        "code": "DEC",
        "class": "us",
        "airport": "Decatur Airport",
        "label": "Decatur, US (DEC)"
    }, {
        "country": "US",
        "city": "Decatur",
        "code": "DEC",
        "class": "us",
        "airport": "Decatur Airport",
        "label": "Decatur, US (DEC)"
    }, {
        "country": "US",
        "city": "Decatur",
        "code": "DEC",
        "class": "us",
        "airport": "Decatur Airport",
        "label": "Decatur, US (DEC)"
    }, {
        "country": "US",
        "city": "Melbourne",
        "code": "MLB",
        "class": "us",
        "airport": "Melbourne International Airport",
        "label": "Melbourne, US (MLB)"
    }, {
        "country": "US",
        "city": "Boston",
        "code": "BOS",
        "class": "us",
        "airport": "General Edward Lawrence Logan International Airport",
        "label": "Boston, US (BOS)"
    }, {
        "country": "US",
        "city": "Boston",
        "code": "BOS",
        "class": "us",
        "airport": "General Edward Lawrence Logan International Airport",
        "label": "Boston, US (BOS)"
    }, {
        "country": "US",
        "city": "Syracuse",
        "code": "SYR",
        "class": "us",
        "airport": "Syracuse Hancock International Airport",
        "label": "Syracuse, US (SYR)"
    }, {
        "country": "US",
        "city": "Cedar Rapids",
        "code": "CID",
        "class": "us",
        "airport": "The Eastern Iowa Airport",
        "label": "Cedar Rapids, US (CID)"
    }, {
        "country": "US",
        "city": "Dillingham",
        "code": "DLG",
        "class": "us",
        "airport": "Dillingham Airport",
        "label": "Dillingham, US (DLG)"
    }, {
        "country": "US",
        "city": "Dillingham",
        "code": "DLG",
        "class": "us",
        "airport": "Dillingham Airport",
        "label": "Dillingham, US (DLG)"
    }, {
        "country": "US",
        "city": "Dillingham",
        "code": "DLG",
        "class": "us",
        "airport": "Dillingham Airport",
        "label": "Dillingham, US (DLG)"
    }, {
        "country": "US",
        "city": "Wichita Falls",
        "code": "SPS",
        "class": "us",
        "airport": "Sheppard Air Force Base-Wichita Falls Municipal Airport",
        "label": "Wichita Falls, US - All Airports (SPS)"
    }, {
        "country": "US",
        "city": "Spokane",
        "code": "GEG",
        "class": "us",
        "airport": "Spokane International Airport",
        "label": "Spokane, US (GEG)"
    }, {
        "country": "US",
        "city": "Springfield",
        "code": "SGF",
        "class": "us",
        "airport": "Springfield Branson National Airport",
        "label": "Springfield, US (SGF)"
    }, {
        "country": "US",
        "city": "Springfield",
        "code": "SGF",
        "class": "us",
        "airport": "Springfield Branson National Airport",
        "label": "Springfield, US (SGF)"
    }, {
        "country": "US",
        "city": "South Bend",
        "code": "SBN",
        "class": "us",
        "airport": "South Bend Regional Airport",
        "label": "South Bend, US (SBN)"
    }, {
        "country": "US",
        "city": "Chattanooga",
        "code": "CHA",
        "class": "us",
        "airport": "Lovell Field",
        "label": "Chattanooga, US (CHA)"
    }, {
        "country": "US",
        "city": "Chattanooga",
        "code": "CHA",
        "class": "us",
        "airport": "Lovell Field",
        "label": "Chattanooga, US (CHA)"
    }, {
        "country": "US",
        "city": "Springfield",
        "code": "SPI",
        "class": "us",
        "airport": "Abraham Lincoln Capital Airport",
        "label": "Springfield, US (SPI)"
    }, {
        "country": "US",
        "city": "St Louis",
        "code": "STL",
        "class": "us",
        "airport": "Lambert St Louis International Airport",
        "label": "St Louis, US (STL)"
    }, {
        "country": "US",
        "city": "Walla Walla",
        "code": "ALW",
        "class": "us",
        "airport": "Walla Walla Regional Airport",
        "label": "Walla Walla, US (ALW)"
    }, {
        "country": "US",
        "city": "Walla Walla",
        "code": "ALW",
        "class": "us",
        "airport": "Walla Walla Regional Airport",
        "label": "Walla Walla, US (ALW)"
    }, {
        "country": "US",
        "city": "Daytona Beach",
        "code": "DAB",
        "class": "us",
        "airport": "Daytona Beach International Airport",
        "label": "Daytona Beach, US (DAB)"
    }, {
        "country": "US",
        "city": "Staunton",
        "code": "SHD",
        "class": "us",
        "airport": "Shenandoah Valley Regional Airport",
        "label": "Staunton, US (SHD)"
    }, {
        "country": "US",
        "city": "Bridgeport",
        "code": "BDR",
        "class": "us",
        "airport": "Igor I Sikorsky Memorial Airport",
        "label": "Bridgeport, US (BDR)"
    }, {
        "country": "US",
        "city": "State College",
        "code": "SCE",
        "class": "us",
        "airport": "University Park Airport",
        "label": "State College, US (SCE)"
    }, {
        "country": "US",
        "city": "Cedar City",
        "code": "CDC",
        "class": "us",
        "airport": "Cedar City Regional Airport",
        "label": "Cedar City, US (CDC)"
    }, {
        "country": "US",
        "city": "Cedar City",
        "code": "CDC",
        "class": "us",
        "airport": "Cedar City Regional Airport",
        "label": "Cedar City, US (CDC)"
    }, {
        "country": "US",
        "city": "Cedar City",
        "code": "CDC",
        "class": "us",
        "airport": "Cedar City Regional Airport",
        "label": "Cedar City, US (CDC)"
    }, {
        "country": "US",
        "city": "Tulsa",
        "code": "TUL",
        "class": "us",
        "airport": "Tulsa International Airport",
        "label": "Tulsa, US (TUL)"
    }, {
        "country": "US",
        "city": "Tulsa",
        "code": "TUL",
        "class": "us",
        "airport": "Tulsa International Airport",
        "label": "Tulsa, US (TUL)"
    }, {
        "country": "US",
        "city": "Charleston",
        "code": "CRW",
        "class": "us",
        "airport": "Yeager Airport",
        "label": "Charleston, US (CRW)"
    }, {
        "country": "US",
        "city": "Brownsville",
        "code": "BRO",
        "class": "us",
        "airport": "Brownsville South Padre Island International Airport",
        "label": "Brownsville, US (BRO)"
    }, {
        "country": "US",
        "city": "Texarkana",
        "code": "TXK",
        "class": "us",
        "airport": "Texarkana Regional Webb Field",
        "label": "Texarkana, US (TXK)"
    }, {
        "country": "US",
        "city": "Tatalina",
        "code": "TLJ",
        "class": "us",
        "airport": "Tatalina LRRS Airport",
        "label": "Tatalina, US (TLJ)"
    }, {
        "country": "US",
        "city": "Tatalina",
        "code": "TLJ",
        "class": "us",
        "airport": "Tatalina LRRS Airport",
        "label": "Tatalina, US (TLJ)"
    }, {
        "country": "US",
        "city": "Tatalina",
        "code": "TLJ",
        "class": "us",
        "airport": "Tatalina LRRS Airport",
        "label": "Tatalina, US (TLJ)"
    }, {
        "country": "US",
        "city": "Tatalina",
        "code": "TLJ",
        "class": "us",
        "airport": "Tatalina LRRS Airport",
        "label": "Tatalina, US (TLJ)"
    }, {
        "country": "US",
        "city": "Washington",
        "code": "IAD",
        "class": "us",
        "airport": "Washington Dulles International Airport",
        "label": "Washington, US (IAD)"
    }, {
        "country": "US",
        "city": "Newark",
        "code": "EWR",
        "class": "us",
        "airport": "Newark Liberty International Airport",
        "label": "Newark, US (EWR)"
    }, {
        "country": "US",
        "city": "Newark",
        "code": "EWR",
        "class": "us",
        "airport": "Newark Liberty International Airport",
        "label": "Newark, US (EWR)"
    }, {
        "country": "US",
        "city": "Newark",
        "code": "EWR",
        "class": "us",
        "airport": "Newark Liberty International Airport",
        "label": "Newark, US (EWR)"
    }, {
        "country": "US",
        "city": "Washington",
        "code": "DCA",
        "class": "us",
        "airport": "Ronald Reagan Washington National Airport",
        "label": "Washington, US (DCA)"
    }, {
        "country": "US",
        "city": "Des Moines",
        "code": "DSM",
        "class": "us",
        "airport": "Des Moines International Airport",
        "label": "Des Moines, US (DSM)"
    }, {
        "country": "US",
        "city": "Des Moines",
        "code": "DSM",
        "class": "us",
        "airport": "Des Moines International Airport",
        "label": "Des Moines, US (DSM)"
    }, {
        "country": "US",
        "city": "Tyler",
        "code": "TYR",
        "class": "us",
        "airport": "Tyler Pounds Regional Airport",
        "label": "Tyler, US (TYR)"
    }, {
        "country": "US",
        "city": "Tyler",
        "code": "TYR",
        "class": "us",
        "airport": "Tyler Pounds Regional Airport",
        "label": "Tyler, US (TYR)"
    }, {
        "country": "US",
        "city": "Twin Falls",
        "code": "TWF",
        "class": "us",
        "airport": "Joslin Field Magic Valley Regional Airport",
        "label": "Twin Falls, US (TWF)"
    }, {
        "country": "US",
        "city": "Twin Falls",
        "code": "TWF",
        "class": "us",
        "airport": "Joslin Field Magic Valley Regional Airport",
        "label": "Twin Falls, US (TWF)"
    }, {
        "country": "US",
        "city": "Charlottesville",
        "code": "CHO",
        "class": "us",
        "airport": "Charlottesville Albemarle Airport",
        "label": "Charlottesville, US (CHO)"
    }, {
        "country": "US",
        "city": "Buckland",
        "code": "BKC",
        "class": "us",
        "airport": "Buckland Airport",
        "label": "Buckland, US (BKC)"
    }, {
        "country": "US",
        "city": "Tallahassee",
        "code": "TLH",
        "class": "us",
        "airport": "Tallahassee Regional Airport",
        "label": "Tallahassee, US (TLH)"
    }, {
        "country": "US",
        "city": "Deering",
        "code": "DRG",
        "class": "us",
        "airport": "Deering Airport",
        "label": "Deering, US (DRG)"
    }, {
        "country": "US",
        "city": "Deering",
        "code": "DRG",
        "class": "us",
        "airport": "Deering Airport",
        "label": "Deering, US (DRG)"
    }, {
        "country": "US",
        "city": "Deering",
        "code": "DRG",
        "class": "us",
        "airport": "Deering Airport",
        "label": "Deering, US (DRG)"
    }, {
        "country": "US",
        "city": "Deering",
        "code": "DRG",
        "class": "us",
        "airport": "Deering Airport",
        "label": "Deering, US (DRG)"
    }, {
        "country": "US",
        "city": "Brunswick",
        "code": "BQK",
        "class": "us",
        "airport": "Brunswick Golden Isles Airport",
        "label": "Brunswick, US (BQK)"
    }, {
        "country": "US",
        "city": "Tupelo",
        "code": "TUP",
        "class": "us",
        "airport": "Tupelo Regional Airport",
        "label": "Tupelo, US (TUP)"
    }, {
        "country": "US",
        "city": "Tupelo",
        "code": "TUP",
        "class": "us",
        "airport": "Tupelo Regional Airport",
        "label": "Tupelo, US (TUP)"
    }, {
        "country": "US",
        "city": "Tupelo",
        "code": "TUP",
        "class": "us",
        "airport": "Tupelo Regional Airport",
        "label": "Tupelo, US (TUP)"
    }, {
        "country": "US",
        "city": "Wichita",
        "code": "ICT",
        "class": "us",
        "airport": "Wichita Mid Continent Airport",
        "label": "Wichita, US (ICT)"
    }, {
        "country": "US",
        "city": "Wichita",
        "code": "ICT",
        "class": "us",
        "airport": "Wichita Mid Continent Airport",
        "label": "Wichita, US (ICT)"
    }, {
        "country": "US",
        "city": "Scottsbluff",
        "code": "BFF",
        "class": "us",
        "airport": "Western Neb. Rgnl\/William B. Heilig Airport",
        "label": "Scottsbluff, US (BFF)"
    }, {
        "country": "US",
        "city": "Scranton\/Wilkes Barre",
        "code": "AVP",
        "class": "us",
        "airport": "Wilkes Barre Scranton International Airport",
        "label": "Scranton\/Wilkes Barre, US (AVP)"
    }, {
        "country": "US",
        "city": "Scranton\/Wilkes Barre",
        "code": "AVP",
        "class": "us",
        "airport": "Wilkes Barre Scranton International Airport",
        "label": "Scranton\/Wilkes Barre, US (AVP)"
    }, {
        "country": "US",
        "city": "Scranton\/Wilkes Barre",
        "code": "AVP",
        "class": "us",
        "airport": "Wilkes Barre Scranton International Airport",
        "label": "Scranton\/Wilkes Barre, US (AVP)"
    }, {
        "country": "US",
        "city": "Casper",
        "code": "CPR",
        "class": "us",
        "airport": "Casper-Natrona County International Airport",
        "label": "Casper, US (CPR)"
    }, {
        "country": "US",
        "city": "Savannah",
        "code": "SAV",
        "class": "us",
        "airport": "Savannah Hilton Head International Airport",
        "label": "Savannah, US (SAV)"
    }, {
        "country": "US",
        "city": "Savoonga",
        "code": "SVA",
        "class": "us",
        "airport": "Savoonga Airport",
        "label": "Savoonga, US (SVA)"
    }, {
        "country": "US",
        "city": "Savoonga",
        "code": "SVA",
        "class": "us",
        "airport": "Savoonga Airport",
        "label": "Savoonga, US (SVA)"
    }, {
        "country": "US",
        "city": "Bullhead City",
        "code": "IFP",
        "class": "us",
        "airport": "Laughlin Bullhead International Airport",
        "label": "Bullhead City, US (IFP)"
    }, {
        "country": "US",
        "city": "Bullhead City",
        "code": "IFP",
        "class": "us",
        "airport": "Laughlin Bullhead International Airport",
        "label": "Bullhead City, US (IFP)"
    }, {
        "country": "US",
        "city": "Chicago",
        "code": "ORD",
        "class": "us",
        "airport": "Chicago O'Hare International Airport",
        "label": "Chicago, US - O'Hare Intl (ORD)"
    }, {
        "country": "US",
        "city": "Chicago",
        "code": "ORD",
        "class": "us",
        "airport": "Chicago O'Hare International Airport",
        "label": "Chicago, US - O'Hare Intl (ORD)"
    }, {
        "country": "US",
        "city": "Chicago",
        "code": "ORD",
        "class": "us",
        "airport": "Chicago O'Hare International Airport",
        "label": "Chicago, US - O'Hare Intl (ORD)"
    }, {
        "country": "US",
        "city": "Chicago",
        "code": "ORD",
        "class": "us",
        "airport": "Chicago O'Hare International Airport",
        "label": "Chicago, US - O'Hare Intl (ORD)"
    }, {
        "country": "US",
        "city": "Chicago",
        "code": "ORD",
        "class": "us",
        "airport": "Chicago O'Hare International Airport",
        "label": "Chicago, US - O'Hare Intl (ORD)"
    }, {
        "country": "US",
        "city": "Chicago",
        "code": "ORD",
        "class": "us",
        "airport": "Chicago O'Hare International Airport",
        "label": "Chicago, US - O'Hare Intl (ORD)"
    }, {
        "country": "US",
        "city": "Sault Ste Marie",
        "code": "CIU",
        "class": "us",
        "airport": "Chippewa County International Airport",
        "label": "Sault Ste Marie, US (CIU)"
    }, {
        "country": "US",
        "city": "Sault Ste Marie",
        "code": "CIU",
        "class": "us",
        "airport": "Chippewa County International Airport",
        "label": "Sault Ste Marie, US (CIU)"
    }, {
        "country": "US",
        "city": "Sault Ste Marie",
        "code": "CIU",
        "class": "us",
        "airport": "Chippewa County International Airport",
        "label": "Sault Ste Marie, US (CIU)"
    }, {
        "country": "US",
        "city": "Sault Ste Marie",
        "code": "CIU",
        "class": "us",
        "airport": "Chippewa County International Airport",
        "label": "Sault Ste Marie, US (CIU)"
    }, {
        "country": "US",
        "city": "Seattle",
        "code": "SEA",
        "class": "us",
        "airport": "Seattle Tacoma International Airport",
        "label": "Seattle, US (SEA)"
    }, {
        "country": "US",
        "city": "Dothan",
        "code": "DHN",
        "class": "us",
        "airport": "Dothan Regional Airport",
        "label": "Dothan, US (DHN)"
    }, {
        "country": "US",
        "city": "Dallas \/ Fort Worth",
        "code": "DFW",
        "class": "us",
        "airport": "Dallas Fort Worth International Airport",
        "label": "Dallas - Fort Worth, US (DFW)"
    }, {
        "country": "US",
        "city": "Dallas \/ Fort Worth",
        "code": "DFW",
        "class": "us",
        "airport": "Dallas Fort Worth International Airport",
        "label": "Dallas - Fort Worth, US (DFW)"
    }, {
        "country": "US",
        "city": "Dallas \/ Fort Worth",
        "code": "DFW",
        "class": "us",
        "airport": "Dallas Fort Worth International Airport",
        "label": "Dallas - Fort Worth, US (DFW)"
    }, {
        "country": "US",
        "city": "Athens",
        "code": "AHN",
        "class": "us",
        "airport": "Athens Ben Epps Airport",
        "label": "Athens, US (AHN)"
    }, {
        "country": "US",
        "city": "Dallas",
        "code": "DAL",
        "class": "us",
        "airport": "Dallas Love Field",
        "label": "Dallas, US (DAL)"
    }, {
        "country": "US",
        "city": "Victoria",
        "code": "VCT",
        "class": "us",
        "airport": "Victoria Regional Airport",
        "label": "Victoria, US (VCT)"
    }, {
        "country": "US",
        "city": "San Francisco",
        "code": "SFO",
        "class": "us",
        "airport": "San Francisco International Airport",
        "label": "San Francisco, US (SFO)"
    }, {
        "country": "US",
        "city": "San Francisco",
        "code": "SFO",
        "class": "us",
        "airport": "San Francisco International Airport",
        "label": "San Francisco, US (SFO)"
    }, {
        "country": "US",
        "city": "Saranac Lake",
        "code": "SLK",
        "class": "us",
        "airport": "Adirondack Regional Airport",
        "label": "Saranac Lake, US (SLK)"
    }, {
        "country": "US",
        "city": "Williamsport",
        "code": "IPT",
        "class": "us",
        "airport": "Williamsport Regional Airport",
        "label": "Williamsport, US (IPT)"
    }, {
        "country": "US",
        "city": "Williamsport",
        "code": "IPT",
        "class": "us",
        "airport": "Williamsport Regional Airport",
        "label": "Williamsport, US (IPT)"
    }, {
        "country": "US",
        "city": "Williamsport",
        "code": "IPT",
        "class": "us",
        "airport": "Williamsport Regional Airport",
        "label": "Williamsport, US (IPT)"
    }, {
        "country": "US",
        "city": "Sheridan",
        "code": "SHR",
        "class": "us",
        "airport": "Sheridan County Airport",
        "label": "Sheridan, US (SHR)"
    }, {
        "country": "US",
        "city": "Dayton",
        "code": "DAY",
        "class": "us",
        "airport": "James M Cox Dayton International Airport",
        "label": "Dayton, US (DAY)"
    }, {
        "country": "US",
        "city": "Dayton",
        "code": "DAY",
        "class": "us",
        "airport": "James M Cox Dayton International Airport",
        "label": "Dayton, US (DAY)"
    }, {
        "country": "US",
        "city": "Valdosta",
        "code": "VLD",
        "class": "us",
        "airport": "Valdosta Regional Airport",
        "label": "Valdosta, US (VLD)"
    }, {
        "country": "US",
        "city": "Valdosta",
        "code": "VLD",
        "class": "us",
        "airport": "Valdosta Regional Airport",
        "label": "Valdosta, US (VLD)"
    }, {
        "country": "US",
        "city": "Skagway",
        "code": "SGY",
        "class": "us",
        "airport": "Skagway Airport",
        "label": "Skagway, US (SGY)"
    }, {
        "country": "US",
        "city": "Sitka",
        "code": "SIT",
        "class": "us",
        "airport": "Sitka Rocky Gutierrez Airport",
        "label": "Sitka, US (SIT)"
    }, {
        "country": "US",
        "city": "Sitka",
        "code": "SIT",
        "class": "us",
        "airport": "Sitka Rocky Gutierrez Airport",
        "label": "Sitka, US (SIT)"
    }, {
        "country": "US",
        "city": "Chicago",
        "code": "MDW",
        "class": "us",
        "airport": "Chicago Midway International Airport",
        "label": "Chicago, US - Midway Airport (MDW)"
    }, {
        "country": "US",
        "city": "Valdez",
        "code": "VDZ",
        "class": "us",
        "airport": "Valdez Pioneer Field",
        "label": "Valdez, US (VDZ)"
    }, {
        "country": "US",
        "city": "Champaign",
        "code": "CMI",
        "class": "us",
        "airport": "University of Illinois Willard Airport",
        "label": "Champaign, US (CMI)"
    }, {
        "country": "US",
        "city": "Waterloo",
        "code": "ALO",
        "class": "us",
        "airport": "Waterloo Regional Airport",
        "label": "Waterloo, US (ALO)"
    }, {
        "country": "US",
        "city": "Traverse City",
        "code": "TVC",
        "class": "us",
        "airport": "Cherry Capital Airport",
        "label": "Traverse City, US (TVC)"
    }, {
        "country": "US",
        "city": "Traverse City",
        "code": "TVC",
        "class": "us",
        "airport": "Cherry Capital Airport",
        "label": "Traverse City, US (TVC)"
    }, {
        "country": "US",
        "city": "Charleston",
        "code": "CHS",
        "class": "us",
        "airport": "Charleston Air Force Base-International Airport",
        "label": "Charleston, US (CHS)"
    }, {
        "country": "US",
        "city": "Tucson",
        "code": "TUS",
        "class": "us",
        "airport": "Tucson International Airport",
        "label": "Tucson, US (TUS)"
    }, {
        "country": "US",
        "city": "Dodge City",
        "code": "DDC",
        "class": "us",
        "airport": "Dodge City Regional Airport",
        "label": "Dodge City, US (DDC)"
    }, {
        "country": "US",
        "city": "Sioux Falls",
        "code": "FSD",
        "class": "us",
        "airport": "Joe Foss Field Airport",
        "label": "Sioux Falls, US (FSD)"
    }, {
        "country": "US",
        "city": "Los Angeles",
        "code": "LAX",
        "class": "us",
        "airport": "Los Angeles International Airport",
        "label": "Los Angeles, US (LAX)"
    }, {
        "country": "US",
        "city": "Los Angeles",
        "code": "LAX",
        "class": "us",
        "airport": "Los Angeles International Airport",
        "label": "Los Angeles, US (LAX)"
    }, {
        "country": "US",
        "city": "Valparaiso",
        "code": "VPS",
        "class": "us",
        "airport": "Eglin Air Force Base",
        "label": "Valparaiso, US (VPS)"
    }, {
        "country": "US",
        "city": "Shreveport",
        "code": "SHV",
        "class": "us",
        "airport": "Shreveport Regional Airport",
        "label": "Shreveport, US (SHV)"
    }, {
        "country": "US",
        "city": "Shreveport",
        "code": "SHV",
        "class": "us",
        "airport": "Shreveport Regional Airport",
        "label": "Shreveport, US (SHV)"
    }, {
        "country": "US",
        "city": "Shreveport",
        "code": "SHV",
        "class": "us",
        "airport": "Shreveport Regional Airport",
        "label": "Shreveport, US (SHV)"
    }, {
        "country": "US",
        "city": "Shishmaref",
        "code": "SHH",
        "class": "us",
        "airport": "Shishmaref Airport",
        "label": "Shishmaref, US (SHH)"
    }, {
        "country": "US",
        "city": "Shishmaref",
        "code": "SHH",
        "class": "us",
        "airport": "Shishmaref Airport",
        "label": "Shishmaref, US (SHH)"
    }, {
        "country": "US",
        "city": "Silver City",
        "code": "SVC",
        "class": "us",
        "airport": "Grant County Airport",
        "label": "Silver City, US (SVC)"
    }, {
        "country": "US",
        "city": "Watertown",
        "code": "ART",
        "class": "us",
        "airport": "Watertown International Airport",
        "label": "Watertown, US (ART)"
    }, {
        "country": "US",
        "city": "Sioux City",
        "code": "SUX",
        "class": "us",
        "airport": "Sioux Gateway Col. Bud Day Field",
        "label": "Sioux City, US (SUX)"
    }, {
        "country": "US",
        "city": "Manchester",
        "code": "MHT",
        "class": "us",
        "airport": "Manchester Airport",
        "label": "Manchester, US (MHT)"
    }, {
        "country": "US",
        "city": "Manchester",
        "code": "MHT",
        "class": "us",
        "airport": "Manchester Airport",
        "label": "Manchester, US (MHT)"
    }, {
        "country": "US",
        "city": "Manchester",
        "code": "MHT",
        "class": "us",
        "airport": "Manchester Airport",
        "label": "Manchester, US (MHT)"
    }, {
        "country": "US",
        "city": "Watertown",
        "code": "ATY",
        "class": "us",
        "airport": "Watertown Regional Airport",
        "label": "Watertown, US (ATY)"
    }, {
        "country": "US",
        "city": "Detroit",
        "code": "DTW",
        "class": "us",
        "airport": "Detroit Metropolitan Wayne County Airport",
        "label": "Detroit, US (DTW)"
    }, {
        "country": "US",
        "city": "Fargo",
        "code": "FAR",
        "class": "us",
        "airport": "Hector International Airport",
        "label": "Fargo, US (FAR)"
    }, {
        "country": "US",
        "city": "Lake Charles",
        "code": "LCH",
        "class": "us",
        "airport": "Lake Charles Regional Airport",
        "label": "Lake Charles, US (LCH)"
    }, {
        "country": "US",
        "city": "Lafayette",
        "code": "LFT",
        "class": "us",
        "airport": "Lafayette Regional Airport",
        "label": "Lafayette, US (LFT)"
    }, {
        "country": "US",
        "city": "Lafayette",
        "code": "LFT",
        "class": "us",
        "airport": "Lafayette Regional Airport",
        "label": "Lafayette, US (LFT)"
    }, {
        "country": "US",
        "city": "Lanai City",
        "code": "LNY",
        "class": "us",
        "airport": "Lanai Airport",
        "label": "Lanai City, US (LNY)"
    }, {
        "country": "US",
        "city": "Lansing",
        "code": "LAN",
        "class": "us",
        "airport": "Capital City Airport",
        "label": "Lansing, US (LAN)"
    }, {
        "country": "US",
        "city": "Amook",
        "code": "AOS",
        "class": "us",
        "airport": "Amook Bay Seaplane Base",
        "label": "Amook, US (AOS)"
    }, {
        "country": "US",
        "city": "Anaktuvuk",
        "code": "AKP",
        "class": "us",
        "airport": "Anaktuvuk Pass Airport",
        "label": "Anaktuvuk, US (AKP)"
    }, {
        "country": "US",
        "city": "Anchorage",
        "code": "ANC",
        "class": "us",
        "airport": "Ted Stevens Anchorage International Airport",
        "label": "Anchorage, US (ANC)"
    }, {
        "country": "US",
        "city": "Anchorage",
        "code": "ANC",
        "class": "us",
        "airport": "Ted Stevens Anchorage International Airport",
        "label": "Anchorage, US (ANC)"
    }, {
        "country": "US",
        "city": "Anchorage",
        "code": "ANC",
        "class": "us",
        "airport": "Ted Stevens Anchorage International Airport",
        "label": "Anchorage, US (ANC)"
    }, {
        "country": "US",
        "city": "Anchorage",
        "code": "ANC",
        "class": "us",
        "airport": "Ted Stevens Anchorage International Airport",
        "label": "Anchorage, US (ANC)"
    }, {
        "country": "US",
        "city": "La Crosse",
        "code": "LSE",
        "class": "us",
        "airport": "La Crosse Municipal Airport",
        "label": "La Crosse, US (LSE)"
    }, {
        "country": "US",
        "city": "La Crosse",
        "code": "LSE",
        "class": "us",
        "airport": "La Crosse Municipal Airport",
        "label": "La Crosse, US (LSE)"
    }, {
        "country": "US",
        "city": "Garden City",
        "code": "GCK",
        "class": "us",
        "airport": "Garden City Regional Airport",
        "label": "Garden City, US (GCK)"
    }, {
        "country": "US",
        "city": "Laramie",
        "code": "LAR",
        "class": "us",
        "airport": "Laramie Regional Airport",
        "label": "Laramie, US (LAR)"
    }, {
        "country": "US",
        "city": "Laredo",
        "code": "LRD",
        "class": "us",
        "airport": "Laredo International Airport",
        "label": "Laredo, US (LRD)"
    }, {
        "country": "US",
        "city": "Laredo",
        "code": "LRD",
        "class": "us",
        "airport": "Laredo International Airport",
        "label": "Laredo, US (LRD)"
    }, {
        "country": "US",
        "city": "Altoona\/Martinsburg",
        "code": "AOO",
        "class": "us",
        "airport": "Altoona Blair County Airport",
        "label": "Altoona\/Martinsburg, US (AOO)"
    }, {
        "country": "US",
        "city": "Altoona\/Martinsburg",
        "code": "AOO",
        "class": "us",
        "airport": "Altoona Blair County Airport",
        "label": "Altoona\/Martinsburg, US (AOO)"
    }, {
        "country": "US",
        "city": "Lewiston",
        "code": "LWS",
        "class": "us",
        "airport": "Lewiston Nez Perce County Airport",
        "label": "Lewiston, US (LWS)"
    }, {
        "country": "US",
        "city": "Lexington",
        "code": "LEX",
        "class": "us",
        "airport": "Blue Grass Airport",
        "label": "Lexington, US (LEX)"
    }, {
        "country": "US",
        "city": "Lewistown",
        "code": "LWT",
        "class": "us",
        "airport": "Lewistown Municipal Airport",
        "label": "Lewistown, US (LWT)"
    }, {
        "country": "US",
        "city": "Lewistown",
        "code": "LWT",
        "class": "us",
        "airport": "Lewistown Municipal Airport",
        "label": "Lewistown, US (LWT)"
    }, {
        "country": "US",
        "city": "Cape Girardeau",
        "code": "CGI",
        "class": "us",
        "airport": "Cape Girardeau Regional Airport",
        "label": "Cape Girardeau, US (CGI)"
    }, {
        "country": "US",
        "city": "Latrobe",
        "code": "LBE",
        "class": "us",
        "airport": "Arnold Palmer Regional Airport",
        "label": "Latrobe, US (LBE)"
    }, {
        "country": "US",
        "city": "Latrobe",
        "code": "LBE",
        "class": "us",
        "airport": "Arnold Palmer Regional Airport",
        "label": "Latrobe, US (LBE)"
    }, {
        "country": "US",
        "city": "Ambler",
        "code": "ABL",
        "class": "us",
        "airport": "Ambler Airport",
        "label": "Ambler, US (ABL)"
    }, {
        "country": "US",
        "city": "Laurel",
        "code": "PIB",
        "class": "us",
        "airport": "Hattiesburg Laurel Regional Airport",
        "label": "Laurel, US (PIB)"
    }, {
        "country": "US",
        "city": "Laurel",
        "code": "PIB",
        "class": "us",
        "airport": "Hattiesburg Laurel Regional Airport",
        "label": "Laurel, US (PIB)"
    }, {
        "country": "US",
        "city": "Amarillo",
        "code": "AMA",
        "class": "us",
        "airport": "Rick Husband Amarillo International Airport",
        "label": "Amarillo, US (AMA)"
    }, {
        "country": "US",
        "city": "Angoon",
        "code": "AGN",
        "class": "us",
        "airport": "Angoon Seaplane Base",
        "label": "Angoon, US (AGN)"
    }, {
        "country": "US",
        "city": "Cold Bay",
        "code": "CDB",
        "class": "us",
        "airport": "Cold Bay Airport",
        "label": "Cold Bay, US (CDB)"
    }, {
        "country": "US",
        "city": "Kinston",
        "code": "ISO",
        "class": "us",
        "airport": "Isortoq Heliport",
        "label": "Kinston, US (ISO)"
    }, {
        "country": "US",
        "city": "Anvik",
        "code": "ANV",
        "class": "us",
        "airport": "Anvik Airport",
        "label": "Anvik, US (ANV)"
    }, {
        "country": "US",
        "city": "Anvik",
        "code": "ANV",
        "class": "us",
        "airport": "Anvik Airport",
        "label": "Anvik, US (ANV)"
    }, {
        "country": "US",
        "city": "Kirksville",
        "code": "IRK",
        "class": "us",
        "airport": "Kirksville Regional Airport",
        "label": "Kirksville, US (IRK)"
    }, {
        "country": "US",
        "city": "Columbia",
        "code": "CAE",
        "class": "us",
        "airport": "Columbia Metropolitan Airport",
        "label": "Columbia, US (CAE)"
    }, {
        "country": "US",
        "city": "Columbia",
        "code": "CAE",
        "class": "us",
        "airport": "Columbia Metropolitan Airport",
        "label": "Columbia, US (CAE)"
    }, {
        "country": "US",
        "city": "Kingman",
        "code": "IGM",
        "class": "us",
        "airport": "Kingman Airport",
        "label": "Kingman, US (IGM)"
    }, {
        "country": "US",
        "city": "King Salmon",
        "code": "AKN",
        "class": "us",
        "airport": "King Salmon Airport",
        "label": "King Salmon, US (AKN)"
    }, {
        "country": "US",
        "city": "Key West",
        "code": "EYW",
        "class": "us",
        "airport": "Key West International Airport",
        "label": "Key West, US (EYW)"
    }, {
        "country": "US",
        "city": "Ketchikan",
        "code": "KTN",
        "class": "us",
        "airport": "Ketchikan International Airport",
        "label": "Ketchikan, US (KTN)"
    }, {
        "country": "US",
        "city": "Kiana",
        "code": "IAN",
        "class": "us",
        "airport": "Bob Baker Memorial Airport",
        "label": "Kiana, US (IAN)"
    }, {
        "country": "US",
        "city": "Killeen",
        "code": "GRK",
        "class": "us",
        "airport": "Robert Gray  Army Air Field Airport",
        "label": "Killeen, US (GRK)"
    }, {
        "country": "US",
        "city": "King Cove",
        "code": "KVC",
        "class": "us",
        "airport": "King Cove Airport",
        "label": "King Cove, US (KVC)"
    }, {
        "country": "US",
        "city": "Appleton",
        "code": "ATW",
        "class": "us",
        "airport": "Outagamie County Regional Airport",
        "label": "Appleton, US (ATW)"
    }, {
        "country": "US",
        "city": "Kivalina",
        "code": "KVL",
        "class": "us",
        "airport": "Kivalina Airport",
        "label": "Kivalina, US (KVL)"
    }, {
        "country": "US",
        "city": "Klamath Falls",
        "code": "LMT",
        "class": "us",
        "airport": "Klamath Falls Airport",
        "label": "Klamath Falls, US (LMT)"
    }, {
        "country": "US",
        "city": "College Station",
        "code": "CLL",
        "class": "us",
        "airport": "Easterwood Field",
        "label": "College Station, US (CLL)"
    }, {
        "country": "US",
        "city": "Kotzebue",
        "code": "OTZ",
        "class": "us",
        "airport": "Ralph Wien Memorial Airport",
        "label": "Kotzebue, US (OTZ)"
    }, {
        "country": "US",
        "city": "Kotzebue",
        "code": "OTZ",
        "class": "us",
        "airport": "Ralph Wien Memorial Airport",
        "label": "Kotzebue, US (OTZ)"
    }, {
        "country": "US",
        "city": "Kotzebue",
        "code": "OTZ",
        "class": "us",
        "airport": "Ralph Wien Memorial Airport",
        "label": "Kotzebue, US (OTZ)"
    }, {
        "country": "US",
        "city": "Aniak",
        "code": "ANI",
        "class": "us",
        "airport": "Aniak Airport",
        "label": "Aniak, US (ANI)"
    }, {
        "country": "US",
        "city": "Youngstown",
        "code": "YNG",
        "class": "us",
        "airport": "Youngstown Warren Regional Airport",
        "label": "Youngstown, US (YNG)"
    }, {
        "country": "US",
        "city": "Youngstown",
        "code": "YNG",
        "class": "us",
        "airport": "Youngstown Warren Regional Airport",
        "label": "Youngstown, US (YNG)"
    }, {
        "country": "US",
        "city": "Youngstown",
        "code": "YNG",
        "class": "us",
        "airport": "Youngstown Warren Regional Airport",
        "label": "Youngstown, US (YNG)"
    }, {
        "country": "US",
        "city": "Knoxville",
        "code": "TYS",
        "class": "us",
        "airport": "McGhee Tyson Airport",
        "label": "Knoxville, US (TYS)"
    }, {
        "country": "US",
        "city": "Knoxville",
        "code": "TYS",
        "class": "us",
        "airport": "McGhee Tyson Airport",
        "label": "Knoxville, US (TYS)"
    }, {
        "country": "US",
        "city": "Knoxville",
        "code": "TYS",
        "class": "us",
        "airport": "McGhee Tyson Airport",
        "label": "Knoxville, US (TYS)"
    }, {
        "country": "US",
        "city": "Kodiak",
        "code": "ADQ",
        "class": "us",
        "airport": "Kodiak Airport",
        "label": "Kodiak, US (ADQ)"
    }, {
        "country": "US",
        "city": "Kona",
        "code": "KOA",
        "class": "us",
        "airport": "Kona International At Keahole Airport",
        "label": "Kona, US (KOA)"
    }, {
        "country": "US",
        "city": "Colorado Springs",
        "code": "COS",
        "class": "us",
        "airport": "City of Colorado Springs Municipal Airport",
        "label": "Colorado Springs, US (COS)"
    }, {
        "country": "US",
        "city": "Alpena",
        "code": "APN",
        "class": "us",
        "airport": "Alpena County Regional Airport",
        "label": "Alpena, US (APN)"
    }, {
        "country": "US",
        "city": "Liberal",
        "code": "LBL",
        "class": "us",
        "airport": "Liberal Mid-America Regional Airport",
        "label": "Liberal, US (LBL)"
    }, {
        "country": "US",
        "city": "Akiak",
        "code": "AKI",
        "class": "us",
        "airport": "Akiak Airport",
        "label": "Akiak, US (AKI)"
    }, {
        "country": "US",
        "city": "Marietta\/Parkersburg",
        "code": "PKB",
        "class": "us",
        "airport": "Mid Ohio Valley Regional Airport",
        "label": "Marietta\/Parkersburg, US (PKB)"
    }, {
        "country": "US",
        "city": "Marietta\/Parkersburg",
        "code": "PKB",
        "class": "us",
        "airport": "Mid Ohio Valley Regional Airport",
        "label": "Marietta\/Parkersburg, US (PKB)"
    }, {
        "country": "US",
        "city": "Marietta\/Parkersburg",
        "code": "PKB",
        "class": "us",
        "airport": "Mid Ohio Valley Regional Airport",
        "label": "Marietta\/Parkersburg, US (PKB)"
    }, {
        "country": "US",
        "city": "Martha's Vineyard",
        "code": "MVY",
        "class": "us",
        "airport": "Martha's Vineyard Airport",
        "label": "Martha's Vineyard, US (MVY)"
    }, {
        "country": "US",
        "city": "Martha's Vineyard",
        "code": "MVY",
        "class": "us",
        "airport": "Martha's Vineyard Airport",
        "label": "Martha's Vineyard, US (MVY)"
    }, {
        "country": "US",
        "city": "Martha's Vineyard",
        "code": "MVY",
        "class": "us",
        "airport": "Martha's Vineyard Airport",
        "label": "Martha's Vineyard, US (MVY)"
    }, {
        "country": "US",
        "city": "Martha's Vineyard",
        "code": "MVY",
        "class": "us",
        "airport": "Martha's Vineyard Airport",
        "label": "Martha's Vineyard, US (MVY)"
    }, {
        "country": "US",
        "city": "Martha's Vineyard",
        "code": "MVY",
        "class": "us",
        "airport": "Martha's Vineyard Airport",
        "label": "Martha's Vineyard, US (MVY)"
    }, {
        "country": "US",
        "city": "Manhattan",
        "code": "MHK",
        "class": "us",
        "airport": "Manhattan Regional Airport",
        "label": "Manhattan, US (MHK)"
    }, {
        "country": "US",
        "city": "Manhattan",
        "code": "MHK",
        "class": "us",
        "airport": "Manhattan Regional Airport",
        "label": "Manhattan, US (MHK)"
    }, {
        "country": "US",
        "city": "Manhattan",
        "code": "MHK",
        "class": "us",
        "airport": "Manhattan Regional Airport",
        "label": "Manhattan, US (MHK)"
    }, {
        "country": "US",
        "city": "Akron\/Canton",
        "code": "CAK",
        "class": "us",
        "airport": "Akron Canton Regional Airport",
        "label": "Akron\/Canton, US (CAK)"
    }, {
        "country": "US",
        "city": "Akron\/Canton",
        "code": "CAK",
        "class": "us",
        "airport": "Akron Canton Regional Airport",
        "label": "Akron\/Canton, US (CAK)"
    }, {
        "country": "US",
        "city": "Akron\/Canton",
        "code": "CAK",
        "class": "us",
        "airport": "Akron Canton Regional Airport",
        "label": "Akron\/Canton, US (CAK)"
    }, {
        "country": "US",
        "city": "Akron\/Canton",
        "code": "CAK",
        "class": "us",
        "airport": "Akron Canton Regional Airport",
        "label": "Akron\/Canton, US (CAK)"
    }, {
        "country": "US",
        "city": "Salina",
        "code": "SLN",
        "class": "us",
        "airport": "Salina Municipal Airport",
        "label": "Salina, US (SLN)"
    }, {
        "country": "US",
        "city": "Mekoryuk",
        "code": "MYU",
        "class": "us",
        "airport": "Mekoryuk Airport",
        "label": "Mekoryuk, US (MYU)"
    }, {
        "country": "US",
        "city": "Memphis",
        "code": "MEM",
        "class": "us",
        "airport": "Memphis International Airport",
        "label": "Memphis, US (MEM)"
    }, {
        "country": "US",
        "city": "Adak Island",
        "code": "ADK",
        "class": "us",
        "airport": "Adak Airport",
        "label": "Adak Island, US (ADK)"
    }, {
        "country": "US",
        "city": "Meridian",
        "code": "MEI",
        "class": "us",
        "airport": "Key Field",
        "label": "Meridian, US (MEI)"
    }, {
        "country": "US",
        "city": "Merced",
        "code": "MCE",
        "class": "us",
        "airport": "Merced Regional Macready Field",
        "label": "Merced, US (MCE)"
    }, {
        "country": "US",
        "city": "Medford",
        "code": "MFR",
        "class": "us",
        "airport": "Rogue Valley International Medford Airport",
        "label": "Medford, US (MFR)"
    }, {
        "country": "US",
        "city": "Mcgrath",
        "code": "MCG",
        "class": "us",
        "airport": "McGrath Airport",
        "label": "Mcgrath, US (MCG)"
    }, {
        "country": "US",
        "city": "Akhiok",
        "code": "AKK",
        "class": "us",
        "airport": "Akhiok Airport",
        "label": "Akhiok, US (AKK)"
    }, {
        "country": "US",
        "city": "Massena",
        "code": "MSS",
        "class": "us",
        "airport": "Massena International Richards Field",
        "label": "Massena, US (MSS)"
    }, {
        "country": "US",
        "city": "Yakima",
        "code": "YKM",
        "class": "us",
        "airport": "Yakima Air Terminal McAllister Field",
        "label": "Yakima, US (YKM)"
    }, {
        "country": "US",
        "city": "Mcallen\/Mission",
        "code": "MFE",
        "class": "us",
        "airport": "Mc Allen Miller International Airport",
        "label": "Mcallen\/Mission, US (MFE)"
    }, {
        "country": "US",
        "city": "Mcallen\/Mission",
        "code": "MFE",
        "class": "us",
        "airport": "Mc Allen Miller International Airport",
        "label": "Mcallen\/Mission, US (MFE)"
    }, {
        "country": "US",
        "city": "Mcallen\/Mission",
        "code": "MFE",
        "class": "us",
        "airport": "Mc Allen Miller International Airport",
        "label": "Mcallen\/Mission, US (MFE)"
    }, {
        "country": "US",
        "city": "Akutan",
        "code": "KQA",
        "class": "us",
        "airport": "Akutan Seaplane Base",
        "label": "Akutan, US (KQA)"
    }, {
        "country": "US",
        "city": "Cape Newenham",
        "code": "EHM",
        "class": "us",
        "airport": "Cape Newenham Lrrs Airport",
        "label": "Cape Newenham, US (EHM)"
    }, {
        "country": "US",
        "city": "Long Beach",
        "code": "LGB",
        "class": "us",
        "airport": "Long Beach \/Daugherty Field\/ Airport",
        "label": "Long Beach, US (LGB)"
    }, {
        "country": "US",
        "city": "Cape Lisburne",
        "code": "LUR",
        "class": "us",
        "airport": "Cape Lisburne Lrrs Airport",
        "label": "Cape Lisburne, US (LUR)"
    }, {
        "country": "US",
        "city": "Gallup",
        "code": "GUP",
        "class": "us",
        "airport": "Gallup Municipal Airport",
        "label": "Gallup, US (GUP)"
    }, {
        "country": "US",
        "city": "Alexandria",
        "code": "AEX",
        "class": "us",
        "airport": "Alexandria International Airport",
        "label": "Alexandria, US (AEX)"
    }, {
        "country": "US",
        "city": "Clarksburg",
        "code": "CKB",
        "class": "us",
        "airport": "North Central West Virginia Airport",
        "label": "Clarksburg, US (CKB)"
    }, {
        "country": "US",
        "city": "Lopez Island",
        "code": "LPS",
        "class": "us",
        "airport": "Lopez Island Airport",
        "label": "Lopez Island, US (LPS)"
    }, {
        "country": "US",
        "city": "Alitak",
        "code": "ALZ",
        "class": "us",
        "airport": "Alitak Seaplane Base",
        "label": "Alitak, US (ALZ)"
    }, {
        "country": "US",
        "city": "Allakaket",
        "code": "AET",
        "class": "us",
        "airport": "Allakaket Airport",
        "label": "Allakaket, US (AET)"
    }, {
        "country": "US",
        "city": "Allakaket",
        "code": "AET",
        "class": "us",
        "airport": "Allakaket Airport",
        "label": "Allakaket, US (AET)"
    }, {
        "country": "US",
        "city": "Gambell",
        "code": "GAM",
        "class": "us",
        "airport": "Gambell Airport",
        "label": "Gambell, US (GAM)"
    }, {
        "country": "US",
        "city": "Lincoln",
        "code": "LNK",
        "class": "us",
        "airport": "Lincoln Airport",
        "label": "Lincoln, US (LNK)"
    }, {
        "country": "US",
        "city": "Alliance",
        "code": "AIA",
        "class": "us",
        "airport": "Alliance Municipal Airport",
        "label": "Alliance, US (AIA)"
    }, {
        "country": "US",
        "city": "Allentown",
        "code": "ABE",
        "class": "us",
        "airport": "Lehigh Valley International Airport",
        "label": "Allentown, US (ABE)"
    }, {
        "country": "US",
        "city": "Little Rock",
        "code": "LIT",
        "class": "us",
        "airport": "Adams Field",
        "label": "Little Rock, US (LIT)"
    }, {
        "country": "US",
        "city": "Louisville",
        "code": "SDF",
        "class": "us",
        "airport": "Louisville International Standiford Field",
        "label": "Louisville, US (SDF)"
    }, {
        "country": "US",
        "city": "Louisville",
        "code": "SDF",
        "class": "us",
        "airport": "Louisville International Standiford Field",
        "label": "Louisville, US (SDF)"
    }, {
        "country": "US",
        "city": "Louisville",
        "code": "SDF",
        "class": "us",
        "airport": "Louisville International Standiford Field",
        "label": "Louisville, US (SDF)"
    }, {
        "country": "US",
        "city": "Alamogordo",
        "code": "ALM",
        "class": "us",
        "airport": "Alamogordo White Sands Regional Airport",
        "label": "Alamogordo, US (ALM)"
    }, {
        "country": "US",
        "city": "Macon",
        "code": "MCN",
        "class": "us",
        "airport": "Middle Georgia Regional Airport",
        "label": "Macon, US (MCN)"
    }, {
        "country": "US",
        "city": "Madison",
        "code": "MSN",
        "class": "us",
        "airport": "Dane County Regional Truax Field",
        "label": "Madison, US (MSN)"
    }, {
        "country": "US",
        "city": "Madison",
        "code": "MSN",
        "class": "us",
        "airport": "Dane County Regional Truax Field",
        "label": "Madison, US (MSN)"
    }, {
        "country": "US",
        "city": "Gainesville",
        "code": "GNV",
        "class": "us",
        "airport": "Gainesville Regional Airport",
        "label": "Gainesville, US (GNV)"
    }, {
        "country": "US",
        "city": "Alamosa",
        "code": "ALS",
        "class": "us",
        "airport": "San Luis Valley Regional Bergman Field",
        "label": "Alamosa, US (ALS)"
    }, {
        "country": "US",
        "city": "Lynchburg",
        "code": "LYH",
        "class": "us",
        "airport": "Lynchburg Regional Preston Glenn Field",
        "label": "Lynchburg, US (LYH)"
    }, {
        "country": "US",
        "city": "Aleknagik",
        "code": "WKK",
        "class": "us",
        "airport": "Aleknagik \/ New Airport",
        "label": "Aleknagik, US (WKK)"
    }, {
        "country": "US",
        "city": "Lubbock",
        "code": "LBB",
        "class": "us",
        "airport": "Lubbock Preston Smith International Airport",
        "label": "Lubbock, US (LBB)"
    }, {
        "country": "US",
        "city": "Galena",
        "code": "GAL",
        "class": "us",
        "airport": "Edward G. Pitka Sr Airport",
        "label": "Galena, US (GAL)"
    }, {
        "country": "US",
        "city": "Albuquerque",
        "code": "ABQ",
        "class": "us",
        "airport": "Albuquerque International Sunport Airport",
        "label": "Albuquerque, US (ABQ)"
    }, {
        "country": "US",
        "city": "Albany",
        "code": "ABY",
        "class": "us",
        "airport": "Southwest Georgia Regional Airport",
        "label": "Albany, US - Dougherty County Apt (ABY)"
    }, {
        "country": "US",
        "city": "Albany",
        "code": "ALB",
        "class": "us",
        "airport": "Albany International Airport",
        "label": "Albany, US (ALB)"
    }, {
        "country": "US",
        "city": "Kenai",
        "code": "ENA",
        "class": "us",
        "airport": "Kenai Municipal Airport",
        "label": "Kenai, US (ENA)"
    }, {
        "country": "US",
        "city": "Columbia",
        "code": "COU",
        "class": "us",
        "airport": "Columbia Regional Airport",
        "label": "Columbia, US (COU)"
    }, {
        "country": "US",
        "city": "Columbia",
        "code": "COU",
        "class": "us",
        "airport": "Columbia Regional Airport",
        "label": "Columbia, US (COU)"
    }, {
        "country": "US",
        "city": "Helena",
        "code": "HLN",
        "class": "us",
        "airport": "Helena Regional Airport",
        "label": "Helena, US (HLN)"
    }, {
        "country": "US",
        "city": "Hilo",
        "code": "ITO",
        "class": "us",
        "airport": "Hilo International Airport",
        "label": "Hilo - Hawaii, US (ITO)"
    }, {
        "country": "US",
        "city": "Hilo",
        "code": "ITO",
        "class": "us",
        "airport": "Hilo International Airport",
        "label": "Hilo - Hawaii, US (ITO)"
    }, {
        "country": "US",
        "city": "Goodnews Bay",
        "code": "GNU",
        "class": "us",
        "airport": "Goodnews Airport",
        "label": "Goodnews Bay, US (GNU)"
    }, {
        "country": "US",
        "city": "Goodnews Bay",
        "code": "GNU",
        "class": "us",
        "airport": "Goodnews Airport",
        "label": "Goodnews Bay, US (GNU)"
    }, {
        "country": "US",
        "city": "Goodnews Bay",
        "code": "GNU",
        "class": "us",
        "airport": "Goodnews Airport",
        "label": "Goodnews Bay, US (GNU)"
    }, {
        "country": "US",
        "city": "Goodnews Bay",
        "code": "GNU",
        "class": "us",
        "airport": "Goodnews Airport",
        "label": "Goodnews Bay, US (GNU)"
    }, {
        "country": "US",
        "city": "Goodnews Bay",
        "code": "GNU",
        "class": "us",
        "airport": "Goodnews Airport",
        "label": "Goodnews Bay, US (GNU)"
    }, {
        "country": "US",
        "city": "Harrison",
        "code": "HRO",
        "class": "us",
        "airport": "Boone County Airport",
        "label": "Harrison, US (HRO)"
    }, {
        "country": "US",
        "city": "Harrison",
        "code": "HRO",
        "class": "us",
        "airport": "Boone County Airport",
        "label": "Harrison, US (HRO)"
    }, {
        "country": "US",
        "city": "Barter Island",
        "code": "BTI",
        "class": "us",
        "airport": "Barter Island Lrrs Airport",
        "label": "Barter Island, US (BTI)"
    }, {
        "country": "US",
        "city": "Barrow",
        "code": "BRW",
        "class": "us",
        "airport": "Wiley Post Will Rogers Memorial Airport",
        "label": "Barrow, US (BRW)"
    }, {
        "country": "US",
        "city": "Barrow",
        "code": "BRW",
        "class": "us",
        "airport": "Wiley Post Will Rogers Memorial Airport",
        "label": "Barrow, US (BRW)"
    }, {
        "country": "US",
        "city": "Barrow",
        "code": "BRW",
        "class": "us",
        "airport": "Wiley Post Will Rogers Memorial Airport",
        "label": "Barrow, US (BRW)"
    }, {
        "country": "US",
        "city": "Holy Cross",
        "code": "HCR",
        "class": "us",
        "airport": "Holy Cross Airport",
        "label": "Holy Cross, US (HCR)"
    }, {
        "country": "US",
        "city": "Huntington\/Ashland",
        "code": "HTS",
        "class": "us",
        "airport": "Tri-State\/Milton J. Ferguson Field",
        "label": "Huntington\/Ashland, US (HTS)"
    }, {
        "country": "US",
        "city": "Huntington\/Ashland",
        "code": "HTS",
        "class": "us",
        "airport": "Tri-State\/Milton J. Ferguson Field",
        "label": "Huntington\/Ashland, US (HTS)"
    }, {
        "country": "US",
        "city": "Huntsville",
        "code": "HSV",
        "class": "us",
        "airport": "Huntsville International Carl T Jones Field",
        "label": "Huntsville, US (HSV)"
    }, {
        "country": "US",
        "city": "Huntsville",
        "code": "HSV",
        "class": "us",
        "airport": "Huntsville International Carl T Jones Field",
        "label": "Huntsville, US (HSV)"
    }, {
        "country": "US",
        "city": "Huntsville",
        "code": "HSV",
        "class": "us",
        "airport": "Huntsville International Carl T Jones Field",
        "label": "Huntsville, US (HSV)"
    }, {
        "country": "US",
        "city": "Huron",
        "code": "HON",
        "class": "us",
        "airport": "Huron Regional Airport",
        "label": "Huron, US (HON)"
    }, {
        "country": "US",
        "city": "Bend\/Redmond",
        "code": "RDM",
        "class": "us",
        "airport": "Roberts Field",
        "label": "Bend\/Redmond, US (RDM)"
    }, {
        "country": "US",
        "city": "Bangor",
        "code": "BGR",
        "class": "us",
        "airport": "Bangor International Airport",
        "label": "Bangor, US (BGR)"
    }, {
        "country": "US",
        "city": "Hoolehua",
        "code": "MKK",
        "class": "us",
        "airport": "Molokai Airport",
        "label": "Hoolehua, US (MKK)"
    }, {
        "country": "US",
        "city": "Homer",
        "code": "HOM",
        "class": "us",
        "airport": "Homer Airport",
        "label": "Homer, US (HOM)"
    }, {
        "country": "US",
        "city": "Hoonah",
        "code": "HNH",
        "class": "us",
        "airport": "Hoonah Airport",
        "label": "Hoonah, US (HNH)"
    }, {
        "country": "US",
        "city": "Hooper Bay",
        "code": "HPB",
        "class": "us",
        "airport": "Hooper Bay Airport",
        "label": "Hooper Bay, US (HPB)"
    }, {
        "country": "US",
        "city": "Hot Springs",
        "code": "HOT",
        "class": "us",
        "airport": "Memorial Field",
        "label": "Hot Springs, US (HOT)"
    }, {
        "country": "US",
        "city": "Bar Harbor",
        "code": "BHB",
        "class": "us",
        "airport": "Hancock County-Bar Harbor Airport",
        "label": "Bar Harbor, US (BHB)"
    }, {
        "country": "US",
        "city": "Harrisburg",
        "code": "MDT",
        "class": "us",
        "airport": "Harrisburg International Airport",
        "label": "Harrisburg, US (MDT)"
    }, {
        "country": "US",
        "city": "Harlingen",
        "code": "HRL",
        "class": "us",
        "airport": "Valley International Airport",
        "label": "Harlingen, US (HRL)"
    }, {
        "country": "US",
        "city": "Green Bay",
        "code": "GRB",
        "class": "us",
        "airport": "Austin Straubel International Airport",
        "label": "Green Bay, US (GRB)"
    }, {
        "country": "US",
        "city": "Great Falls",
        "code": "GTF",
        "class": "us",
        "airport": "Great Falls International Airport",
        "label": "Great Falls, US (GTF)"
    }, {
        "country": "US",
        "city": "Greensboro",
        "code": "GSO",
        "class": "us",
        "airport": "Piedmont Triad International Airport",
        "label": "Greensboro, US (GSO)"
    }, {
        "country": "US",
        "city": "Greenville",
        "code": "GLH",
        "class": "us",
        "airport": "Mid Delta Regional Airport",
        "label": "Greenville, US (GLH)"
    }, {
        "country": "US",
        "city": "Greenville\/Greer",
        "code": "GSP",
        "class": "us",
        "airport": "Greenville Spartanburg International Airport",
        "label": "Greenville\/Greer, US (GSP)"
    }, {
        "country": "US",
        "city": "Greenville\/Greer",
        "code": "GSP",
        "class": "us",
        "airport": "Greenville Spartanburg International Airport",
        "label": "Greenville\/Greer, US (GSP)"
    }, {
        "country": "US",
        "city": "Greenville\/Greer",
        "code": "GSP",
        "class": "us",
        "airport": "Greenville Spartanburg International Airport",
        "label": "Greenville\/Greer, US (GSP)"
    }, {
        "country": "US",
        "city": "Greenville\/Greer",
        "code": "GSP",
        "class": "us",
        "airport": "Greenville Spartanburg International Airport",
        "label": "Greenville\/Greer, US (GSP)"
    }, {
        "country": "US",
        "city": "Grand Forks",
        "code": "GFK",
        "class": "us",
        "airport": "Grand Forks International Airport",
        "label": "Grand Forks, US (GFK)"
    }, {
        "country": "US",
        "city": "Grand Canyon",
        "code": "GCN",
        "class": "us",
        "airport": "Grand Canyon National Park Airport",
        "label": "Grand Canyon, US (GCN)"
    }, {
        "country": "US",
        "city": "Grand Island",
        "code": "GRI",
        "class": "us",
        "airport": "Central Nebraska Regional Airport",
        "label": "Grand Island, US (GRI)"
    }, {
        "country": "US",
        "city": "Grand Junction",
        "code": "GJT",
        "class": "us",
        "airport": "Grand Junction Regional Airport",
        "label": "Grand Junction, US (GJT)"
    }, {
        "country": "US",
        "city": "Grand Junction",
        "code": "GJT",
        "class": "us",
        "airport": "Grand Junction Regional Airport",
        "label": "Grand Junction, US (GJT)"
    }, {
        "country": "US",
        "city": "Grand Rapids",
        "code": "GRR",
        "class": "us",
        "airport": "Gerald R. Ford International Airport",
        "label": "Grand Rapids, US (GRR)"
    }, {
        "country": "US",
        "city": "Corpus Christi",
        "code": "CRP",
        "class": "us",
        "airport": "Corpus Christi International Airport",
        "label": "Corpus Christi, US (CRP)"
    }, {
        "country": "US",
        "city": "Bedford\/Hanscom",
        "code": "BED",
        "class": "us",
        "airport": "Laurence G Hanscom Field",
        "label": "Bedford\/Hanscom, US (BED)"
    }, {
        "country": "US",
        "city": "Baton Rouge",
        "code": "BTR",
        "class": "us",
        "airport": "Baton Rouge Metropolitan, Ryan Field",
        "label": "Baton Rouge, US (BTR)"
    }, {
        "country": "US",
        "city": "Haines",
        "code": "HNS",
        "class": "us",
        "airport": "Haines Airport",
        "label": "Haines, US (HNS)"
    }, {
        "country": "US",
        "city": "Hampton",
        "code": "PHF",
        "class": "us",
        "airport": "Newport News Williamsburg International Airport",
        "label": "Hampton, US (PHF)"
    }, {
        "country": "US",
        "city": "Hana",
        "code": "HNM",
        "class": "us",
        "airport": "Hana Airport",
        "label": "Hana, US (HNM)"
    }, {
        "country": "US",
        "city": "Hanover",
        "code": "LEB",
        "class": "us",
        "airport": "Lebanon Municipal Airport",
        "label": "Hanover, US (LEB)"
    }, {
        "country": "US",
        "city": "Hancock",
        "code": "CMX",
        "class": "us",
        "airport": "Houghton County Memorial Airport",
        "label": "Hancock, US (CMX)"
    }, {
        "country": "US",
        "city": "Hailey\/Sun Valley",
        "code": "SUN",
        "class": "us",
        "airport": "Friedman Memorial Airport",
        "label": "Hailey\/Sun Valley, US (SUN)"
    }, {
        "country": "US",
        "city": "Bay City\/Midland\/Saginaw",
        "code": "MBS",
        "class": "us",
        "airport": "MBS International Airport",
        "label": "Bay City\/Midland\/Saginaw, US (MBS)"
    }, {
        "country": "US",
        "city": "Gulfport",
        "code": "GPT",
        "class": "us",
        "airport": "Gulfport Biloxi International Airport",
        "label": "Gulfport, US (GPT)"
    }, {
        "country": "US",
        "city": "Beckley",
        "code": "BKW",
        "class": "us",
        "airport": "Raleigh County Memorial Airport",
        "label": "Beckley, US (BKW)"
    }, {
        "country": "US",
        "city": "Beckley",
        "code": "BKW",
        "class": "us",
        "airport": "Raleigh County Memorial Airport",
        "label": "Beckley, US (BKW)"
    }, {
        "country": "US",
        "city": "Gustavus",
        "code": "GST",
        "class": "us",
        "airport": "Gustavus Airport",
        "label": "Gustavus, US (GST)"
    }, {
        "country": "US",
        "city": "Beaumont",
        "code": "BPT",
        "class": "us",
        "airport": "Southeast Texas Regional Airport",
        "label": "Beaumont, US (BPT)"
    }, {
        "country": "US",
        "city": "Beaumont",
        "code": "BPT",
        "class": "us",
        "airport": "Southeast Texas Regional Airport",
        "label": "Beaumont, US (BPT)"
    }, {
        "country": "US",
        "city": "Hyannis",
        "code": "HYA",
        "class": "us",
        "airport": "Barnstable Municipal Boardman Polando Field",
        "label": "Hyannis, US (HYA)"
    }, {
        "country": "US",
        "city": "Hydaburg",
        "code": "HYG",
        "class": "us",
        "airport": "Hydaburg Seaplane Base",
        "label": "Hydaburg, US (HYG)"
    }, {
        "country": "US",
        "city": "Kalskag",
        "code": "KLG",
        "class": "us",
        "airport": "Kalskag Airport",
        "label": "Kalskag, US (KLG)"
    }, {
        "country": "US",
        "city": "Kalispell",
        "code": "FCA",
        "class": "us",
        "airport": "Glacier Park International Airport",
        "label": "Kalispell, US (FCA)"
    }, {
        "country": "US",
        "city": "Kaltag",
        "code": "KAL",
        "class": "us",
        "airport": "Kaltag Airport",
        "label": "Kaltag, US (KAL)"
    }, {
        "country": "US",
        "city": "Kamuela",
        "code": "MUE",
        "class": "us",
        "airport": "Waimea Kohala Airport",
        "label": "Kamuela, US (MUE)"
    }, {
        "country": "US",
        "city": "Kamuela",
        "code": "MUE",
        "class": "us",
        "airport": "Waimea Kohala Airport",
        "label": "Kamuela, US (MUE)"
    }, {
        "country": "US",
        "city": "Gladewater",
        "code": "GGG",
        "class": "us",
        "airport": "East Texas Regional Airport",
        "label": "Gladewater, US (GGG)"
    }, {
        "country": "US",
        "city": "Kalaupapa",
        "code": "LUP",
        "class": "us",
        "airport": "Kalaupapa Airport",
        "label": "Kalaupapa, US (LUP)"
    }, {
        "country": "US",
        "city": "Kalamazoo",
        "code": "AZO",
        "class": "us",
        "airport": "Kalamazoo Battle Creek International Airport",
        "label": "Kalamazoo, US (AZO)"
    }, {
        "country": "US",
        "city": "Kalamazoo",
        "code": "AZO",
        "class": "us",
        "airport": "Kalamazoo Battle Creek International Airport",
        "label": "Kalamazoo, US (AZO)"
    }, {
        "country": "US",
        "city": "Juneau",
        "code": "JNU",
        "class": "us",
        "airport": "Juneau International Airport",
        "label": "Juneau, US (JNU)"
    }, {
        "country": "US",
        "city": "Kahului",
        "code": "OGG",
        "class": "us",
        "airport": "Kahului Airport",
        "label": "Kahului, US (OGG)"
    }, {
        "country": "US",
        "city": "Kake",
        "code": "KAE",
        "class": "us",
        "airport": "Kake Seaplane Base",
        "label": "Kake, US (KAE)"
    }, {
        "country": "US",
        "city": "Kake",
        "code": "KAE",
        "class": "us",
        "airport": "Kake Seaplane Base",
        "label": "Kake, US (KAE)"
    }, {
        "country": "US",
        "city": "Kake",
        "code": "KAE",
        "class": "us",
        "airport": "Kake Seaplane Base",
        "label": "Kake, US (KAE)"
    }, {
        "country": "US",
        "city": "Kansas City",
        "code": "MCI",
        "class": "us",
        "airport": "Kansas City International Airport",
        "label": "Kansas City, US (MCI)"
    }, {
        "country": "US",
        "city": "Kapalua",
        "code": "JHM",
        "class": "us",
        "airport": "Kapalua Airport",
        "label": "Kapalua, US (JHM)"
    }, {
        "country": "US",
        "city": "Bettles",
        "code": "BTT",
        "class": "us",
        "airport": "Bettles Airport",
        "label": "Bettles, US (BTT)"
    }, {
        "country": "US",
        "city": "Bethel",
        "code": "BET",
        "class": "us",
        "airport": "Bethel Airport",
        "label": "Bethel, US (BET)"
    }, {
        "country": "US",
        "city": "Arcata",
        "code": "ACV",
        "class": "us",
        "airport": "Arcata Airport",
        "label": "Arcata, US (ACV)"
    }, {
        "country": "US",
        "city": "Kauai Island",
        "code": "LIH",
        "class": "us",
        "airport": "Lihue Airport",
        "label": "Kauai Island, US (LIH)"
    }, {
        "country": "US",
        "city": "Columbus",
        "code": "CMH",
        "class": "us",
        "airport": "Port Columbus International Airport",
        "label": "Columbus, US (CMH)"
    }, {
        "country": "US",
        "city": "Kearney",
        "code": "EAR",
        "class": "us",
        "airport": "Kearney Regional Airport",
        "label": "Kearney, US (EAR)"
    }, {
        "country": "US",
        "city": "Kearney",
        "code": "EAR",
        "class": "us",
        "airport": "Kearney Regional Airport",
        "label": "Kearney, US (EAR)"
    }, {
        "country": "US",
        "city": "Arctic Village",
        "code": "ARC",
        "class": "us",
        "airport": "Arctic Village Airport",
        "label": "Arctic Village, US (ARC)"
    }, {
        "country": "US",
        "city": "Arctic Village",
        "code": "ARC",
        "class": "us",
        "airport": "Arctic Village Airport",
        "label": "Arctic Village, US (ARC)"
    }, {
        "country": "US",
        "city": "Asheville\/Hendersonville",
        "code": "AVL",
        "class": "us",
        "airport": "Asheville Regional Airport",
        "label": "Asheville\/Hendersonville, US (AVL)"
    }, {
        "country": "US",
        "city": "Asheville\/Hendersonville",
        "code": "AVL",
        "class": "us",
        "airport": "Asheville Regional Airport",
        "label": "Asheville\/Hendersonville, US (AVL)"
    }, {
        "country": "US",
        "city": "Asheville\/Hendersonville",
        "code": "AVL",
        "class": "us",
        "airport": "Asheville Regional Airport",
        "label": "Asheville\/Hendersonville, US (AVL)"
    }, {
        "country": "US",
        "city": "Asheville\/Hendersonville",
        "code": "AVL",
        "class": "us",
        "airport": "Asheville Regional Airport",
        "label": "Asheville\/Hendersonville, US (AVL)"
    }, {
        "country": "US",
        "city": "Columbus",
        "code": "CSG",
        "class": "us",
        "airport": "Columbus Metropolitan Airport",
        "label": "Columbus, US (CSG)"
    }, {
        "country": "US",
        "city": "Atka",
        "code": "AKB",
        "class": "us",
        "airport": "Atka Airport",
        "label": "Atka, US (AKB)"
    }, {
        "country": "US",
        "city": "Atlantic City",
        "code": "ACY",
        "class": "us",
        "airport": "Atlantic City International Airport",
        "label": "Atlantic City, US (ACY)"
    }, {
        "country": "US",
        "city": "Atlantic City",
        "code": "ACY",
        "class": "us",
        "airport": "Atlantic City International Airport",
        "label": "Atlantic City, US (ACY)"
    }, {
        "country": "US",
        "city": "Atlantic City",
        "code": "ACY",
        "class": "us",
        "airport": "Atlantic City International Airport",
        "label": "Atlantic City, US (ACY)"
    }, {
        "country": "US",
        "city": "Atlantic City",
        "code": "ACY",
        "class": "us",
        "airport": "Atlantic City International Airport",
        "label": "Atlantic City, US (ACY)"
    }, {
        "country": "US",
        "city": "Atlantic City",
        "code": "ACY",
        "class": "us",
        "airport": "Atlantic City International Airport",
        "label": "Atlantic City, US (ACY)"
    }, {
        "country": "US",
        "city": "Ithaca",
        "code": "ITH",
        "class": "us",
        "airport": "Ithaca Tompkins Regional Airport",
        "label": "Ithaca, US (ITH)"
    }, {
        "country": "US",
        "city": "Islip",
        "code": "ISP",
        "class": "us",
        "airport": "Long Island Mac Arthur Airport",
        "label": "Islip, US (ISP)"
    }, {
        "country": "US",
        "city": "International Falls",
        "code": "INL",
        "class": "us",
        "airport": "Falls International Airport",
        "label": "International Falls, US (INL)"
    }, {
        "country": "US",
        "city": "Corning\/Elmira",
        "code": "ELM",
        "class": "us",
        "airport": "Elmira Corning Regional Airport",
        "label": "Corning\/Elmira, US (ELM)"
    }, {
        "country": "US",
        "city": "Igiugig",
        "code": "IGG",
        "class": "us",
        "airport": "Igiugig Airport",
        "label": "Igiugig, US (IGG)"
    }, {
        "country": "US",
        "city": "Idaho Falls",
        "code": "IDA",
        "class": "us",
        "airport": "Idaho Falls Regional Airport",
        "label": "Idaho Falls, US (IDA)"
    }, {
        "country": "US",
        "city": "Baltimore",
        "code": "BWI",
        "class": "us",
        "airport": "Baltimore\/Washington International Thurgood Marshal Airport",
        "label": "Baltimore, US (BWI)"
    }, {
        "country": "US",
        "city": "Iliamna",
        "code": "ILI",
        "class": "us",
        "airport": "Iliamna Airport",
        "label": "Iliamna, US (ILI)"
    }, {
        "country": "US",
        "city": "Bakersfield",
        "code": "BFL",
        "class": "us",
        "airport": "Meadows Field",
        "label": "Bakersfield, US (BFL)"
    }, {
        "country": "US",
        "city": "Bakersfield",
        "code": "BFL",
        "class": "us",
        "airport": "Meadows Field",
        "label": "Bakersfield, US (BFL)"
    }, {
        "country": "US",
        "city": "Cordova",
        "code": "CDV",
        "class": "us",
        "airport": "Merle K (Mudhole) Smith Airport",
        "label": "Cordova, US (CDV)"
    }, {
        "country": "US",
        "city": "Jackson",
        "code": "JAC",
        "class": "us",
        "airport": "Jackson Hole Airport",
        "label": "Jackson, US (JAC)"
    }, {
        "country": "US",
        "city": "Atqasuk",
        "code": "ATK",
        "class": "us",
        "airport": "Atqasuk Edward Burnell Sr Memorial Airport",
        "label": "Atqasuk, US (ATK)"
    }, {
        "country": "US",
        "city": "Augusta",
        "code": "AGS",
        "class": "us",
        "airport": "Augusta Regional At Bush Field",
        "label": "Augusta, US (AGS)"
    }, {
        "country": "US",
        "city": "Johnstown",
        "code": "JST",
        "class": "us",
        "airport": "John Murtha Johnstown Cambria County Airport",
        "label": "Johnstown, US (JST)"
    }, {
        "country": "US",
        "city": "Johnstown",
        "code": "JST",
        "class": "us",
        "airport": "John Murtha Johnstown Cambria County Airport",
        "label": "Johnstown, US (JST)"
    }, {
        "country": "US",
        "city": "Joplin",
        "code": "JLN",
        "class": "us",
        "airport": "Joplin Regional Airport",
        "label": "Joplin, US (JLN)"
    }, {
        "country": "US",
        "city": "Jonesboro",
        "code": "JBR",
        "class": "us",
        "airport": "Jonesboro Municipal Airport",
        "label": "Jonesboro, US (JBR)"
    }, {
        "country": "US",
        "city": "Augusta",
        "code": "AUG",
        "class": "us",
        "airport": "Augusta State Airport",
        "label": "Augusta, US (AUG)"
    }, {
        "country": "US",
        "city": "Butte",
        "code": "BTM",
        "class": "us",
        "airport": "Bert Mooney Airport",
        "label": "Butte, US (BTM)"
    }, {
        "country": "US",
        "city": "Jackson",
        "code": "MKL",
        "class": "us",
        "airport": "Mc Kellar Sipes Regional Airport",
        "label": "Jackson, US (MKL)"
    }, {
        "country": "US",
        "city": "Jackson",
        "code": "JAN",
        "class": "us",
        "airport": "Jackson Evers International Airport",
        "label": "Jackson, US (JAN)"
    }, {
        "country": "US",
        "city": "Jackson",
        "code": "JAN",
        "class": "us",
        "airport": "Jackson Evers International Airport",
        "label": "Jackson, US (JAN)"
    }, {
        "country": "US",
        "city": "Jacksonville",
        "code": "JAX",
        "class": "us",
        "airport": "Jacksonville International Airport",
        "label": "Jacksonville, US (JAX)"
    }, {
        "country": "US",
        "city": "Jamestown",
        "code": "JMS",
        "class": "us",
        "airport": "Jamestown Regional Airport",
        "label": "Jamestown, US (JMS)"
    }, {
        "country": "US",
        "city": "Jamestown",
        "code": "JMS",
        "class": "us",
        "airport": "Jamestown Regional Airport",
        "label": "Jamestown, US (JMS)"
    }, {
        "country": "US",
        "city": "Mesa",
        "code": "AZA",
        "class": "us",
        "airport": "Phoenix-Mesa-Gateway Airport",
        "label": "Mesa, US (AZA)"
    }, {
        "country": "US",
        "city": "Yuma",
        "code": "YUM",
        "class": "us",
        "airport": "Yuma MCAS\/Yuma International Airport",
        "label": "Yuma, US (YUM)"
    }, {
        "country": "US",
        "city": "Yuma",
        "code": "YUM",
        "class": "us",
        "airport": "Yuma MCAS\/Yuma International Airport",
        "label": "Yuma, US (YUM)"
    }, {
        "country": "US",
        "city": "Yuma",
        "code": "YUM",
        "class": "us",
        "airport": "Yuma MCAS\/Yuma International Airport",
        "label": "Yuma, US (YUM)"
    }, {
        "country": "US",
        "city": "Yuma",
        "code": "YUM",
        "class": "us",
        "airport": "Yuma MCAS\/Yuma International Airport",
        "label": "Yuma, US (YUM)"
    }, {
        "country": "US",
        "city": "Portage Creek",
        "code": "PCA",
        "class": "us",
        "airport": "Portage Creek Airport",
        "label": "Portage Creek, US (PCA)"
    }, {
        "country": "US",
        "city": "El Paso",
        "code": "ELP",
        "class": "us",
        "airport": "El Paso International Airport",
        "label": "El Paso, US (ELP)"
    }, {
        "country": "US",
        "city": "Portsmouth",
        "code": "PSM",
        "class": "us",
        "airport": "Portsmouth International at Pease Airport",
        "label": "Portsmouth, US (PSM)"
    }, {
        "country": "US",
        "city": "Portsmouth",
        "code": "PSM",
        "class": "us",
        "airport": "Portsmouth International at Pease Airport",
        "label": "Portsmouth, US (PSM)"
    }, {
        "country": "US",
        "city": "Honolulu",
        "code": "HNL",
        "class": "us",
        "airport": "Honolulu International Airport",
        "label": "Honolulu - Hawaii, US (HNL)"
    }, {
        "country": "US",
        "city": "Port Clarence",
        "code": "KPC",
        "class": "us",
        "airport": "Port Clarence Coast Guard Station",
        "label": "Port Clarence, US (KPC)"
    }, {
        "country": "US",
        "city": "Port Clarence",
        "code": "KPC",
        "class": "us",
        "airport": "Port Clarence Coast Guard Station",
        "label": "Port Clarence, US (KPC)"
    }, {
        "country": "US",
        "city": "Burlington",
        "code": "BRL",
        "class": "us",
        "airport": "Southeast Iowa Regional Airport",
        "label": "Burlington, US (BRL)"
    }, {
        "country": "US",
        "city": "Burlington",
        "code": "BRL",
        "class": "us",
        "airport": "Southeast Iowa Regional Airport",
        "label": "Burlington, US (BRL)"
    }, {
        "country": "US",
        "city": "Port Heiden",
        "code": "PTH",
        "class": "us",
        "airport": "Port Heiden Airport",
        "label": "Port Heiden, US (PTH)"
    }, {
        "country": "US",
        "city": "Indianapolis",
        "code": "IND",
        "class": "us",
        "airport": "Indianapolis International Airport",
        "label": "Indianapolis, US (IND)"
    }, {
        "country": "US",
        "city": "Saint Petersburg",
        "code": "PIE",
        "class": "us",
        "airport": "St Petersburg Clearwater International Airport",
        "label": "Saint Petersburg, US (PIE)"
    }, {
        "country": "US",
        "city": "Prescott",
        "code": "PRC",
        "class": "us",
        "airport": "Ernest A. Love Field",
        "label": "Prescott, US (PRC)"
    }, {
        "country": "US",
        "city": "Wrangell",
        "code": "WRG",
        "class": "us",
        "airport": "Wrangell Airport",
        "label": "Wrangell, US (WRG)"
    }, {
        "country": "US",
        "city": "Pueblo",
        "code": "PUB",
        "class": "us",
        "airport": "Pueblo Memorial Airport",
        "label": "Pueblo, US (PUB)"
    }, {
        "country": "US",
        "city": "Ekwok",
        "code": "KEK",
        "class": "us",
        "airport": "Ekwok Airport",
        "label": "Ekwok, US (KEK)"
    }, {
        "country": "US",
        "city": "San Jose",
        "code": "SJC",
        "class": "us",
        "airport": "Norman Y. Mineta San Jose International Airport",
        "label": "San Jose, US (SJC)"
    }, {
        "country": "US",
        "city": "Worland",
        "code": "WRL",
        "class": "us",
        "airport": "Worland Municipal Airport",
        "label": "Worland, US (WRL)"
    }, {
        "country": "US",
        "city": "Worland",
        "code": "WRL",
        "class": "us",
        "airport": "Worland Municipal Airport",
        "label": "Worland, US (WRL)"
    }, {
        "country": "US",
        "city": "Prudhoe Bay\/Deadhorse",
        "code": "SCC",
        "class": "us",
        "airport": "Deadhorse Airport",
        "label": "Prudhoe Bay\/Deadhorse, US (SCC)"
    }, {
        "country": "US",
        "city": "Prudhoe Bay\/Deadhorse",
        "code": "SCC",
        "class": "us",
        "airport": "Deadhorse Airport",
        "label": "Prudhoe Bay\/Deadhorse, US (SCC)"
    }, {
        "country": "US",
        "city": "El Dorado",
        "code": "ELD",
        "class": "us",
        "airport": "South Arkansas Regional At Goodwin Field",
        "label": "El Dorado, US (ELD)"
    }, {
        "country": "US",
        "city": "Presque Isle",
        "code": "PQI",
        "class": "us",
        "airport": "Northern Maine Regional Airport at Presque Isle",
        "label": "Presque Isle, US (PQI)"
    }, {
        "country": "US",
        "city": "Presque Isle",
        "code": "PQI",
        "class": "us",
        "airport": "Northern Maine Regional Airport at Presque Isle",
        "label": "Presque Isle, US (PQI)"
    }, {
        "country": "US",
        "city": "Crescent City",
        "code": "CEC",
        "class": "us",
        "airport": "Jack Mc Namara Field Airport",
        "label": "Crescent City, US (CEC)"
    }, {
        "country": "US",
        "city": "Carmel\/Monterey",
        "code": "MRY",
        "class": "us",
        "airport": "Monterey Peninsula Airport",
        "label": "Carmel\/Monterey, US (MRY)"
    }, {
        "country": "US",
        "city": "Providence",
        "code": "PVD",
        "class": "us",
        "airport": "Theodore Francis Green State Airport",
        "label": "Providence, US (PVD)"
    }, {
        "country": "US",
        "city": "Port Angeles",
        "code": "CLM",
        "class": "us",
        "airport": "William R Fairchild International Airport",
        "label": "Port Angeles, US (CLM)"
    }, {
        "country": "US",
        "city": "Port Angeles",
        "code": "CLM",
        "class": "us",
        "airport": "William R Fairchild International Airport",
        "label": "Port Angeles, US (CLM)"
    }, {
        "country": "US",
        "city": "Peoria",
        "code": "PIA",
        "class": "us",
        "airport": "Greater Peoria Regional Airport",
        "label": "Peoria, US (PIA)"
    }, {
        "country": "US",
        "city": "Cleveland",
        "code": "CLE",
        "class": "us",
        "airport": "Cleveland Hopkins International Airport",
        "label": "Cleveland, US (CLE)"
    }, {
        "country": "US",
        "city": "Cleveland",
        "code": "CLE",
        "class": "us",
        "airport": "Cleveland Hopkins International Airport",
        "label": "Cleveland, US (CLE)"
    }, {
        "country": "US",
        "city": "Cleveland",
        "code": "CLE",
        "class": "us",
        "airport": "Cleveland Hopkins International Airport",
        "label": "Cleveland, US (CLE)"
    }, {
        "country": "US",
        "city": "Petersburg",
        "code": "PSG",
        "class": "us",
        "airport": "Petersburg James A Johnson Airport",
        "label": "Petersburg, US (PSG)"
    }, {
        "country": "US",
        "city": "Petersburg",
        "code": "PSG",
        "class": "us",
        "airport": "Petersburg James A Johnson Airport",
        "label": "Petersburg, US (PSG)"
    }, {
        "country": "US",
        "city": "Pensacola",
        "code": "PNS",
        "class": "us",
        "airport": "Pensacola Regional Airport",
        "label": "Pensacola, US (PNS)"
    }, {
        "country": "US",
        "city": "Pensacola",
        "code": "PNS",
        "class": "us",
        "airport": "Pensacola Regional Airport",
        "label": "Pensacola, US (PNS)"
    }, {
        "country": "US",
        "city": "Portland",
        "code": "PWM",
        "class": "us",
        "airport": "Portland International Jetport Airport",
        "label": "Portland, US (PWM)"
    }, {
        "country": "US",
        "city": "Austin",
        "code": "AUS",
        "class": "us",
        "airport": "Austin Bergstrom International Airport",
        "label": "Austin, US (AUS)"
    }, {
        "country": "US",
        "city": "Portland",
        "code": "PDX",
        "class": "us",
        "airport": "Portland International Airport",
        "label": "Portland, US (PDX)"
    }, {
        "country": "US",
        "city": "Portland",
        "code": "PDX",
        "class": "us",
        "airport": "Portland International Airport",
        "label": "Portland, US (PDX)"
    }, {
        "country": "US",
        "city": "Pellston",
        "code": "PLN",
        "class": "us",
        "airport": "Pellston Regional Airport of Emmet County Airport",
        "label": "Pellston, US (PLN)"
    }, {
        "country": "US",
        "city": "Pellston",
        "code": "PLN",
        "class": "us",
        "airport": "Pellston Regional Airport of Emmet County Airport",
        "label": "Pellston, US (PLN)"
    }, {
        "country": "US",
        "city": "Tampa",
        "code": "TPA",
        "class": "us",
        "airport": "Tampa International Airport",
        "label": "Tampa, US (TPA)"
    }, {
        "country": "US",
        "city": "Pierre",
        "code": "PIR",
        "class": "us",
        "airport": "Pierre Regional Airport",
        "label": "Pierre, US (PIR)"
    }, {
        "country": "US",
        "city": "Point Hope",
        "code": "PHO",
        "class": "us",
        "airport": "Point Hope Airport",
        "label": "Point Hope, US (PHO)"
    }, {
        "country": "US",
        "city": "Point Hope",
        "code": "PHO",
        "class": "us",
        "airport": "Point Hope Airport",
        "label": "Point Hope, US (PHO)"
    }, {
        "country": "US",
        "city": "Point Lay",
        "code": "PIZ",
        "class": "us",
        "airport": "Point Lay Lrrs Airport",
        "label": "Point Lay, US (PIZ)"
    }, {
        "country": "US",
        "city": "Carlsbad",
        "code": "CNM",
        "class": "us",
        "airport": "Cavern City Air Terminal",
        "label": "Carlsbad, US (CNM)"
    }, {
        "country": "US",
        "city": "New York",
        "code": "JFK",
        "class": "us",
        "airport": "John F Kennedy International Airport",
        "label": "New York, US - John F Kennedy (JFK)"
    }, {
        "country": "US",
        "city": "New York",
        "code": "JFK",
        "class": "us",
        "airport": "John F Kennedy International Airport",
        "label": "New York, US - John F Kennedy (JFK)"
    }, {
        "country": "US",
        "city": "Pocatello",
        "code": "PIH",
        "class": "us",
        "airport": "Pocatello Regional Airport",
        "label": "Pocatello, US (PIH)"
    }, {
        "country": "US",
        "city": "Pocatello",
        "code": "PIH",
        "class": "us",
        "airport": "Pocatello Regional Airport",
        "label": "Pocatello, US (PIH)"
    }, {
        "country": "US",
        "city": "Pocatello",
        "code": "PIH",
        "class": "us",
        "airport": "Pocatello Regional Airport",
        "label": "Pocatello, US (PIH)"
    }, {
        "country": "US",
        "city": "Buffalo",
        "code": "BUF",
        "class": "us",
        "airport": "Buffalo Niagara International Airport",
        "label": "Buffalo, US (BUF)"
    }, {
        "country": "US",
        "city": "Pilot Point",
        "code": "UGB",
        "class": "us",
        "airport": "Ugashik Bay Airport",
        "label": "Pilot Point, US (UGB)"
    }, {
        "country": "US",
        "city": "Pilot Point",
        "code": "UGB",
        "class": "us",
        "airport": "Ugashik Bay Airport",
        "label": "Pilot Point, US (UGB)"
    }, {
        "country": "US",
        "city": "Plattsburgh",
        "code": "PBG",
        "class": "us",
        "airport": "Plattsburgh International Airport",
        "label": "Plattsburgh, US (PBG)"
    }, {
        "country": "US",
        "city": "Platinum",
        "code": "PTU",
        "class": "us",
        "airport": "Platinum Airport",
        "label": "Platinum, US (PTU)"
    }, {
        "country": "US",
        "city": "Denver",
        "code": "DEN",
        "class": "us",
        "airport": "Denver International Airport",
        "label": "Denver, US (DEN)"
    }, {
        "country": "US",
        "city": "Pullman",
        "code": "PUW",
        "class": "us",
        "airport": "Pullman Moscow Regional Airport",
        "label": "Pullman, US (PUW)"
    }, {
        "country": "US",
        "city": "Dutch Harbor",
        "code": "DUT",
        "class": "us",
        "airport": "Unalaska Airport",
        "label": "Dutch Harbor, US (DUT)"
    }, {
        "country": "US",
        "city": "Dutch Harbor",
        "code": "DUT",
        "class": "us",
        "airport": "Unalaska Airport",
        "label": "Dutch Harbor, US (DUT)"
    }, {
        "country": "US",
        "city": "Roswell",
        "code": "ROW",
        "class": "us",
        "airport": "Roswell International Air Center Airport",
        "label": "Roswell, US (ROW)"
    }, {
        "country": "US",
        "city": "Minneapolis",
        "code": "MSP",
        "class": "us",
        "airport": "Minneapolis-St Paul International\/Wold-Chamberlain Airport",
        "label": "Minneapolis, US (MSP)"
    }, {
        "country": "US",
        "city": "Phoenix",
        "code": "PHX",
        "class": "us",
        "airport": "Phoenix Sky Harbor International Airport",
        "label": "Phoenix, US (PHX)"
    }, {
        "country": "US",
        "city": "Ruby",
        "code": "RBY",
        "class": "us",
        "airport": "Ruby Airport",
        "label": "Ruby, US (RBY)"
    }, {
        "country": "US",
        "city": "Chevak",
        "code": "VAK",
        "class": "us",
        "airport": "Chevak Airport",
        "label": "Chevak, US (VAK)"
    }, {
        "country": "US",
        "city": "Chevak",
        "code": "VAK",
        "class": "us",
        "airport": "Chevak Airport",
        "label": "Chevak, US (VAK)"
    }, {
        "country": "US",
        "city": "Chevak",
        "code": "VAK",
        "class": "us",
        "airport": "Chevak Airport",
        "label": "Chevak, US (VAK)"
    }, {
        "country": "US",
        "city": "Durham",
        "code": "RDU",
        "class": "us",
        "airport": "Raleigh Durham International Airport",
        "label": "Durham, US (RDU)"
    }, {
        "country": "US",
        "city": "Rochester",
        "code": "ROC",
        "class": "us",
        "airport": "Greater Rochester International Airport",
        "label": "Rochester, US (ROC)"
    }, {
        "country": "US",
        "city": "Rochester",
        "code": "RST",
        "class": "us",
        "airport": "Rochester International Airport",
        "label": "Rochester, US (RST)"
    }, {
        "country": "US",
        "city": "Rockford",
        "code": "RFD",
        "class": "us",
        "airport": "Chicago Rockford International Airport",
        "label": "Rockford, US (RFD)"
    }, {
        "country": "US",
        "city": "Rock Springs",
        "code": "RKS",
        "class": "us",
        "airport": "Rock Springs Sweetwater County Airport",
        "label": "Rock Springs, US (RKS)"
    }, {
        "country": "US",
        "city": "Rock Springs",
        "code": "RKS",
        "class": "us",
        "airport": "Rock Springs Sweetwater County Airport",
        "label": "Rock Springs, US (RKS)"
    }, {
        "country": "US",
        "city": "Rutland",
        "code": "RUT",
        "class": "us",
        "airport": "Rutland - Southern Vermont Regional Airport",
        "label": "Rutland, US (RUT)"
    }, {
        "country": "US",
        "city": "Rutland",
        "code": "RUT",
        "class": "us",
        "airport": "Rutland - Southern Vermont Regional Airport",
        "label": "Rutland, US (RUT)"
    }, {
        "country": "US",
        "city": "Rutland",
        "code": "RUT",
        "class": "us",
        "airport": "Rutland - Southern Vermont Regional Airport",
        "label": "Rutland, US (RUT)"
    }, {
        "country": "US",
        "city": "Saint Marys",
        "code": "KSM",
        "class": "us",
        "airport": "St Mary's Airport",
        "label": "Saint Marys, US (KSM)"
    }, {
        "country": "US",
        "city": "Saint Marys",
        "code": "KSM",
        "class": "us",
        "airport": "St Mary's Airport",
        "label": "Saint Marys, US (KSM)"
    }, {
        "country": "US",
        "city": "Saint Marys",
        "code": "KSM",
        "class": "us",
        "airport": "St Mary's Airport",
        "label": "Saint Marys, US (KSM)"
    }, {
        "country": "US",
        "city": "Saint Paul Island",
        "code": "SNP",
        "class": "us",
        "airport": "St Paul Island Airport",
        "label": "Saint Paul Island, US (SNP)"
    }, {
        "country": "US",
        "city": "Saint Cloud",
        "code": "STC",
        "class": "us",
        "airport": "St Cloud Regional Airport",
        "label": "Saint Cloud, US (STC)"
    }, {
        "country": "US",
        "city": "Birmingham",
        "code": "BHM",
        "class": "us",
        "airport": "Birmingham-Shuttlesworth International Airport",
        "label": "Birmingham, US (BHM)"
    }, {
        "country": "US",
        "city": "Philadelphia",
        "code": "TTN",
        "class": "us",
        "airport": "Trenton Mercer Airport",
        "label": "Philadelphia, US (TTN)"
    }, {
        "country": "US",
        "city": "Philadelphia",
        "code": "TTN",
        "class": "us",
        "airport": "Trenton Mercer Airport",
        "label": "Philadelphia, US (TTN)"
    }, {
        "country": "US",
        "city": "Philadelphia",
        "code": "PHL",
        "class": "us",
        "airport": "Philadelphia International Airport",
        "label": "Philadelphia, US (PHL)"
    }, {
        "country": "US",
        "city": "Philadelphia",
        "code": "PHL",
        "class": "us",
        "airport": "Philadelphia International Airport",
        "label": "Philadelphia, US (PHL)"
    }, {
        "country": "US",
        "city": "Las Vegas",
        "code": "LAS",
        "class": "us",
        "airport": "McCarran International Airport",
        "label": "Las Vegas, US (LAS)"
    }, {
        "country": "US",
        "city": "Sacramento",
        "code": "SMF",
        "class": "us",
        "airport": "Sacramento International Airport",
        "label": "Sacramento, US (SMF)"
    }, {
        "country": "US",
        "city": "Roanoke",
        "code": "ROA",
        "class": "us",
        "airport": "Roanoke Regional Woodrum Field",
        "label": "Roanoke, US (ROA)"
    }, {
        "country": "US",
        "city": "Windsor Locks",
        "code": "BDL",
        "class": "us",
        "airport": "Bradley International Airport",
        "label": "Windsor Locks, US (BDL)"
    }, {
        "country": "US",
        "city": "Windsor Locks",
        "code": "BDL",
        "class": "us",
        "airport": "Bradley International Airport",
        "label": "Windsor Locks, US (BDL)"
    }, {
        "country": "US",
        "city": "Quincy",
        "code": "UIN",
        "class": "us",
        "airport": "Quincy Regional Baldwin Field",
        "label": "Quincy, US (UIN)"
    }, {
        "country": "US",
        "city": "Quincy",
        "code": "UIN",
        "class": "us",
        "airport": "Quincy Regional Baldwin Field",
        "label": "Quincy, US (UIN)"
    }, {
        "country": "US",
        "city": "Rapid City",
        "code": "RAP",
        "class": "us",
        "airport": "Rapid City Regional Airport",
        "label": "Rapid City, US (RAP)"
    }, {
        "country": "US",
        "city": "Rapid City",
        "code": "RAP",
        "class": "us",
        "airport": "Rapid City Regional Airport",
        "label": "Rapid City, US (RAP)"
    }, {
        "country": "US",
        "city": "Charlotte",
        "code": "CLT",
        "class": "us",
        "airport": "Charlotte Douglas International Airport",
        "label": "Charlotte, US (CLT)"
    }, {
        "country": "US",
        "city": "Charlotte",
        "code": "CLT",
        "class": "us",
        "airport": "Charlotte Douglas International Airport",
        "label": "Charlotte, US (CLT)"
    }, {
        "country": "US",
        "city": "Pittsburgh",
        "code": "PIT",
        "class": "us",
        "airport": "Pittsburgh International Airport",
        "label": "Pittsburgh, US (PIT)"
    }, {
        "country": "US",
        "city": "Eek",
        "code": "EEK",
        "class": "us",
        "airport": "Eek Airport",
        "label": "Eek, US (EEK)"
    }, {
        "country": "US",
        "city": "Eek",
        "code": "EEK",
        "class": "us",
        "airport": "Eek Airport",
        "label": "Eek, US (EEK)"
    }, {
        "country": "US",
        "city": "San Diego",
        "code": "SAN",
        "class": "us",
        "airport": "San Diego International Airport",
        "label": "San Diego, US (SAN)"
    }, {
        "country": "US",
        "city": "Glasgow",
        "code": "GGW",
        "class": "us",
        "airport": "Wokal Field Glasgow International Airport",
        "label": "Glasgow, US (GGW)"
    }, {
        "country": "US",
        "city": "New York",
        "code": "LGA",
        "class": "us",
        "airport": "La Guardia Airport",
        "label": "New York, US - LaGuardia (LGA)"
    }, {
        "country": "US",
        "city": "Boulder City",
        "code": "BLD",
        "class": "us",
        "airport": "Boulder City Municipal Airport",
        "label": "Boulder City, US (BLD)"
    }, {
        "country": "US",
        "city": "Boulder City",
        "code": "BLD",
        "class": "us",
        "airport": "Boulder City Municipal Airport",
        "label": "Boulder City, US (BLD)"
    }, {
        "country": "US",
        "city": "Boulder City",
        "code": "BLD",
        "class": "us",
        "airport": "Boulder City Municipal Airport",
        "label": "Boulder City, US (BLD)"
    }, {
        "country": "US",
        "city": "Richmond",
        "code": "RIC",
        "class": "us",
        "airport": "Richmond International Airport",
        "label": "Richmond, US (RIC)"
    }, {
        "country": "US",
        "city": "Richmond",
        "code": "RIC",
        "class": "us",
        "airport": "Richmond International Airport",
        "label": "Richmond, US (RIC)"
    }, {
        "country": "US",
        "city": "Orlando",
        "code": "MCO",
        "class": "us",
        "airport": "Orlando International Airport",
        "label": "Orlando, US (MCO)"
    }, {
        "country": "US",
        "city": "Orlando",
        "code": "MCO",
        "class": "us",
        "airport": "Orlando International Airport",
        "label": "Orlando, US (MCO)"
    }, {
        "country": "US",
        "city": "Orlando",
        "code": "MCO",
        "class": "us",
        "airport": "Orlando International Airport",
        "label": "Orlando, US (MCO)"
    }, {
        "country": "US",
        "city": "Miami",
        "code": "MIA",
        "class": "us",
        "airport": "Miami International Airport",
        "label": "Miami, US (MIA)"
    }, {
        "country": "US",
        "city": "Rhinelander",
        "code": "RHI",
        "class": "us",
        "airport": "Rhinelander Oneida County Airport",
        "label": "Rhinelander, US (RHI)"
    }, {
        "country": "US",
        "city": "Bozeman",
        "code": "BZN",
        "class": "us",
        "airport": "Gallatin Field",
        "label": "Bozeman, US (BZN)"
    }, {
        "country": "US",
        "city": "Eau Claire",
        "code": "EAU",
        "class": "us",
        "airport": "Chippewa Valley Regional Airport",
        "label": "Eau Claire, US (EAU)"
    }, {
        "country": "US",
        "city": "Redding",
        "code": "RDD",
        "class": "us",
        "airport": "Redding Municipal Airport",
        "label": "Redding, US (RDD)"
    }, {
        "country": "US",
        "city": "Cheyenne",
        "code": "CYS",
        "class": "us",
        "airport": "Cheyenne Regional Jerry Olson Field",
        "label": "Cheyenne, US (CYS)"
    }, {
        "country": "US",
        "city": "Reno",
        "code": "RNO",
        "class": "us",
        "airport": "Reno Tahoe International Airport",
        "label": "Reno, US (RNO)"
    }, {
        "country": "US",
        "city": "Reno",
        "code": "RNO",
        "class": "us",
        "airport": "Reno Tahoe International Airport",
        "label": "Reno, US (RNO)"
    }, {
        "country": "US",
        "city": "Chignik",
        "code": "KCL",
        "class": "us",
        "airport": "Chignik Lagoon Airport",
        "label": "Chignik, US (KCL)"
    }, {
        "country": "US",
        "city": "Chignik",
        "code": "KCL",
        "class": "us",
        "airport": "Chignik Lagoon Airport",
        "label": "Chignik, US (KCL)"
    }, {
        "country": "US",
        "city": "Chignik",
        "code": "KCL",
        "class": "us",
        "airport": "Chignik Lagoon Airport",
        "label": "Chignik, US (KCL)"
    }, {
        "country": "US",
        "city": "Nantucket",
        "code": "ACK",
        "class": "us",
        "airport": "Nantucket Memorial Airport",
        "label": "Nantucket, US (ACK)"
    }, {
        "country": "US",
        "city": "Nantucket",
        "code": "ACK",
        "class": "us",
        "airport": "Nantucket Memorial Airport",
        "label": "Nantucket, US (ACK)"
    }, {
        "country": "US",
        "city": "Napakiak",
        "code": "WNA",
        "class": "us",
        "airport": "Napakiak Airport",
        "label": "Napakiak, US (WNA)"
    }, {
        "country": "US",
        "city": "Napakiak",
        "code": "WNA",
        "class": "us",
        "airport": "Napakiak Airport",
        "label": "Napakiak, US (WNA)"
    }, {
        "country": "US",
        "city": "Napakiak",
        "code": "WNA",
        "class": "us",
        "airport": "Napakiak Airport",
        "label": "Napakiak, US (WNA)"
    }, {
        "country": "US",
        "city": "Naples",
        "code": "APF",
        "class": "us",
        "airport": "Naples Municipal Airport",
        "label": "Naples, US (APF)"
    }, {
        "country": "US",
        "city": "Fort Dodge",
        "code": "FOD",
        "class": "us",
        "airport": "Fort Dodge Regional Airport",
        "label": "Fort Dodge, US (FOD)"
    }, {
        "country": "US",
        "city": "Bismarck",
        "code": "BIS",
        "class": "us",
        "airport": "Bismarck Municipal Airport",
        "label": "Bismarck, US (BIS)"
    }, {
        "country": "US",
        "city": "Fort Myers",
        "code": "RSW",
        "class": "us",
        "airport": "Southwest Florida International Airport",
        "label": "Fort Myers, US (RSW)"
    }, {
        "country": "US",
        "city": "Fort Myers",
        "code": "RSW",
        "class": "us",
        "airport": "Southwest Florida International Airport",
        "label": "Fort Myers, US (RSW)"
    }, {
        "country": "US",
        "city": "Muskegon",
        "code": "MKG",
        "class": "us",
        "airport": "Muskegon County Airport",
        "label": "Muskegon, US (MKG)"
    }, {
        "country": "US",
        "city": "Myrtle Beach",
        "code": "MYR",
        "class": "us",
        "airport": "Myrtle Beach International Airport",
        "label": "Myrtle Beach, US - All Airports (MYR)"
    }, {
        "country": "US",
        "city": "Fort Lauderdale",
        "code": "FLL",
        "class": "us",
        "airport": "Fort Lauderdale Hollywood International Airport",
        "label": "Fort Lauderdale, US (FLL)"
    }, {
        "country": "US",
        "city": "Fort Leonard Wood",
        "code": "TBN",
        "class": "us",
        "airport": "Waynesville-St. Robert Regional Forney field",
        "label": "Fort Leonard Wood, US (TBN)"
    }, {
        "country": "US",
        "city": "Florence",
        "code": "MSL",
        "class": "us",
        "airport": "Northwest Alabama Regional Airport",
        "label": "Florence, US (MSL)"
    }, {
        "country": "US",
        "city": "Nashville",
        "code": "BNA",
        "class": "us",
        "airport": "Nashville International Airport",
        "label": "Nashville, US (BNA)"
    }, {
        "country": "US",
        "city": "Nashville",
        "code": "BNA",
        "class": "us",
        "airport": "Nashville International Airport",
        "label": "Nashville, US (BNA)"
    }, {
        "country": "US",
        "city": "New Haven",
        "code": "HVN",
        "class": "us",
        "airport": "Tweed New Haven Airport",
        "label": "New Haven, US (HVN)"
    }, {
        "country": "US",
        "city": "New Orleans",
        "code": "MSY",
        "class": "us",
        "airport": "Louis Armstrong New Orleans International Airport",
        "label": "New Orleans, US (MSY)"
    }, {
        "country": "US",
        "city": "New Orleans",
        "code": "MSY",
        "class": "us",
        "airport": "Louis Armstrong New Orleans International Airport",
        "label": "New Orleans, US (MSY)"
    }, {
        "country": "US",
        "city": "Fayetteville",
        "code": "FAY",
        "class": "us",
        "airport": "Fayetteville Regional Grannis Field",
        "label": "Fayetteville, US (FAY)"
    }, {
        "country": "US",
        "city": "Newburgh",
        "code": "SWF",
        "class": "us",
        "airport": "Stewart International Airport",
        "label": "Newburgh, US (SWF)"
    }, {
        "country": "US",
        "city": "New Bern",
        "code": "EWN",
        "class": "us",
        "airport": "Coastal Carolina Regional Airport",
        "label": "New Bern, US (EWN)"
    }, {
        "country": "US",
        "city": "Bloomington Normal",
        "code": "BMI",
        "class": "us",
        "airport": "Central Illinois Regional Airport at Bloomington-Normal",
        "label": "Bloomington Normal, US (BMI)"
    }, {
        "country": "US",
        "city": "Flint",
        "code": "FNT",
        "class": "us",
        "airport": "Bishop International Airport",
        "label": "Flint, US (FNT)"
    }, {
        "country": "US",
        "city": "Florence",
        "code": "FLO",
        "class": "us",
        "airport": "Florence Regional Airport",
        "label": "Florence, US (FLO)"
    }, {
        "country": "US",
        "city": "Florence",
        "code": "FLO",
        "class": "us",
        "airport": "Florence Regional Airport",
        "label": "Florence, US (FLO)"
    }, {
        "country": "US",
        "city": "Flagstaff",
        "code": "FLG",
        "class": "us",
        "airport": "Flagstaff Pulliam Airport",
        "label": "Flagstaff, US (FLG)"
    }, {
        "country": "US",
        "city": "Flagstaff",
        "code": "FLG",
        "class": "us",
        "airport": "Flagstaff Pulliam Airport",
        "label": "Flagstaff, US (FLG)"
    }, {
        "country": "US",
        "city": "Burlington",
        "code": "BTV",
        "class": "us",
        "airport": "Burlington International Airport",
        "label": "Burlington, US (BTV)"
    }, {
        "country": "US",
        "city": "Binghamton",
        "code": "BGM",
        "class": "us",
        "airport": "Greater Binghamton\/Edwin A Link field",
        "label": "Binghamton, US (BGM)"
    }, {
        "country": "US",
        "city": "Mountain Village",
        "code": "MOU",
        "class": "us",
        "airport": "Mountain Village Airport",
        "label": "Mountain Village, US (MOU)"
    }, {
        "country": "US",
        "city": "Missoula",
        "code": "MSO",
        "class": "us",
        "airport": "Missoula International Airport",
        "label": "Missoula, US (MSO)"
    }, {
        "country": "US",
        "city": "Missoula",
        "code": "MSO",
        "class": "us",
        "airport": "Missoula International Airport",
        "label": "Missoula, US (MSO)"
    }, {
        "country": "US",
        "city": "Missoula",
        "code": "MSO",
        "class": "us",
        "airport": "Missoula International Airport",
        "label": "Missoula, US (MSO)"
    }, {
        "country": "US",
        "city": "Mobile",
        "code": "MOB",
        "class": "us",
        "airport": "Mobile Regional Airport",
        "label": "Mobile, US (MOB)"
    }, {
        "country": "US",
        "city": "Moline",
        "code": "MLI",
        "class": "us",
        "airport": "Quad City International Airport",
        "label": "Moline, US (MLI)"
    }, {
        "country": "US",
        "city": "Modesto",
        "code": "MOD",
        "class": "us",
        "airport": "Modesto City Co-Harry Sham Field",
        "label": "Modesto, US (MOD)"
    }, {
        "country": "US",
        "city": "Aberdeen",
        "code": "ABR",
        "class": "us",
        "airport": "Aberdeen Regional Airport",
        "label": "Aberdeen, US (ABR)"
    }, {
        "country": "US",
        "city": "Minot",
        "code": "MOT",
        "class": "us",
        "airport": "Minot International Airport",
        "label": "Minot, US (MOT)"
    }, {
        "country": "US",
        "city": "Minot",
        "code": "MOT",
        "class": "us",
        "airport": "Minot International Airport",
        "label": "Minot, US (MOT)"
    }, {
        "country": "US",
        "city": "West Palm Beach",
        "code": "PBI",
        "class": "us",
        "airport": "Palm Beach International Airport",
        "label": "West Palm Beach, US (PBI)"
    }, {
        "country": "US",
        "city": "Midland",
        "code": "MAF",
        "class": "us",
        "airport": "Midland International Airport",
        "label": "Midland, US (MAF)"
    }, {
        "country": "US",
        "city": "Miles City",
        "code": "MLS",
        "class": "us",
        "airport": "Frank Wiley Field",
        "label": "Miles City, US (MLS)"
    }, {
        "country": "US",
        "city": "Milwaukee",
        "code": "MKE",
        "class": "us",
        "airport": "General Mitchell International Airport",
        "label": "Milwaukee, US (MKE)"
    }, {
        "country": "US",
        "city": "Abilene",
        "code": "ABI",
        "class": "us",
        "airport": "Abilene Regional Airport",
        "label": "Abilene, US (ABI)"
    }, {
        "country": "US",
        "city": "Chisholm\/Hibbing",
        "code": "HIB",
        "class": "us",
        "airport": "Chisholm Hibbing Airport",
        "label": "Chisholm\/Hibbing, US (HIB)"
    }, {
        "country": "US",
        "city": "Monroe",
        "code": "MLU",
        "class": "us",
        "airport": "Monroe Regional Airport",
        "label": "Monroe, US (MLU)"
    }, {
        "country": "US",
        "city": "Billings",
        "code": "BIL",
        "class": "us",
        "airport": "Billings Logan International Airport",
        "label": "Billings, US (BIL)"
    }, {
        "country": "US",
        "city": "Billings",
        "code": "BIL",
        "class": "us",
        "airport": "Billings Logan International Airport",
        "label": "Billings, US (BIL)"
    }, {
        "country": "US",
        "city": "Billings",
        "code": "BIL",
        "class": "us",
        "airport": "Billings Logan International Airport",
        "label": "Billings, US (BIL)"
    }, {
        "country": "US",
        "city": "Fort Yukon",
        "code": "FYU",
        "class": "us",
        "airport": "Fort Yukon Airport",
        "label": "Fort Yukon, US (FYU)"
    }, {
        "country": "US",
        "city": "Fort Smith",
        "code": "FSM",
        "class": "us",
        "airport": "Fort Smith Regional Airport",
        "label": "Fort Smith, US (FSM)"
    }, {
        "country": "US",
        "city": "Fort Wayne",
        "code": "FWA",
        "class": "us",
        "airport": "Fort Wayne International Airport",
        "label": "Fort Wayne, US (FWA)"
    }, {
        "country": "US",
        "city": "Morgantown",
        "code": "MGW",
        "class": "us",
        "airport": "Morgantown Municipal Walter L. Bill Hart Field",
        "label": "Morgantown, US (MGW)"
    }, {
        "country": "US",
        "city": "Fresno",
        "code": "FAT",
        "class": "us",
        "airport": "Fresno Yosemite International Airport",
        "label": "Fresno, US (FAT)"
    }, {
        "country": "US",
        "city": "Friday Harbor",
        "code": "FRD",
        "class": "us",
        "airport": "Friday Harbor Airport",
        "label": "Friday Harbor, US (FRD)"
    }, {
        "country": "US",
        "city": "Friday Harbor",
        "code": "FRD",
        "class": "us",
        "airport": "Friday Harbor Airport",
        "label": "Friday Harbor, US (FRD)"
    }, {
        "country": "US",
        "city": "Friday Harbor",
        "code": "FRD",
        "class": "us",
        "airport": "Friday Harbor Airport",
        "label": "Friday Harbor, US (FRD)"
    }, {
        "country": "US",
        "city": "Montgomery",
        "code": "MGM",
        "class": "us",
        "airport": "Montgomery Regional (Dannelly Field) Airport",
        "label": "Montgomery, US (MGM)"
    }, {
        "country": "US",
        "city": "Montgomery",
        "code": "MGM",
        "class": "us",
        "airport": "Montgomery Regional (Dannelly Field) Airport",
        "label": "Montgomery, US (MGM)"
    }, {
        "country": "US",
        "city": "Montgomery",
        "code": "MGM",
        "class": "us",
        "airport": "Montgomery Regional (Dannelly Field) Airport",
        "label": "Montgomery, US (MGM)"
    }, {
        "country": "US",
        "city": "Newtok",
        "code": "WWT",
        "class": "us",
        "airport": "Newtok Seaplane Base",
        "label": "Newtok, US (WWT)"
    }, {
        "country": "US",
        "city": "New Stuyahok",
        "code": "KNW",
        "class": "us",
        "airport": "New Stuyahok Airport",
        "label": "New Stuyahok, US (KNW)"
    }, {
        "country": "US",
        "city": "Evansville",
        "code": "EVV",
        "class": "us",
        "airport": "Evansville Regional Airport",
        "label": "Evansville, US (EVV)"
    }, {
        "country": "US",
        "city": "Oklahoma City",
        "code": "OKC",
        "class": "us",
        "airport": "Will Rogers World Airport",
        "label": "Oklahoma City, US (OKC)"
    }, {
        "country": "US",
        "city": "Blountville",
        "code": "TRI",
        "class": "us",
        "airport": "Tri Cities Regional Tn Va Airport",
        "label": "Blountville, US (TRI)"
    }, {
        "country": "US",
        "city": "Blountville",
        "code": "TRI",
        "class": "us",
        "airport": "Tri Cities Regional Tn Va Airport",
        "label": "Blountville, US (TRI)"
    }, {
        "country": "US",
        "city": "Blountville",
        "code": "TRI",
        "class": "us",
        "airport": "Tri Cities Regional Tn Va Airport",
        "label": "Blountville, US (TRI)"
    }, {
        "country": "US",
        "city": "Excursion Inlet",
        "code": "EXI",
        "class": "us",
        "airport": "Excursion Inlet Seaplane Base",
        "label": "Excursion Inlet, US (EXI)"
    }, {
        "country": "US",
        "city": "Excursion Inlet",
        "code": "EXI",
        "class": "us",
        "airport": "Excursion Inlet Seaplane Base",
        "label": "Excursion Inlet, US (EXI)"
    }, {
        "country": "US",
        "city": "Palm Springs",
        "code": "PSP",
        "class": "us",
        "airport": "Palm Springs International Airport",
        "label": "Palm Springs, US (PSP)"
    }, {
        "country": "US",
        "city": "Fairbanks",
        "code": "FAI",
        "class": "us",
        "airport": "Fairbanks International Airport",
        "label": "Fairbanks, US (FAI)"
    }, {
        "country": "US",
        "city": "Fairbanks",
        "code": "FAI",
        "class": "us",
        "airport": "Fairbanks International Airport",
        "label": "Fairbanks, US (FAI)"
    }, {
        "country": "US",
        "city": "Fairbanks",
        "code": "FAI",
        "class": "us",
        "airport": "Fairbanks International Airport",
        "label": "Fairbanks, US (FAI)"
    }, {
        "country": "US",
        "city": "Oakland",
        "code": "OAK",
        "class": "us",
        "airport": "Metropolitan Oakland International Airport",
        "label": "Oakland, US (OAK)"
    }, {
        "country": "US",
        "city": "Eugene",
        "code": "EUG",
        "class": "us",
        "airport": "Mahlon Sweet Field",
        "label": "Eugene, US (EUG)"
    }, {
        "country": "US",
        "city": "Eugene",
        "code": "EUG",
        "class": "us",
        "airport": "Mahlon Sweet Field",
        "label": "Eugene, US (EUG)"
    }, {
        "country": "US",
        "city": "Eugene",
        "code": "EUG",
        "class": "us",
        "airport": "Mahlon Sweet Field",
        "label": "Eugene, US (EUG)"
    }, {
        "country": "US",
        "city": "Boise",
        "code": "BOI",
        "class": "us",
        "airport": "Boise Air Terminal\/Gowen field",
        "label": "Boise, US (BOI)"
    }, {
        "country": "US",
        "city": "Boise",
        "code": "BOI",
        "class": "us",
        "airport": "Boise Air Terminal\/Gowen field",
        "label": "Boise, US (BOI)"
    }, {
        "country": "US",
        "city": "Erie",
        "code": "ERI",
        "class": "us",
        "airport": "Erie International Tom Ridge Field",
        "label": "Erie, US (ERI)"
    }, {
        "country": "US",
        "city": "Owensboro",
        "code": "OWB",
        "class": "us",
        "airport": "Owensboro Daviess County Airport",
        "label": "Owensboro, US (OWB)"
    }, {
        "country": "US",
        "city": "Craig",
        "code": "CGA",
        "class": "us",
        "airport": "Craig Seaplane Base",
        "label": "Craig, US (CGA)"
    }, {
        "country": "US",
        "city": "Craig",
        "code": "CGA",
        "class": "us",
        "airport": "Craig Seaplane Base",
        "label": "Craig, US (CGA)"
    }, {
        "country": "US",
        "city": "Omaha",
        "code": "OMA",
        "class": "us",
        "airport": "Eppley Airfield",
        "label": "Omaha, US (OMA)"
    }, {
        "country": "US",
        "city": "Paducah",
        "code": "PAH",
        "class": "us",
        "airport": "Barkley Regional Airport",
        "label": "Paducah, US (PAH)"
    }, {
        "country": "US",
        "city": "Ontario",
        "code": "ONT",
        "class": "us",
        "airport": "Ontario International Airport",
        "label": "Ontario, US (ONT)"
    }, {
        "country": "US",
        "city": "Ontario",
        "code": "ONT",
        "class": "us",
        "airport": "Ontario International Airport",
        "label": "Ontario, US (ONT)"
    }, {
        "country": "US",
        "city": "Ontario",
        "code": "ONT",
        "class": "us",
        "airport": "Ontario International Airport",
        "label": "Ontario, US (ONT)"
    }, {
        "country": "US",
        "city": "Ontario",
        "code": "ONT",
        "class": "us",
        "airport": "Ontario International Airport",
        "label": "Ontario, US (ONT)"
    }, {
        "country": "US",
        "city": "Nome",
        "code": "OME",
        "class": "us",
        "airport": "Nome Airport",
        "label": "Nome, US (OME)"
    }, {
        "country": "US",
        "city": "Elko",
        "code": "EKO",
        "class": "us",
        "airport": "Elko Regional Airport",
        "label": "Elko, US (EKO)"
    }, {
        "country": "US",
        "city": "Elko",
        "code": "EKO",
        "class": "us",
        "airport": "Elko Regional Airport",
        "label": "Elko, US (EKO)"
    }, {
        "country": "US",
        "city": "Elko",
        "code": "EKO",
        "class": "us",
        "airport": "Elko Regional Airport",
        "label": "Elko, US (EKO)"
    }, {
        "country": "US",
        "city": "Norfolk",
        "code": "ORF",
        "class": "us",
        "airport": "Norfolk International Airport",
        "label": "Norfolk, US (ORF)"
    }, {
        "country": "US",
        "city": "Noatak",
        "code": "WTK",
        "class": "us",
        "airport": "Noatak Airport",
        "label": "Noatak, US (WTK)"
    }, {
        "country": "US",
        "city": "Nikolski",
        "code": "IKO",
        "class": "us",
        "airport": "Nikolski Air Station",
        "label": "Nikolski, US (IKO)"
    }, {
        "country": "US",
        "city": "Niagara Falls",
        "code": "IAG",
        "class": "us",
        "airport": "Niagara Falls International Airport",
        "label": "Niagara Falls, US (IAG)"
    }, {
        "country": "US",
        "city": "Niagara Falls",
        "code": "IAG",
        "class": "us",
        "airport": "Niagara Falls International Airport",
        "label": "Niagara Falls, US (IAG)"
    }, {
        "country": "US",
        "city": "Cincinnati",
        "code": "CVG",
        "class": "us",
        "airport": "Cincinnati Northern Kentucky International Airport",
        "label": "Cincinnati, US (CVG)"
    }, {
        "country": "US",
        "city": "Cincinnati",
        "code": "CVG",
        "class": "us",
        "airport": "Cincinnati Northern Kentucky International Airport",
        "label": "Cincinnati, US (CVG)"
    }, {
        "country": "US",
        "city": "Cincinnati",
        "code": "CVG",
        "class": "us",
        "airport": "Cincinnati Northern Kentucky International Airport",
        "label": "Cincinnati, US (CVG)"
    }, {
        "country": "US",
        "city": "Bellingham",
        "code": "BLI",
        "class": "us",
        "airport": "Bellingham International Airport",
        "label": "Bellingham, US (BLI)"
    }, {
        "country": "US",
        "city": "Fall River\/New Bedford",
        "code": "EWB",
        "class": "us",
        "airport": "New Bedford Regional Airport",
        "label": "Fall River\/New Bedford, US (EWB)"
    }, {
        "country": "US",
        "city": "Nuiqsut",
        "code": "NUI",
        "class": "us",
        "airport": "Nuiqsut Airport",
        "label": "Nuiqsut, US (NUI)"
    }, {
        "country": "US",
        "city": "Nuiqsut",
        "code": "NUI",
        "class": "us",
        "airport": "Nuiqsut Airport",
        "label": "Nuiqsut, US (NUI)"
    }, {
        "country": "US",
        "city": "Nuiqsut",
        "code": "NUI",
        "class": "us",
        "airport": "Nuiqsut Airport",
        "label": "Nuiqsut, US (NUI)"
    }, {
        "country": "US",
        "city": "Panama City",
        "code": "PFN",
        "class": "us",
        "airport": "Panama City-Bay Co International Airport",
        "label": "Panama City, US (PFN)"
    }, {
        "country": "US",
        "city": "Palmdale",
        "code": "PMD",
        "class": "us",
        "airport": "Palmdale Regional\/USAF Plant 42 Airport",
        "label": "Palmdale, US (PMD)"
    }, {
        "country": "US",
        "city": "False Pass",
        "code": "KFP",
        "class": "us",
        "airport": "False Pass Airport",
        "label": "False Pass, US (KFP)"
    }, {
        "country": "US",
        "city": "Pasco",
        "code": "PSC",
        "class": "us",
        "airport": "Tri Cities Airport",
        "label": "Pasco, US (PSC)"
    }, {
        "country": "US",
        "city": "Pasco",
        "code": "PSC",
        "class": "us",
        "airport": "Tri Cities Airport",
        "label": "Pasco, US (PSC)"
    }, {
        "country": "US",
        "city": "North Bend",
        "code": "OTH",
        "class": "us",
        "airport": "Southwest Oregon Regional Airport",
        "label": "North Bend, US (OTH)"
    }, {
        "country": "US",
        "city": "North Platte",
        "code": "LBF",
        "class": "us",
        "airport": "North Platte Regional Airport Lee Bird Field",
        "label": "North Platte, US (LBF)"
    }, {
        "country": "US",
        "city": "North Platte",
        "code": "LBF",
        "class": "us",
        "airport": "North Platte Regional Airport Lee Bird Field",
        "label": "North Platte, US (LBF)"
    }, {
        "country": "Uganda",
        "city": "Gulu",
        "code": "ULU",
        "class": "uga",
        "airport": "Gulu Airport",
        "label": "Gulu, Uganda (ULU)"
    }, {
        "country": "Uganda",
        "city": "Moyo",
        "code": "OYG",
        "class": "uga",
        "airport": "Moyo Airport",
        "label": "Moyo, Uganda (OYG)"
    }, {
        "country": "Uganda",
        "city": "Entebbe",
        "code": "EBB",
        "class": "uga",
        "airport": "Entebbe International Airport",
        "label": "Entebbe, Uganda (EBB)"
    }, {
        "country": "Uganda",
        "city": "Entebbe",
        "code": "EBB",
        "class": "uga",
        "airport": "Entebbe International Airport",
        "label": "Entebbe, Uganda (EBB)"
    }, {
        "country": "Ukraine",
        "city": "Kiev",
        "code": "KBP",
        "class": "ukr",
        "airport": "Boryspil International Airport",
        "label": "Kiev, Ukraine - Borispol Apt (KBP)"
    }, {
        "country": "Ukraine",
        "city": "Kherson",
        "code": "KHE",
        "class": "ukr",
        "airport": "Chernobayevka Airport",
        "label": "Kherson, Ukraine (KHE)"
    }, {
        "country": "Ukraine",
        "city": "Odessa",
        "code": "ODS",
        "class": "ukr",
        "airport": "Odessa International Airport",
        "label": "Odessa, Ukraine (ODS)"
    }, {
        "country": "Ukraine",
        "city": "Ivano-Frankovsk",
        "code": "IFO",
        "class": "ukr",
        "airport": "Ivano-Frankivsk International Airport",
        "label": "Ivano-Frankovsk, Ukraine (IFO)"
    }, {
        "country": "Ukraine",
        "city": "Kiev",
        "code": "IEV",
        "class": "ukr",
        "airport": "Kiev Zhuliany International Airport",
        "label": "Kiev, Ukraine - Zhulhany Apt (IEV)"
    }, {
        "country": "Ukraine",
        "city": "Nikolaev",
        "code": "NLV",
        "class": "ukr",
        "airport": "Mykolaiv International Airport",
        "label": "Nikolaev, Ukraine (NLV)"
    }, {
        "country": "Ukraine",
        "city": "Uzhgorod",
        "code": "UDJ",
        "class": "ukr",
        "airport": "Uzhhorod International Airport",
        "label": "Uzhgorod, Ukraine (UDJ)"
    }, {
        "country": "Ukraine",
        "city": "Kharkov",
        "code": "HRK",
        "class": "ukr",
        "airport": "Kharkiv International Airport",
        "label": "Kharkov, Ukraine (HRK)"
    }, {
        "country": "Ukraine",
        "city": "Lugansk",
        "code": "VSG",
        "class": "ukr",
        "airport": "Luhansk International Airport",
        "label": "Lugansk, Ukraine (VSG)"
    }, {
        "country": "Ukraine",
        "city": "Simferopol",
        "code": "SIP",
        "class": "ukr",
        "airport": "Simferopol International Airport",
        "label": "Simferopol, Ukraine (SIP)"
    }, {
        "country": "Ukraine",
        "city": "Dnepropetrovsk",
        "code": "DNK",
        "class": "ukr",
        "airport": "Dnipropetrovsk International Airport",
        "label": "Dnepropetrovsk, Ukraine (DNK)"
    }, {
        "country": "Ukraine",
        "city": "Mariupol",
        "code": "MPW",
        "class": "ukr",
        "airport": "Mariupol International Airport",
        "label": "Mariupol, Ukraine (MPW)"
    }, {
        "country": "Ukraine",
        "city": "Krivoy Rog",
        "code": "KWG",
        "class": "ukr",
        "airport": "Kryvyi Rih International Airport",
        "label": "Krivoy Rog, Ukraine (KWG)"
    }, {
        "country": "Ukraine",
        "city": "Lviv",
        "code": "LWO",
        "class": "ukr",
        "airport": "Lviv International Airport",
        "label": "Lviv, Ukraine (LWO)"
    }, {
        "country": "Ukraine",
        "city": "Chernovtsy",
        "code": "CWC",
        "class": "ukr",
        "airport": "Chernivtsi International Airport",
        "label": "Chernovtsy, Ukraine (CWC)"
    }, {
        "country": "Ukraine",
        "city": "Zaporozhye",
        "code": "OZH",
        "class": "ukr",
        "airport": "Zaporizhzhia International Airport",
        "label": "Zaporozhye, Ukraine (OZH)"
    }, {
        "country": "Ukraine",
        "city": "Donetsk",
        "code": "DOK",
        "class": "ukr",
        "airport": "Donetsk International Airport",
        "label": "Donetsk, Ukraine (DOK)"
    }, {
        "country": "Uruguay",
        "city": "Montevideo",
        "code": "MVD",
        "class": "uru",
        "airport": "Carrasco International \/General C L Berisso Airport",
        "label": "Montevideo, Uruguay (MVD)"
    }, {
        "country": "Uruguay",
        "city": "Punta del Este",
        "code": "PDP",
        "class": "uru",
        "airport": "Capitan Corbeta CA Curbelo International Airport",
        "label": "Punta del Este, Uruguay (PDP)"
    }, {
        "country": "Uzbekistan",
        "city": "Bukhara",
        "code": "BHK",
        "class": "uzb",
        "airport": "Bukhara Airport",
        "label": "Bukhara, Uzbekistan (BHK)"
    }, {
        "country": "Uzbekistan",
        "city": "Samarkand",
        "code": "SKD",
        "class": "uzb",
        "airport": "Samarkand Airport",
        "label": "Samarkand, Uzbekistan (SKD)"
    }, {
        "country": "Uzbekistan",
        "city": "Andizhan",
        "code": "AZN",
        "class": "uzb",
        "airport": "Andizhan Airport",
        "label": "Andizhan, Uzbekistan (AZN)"
    }, {
        "country": "Uzbekistan",
        "city": "Karshi",
        "code": "KSQ",
        "class": "uzb",
        "airport": "Karshi Khanabad Airport",
        "label": "Karshi, Uzbekistan (KSQ)"
    }, {
        "country": "Uzbekistan",
        "city": "Fergana",
        "code": "FEG",
        "class": "uzb",
        "airport": "Fergana Airport",
        "label": "Fergana, Uzbekistan (FEG)"
    }, {
        "country": "Uzbekistan",
        "city": "Tashkent",
        "code": "TAS",
        "class": "uzb",
        "airport": "Tashkent International Airport",
        "label": "Tashkent, Uzbekistan (TAS)"
    }, {
        "country": "Uzbekistan",
        "city": "Nukus",
        "code": "NCU",
        "class": "uzb",
        "airport": "Nukus Airport",
        "label": "Nukus, Uzbekistan (NCU)"
    }, {
        "country": "Uzbekistan",
        "city": "Termez",
        "code": "TMJ",
        "class": "uzb",
        "airport": "Termez Airport",
        "label": "Termez, Uzbekistan (TMJ)"
    }, {
        "country": "Uzbekistan",
        "city": "Namangan",
        "code": "NMA",
        "class": "uzb",
        "airport": "Namangan Airport",
        "label": "Namangan, Uzbekistan (NMA)"
    }, {
        "country": "Uzbekistan",
        "city": "Urgench",
        "code": "UGC",
        "class": "uzb",
        "airport": "Urgench Airport",
        "label": "Urgench, Uzbekistan (UGC)"
    }, {
        "country": "Vanuatu",
        "city": "Mota Lava",
        "code": "MTV",
        "class": "van",
        "airport": "Mota Lava Airport",
        "label": "Mota Lava, Vanuatu (MTV)"
    }, {
        "country": "Vanuatu",
        "city": "Maewo",
        "code": "MWF",
        "class": "van",
        "airport": "Naone Airport",
        "label": "Maewo, Vanuatu (MWF)"
    }, {
        "country": "Vanuatu",
        "city": "Ipota",
        "code": "IPA",
        "class": "van",
        "airport": "Ipota Airport",
        "label": "Ipota, Vanuatu (IPA)"
    }, {
        "country": "Vanuatu",
        "city": "Redcliffe",
        "code": "RCL",
        "class": "van",
        "airport": "Redcliffe Airport",
        "label": "Redcliffe, Vanuatu (RCL)"
    }, {
        "country": "Vanuatu",
        "city": "Aniwa",
        "code": "AWD",
        "class": "van",
        "airport": "Aniwa Airport",
        "label": "Aniwa, Vanuatu (AWD)"
    }, {
        "country": "Vanuatu",
        "city": "Lonorore",
        "code": "LNE",
        "class": "van",
        "airport": "Lonorore Airport",
        "label": "Lonorore, Vanuatu (LNE)"
    }, {
        "country": "Vanuatu",
        "city": "Port Vila",
        "code": "VLI",
        "class": "van",
        "airport": "Port Vila Bauerfield Airport",
        "label": "Port Vila, Vanuatu (VLI)"
    }, {
        "country": "Vanuatu",
        "city": "Lamen Bay",
        "code": "LNB",
        "class": "van",
        "airport": "Lamen Bay Airport",
        "label": "Lamen Bay, Vanuatu (LNB)"
    }, {
        "country": "Vanuatu",
        "city": "Paama",
        "code": "PBJ",
        "class": "van",
        "airport": "Tavie Airport",
        "label": "Paama, Vanuatu (PBJ)"
    }, {
        "country": "Vanuatu",
        "city": "Lamap",
        "code": "LPM",
        "class": "van",
        "airport": "Lamap Airport",
        "label": "Lamap, Vanuatu (LPM)"
    }, {
        "country": "Vanuatu",
        "city": "Norsup",
        "code": "NUS",
        "class": "van",
        "airport": "Norsup Airport",
        "label": "Norsup, Vanuatu (NUS)"
    }, {
        "country": "Vanuatu",
        "city": "Olpoi",
        "code": "OLJ",
        "class": "van",
        "airport": "North West Santo Airport",
        "label": "Olpoi, Vanuatu (OLJ)"
    }, {
        "country": "Vanuatu",
        "city": "Longana",
        "code": "LOD",
        "class": "van",
        "airport": "Longana Airport",
        "label": "Longana, Vanuatu (LOD)"
    }, {
        "country": "Vanuatu",
        "city": "Aneityum",
        "code": "AUY",
        "class": "van",
        "airport": "Anelghowhat Airport",
        "label": "Aneityum, Vanuatu (AUY)"
    }, {
        "country": "Vanuatu",
        "city": "Gaua",
        "code": "ZGU",
        "class": "van",
        "airport": "Gaua Island Airport",
        "label": "Gaua, Vanuatu (ZGU)"
    }, {
        "country": "Vanuatu",
        "city": "Tanna",
        "code": "TAH",
        "class": "van",
        "airport": "Tanna Airport",
        "label": "Tanna, Vanuatu (TAH)"
    }, {
        "country": "Vanuatu",
        "city": "South West Bay",
        "code": "SWJ",
        "class": "van",
        "airport": "Southwest Bay Airport",
        "label": "South West Bay, Vanuatu (SWJ)"
    }, {
        "country": "Vanuatu",
        "city": "Sola",
        "code": "SLH",
        "class": "van",
        "airport": "Sola Airport",
        "label": "Sola, Vanuatu (SLH)"
    }, {
        "country": "Vanuatu",
        "city": "Tongoa",
        "code": "TGH",
        "class": "van",
        "airport": "Tongoa Island Airport",
        "label": "Tongoa, Vanuatu (TGH)"
    }, {
        "country": "Vanuatu",
        "city": "Torres",
        "code": "TOH",
        "class": "van",
        "airport": "Torres Airstrip",
        "label": "Torres, Vanuatu (TOH)"
    }, {
        "country": "Vanuatu",
        "city": "Ulei",
        "code": "ULB",
        "class": "van",
        "airport": null,
        "label": "Ulei, Vanuatu (ULB)"
    }, {
        "country": "Vanuatu",
        "city": "Craig Cove",
        "code": "CCV",
        "class": "van",
        "airport": "Craig Cove Airport",
        "label": "Craig Cove, Vanuatu (CCV)"
    }, {
        "country": "Vanuatu",
        "city": "Dillons Bay",
        "code": "DLY",
        "class": "van",
        "airport": "Dillon's Bay Airport",
        "label": "Dillons Bay, Vanuatu (DLY)"
    }, {
        "country": "Vanuatu",
        "city": "Valesdir",
        "code": "VLS",
        "class": "van",
        "airport": "Valesdir Airport",
        "label": "Valesdir, Vanuatu (VLS)"
    }, {
        "country": "Vanuatu",
        "city": "Espiritu Santo",
        "code": "SON",
        "class": "van",
        "airport": "Santo Pekoa International Airport",
        "label": "Espiritu Santo, Vanuatu (SON)"
    }, {
        "country": "Vanuatu",
        "city": "Walaha",
        "code": "WLH",
        "class": "van",
        "airport": "Walaha Airport",
        "label": "Walaha, Vanuatu (WLH)"
    }, {
        "country": "Vanuatu",
        "city": "Sara",
        "code": "SSR",
        "class": "van",
        "airport": "Sara Airport",
        "label": "Sara, Vanuatu (SSR)"
    }, {
        "country": "Vanuatu",
        "city": "Futuna Island",
        "code": "FTA",
        "class": "van",
        "airport": "Futuna Airport",
        "label": "Futuna Island, Vanuatu (FTA)"
    }, {
        "country": "Vanuatu",
        "city": "Emae",
        "code": "EAE",
        "class": "van",
        "airport": "Sangafa Airport",
        "label": "Emae, Vanuatu (EAE)"
    }, {
        "country": "Venezuela",
        "city": "Maracaibo",
        "code": "MAR",
        "class": "ven",
        "airport": "La Chinita International Airport",
        "label": "Maracaibo, Venezuela (MAR)"
    }, {
        "country": "Venezuela",
        "city": "Las Piedras",
        "code": "LSP",
        "class": "ven",
        "airport": "Josefa Camejo International Airport",
        "label": "Las Piedras, Venezuela (LSP)"
    }, {
        "country": "Venezuela",
        "city": "Caracas",
        "code": "CCS",
        "class": "ven",
        "airport": null,
        "label": "Caracas, Venezuela (CCS)"
    }, {
        "country": "Venezuela",
        "city": "Carupano",
        "code": "CUP",
        "class": "ven",
        "airport": null,
        "label": "Carupano, Venezuela (CUP)"
    }, {
        "country": "Venezuela",
        "city": "Ciudad Bolivar",
        "code": "CBL",
        "class": "ven",
        "airport": null,
        "label": "Ciudad Bolivar, Venezuela (CBL)"
    }, {
        "country": "Venezuela",
        "city": "Coro",
        "code": "CZE",
        "class": "ven",
        "airport": null,
        "label": "Coro, Venezuela (CZE)"
    }, {
        "country": "Venezuela",
        "city": "La Fria",
        "code": "LFR",
        "class": "ven",
        "airport": "La Fria Airport",
        "label": "La Fria, Venezuela (LFR)"
    }, {
        "country": "Venezuela",
        "city": "Barquisimeto",
        "code": "BRM",
        "class": "ven",
        "airport": "Barquisimeto International Airport",
        "label": "Barquisimeto, Venezuela (BRM)"
    }, {
        "country": "Venezuela",
        "city": "Guasdualito",
        "code": "GDO",
        "class": "ven",
        "airport": "Guasdalito Airport",
        "label": "Guasdualito, Venezuela (GDO)"
    }, {
        "country": "Venezuela",
        "city": "Barinas",
        "code": "BNS",
        "class": "ven",
        "airport": "Barinas Airport",
        "label": "Barinas, Venezuela (BNS)"
    }, {
        "country": "Venezuela",
        "city": "Elorza",
        "code": "EOZ",
        "class": "ven",
        "airport": "Elorza Airport",
        "label": "Elorza, Venezuela (EOZ)"
    }, {
        "country": "Venezuela",
        "city": "Maturin",
        "code": "MUN",
        "class": "ven",
        "airport": null,
        "label": "Maturin, Venezuela (MUN)"
    }, {
        "country": "Venezuela",
        "city": "El Vigia",
        "code": "VIG",
        "class": "ven",
        "airport": null,
        "label": "El Vigia, Venezuela (VIG)"
    }, {
        "country": "Venezuela",
        "city": "Cumana",
        "code": "CUM",
        "class": "ven",
        "airport": null,
        "label": "Cumana, Venezuela (CUM)"
    }, {
        "country": "Venezuela",
        "city": "Merida",
        "code": "MRD",
        "class": "ven",
        "airport": "Alberto Carnevalli Airport",
        "label": "Merida, Venezuela (MRD)"
    }, {
        "country": "Venezuela",
        "city": "Porlamar",
        "code": "PMV",
        "class": "ven",
        "airport": null,
        "label": "Porlamar, Venezuela (PMV)"
    }, {
        "country": "Venezuela",
        "city": "San Fernando de Apure",
        "code": "SFD",
        "class": "ven",
        "airport": "San Fernando De Apure Airport",
        "label": "San Fernando de Apure, Venezuela (SFD)"
    }, {
        "country": "Venezuela",
        "city": "Puerto Ayacucho",
        "code": "PYH",
        "class": "ven",
        "airport": "Cacique Aramare Airport",
        "label": "Puerto Ayacucho, Venezuela (PYH)"
    }, {
        "country": "Venezuela",
        "city": "Puerto Ordaz",
        "code": "PZO",
        "class": "ven",
        "airport": "General Manuel Carlos Piar International Airport",
        "label": "Puerto Ordaz, Venezuela (PZO)"
    }, {
        "country": "Venezuela",
        "city": "Valencia",
        "code": "VLN",
        "class": "ven",
        "airport": "Arturo Michelena International Airport",
        "label": "Valencia, Venezuela (VLN)"
    }, {
        "country": "Venezuela",
        "city": "San Tome",
        "code": "SOM",
        "class": "ven",
        "airport": "San Tome Airport",
        "label": "San Tome, Venezuela (SOM)"
    }, {
        "country": "Venezuela",
        "city": "San Antonio",
        "code": "SVZ",
        "class": "ven",
        "airport": "San Antonio Del Tachira Airport",
        "label": "San Antonio, Venezuela (SVZ)"
    }, {
        "country": "Venezuela",
        "city": "Valera",
        "code": "VLV",
        "class": "ven",
        "airport": null,
        "label": "Valera, Venezuela (VLV)"
    }, {
        "country": "Venezuela",
        "city": "Barcelona",
        "code": "BLA",
        "class": "ven",
        "airport": "General Jose Antonio Anzoategui International Airport",
        "label": "Barcelona, Venezuela (BLA)"
    }, {
        "country": "Venezuela",
        "city": "Acarigua",
        "code": "AGV",
        "class": "ven",
        "airport": "Oswaldo Guevara Mujica Airport",
        "label": "Acarigua, Venezuela (AGV)"
    }, {
        "country": "Venezuela",
        "city": "Santo Domingo",
        "code": "STD",
        "class": "ven",
        "airport": "Mayor Buenaventura Vivas International Airport",
        "label": "Santo Domingo, Venezuela (STD)"
    }, {
        "country": "Vietnam",
        "city": "Ho Chi Minh City",
        "code": "SGN",
        "class": "vie",
        "airport": "Tan Son Nhat International Airport",
        "label": "Ho Chi Minh City, Vietnam (SGN)"
    }, {
        "country": "Vietnam",
        "city": "Rach Gia",
        "code": "VKG",
        "class": "vie",
        "airport": "Rach Gia Airport",
        "label": "Rach Gia, Vietnam (VKG)"
    }, {
        "country": "Vietnam",
        "city": "Tuy Hoa",
        "code": "TBB",
        "class": "vie",
        "airport": "Dong Tac Airport",
        "label": "Tuy Hoa, Vietnam (TBB)"
    }, {
        "country": "Vietnam",
        "city": "Tamky",
        "code": "VCL",
        "class": "vie",
        "airport": "Chu Lai International Airport",
        "label": "Tamky, Vietnam (VCL)"
    }, {
        "country": "Vietnam",
        "city": "Dalat",
        "code": "DLI",
        "class": "vie",
        "airport": "Lien Khuong Airport",
        "label": "Dalat, Vietnam (DLI)"
    }, {
        "country": "Vietnam",
        "city": "Da Nang",
        "code": "DAD",
        "class": "vie",
        "airport": "Da Nang International Airport",
        "label": "Da Nang, Vietnam (DAD)"
    }, {
        "country": "Vietnam",
        "city": "Haiphong",
        "code": "HPH",
        "class": "vie",
        "airport": "Cat Bi International Airport",
        "label": "Haiphong, Vietnam (HPH)"
    }, {
        "country": "Vietnam",
        "city": "Hanoi",
        "code": "HAN",
        "class": "vie",
        "airport": "Noi Bai International Airport",
        "label": "Hanoi, Vietnam (HAN)"
    }, {
        "country": "Vietnam",
        "city": "Nha Trang",
        "code": "NHA",
        "class": "vie",
        "airport": "Nha Trang Air Base",
        "label": "Nha Trang, Vietnam (NHA)"
    }, {
        "country": "Vietnam",
        "city": "Con Dao",
        "code": "VCS",
        "class": "vie",
        "airport": "Co Ong Airport",
        "label": "Con Dao, Vietnam (VCS)"
    }, {
        "country": "Vietnam",
        "city": "Cam Ranh",
        "code": "CXR",
        "class": "vie",
        "airport": "Cam Ranh Airport",
        "label": "Cam Ranh, Vietnam (CXR)"
    }, {
        "country": "Vietnam",
        "city": "Vinh City",
        "code": "VII",
        "class": "vie",
        "airport": "Vinh Airport",
        "label": "Vinh City, Vietnam (VII)"
    }, {
        "country": "Vietnam",
        "city": "Banmethuot",
        "code": "BMV",
        "class": "vie",
        "airport": "Buon Ma Thuot Airport",
        "label": "Banmethuot, Vietnam (BMV)"
    }, {
        "country": "Vietnam",
        "city": "Banmethuot",
        "code": "BMV",
        "class": "vie",
        "airport": "Buon Ma Thuot Airport",
        "label": "Banmethuot, Vietnam (BMV)"
    }, {
        "country": "Vietnam",
        "city": "Dien Bien Phu",
        "code": "DIN",
        "class": "vie",
        "airport": "Dien Bien Phu Airport",
        "label": "Dien Bien Phu, Vietnam (DIN)"
    }, {
        "country": "Vietnam",
        "city": "Hue",
        "code": "HUI",
        "class": "vie",
        "airport": "Phu Bai Airport",
        "label": "Hue, Vietnam (HUI)"
    }, {
        "country": "Vietnam",
        "city": "Phu Quoc",
        "code": "PQC",
        "class": "vie",
        "airport": "Phu Quoc Airport",
        "label": "Phu Quoc, Vietnam (PQC)"
    }, {
        "country": "Vietnam",
        "city": "Qui Nhon",
        "code": "UIH",
        "class": "vie",
        "airport": "Phu Cat Airport",
        "label": "Qui Nhon, Vietnam (UIH)"
    }, {
        "country": "Vietnam",
        "city": "Pleiku",
        "code": "PXU",
        "class": "vie",
        "airport": "Pleiku Airport",
        "label": "Pleiku, Vietnam (PXU)"
    }, {
        "country": "Wallis and Futuna",
        "city": "Futuna Island",
        "code": "FUT",
        "class": "wal",
        "airport": "Pointe Vele Airport",
        "label": "Futuna Island, Wallis and Futuna (FUT)"
    }, {
        "country": "Wallis and Futuna",
        "city": "Wallis Island",
        "code": "WLS",
        "class": "wal",
        "airport": "Hihifo Airport",
        "label": "Wallis Island, Wallis and Futuna (WLS)"
    }, {
        "country": "Yemen",
        "city": "Taiz",
        "code": "TAI",
        "class": "yem",
        "airport": "Ta'izz International Airport",
        "label": "Taiz, Yemen (TAI)"
    }, {
        "country": "Yemen",
        "city": "Riyan Mukalla",
        "code": "RIY",
        "class": "yem",
        "airport": "Mukalla International Airport",
        "label": "Riyan Mukalla, Yemen (RIY)"
    }, {
        "country": "Yemen",
        "city": "Al Ghaydah",
        "code": "AAY",
        "class": "yem",
        "airport": "Al Ghaidah International Airport",
        "label": "Al Ghaydah, Yemen (AAY)"
    }, {
        "country": "Yemen",
        "city": "Aden",
        "code": "ADE",
        "class": "yem",
        "airport": "Aden International Airport",
        "label": "Aden, Yemen (ADE)"
    }, {
        "country": "Yemen",
        "city": "Socotra",
        "code": "SCT",
        "class": "yem",
        "airport": "Socotra International Airport",
        "label": "Socotra, Yemen (SCT)"
    }, {
        "country": "Yemen",
        "city": "Hodeidah",
        "code": "HOD",
        "class": "yem",
        "airport": "Hodeidah International Airport",
        "label": "Hodeidah, Yemen (HOD)"
    }, {
        "country": "Yemen",
        "city": "Sana'A",
        "code": "SAH",
        "class": "yem",
        "airport": "Sana'a International Airport",
        "label": "Sana'A, Yemen (SAH)"
    }, {
        "country": "Yemen",
        "city": "Seiyun",
        "code": "GXF",
        "class": "yem",
        "airport": "Sayun International Airport",
        "label": "Seiyun, Yemen (GXF)"
    }, {
        "country": "Zambia",
        "city": "Ndola",
        "code": "NLA",
        "class": "zam",
        "airport": "Ndola Airport",
        "label": "Ndola, Zambia (NLA)"
    }, {
        "country": "Zambia",
        "city": "Chipata",
        "code": "CIP",
        "class": "zam",
        "airport": "Chipata Airport",
        "label": "Chipata, Zambia (CIP)"
    }, {
        "country": "Zambia",
        "city": "Livingstone",
        "code": "LVI",
        "class": "zam",
        "airport": "Livingstone Airport",
        "label": "Livingstone, Zambia (LVI)"
    }, {
        "country": "Zambia",
        "city": "Lusaka",
        "code": "LUN",
        "class": "zam",
        "airport": "Lusaka International Airport",
        "label": "Lusaka, Zambia (LUN)"
    }, {
        "country": "Zimbabwe",
        "city": "Bulawayo",
        "code": "BUQ",
        "class": "zim",
        "airport": "Joshua Mqabuko Nkomo International Airport",
        "label": "Bulawayo, Zimbabwe (BUQ)"
    }, {
        "country": "Zimbabwe",
        "city": "Buffalo Range",
        "code": "BFO",
        "class": "zim",
        "airport": "Buffalo Range Airport",
        "label": "Buffalo Range, Zimbabwe (BFO)"
    }, {
        "country": "Zimbabwe",
        "city": "Victoria Falls",
        "code": "VFA",
        "class": "zim",
        "airport": "Victoria Falls International Airport",
        "label": "Victoria Falls, Zimbabwe (VFA)"
    }, {
        "country": "Zimbabwe",
        "city": "Harare",
        "code": "HRE",
        "class": "zim",
        "airport": "Harare International Airport",
        "label": "Harare, Zimbabwe (HRE)"
    }, {
        "country": "Zimbabwe",
        "city": "Kariba",
        "code": "KAB",
        "class": "zim",
        "airport": "Kariba International Airport",
        "label": "Kariba, Zimbabwe (KAB)"
    }, {
        "country": "Zimbabwe",
        "city": "Masvingo",
        "code": "MVZ",
        "class": "zim",
        "airport": "Masvingo International Airport",
        "label": "Masvingo, Zimbabwe (MVZ)"
    }];


    $.widget( "custom.catcomplete", $.ui.autocomplete, {

        _create: function() {
            this._super();
            this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
        },
        _resizeMenu: function() {
            // this.menu.element.outerWidth(410).outerHeight(300);
            this.menu.element.outerWidth(410);
        },

        _renderMenu: function( ul, items ) {

            var that = this,
                currentCategory = "";

            $.each( items, function( index, item ) {
                var li;
                if ( item.country != currentCategory ) {
                    ul.append( "<div class='titlex ui-autocomplete-category " + item.country + "'><span class='country-name'>" + item.country + "</span><span class='country-flag "+item.class+"'></span> </div>" );
                    currentCategory = item.country;
                }

                li = that._renderItemData( ul, item );

                if ( item.country ) {
                    li.attr( "aria-label", item.country + " : " + item.city );
                }
            });
        },

        _renderItem: function( ul, item ) {
            // return $( "<li>" )
            //     .addClass(item.country)
            //     .attr( "data-value", item.city )
            //     .append( $( "<a>" ).text( item.city ) )
            //     .append( $( "<span>" ).text( item.code ) )
            //     .appendTo( ul );
            return $( "<li class='"+item.country+"' data-value='"+item.city+"'><a><div><span class='item-left'>"+item.city+"</span><span class='item-right'>"+item.code+"</span></div><div class='item-airport'>"+item.airport+"</div> </a></li>" )
                .appendTo( ul );
        }

    });

    $( "#departure" ).on( "focus", function( event, ui ) {
        $(this).select();
        $(this).catcomplete( "search" ,"111");

    } );




        function custom_source(request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response($.grep(countries, function (value) {
                return matcher.test(value.city)
                    || matcher.test(value.country)
                    || matcher.test(value.airport)
                    || matcher.test(value.code)
                    || matcher.test(value.isrecent);
            }));
        }
    // $("#departure").on('click', function () {
    //     $("#departure").catcomplete("search");
    //
    // });


        $( "#departure" ).catcomplete({
            source: custom_source,
            delay:0,
            minLength: 3,
            autoFocus: true,
            open : function() {
                $(".overlay").remove();
                $("body").append("<div class='overlay'></div>");

            },
            close : function(event, ui) {
               $(".overlay").remove();
                event.preventDefault();
                if ( event.which == 1 ) {
                    $("ul.ui-autocomplete").show();
                    $("ul.ui-autocomplete").data('keep-open', 1);
                }
                else if ( $("ul.ui-autocomplete").data('keep-open') == 1) {
                    $("ul.ui-autocomplete").show();
                    $("ul.ui-autocomplete").data('keep-open', 0);
                }
return false;
            }

        });


    $('#departure').keydown(function(e) {
        if (e.altKey) {
            e.preventDefault();
        } else {
            var key = e.keyCode;
            if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                e.preventDefault();
            }
        }
    });


});
