var serviceURL = "http://localhost/allschools-mobile/json/";

$('#newsPage').bind('pageinit', function(event) {
	getNews();
});

function getNews() {
	$.getJSON(serviceURL + 'news.json', function(data) {
		$('#title').text(data.title);
		$('#text').text(data.text);
		$('#author').text(data.authorName);

	});
}