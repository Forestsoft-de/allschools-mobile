$('#galleryListPage').live('pageinit', function(event) {
    getGalleryList();
});

function getGalleryList() {
    $.getJSON('http://localhost:8080/rest/galleries?callback=?', function(data) {
        $('#galleryList li').remove();
        $.each(data, function(index, entry) {
            $('#galleryList').append('<li><a href="#gallery-item?gallery=' + entry.id + '"><img src="'+ entry.thumbnail + '" /><h3>' + entry.title + '</h3></a></li>');
        });
        $('#galleryList').listview('refresh');
    });
}