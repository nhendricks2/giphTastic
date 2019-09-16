
var topics = ['Spiderman', 'Batman', 'Power Puff Girls', 'Sailormoon', 'Avengers', 'Wonder Woman', 'Cat Woman', 'Beyonce', 'Thundercats', 'Captain Planet'];

function renderButtons() {

    $('#superButtons').empty();


    for (var i = 0; i < topics.length; i++) {

        var superBut = $('<button>');
        superBut.addClass('super btn btn-info').bgcolor='#2fd791';
        superBut.attr('type', 'button')
        superBut.attr('data-name', topics[i]);
        superBut.text(topics[i]);
        $('#superButtons').append(superBut);

    }

}

renderButtons();

$(document).on('click', '.super', function () {

    var superhero = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superhero + "&api_key=oPiOocOW8mxrcAdOrczzu6K9lufjRGrp&limit=25&rating=G";
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function (response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var superDiv = $('<div>');
                var superImage = $('<img>').addClass("Border");
    
                var rating = results[i].rating;
                var ratingDisplay = $('<p>').text('Rating: ' + rating);
    
                superImage.attr('src', results[i].images.fixed_height_still.url);
                //Function to animate and pause gifs
                superImage.addClass('gif');
                superImage.attr('data-still', results[i].images.fixed_height_still.url);
                superImage.attr('data-animate', results[i].images.fixed_height.url);
                superImage.attr('data-state', 'still');
                superDiv.append(superImage);
                superDiv.append(ratingDisplay);

                $('#super-gifs').prepend(superDiv);
            }
        });
});


$(document).on('click', 'super-gifs', function () {


    var state = $(this).attr('data-state');

    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});


$('#add-super').on('click', function () {
    var userInputSuper = $('#super-input').val().trim();
    topics.push(userInputSuper);
    renderButtons();
    return false;

});




$(document).on('click', '.gif', function () {


    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});


$('#add-super').on('click', function () {
    var userInputSuper = $('#super-input').val().trim();
    topics.push(userInputSuper);
    renderButtons();
    return false;

});