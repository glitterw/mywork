/**
 * Created by asus on 2017/4/18.
 */


$(function () {
    var areaflag = 0 ;
    var moneyflag = 0 ;
    $(document).on('click', '.area-select', function () {
        $('.money-select-shade').hide();
        $('.area-select-shade').toggle();

        $(document).on('click','.area-select-shade div',function () {
            $(this).find('p').addClass('active');
            $(this).siblings().find('p').removeClass('active');
        });


        if(areaflag == 0){

            $('body').css('overflow', 'hidden');

            areaflag = 1 ;
            $('.area-select>span').css('color', '#98525c');
            $('.area-select>img').attr('src', 'images/red-up-choose.png');

            moneyflag = 0 ;
            $('.money-select>span').css('color', '#000');
            $('.money-select>img').attr('src', 'images/city-down-choose.png');

        }else{

            $('body').css('overflow', 'scroll');

            areaflag = 0 ;
            $('.area-select>span').css('color', '#000');
            $('.area-select>img').attr('src', 'images/city-down-choose.png');
        }
    });


    $(document).on('click', '.money-select', function () {
        $('.area-select-shade').hide();
        $('.money-select-shade').toggle();

        $(document).on('click','.money-select-shade div',function () {
            $(this).find('p').addClass('active');
            $(this).siblings().find('p').removeClass('active');
        });

        if(moneyflag == 0){

            $('body').css('overflow', 'hidden');

            moneyflag = 1 ;
            $('.money-select>span').css('color', '#98525c');
            $('.money-select>img').attr('src', 'images/red-up-choose.png');

            areaflag = 0 ;
            $('.area-select>span').css('color', '#000');
            $('.area-select>img').attr('src', 'images/city-down-choose.png');

        }else{
            $('body').css('overflow', 'scroll');

            moneyflag = 0 ;
            $('.money-select>span').css('color', '#000');
            $('.money-select>img').attr('src', 'images/city-down-choose.png');
        }
    });

    $(document).on('click', '.area-select-shade>div',function () {
        $('.area-select-shade').hide();
        var area = $(this).children('p').text();
        $('.area-select>span').text(area);

        $('body').css('overflow', 'scroll');
        areaflag = 0 ;
        $('.area-select>span').css('color', '#000');
        $('.area-select>img').attr('src', 'images/city-down-choose.png');
    });

    $(document).on('click', '.money-select-shade>div',function () {
        $('.money-select-shade').hide();
        var area = $(this).children('p').text();
        $('.money-select>span').text(area);

        $('body').css('overflow', 'scroll');
        moneyflag = 0 ;
        $('.money-select>span').css('color', '#000');
        $('.money-select>img').attr('src', 'images/city-down-choose.png');
    });

    /*加载更多*/
    $(document).on('click', '.city-list-content footer', function () {
        alert('加载更多')
    });

});
