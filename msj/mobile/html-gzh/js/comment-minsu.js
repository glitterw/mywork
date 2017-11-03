/**
 * Created by asus on 2017/4/18.
 */


$(document).ready(function () {


    $('.comment-minsu-content .start-list  i').click(function () {
        var index = $(this).attr('id');

        $(".comment-minsu-content .comment-star i").each(function (i) {
            var j = i + 1;
            if (j <= index) {
                $('.start-list i:nth-child(' + j + ')').removeClass('off').addClass('on');
            } else {
                $('.start-list i:nth-child(' + j + ')').removeClass('on').addClass('off');
            }
        });
        $('.comment-minsu-content .comment-star p').text(index + ".0分");

    });

    $('.jack-confirm-bt').click(function () {

    });

    // $(document).on('click', '.comment-minsu-content .start-list  i', function () {




    // alert(index);





});
