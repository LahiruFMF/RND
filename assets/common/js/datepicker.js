/**
 * Created by LahiruC on 7/28/2017.
 */
$(function() {


    dpmode='';
    var startDate='0';
    var endDate='0';
    $( "#departure-date" ).datepicker({
        minDate: 0,
        dateFormat:"yy-mm-dd",
        changeMonth: false,
        numberOfMonths: 2,
        defaultDate: new Date(),
        beforeShow:function(input, calendar){
            menuLocked=true;
            dpmode='depart';
        },
        beforeShowDay: function(date) {
            var date1 = $.datepicker.parseDate("yy-mm-dd", $("#departure-date").val());
            var date2 = $.datepicker.parseDate("yy-mm-dd", $("#return-date").val());

                if (date1 && date2 && (date.getTime() == date1.getTime() )) {
                    return [true,"dp-highlight-one"];
                }else if (date1 && date2 && ( date2 && date >= date1 && date <= date2)) {
console.log("Date : "+date+" Date 2 : "+date2 );

                        return [true,"dp-highlight"];

                }else{

                return [true,"sss"];
        }
            // return [true, date1 && date2 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : "home"];

        },
        onClose: function( selectedDate ) {
            $( "#return-date" ).datepicker( "option", "minDate", selectedDate );
            $('#return-date').datepicker('show');
            startDate = selectedDate;


        }
    });
    $( "#return-date" ).datepicker({
        dateFormat:"yy-mm-dd",
        minDate:2,
        setDate: new Date(),
        changeMonth: false,
        numberOfMonths: 2,
        defaultDate: new Date(),
        beforeShow:function(){
            dpmode='return';
        },
        beforeShowDay: function(date) {
            var date1 = $.datepicker.parseDate("yy-mm-dd", $("#departure-date").val());
            var date2 = $.datepicker.parseDate("yy-mm-dd", $("#return-date").val());
            return [true, date1 && date2 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlightccc" : ""];
        },
        onClose: function( selectedDate ) {
            // $( "#departure-date" ).datepicker( "option", "maxDate", selectedDate );
            endDate = selectedDate;
        }
    });

    $('#ui-datepicker-div').delegate('.ui-datepicker-calendar td', 'mouseover', function() {
        if ($(this).data('year')==undefined)return;
        if (dpmode=='depart' && endDate=='0')return;
        if (dpmode=='return' && startDate=='0')return;

        var currentDate = $(this).data('year')+'-'+($(this).data('month')+1)+'-'+$('a',this).html();
        currentDate = $.datepicker.parseDate("yy-mm-dd",currentDate).getTime();
        if (dpmode=='depart') {
            var StartDate = currentDate;
            var EndDate = $.datepicker.parseDate("yy-mm-dd",endDate).getTime();
        }else{
            var StartDate = $.datepicker.parseDate("yy-mm-dd",startDate).getTime();
            var EndDate = currentDate;
        };
        $('#ui-datepicker-div td').each(function(index, el) {
            if ($(this).data('year')==undefined)return;

            var currentDate = $(this).data('year')+'-'+($(this).data('month')+1)+'-'+$('a',this).html();

            currentDate=$.datepicker.parseDate("yy-mm-dd",currentDate).getTime();
            if (currentDate >= StartDate && currentDate <= EndDate) {
                $(this).addClass('dp-highlight')
            }else{
               // if(currentDate <= StartDate && currentDate >= EndDate){
               $(this).removeClass('dp-highlight');
               // }
            };
        });
    });
});