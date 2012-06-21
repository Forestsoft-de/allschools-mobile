$('#recordReviewListPage').live('pageinit', function(event) {
	getRecordReviewList();
});
$('#recordReviewPage').live('pageinit', function(event) {
	getRecordReview();
});

function getRecordReviewList() {
	$.getJSON('http://localhost:8080/rest/recordreviews?callback=?', function(data) {
		$('#recordReviewList li').remove();
		$.each(data, function(index, entry) {
			$('#recordReviewList').append('<li><a data-ajax="false" data-transition="slide" href="recordreview.html?id=' + entry.id + '"><img src="'+ entry.cover + '" /><h3>' + entry.bandName + '</h3><p>' + entry.recordName + '</p></a></li>');
		});
		$('#recordReviewList').listview('refresh');
	});
}

function getRecordReview() {
	$.getJSON('http://localhost:8080/rest/recordreview/' +  $.getUrlVar('id') + '?callback=?', function(data) {
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