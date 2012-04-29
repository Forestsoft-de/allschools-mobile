var serviceURL = "http://localhost/allschools-mobile/json/";

$('#newsListPage').bind('pageinit', function(event) {
	getNewsList();
});

function getNewsList() {
	console.log(serviceURL + 'news.json')
	$.getJSON(serviceURL + 'news.json', function(data) {
		console.log(data);
		$('#newsList li').remove();
		var news = data.items;
		$.each(news, function(index, entry) {
			$('#newsList').append('<li data-role="list-divider">' + entry.date + ' <span class="ui-li-count">' + entry.count+ '</span></li>');
			$.each(entry.news, function(index, entryDetail) {
				$('#newsList').append('<li><h3>'+entryDetail.header+'</h3><p>'+entryDetail.teaser+'</p></li>');
			});
		});
		$('#newsList').listview('refresh');
	});
}