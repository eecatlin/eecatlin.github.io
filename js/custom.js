// Offset for Site Navigation
$('#siteNav').affix({
	offset: {
		top: 100
	}
})
function displayTranslation() {
	if ($('.english-version').css('display') =='none') {
		$('.english-version').show();
		$('.spanish-version').hide();
		$('#translationTxt').text('Show original');
	} else {
		$('.english-version').hide();
		$('.spanish-version').show();
		$('#translationTxt').text('View english translation');
	}
}