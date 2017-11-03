$(function() {
	if($(".client").size() > 0) {
		var l = $(".client").offset().left;
	}

	$(".client").hover(function() {
		$(".eCode").css({
			left: l + 10,
			top: 58
		}).show()
	}, function() {
		$(".eCode").hide()
	})

	$('.userImg').mouseover(function() {
		$('.userOut').css('display', 'block');

	})
	$('.userImg').mouseout(function() {
		$('.userOut').css('display', 'none');
	})

	$(document).on('mouseenter', '.loginBarEnd', function() {
		$('.loginBar_content').css('display', 'block');
	});
	$(document).on('mouseleave', '.loginBarEnd', function() {
		$('.loginBar_content').css('display', 'none');
	});

})