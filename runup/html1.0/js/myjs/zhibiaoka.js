


$(function() {

	$('.yangshi-icon').on('click', function(e) {
		$(this).find('.icon-wrap-inner').toggle()
		e.stopPropagation();
	})
	$('.yangshi-icon').on('click', 'a', function(e) {
		var className = $(this).find('i').attr('class')
		$('.icon-wrap-inner').hide();
		$('#show-icon').attr('class', className);
		e.stopPropagation();
	})

})

$(function() {
	$('.Common-close').on('click', '.close', function(e) {
		$(this).closest('.Common-close').hide();
		e.stopPropagation();
	})
})


$(function() {
	$('.nick-name-value').on('click', function() {
		$('.shezhiziduan').show();

	})
})