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
$('#recordReviewPage').live('pageinit', function(event) {
	getRecordReview();
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
			$('#recordReviewList').append('<li><a data-transition="slide" href="recordreview.html?id=' + entry.id + '"><img src="'+ entry.cover + '" /><h3>' + entry.bandName + '</h3><p>' + entry.recordName + '</p></a></li>');
		});
		$('#recordReviewList').listview('refresh');
	});
}

function getRecordReview() {
	$.getJSON(serviceURL + 'recordreview.json', function(data) {
		$('#title').text(data.band.name + " - " + data.recordName);
		$('#text').text(data.reviewText);
		$('#reviewDate').text(data.reviewDate);
		$('#releaseDate').text(data.releaseDate);
		$.each(data.authors, function(index, entry) {
			$('#authors').after('<li><a data-transition="slide" href="author.html?id=' + entry.id + '">' + entry.firstName + '</a></li>');
		});
		$('#band').after('<li><a data-transition="slide" href="band.html?id=' + data.band.id + '">' + data.band.name + '</a></li>');
		$('#label').after('<li><a data-transition="slide" href="label.html?id=' + data.label.id + '">' + data.label.name + '</a></li>');
		$('#recordInfo').listview('refresh');
		
		$('#cover').attr("src", data.cover);

	});
}
