var serviceURL = "http://localhost/allschools-mobile/json/";

$('#recordReviewListPage').bind('pageinit', function(event) {
	getRecordReviewList();
});

function getRecordReviewList() {
	$.getJSON(serviceURL + 'recordreviewlist.json', function(data) {
		$('#recordReviewList li').remove();
		var reviews = data.items;
		$.each(reviews, function(index, entry) {
			$('#recordReviewList').append('<li><a href="recordreview.html?id=' + entry.id + '"><img src="'+ entry.cover + '" /><h3>' + entry.bandName + '</h3><p>' + entry.recordName + '</p></a></li>');
		});
		$('#recordReviewList').listview('refresh');
	});
}