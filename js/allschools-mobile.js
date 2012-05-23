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
$('#galleryListPage').live('pageinit', function(event) {
    getGalleryList();
});
$('#galleryPage').live('pageinit', function(event) {
    getGallery();
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
		$('#readerRating').text(data.readerRating.average);
		$('#readerRatingCount').text(data.readerRating.number);
        $.each(data.authorRatings, function(index,entry) {
            $('#ratings').append('<div class="ui-grid-a"><div class="ui-block-a"><h2>' + entry.firstName+ '</h2></div><div class="ui-block-b"><h2><p> ' + entry.rating + '</p></h2></div></div>');
        });
	});
}

function getGalleryList() {
    $.getJSON(serviceURL + 'gallerylist.json', function(data) {
        $('#galleryList li').remove();
        $.each(data, function(index, entry) {
            $('#galleryList').append('<li><a href="gallery.html"><img src="'+ entry.thumbnail + '" /><h3>' + entry.name + '</h3></a></li>');
        });
        $('#galleryList').listview('refresh');
    });
}
function getGallery() {
    $.getJSON(serviceURL + 'gallery.json', function(data) {
        $('#pictureList li').remove();
        $.each(data.images, function(index, entry) {
            $('#pictureList').append('<li><a href="' + entry.big + '" rel="external"><img src="' + entry.thumb + '" alt="Image 001"></img></a></li>');
        });
    });

}
$.extend({
    getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name){
        return $.getUrlVars()[name];
    }
});