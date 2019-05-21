$(document).ready(function(){
    $(".mobile_login").click(function () {
        $("#div_l_mobile").show();
        $(".pswd_login").show();
        $(".mobile_login").hide();
        $("#div_l_name").hide();
    });

    $(".pswd_login").click(function(){
        $("#div_l_mobile").hide();
        $(".pswd_login").hide();
        $(".mobile_login").show();
        $("#div_l_name").show();
    });
});