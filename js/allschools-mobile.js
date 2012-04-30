var serviceURL = "json/";

$('#newsPage').live('pageinit', function(event) {
	getNews();
});
$('#newsListPage').live('pageinit', function(event) {
	getNewsList();
});
$('#recordReviewListPage').live('pageinit', function(event) {
	getRecordReviewList();
});

function getNews() {
	$.getJSON(serviceURL + 'news.json', function(data) {
		$('#title').text(data.title);
		$('#text').text(data.text);
		$('#author').text(data.authorName);

	});
}

function getNewsList() {
	$.getJSON(serviceURL + 'newslist.json', function(data) {
		$('#newsList li').remove();
		var news = data.items;
		$.each(news, function(index, entry) {
			$('#newsList').append('<li data-role="list-divider">' + entry.date + ' <span class="ui-li-count">' + entry.count+ '</span></li>');
			$.each(entry.news, function(index, entryDetail) {
				$('#newsList').append('<li><a data-transition="slide" href="news.html?id=' + entryDetail.id + '"><h3>'+entryDetail.header+'</h3><p>'+entryDetail.teaser+'</p><p class="ui-li-aside">' + entryDetail.time + '</p></a></li>');
			});
		});
		$('#newsList').listview('refresh');
	});
}

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