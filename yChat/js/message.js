$(document).ready(function(){
    $(".action_contacter").click(function(){
        $(".action_message").find("p").removeClass("navi_bottom_HL");
        $(".action_message").find("img").attr("src","../resource/test/message.png");

        $(this).find("p").addClass("navi_bottom_HL");
        $(this).find("img").attr("src","../resource/test/contacter_HL.png");
        document.title = "联系人";

        $("#navi_contacter").show();
        $("#navi_message").hide();

        $("#contacter_list").show();
        $("#message_list").hide();
    });

    $(".action_message").click(function(){
        $(".action_contacter").find("p").removeClass("navi_bottom_HL");
        $(".action_contacter").find("img").attr("src","../resource/test/contacter.png");

        $(this).find("p").addClass("navi_bottom_HL");
        $(this).find("img").attr("src","../resource/test/message_HL.png");
        document.title = "消息";

        $("#navi_message").show();
        $("#navi_contacter").hide();

        $("#message_list").show();
        $("#contacter_list").hide();
    });

    $("#navi_message .navi_right_add").click(function(){
        var _top = 0 - document.body.clientWidth * 2.1 / 10;
        layer.open({
            fixed : false
            ,top : _top
            ,title : false
            ,style : 'background-color: white;border: none;box-shadow: none;width: 40%;max-width: 40%;margin-left: 55%;'
            ,content: template(document.getElementById('message_more_tpl').innerHTML, {})
        });

        $(".create_group").click(function(){
            console.log('create_group');
            layer.closeAll();
        });

        $(".add_friend_group").click(function(){
            console.log("add_friend_group");
            layer.closeAll();
        });
    });

    $("#friend_button").click(function(){
        $("#group_button").removeClass("contacter_button_HL");
        $("#friend_button").addClass("contacter_button_HL");

        $("#contacter_friend_list").show();
        $("#contacter_group_list").hide();
    });

    $("#group_button").click(function(){
        $("#friend_button").removeClass("contacter_button_HL");
        $("#group_button").addClass("contacter_button_HL");

        $("#contacter_group_list").show();
        $("#contacter_friend_list").hide();
    });


    $(".message_group").click(function() {
        var $_img = $(this).find("table tr td .arrow");
        if ( $_img.length == 1 )
        {
            var type = $(this).data("field");
            var type_id = $(this).data(type + "_id");
            var _className = $_img[0].className;
            if ( _className.indexOf("r90") < 0 )
            {
                var _parent = $(this).parent();
                $(_parent).find("table tr td .arrow").removeClass("r90");
                $(_parent).find(".message_item").slideUp("fast");

                $_img.addClass("r90");
                $(_parent).find(".message_item").each(function(){
                    var item_type_id = $(this).data(type + "_id");
                    if ( item_type_id == type_id )
                        $(this).slideDown("fast");
                });
            }
        }
    });
});