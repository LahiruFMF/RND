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
    <!--materialize
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js"></script>-->

    <!-- Material Design Bootstrap -->
    <script type="text/javascript" src="assets/lib/mdb/js/mdb.js"></script>
    <!-- jquery cookie -->
    <script src="assets/lib/cookie/jquery.cookie.js"></script>


    <!-- Material Design Bootstrap -->
    <link href="assets/lib/mdb/css/mdb.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="assets/common/css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900" rel="stylesheet">

    <script src="assets/common/js/countrypicker.js"></script>
<style>


    /* form starting stylings ------------------------------- */
    .group 			  {
        position:relative;
        margin-bottom:45px;
    }
    .input-field input 				{
        font-size:18px;
        padding:10px 10px 10px 5px;
        display:block;
        border:none;
    }
    .input-field input:focus 		{ outline:none; }

    /* LABEL ======================================= */
    label 				 {
        color:#999;
        font-size:18px;
        font-weight:normal;
        position:absolute;
        pointer-events:none;
        left:5px;
        top:10px;
        transition:0.2s ease all;
        -moz-transition:0.2s ease all;
        -webkit-transition:0.2s ease all;
    }

    /* active state */
    .input-field input:focus ~ label, .input-field input:valid ~ label 		{
        top:-20px;
        font-size:14px;
        color:#5264AE;
    }

    /* BOTTOM BARS ================================= */
    .bar 	{ position:relative; display:block; }
    .bar:before, .bar:after 	{
        content:'';
        height:2px;
        width:0;
        bottom:1px;
        position:absolute;
        background:#5264AE;
        transition:0.2s ease all;
        -moz-transition:0.2s ease all;
        -webkit-transition:0.2s ease all;
    }
    .bar:before {
        left:50%;
    }
    .bar:after {
        right:50%;
    }

    /* active state */
    .input-field input:focus ~ .bar:before, input:focus ~ .bar:after {
        width:50%;
    }

    /* HIGHLIGHTER ================================== */
    .highlight {
        position:absolute;
        height:60%;
        width:100px;
        top:25%;
        left:0;
        pointer-events:none;
        opacity:0.5;
    }

    /* active state */
    .input-field input:focus ~ .highlight {
        -webkit-animation:inputHighlighter 0.3s ease;
        -moz-animation:inputHighlighter 0.3s ease;
        animation:inputHighlighter 0.3s ease;
    }

    /* ANIMATIONS ================ */
    @-webkit-keyframes inputHighlighter {
        from { background:#5264AE; }
        to 	{ width:0; background:transparent; }
    }
    @-moz-keyframes inputHighlighter {
        from { background:#5264AE; }
        to 	{ width:0; background:transparent; }
    }
    @keyframes inputHighlighter {
        from { background:#5264AE; }
        to 	{ width:0; background:transparent; }
    }



</style>

    <script>

//        $(function () {
//
//            $(".material-input").after('<span class="input-bar">');
//            $(".material-input").focusin(function () {
//
//
//                $element = $(this);
//                var $label = $("label[for='"+$element.attr('id')+"']");
//
//
//             //   $label.addClass("focused");
//                $(this).select();
//            });
//            $(".material-input").focusout(function () {
//                $element = $(this);
//                var $label = $("label[for='"+$element.attr('id')+"']");
//                if ($("#departure").val() == "") {
//                    $label.removeClass("focused");
//                }
//            });
//        });
    </script>




    <style>
        /*.input-field {*/
            /*position: relative;*/
            /*margin-top: 80px;*/
        /*}*/

        /*.input-field .material-input {*/
            /*background: #FFF;*/
            /*border: none;*/
            /*outline: none;*/
            /*padding: 10px 10px 10px 13px;*/
            /*width: 100%;*/
        /*}*/

        /*.input-field .textbox:focus {*/
            /*!*border-bottom: 1px solid #333;*!*/
        /*}*/

        /*.input-field .label {*/
            /*position: absolute;*/
            /*top: 9px;*/
            /*left: 15px;*/
            /*opacity: 0.5;*/
            /*font-size: 14px;*/
            /*transition: 0.2s ease all;*/
            /*color: #333;*/
        /*}*/

        /*.input-field .focused {*/
            /*top: -23px;*/
            /*left: 0px;*/
            /*opacity: 1;*/
            /*font-size: 16px;*/
        /*}*/


        /*.submit{*/
            /*float: right;*/
            /*margin-top: 100px;*/
        /*}*/
    </style>

</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-md-3">



        </div>
        <div class="col-md-3"></div>
        <div class="col-md-3"></div>
        <div class="col-md-3"><input type="button" class="btn btn-primary waves-effect waves-light"
                                     value="Submit"></div>
    </div>
</div>
<div class="header">
    test
</div>
<h1>My First Heading</h1>

<p>My first paragraph.</p>
<div class="container">
    <div class="row">
        <div class="col-md-4">
            <div class="input-field">
                <div class="group">
                <input class="material-input" id="from" type="text" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>From</label>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="input-field">
                <div class="group">
                <input class="material-input" id="to" type="text" required>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>To</label>
                </div>
            </div>
        </div>
        <div class="col-md-4">

             sasasas
                <input class="form-control" id="departure" type="text" required>

                </div>




        <div class="clearfix"></div>

        <div class="col-md-12">
            <input id="search-flight" type="button" value="Submit" class="submit">
        </div>

    </div>
</div>

</body>
</html>