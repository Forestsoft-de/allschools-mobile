var serviceURL = "http://localhost/allschools-mobile/json/";

$('#newsListPage').bind('pageinit', function(event) {
	getNewsList();
});

function getNewsList() {
	$.getJSON(serviceURL + 'newslist.json', function(data) {
		$('#newsList li').remove();
		var news = data.items;
		$.each(news, function(index, entry) {
			$('#newsList').append('<li data-role="list-divider">' + entry.date + ' <span class="ui-li-count">' + entry.count+ '</span></li>');
			$.each(entry.news, function(index, entryDetail) {
				$('#newsList').append('<li><a href="news.html?id=' + entryDetail.id + '"><h3>'+entryDetail.header+'</h3><p>'+entryDetail.teaser+'</p><p class="ui-li-aside">' + entryDetail.time + '</p></a></li>');
			});
		});
		$('#newsList').listview('refresh');
	});
}