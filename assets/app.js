// The good stuff

$(document).ready(function() {
	$('#images').on('click', 'img', giphy.clickImage);
	$('#images').on('dblclick', 'div', giphy.firstImage);
	giphy.start();
});

var buttonsArray = ['Mountains', 'Snowboarding', 'Skiing', 'Cold','Sledding', 'Snowball'];
var key = 'NlwxB5JvH1BQhkY8zugaYsBnIOYkO6bZ';
var queryURL = 'https://api.giphy.com/v1/gifs/search?&api_key=' + key + '&limit=10';

var giphy = {

	start: function() {
		var addButton = $('<button>');
		addButton.attr('id', 'addButton');
		addButton.text('Add');
		$(addButton).on('click', giphy.addButton);
		$('form').append(addButton);
		giphy.renderButtons();
	},

	renderButtons: function() {

		// no repeat buttons
		$('#buttons').empty();

		// creates buttons for each buttonsArray element
		for (var i = 0; i < buttonsArray.length; i++) {

		  var a = $('<li>');
		  var b = $('<button>');
		  $(b).on('click', giphy.clickButton);
		  b.addClass('button');
		  // Name that will show on the button
		  b.data('name', buttonsArray[i]);
		  // Adds the name to the text
		  b.text(buttonsArray[i]);
		  // Adding the button to the list
		  $(a).html(b);
		  // Manipulating the DOM
		  $('#buttons').append(a);
		}
	},

	addButton: function(event) {
		// Can use enter instead of having to click to submit
		event.preventDefault();
		var input = $('#input').val();
		if (input != '') {
			// Adds the button to the original array
			buttonsArray.push(input);
			// Renders the the buttons with the new addition
			giphy.renderButtons();
		}
		// Resets the input to an empty box
		$('#input').val('');

	},
	// Ajax call 
	clickButton: function(event) {
		event.preventDefault();
		var query = $(this).data('name');
		queryURL += '&q=' + query;
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			var status = response.meta.status;
			if (status === 200) {
				giphy.renderImages(response.data);
			} else {
				alert('GIPHY query unsuccessful. Try again.');
			}
		});
	},
	// Displays the images and their ratings in seperate divs
	renderImages: function(data) {
		console.log(data);
		// Clearing the last giphys
		$('#images').empty();
		$.each(data, function (i){
			
			var urlStill = data[i].images.original_still.url;
			var urlAnim = data[i].images.original.url;
			var title = data[i].title;
			rating = data[i].rating;
			var imgDiv = $('<div id="imgDiv">');
			newDiv = $('<div>');
			var img = $('<img>');
			imgDiv.append(img);
			img.attr('src', urlStill);
			img.attr('data-still', urlStill);
			img.attr('data-anim', urlAnim);
			img.attr('data-title', title);
			imgDiv.append(`<h3 class="rating">${rating}</h3>`);
			$('#images').append(imgDiv);
		});
	},
	// Animating function
	clickImage: function() {
		
		var img = $(this);
		var src = img.attr('src');
		var urlStill = img.attr('data-still')
		var urlAnim = img.attr('data-anim')
		if (src === urlStill) {
			img.attr('src', urlAnim);
		} else {
			img.attr('src', urlStill);
		}
		console.log($(this));
	},
	// Double click function
	firstImage: function() {

		  var div = $(this);
		  $(this).remove();
		  $('#images').prepend($(this));
		  console.log($(this));
		  console.log("Selected");

	},


}
