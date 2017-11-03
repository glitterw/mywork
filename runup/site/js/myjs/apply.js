// JavaScript Document
$(function () {
    $(".input").focus(function () {
        $(this).parent().addClass("ipt-focus");
    });
    $(".input").blur(function () {
        $(this).parent().removeClass("ipt-focus");
    });    
});