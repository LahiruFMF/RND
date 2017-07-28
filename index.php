<!DOCTYPE html>
<html>
<head>


    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>
    <link href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
    <!--bootstrap -->
    <link rel="stylesheet" type="text/css" href="assets/lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="assets/lib/bootstrap/css/bootstrap-theme.css">
    <script src="assets/lib/bootstrap/js/bootstrap.min.js"></script>
    <!--materialize-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>

    <!-- Material Design Bootstrap -->
<!--    <script type="text/javascript" src="assets/lib/mdb/js/mdb.js"></script>-->
    <!-- jquery cookie -->
<!--    <script src="assets/lib/cookie/jquery.cookie.js"></script>-->

    <!-- Jquery Date Format -->
    <script src="assets/lib/dateformat/jquery-dateFormat.min.js"></script>

    <!-- Material Design Bootstrap -->
<!--    <link href="assets/lib/mdb/css/mdb.css" rel="stylesheet">-->

    <link rel="stylesheet" type="text/css" href="assets/common/css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900" rel="stylesheet">

    <script src="assets/common/js/countrypicker.js"></script>
    <script src="assets/common/js/datepicker.js"></script>






</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-12">
                <h1>Widget</h1>
        </div>

    </div>
</div>


<div class="container">
    <div class="row">
        <div class="col-md-3">
            <div class="input-field">
                <input id="origin" type="text" class="validate">
                <label for="first_name">Origin</label>
            </div>
        </div>

        <div class="col-md-3">
            <div class="input-field">
                <input id="destination" type="text" class="validate">
                <label for="first_name">Destination</label>
            </div>
        </div>

        <div class="col-md-3">
            <div class="input-field">
                <input id="departure-date" type="text" class="validate">
                <label for="first_name">Departure</label>
            </div>
        </div>

        <div class="col-md-3">
            <div class="input-field">
                <input id="return-date" type="text" class="validate">
                <label for="first_name">Return</label>
            </div>
        </div>





        <div class="clearfix"></div>

        <div class="col-md-12">
            <input id="search-flight" type="button" value="Submit" class="submit">
        </div>

    </div>
</div>
<div class="output"></div>
</body>
</html>