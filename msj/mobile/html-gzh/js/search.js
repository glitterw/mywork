
var home_num =1;
$(document).ready(function () {

    $("body").on('keydown', 'input', function () {

        $(".clearBtn").show().click(function () {
            $("input").val("");
            $(".clearBtn").hide();

        });
    });

    $(".searchImg").click(function () {

        if ($("input").val().length > 0) {

            $(".recommend").hide();
            $(".searchResult").show();

        } else {
            alert("搜索内容不能为空");
        }
    });


    $(".change_jxz").click(function () {
        $(".change_jxz").removeClass("change_no_choice")
        $(".change_yjs").addClass("change_no_choice");


        $(".change_xian").animate({ left: '0rem' });

        $(".list_jxz").show();
        $(".list_yjs").hide();




    });
    $(".change_yjs").click(function () {

        $(".change_jxz").addClass("change_no_choice")
        $(".change_yjs").addClass("change_choice");
        $(".change_yjs").removeClass("change_no_choice")

        $(".change_xian").animate({ left: '2.95rem' });

        $(".list_yjs").show();
        $(".list_jxz").hide();
    });

    $(".jian").click(function () {


        if (home_num > 1) {
            home_num--;

            $(".personal_num").html(home_num + '间');
        }

    });
    $(".jia").click(function () {
        home_num++;

        $(".personal_num").html(home_num + '间');


    });
    



});
