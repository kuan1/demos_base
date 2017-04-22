/**
 * Created by Administrator on 2017/3/10.
 */
$(function(){
    //显示时间
    setInterval(function(){
        var date = new Date();
        var nowDate = date.toLocaleTimeString();
        //console.log(date.toLocaleTimeString())
        $("#time").text(nowDate)
    },1000);

    //轮播图效果
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        loop:true,
        //effect: 'fade',
        direction: 'vertical'
    });

    $(".swiper-container").hover(function(){
        $(".arrow").stop().fadeIn();
        swiper.stopAutoplay();
    },function(){
        $(".arrow").stop().fadeOut();
        swiper.startAutoplay();
    });

    //获取节目数据
    $.getJSON("js/showData.json").done(function(data){
        //console.log(data)
        $.each(data,function(){
            var html = template("MB",this);
            $(".content").append(html);
            if($.cookie(this.id) == this.id){
                //页面加载时候判断时候收藏
                $(".collect").last().text("取消收藏").css("display","block");
            }
            //console.log(this.pic)
        })
    });

    //加入收藏功能实现
    $(".content").on("click","button",function(){
        var tid = $(this).prev().text();
        //console.log($.cookie(tid));
        if($.cookie(tid)){
            $(this).text("收藏");
            console.log($(this));
            $(this).removeAttr("style");
            $.removeCookie(tid)
        }else{
            $.cookie(tid,tid);
            $(this).text("取消收藏").css("display","block");
        }
        console.log($.cookie());
    })



});