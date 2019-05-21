$(function() {
    /*
     * 添加图片
     */
    var img_files =new Array();
    var img_num = 0;
    var $tooltips = $('.js_tooltips');
    var tmpl = '<li class="weui-uploader__file" " style="background-image:url(#url#)"></li>',
        $gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
        $uploaderInput = $("#uploaderInput"),
        $uploaderFiles = $("#uploaderFiles")
        ;
    $uploaderInput.on("change", function(e){
        var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
        var img_num_ = img_num + files.length;
        console.log(img_num_);
        if(img_num_>9){
            alert("最多只能上传9张！");
            return false;
        }
        for (var i = 0, len = files.length; i < len; ++i) {
            img_files[img_num] = files[i];
            img_num  = img_num + 1;
            var file = files[i];
 
            if (url) {
                src = url.createObjectURL(file);
            } else {
                src = e.target.result;
            }
 
            $uploaderFiles.append($(tmpl.replace('#url#', src)));
        }
        uploaderInput.value="";
    });
    var index;
    $uploaderFiles.on("click", "li", function(){
        index = $(this).index();
        $galleryImg.attr("style", this.getAttribute("style"));
        $gallery.fadeIn(100);
    });
    $gallery.on("click", function(){
        $gallery.fadeOut(100);
    });
 
    $(".weui-gallery__del").click(function() {
        // 删除知道图片
        $uploaderFiles.find("li").eq(index).remove();
        img_files.splice(index, 1);
        img_num  = img_num - 1;
    });
 
    /*
     * 提交
     */
    var class_ids ='';
    $('#showTooltips').on('click', function() {
        var falg = 0;
 
        if(img_num == 0){
            //图片个数为0
            $tooltips.html('请上传图片');
            $('.page.cell').removeClass('slideIn');
            $tooltips.css('display', 'block');
            setTimeout(function() {
                $tooltips.css('display', 'none');
            }, 2000);
            return false;
        }
 
        //打开loading
        var $loadingToast = $('#loadingToast');
        if ($loadingToast.css('display') != 'none') return;
        $loadingToast.fadeIn(100);
 
 
        var formData = new FormData();
        var t = $('#classdynamics_form').serializeArray();
        $.each(t, function() {
            if(this.name != "class_id[]"){
                formData.append(this.name, this.value);
            }
        });
        formData.append('class_id', class_ids);
        formData.append('id', "{$Think.get.id}");
        console.log(formData);
        for(var x=0; x<img_files.length;x++){
            formData.append('pic[]', img_files[x]);
        } 
        $("#loadingToast").css('display',"block");
        $.ajax({
            url: "upload.php",
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            mimeType: "multipart/form-data",
            success: function (res) {
                if(res == 1){
                    $("#log-msg").html("添加成功");
                }else{
                    $("#log-msg").html("添加失败");
                }
                $("#loadingToast").css('display',"none");
                $("#toast").css("opacity","1");
                $("#toast").css("display","block");
                window.history.go(-1);
            },
            error: function (data) {
                console.log(data);
            }
        });
 
    });
});