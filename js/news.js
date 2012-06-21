$('#newsPage').live('pageinit', function(event) {
	getNews();
});
$('#newsListPage').live('pageinit', function(event) {
	getNewsList();
});

function getNews() {
    var allVars = $.getUrlVars();

    var newsId = $.getUrlVar('id');
	$.getJSON('http://localhost:8080/rest/news/' + newsId + '?callback=?', function(data) {
		$('#title').text(data.title);
		$('#text').text(data.text);
		$('#author').text(data.author.firstName);

	});
}

function getNewsList() {
	$.getJSON('http://localhost:8080/rest/news?callback=?', function(data) {
		$('#newsList li').remove();
		$.each(data, function(index, entry) {
			$('#newsList').append('<li data-role="list-divider">' + entry.date + ' <span class="ui-li-count">' + entry.count+ '</span></li>');
			$.each(entry.news, function(index, entryDetail) {
				$('#newsList').append('<li><a data-transition="slide" href="#news-item?news=' + entryDetail.id + '"><h3>'+entryDetail.header+'</h3><p>'+entryDetail.teaser+'</p><p class="ui-li-aside">' + entryDetail.time + '</p></a></li>');
			});
		});
		$('#newsList').listview('refresh');
	});
}