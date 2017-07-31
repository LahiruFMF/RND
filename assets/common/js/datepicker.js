/**
 * Created by LahiruC on 7/28/2017.
 */
$(function () {


    dpmode = '';
    var startDate = '0';
    var endDate = '0';
    var goSelectedDate = '0';
    var returnSelectedDate = '0';

    isReturn=true;

    $("#departure-date").datepicker({
        minDate: 0,
        dateFormat: "yy-mm-dd",
        changeMonth: false,
        numberOfMonths: 2,
        defaultDate: new Date(),
        dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        beforeShow: function (input, calendar) {
            menuLocked = true;
            dpmode = 'depart';
        },
        beforeShowDay: function (date) {
            var date1 = $.datepicker.parseDate("yy-mm-dd", $("#departure-date").val());
            var date2 = $.datepicker.parseDate("yy-mm-dd", $("#return-date").val());
            var holidayPointer = SelectedDates[date];
            var holidayText = SeletedText[date];

            if ((date1 && date.toString() == date1.toString()) || (date2 && date.toString() == date2.toString())) {

                if ((date1 && date.toString() == date1.toString())) {
                    if (holidayPointer) {
                        return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "holiday dp-highlight-clicked startDay" : "startDay holiday", holidayText];
                    } else {
                        return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "dp-highlight-clicked startDay" : "startDay", ""];
                    }
                } else if ((date2 && date.toString() == date2.toString())) {
                    if (holidayPointer) {
                        return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "holiday dp-highlight-clicked endDay" : "endDay holiday", holidayText];
                    } else {
                        return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "dp-highlight-clicked endDay" : "endDay", ""];
                    }
                }
            } else {
                if (holidayPointer) {
                    return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "holiday dp-highlight-clicked" : "holiday", holidayText];
                } else {
                    return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "dp-highlight-clicked" : "", ""];
                }
            }
        },
        onClose: function (selectedDate) {
            if(isReturn){
            $("#return-date").datepicker("option", "minDate", selectedDate);
            $('#return-date').focus();
            startDate = selectedDate;
            }

        }
    });
    $("#return-date").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 2,
        setDate: new Date(),
        changeMonth: false,
        numberOfMonths: 2,
        defaultDate: new Date(),
        dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        beforeShow: function () {
            dpmode = 'return';
        },
        beforeShowDay: function (date) {

            var date1 = $.datepicker.parseDate("yy-mm-dd", $("#departure-date").val());
            var date2 = $.datepicker.parseDate("yy-mm-dd", $("#return-date").val());

            var holidayPointer = SelectedDates[date];
            var holidayText = SeletedText[date];

            if ((date1 && date.toString() == date1.toString()) || (date2 && date.toString() == date2.toString())) {

                if ((date1 && date.toString() == date1.toString())) {
                    if (holidayPointer) {
                        return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "holiday dp-highlight-clicked startDay" : "startDay holiday", holidayText];
                    } else {
                        return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "dp-highlight-clicked startDay" : "startDay", ""];
                    }
                } else if ((date2 && date.toString() == date2.toString())) {
                    if (holidayPointer) {
                        return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "holiday dp-highlight-clicked endDay" : "endDay holiday", holidayText];
                    } else {
                        return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "dp-highlight-clicked endDay" : "endDay", ""];
                    }
                }
            } else {
                if (holidayPointer) {
                    return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "holiday dp-highlight-clicked" : "holiday", holidayText];
                } else {
                    return [true, date1 && date2 && ((date2 && date >= date1 && date <= date2)) ? "dp-highlight-clicked" : "", ""];
                }
            }


        },
        onClose: function (selectedDate) {
            // $( "#departure-date" ).datepicker( "option", "maxDate", selectedDate );
            endDate = selectedDate;
        }
    });

    $('#ui-datepicker-div').delegate('.ui-datepicker-calendar td', 'mouseover', function () {
        if ($(this).data('year') == undefined)return;
        if (dpmode == 'depart' && endDate == '0')return;
        if (dpmode == 'return' && startDate == '0')return;

        var currentDate = $(this).data('year') + '-' + ($(this).data('month') + 1) + '-' + $('a', this).html();
        currentDate = $.datepicker.parseDate("yy-mm-dd", currentDate).getTime();
        if (dpmode == 'depart') {
            var StartDate = currentDate;
            var EndDate = $.datepicker.parseDate("yy-mm-dd", endDate).getTime();
            returnSelectedDate = $.datepicker.parseDate("yy-mm-dd", endDate).getTime();
            returnDate = EndDate;

        } else {
            var StartDate = $.datepicker.parseDate("yy-mm-dd", startDate).getTime();
            goSelectedDate = StartDate;
            var EndDate = currentDate;
        }
        ;
        $('#ui-datepicker-div td').each(function (index, el) {
            $(this).removeClass('dp-highlight-same');
            if ($(this).data('year') == undefined)return;

            var currentDate = $(this).data('year') + '-' + ($(this).data('month') + 1) + '-' + $('a', this).html();

            currentDate = $.datepicker.parseDate("yy-mm-dd", currentDate).getTime();
            if (currentDate >= StartDate && currentDate <= EndDate) {
                $(this).addClass('dp-highlight');
            } else {
                // if(currentDate <= StartDate && currentDate >= EndDate){
                $(this).removeClass('dp-highlight');
                $(this).removeClass('dp-highlight-same');
                // }
            }
            if (currentDate == goSelectedDate || currentDate == returnSelectedDate) {
                // $(this).addClass('dp-highlight-same');
            }

        });
    });


    var SelectedDates = {};
    SelectedDates[new Date('01/12/2017')] = new Date('01/12/2017');
    SelectedDates[new Date('01/14/2017')] = new Date('01/14/2017');

    SelectedDates[new Date('02/04/2017')] = new Date('02/04/2017');
    SelectedDates[new Date('02/10/2017')] = new Date('02/10/2017');
    SelectedDates[new Date('02/24/2017')] = new Date('02/24/2017');

    SelectedDates[new Date('03/12/2017')] = new Date('03/12/2017');

    SelectedDates[new Date('04/10/2017')] = new Date('04/10/2017');
    SelectedDates[new Date('04/13/2017')] = new Date('04/13/2017');
    SelectedDates[new Date('04/14/2017')] = new Date('04/14/2017');
    SelectedDates[new Date('04/14/2017')] = new Date('04/14/2017');

    SelectedDates[new Date('05/01/2017')] = new Date('05/01/2017');
    SelectedDates[new Date('05/10/2017')] = new Date('05/10/2017');
    SelectedDates[new Date('05/11/2017')] = new Date('05/11/2017');

    SelectedDates[new Date('06/08/2017')] = new Date('06/08/2017');
    SelectedDates[new Date('06/26/2017')] = new Date('06/26/2017');

    SelectedDates[new Date('07/08/2017')] = new Date('07/08/2017');

    SelectedDates[new Date('08/07/2017')] = new Date('08/07/2017');

    SelectedDates[new Date('09/01/2017')] = new Date('09/01/2017');
    SelectedDates[new Date('09/05/2017')] = new Date('09/05/2017');

    SelectedDates[new Date('10/05/2017')] = new Date('10/05/2017');
    SelectedDates[new Date('10/18/2017')] = new Date('10/18/2017');

    SelectedDates[new Date('11/03/2017')] = new Date('11/03/2017');

    SelectedDates[new Date('12/01/2017')] = new Date('12/01/2017');
    SelectedDates[new Date('12/03/2017')] = new Date('12/03/2017');
    SelectedDates[new Date('12/25/2017')] = new Date('12/25/2017');


    var SeletedText = {};
    SeletedText[new Date('01/12/2017')] = 'Duruthu Full Moon Poya ( P | B | M )';
    SeletedText[new Date('01/14/2017')] = 'Tamil Thai Pongal Day ( P | B | M )';
    SeletedText[new Date('02/04/2017')] = 'National Day ( P | B | M)';
    SeletedText[new Date('02/10/2017')] = 'Navam Full Moon Poya Day ( P | B | M )';
    SeletedText[new Date('02/24/2017')] = 'Mahasivarathri Day ( P | B )';

    SeletedText[new Date('03/12/2017')] = 'Medin Full Moon Poya Day ( P | B | M )';

    SeletedText[new Date('04/10/2017')] = 'Bak Full Moon Poya Day ( P | B | M )';
    SeletedText[new Date('04/13/2017')] = 'Day Prior to Sinhala & Tamil New Year Day ( P | B | M )';
    SeletedText[new Date('04/14/2017')] = 'Sinhala & Tamil New Year Day ( P | B | M )';

    SeletedText[new Date('05/01/2017')] = 'May Day ( P | B | M )';
    SeletedText[new Date('05/10/2017')] = 'Vesak Full Moon Poya Day ( P | B | M )';
    SeletedText[new Date('05/11/2017')] = 'Day after Vesak Full Moon Poya Day ( P | B | M )';


    SeletedText[new Date('06/08/2017')] = 'Poson Full Moon Poya Day ( P | B | M )';

    SeletedText[new Date('06/26/2017')] = 'Id-Ul-Fitr (Ramazan Festival Day) ( P | B )';

    SeletedText[new Date('07/08/2017')] = 'Esala Full Moon Poya Day ( P | B | M )';

    SeletedText[new Date('08/07/2017')] = 'Nikini Full Moon Poya Day ( P | B | M )';

    SeletedText[new Date('09/01/2017')] = 'Id-Ul-Alha (Hadji Festival Day) ( P | B )';

    SeletedText[new Date('09/05/2017')] = 'Binara Full Moon Poya Day ( P | B | M )';

    SeletedText[new Date('10/05/2017')] = 'Vap Full Moon Poya Day ( P | B | M )';

    SeletedText[new Date('10/18/2017')] = 'Deepavali Festival Day ( P | B )';

    SeletedText[new Date('11/03/2017')] = 'Il Full Moon Poya Day ( P | B | M )';

    SeletedText[new Date('12/01/2017')] = 'Milad-Un-Nabi (Holiday Prophet\'s Birthday) ( P | B | M )';
    SeletedText[new Date('12/03/2017')] = 'Unduvap Full Moon Poya Day ( P | B | M )';
    SeletedText[new Date('12/25/2017')] = 'Christmas Day ( P | B | M )';

});