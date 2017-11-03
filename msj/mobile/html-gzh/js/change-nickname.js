/**
 * Created by asus on 2017/4/19.
 */


$(document).ready(function () {
    $("body").on('keydown', '.input-nickname input', function () {
        $(".clear-input-nickname").show().click(function () {
            $(".input-nickname input").val("");
            $(".clear-input-nickname").hide();
        });
    });
});


$(function () {
    $(document).on('click', '.change-nickname-content  .jack-confirm-bt', function () {
        alert('修改昵称')
    });
});