var currentToken;
// var path = 'http://localhost:3000';
var path = 'https://murmuring-wave-7389.herokuapp.com';
var user = userIIFE;
var ptext = ptextIIFE;
var stext = stextIIFE;

function init() {
  //Check localstorage for a user token
  user.session();
  //Populate all Primary texts and their Suggested texts
  ptext.getPtexts();
  //AJAX for creating user token on login
  $('#loginBtn').on('click', user.login);
  //AJAX for registering a new user
  $('#register').on('click', user.register);
  //64bit Encoding for images
  $('input[name="file"]').on('change', function(e) {
    user.readURL(this);
  });
  $('#logout').on('click', user.logout);
  //Hide and show buttons
  $('#learnmore-btn').click(function(event) {
    event.preventDefault();
    $('.learnmore').toggleClass('hidden');
  });
  //Primary text posting form
  $('.createPtext').click(function() {
    $('.createtext').toggleClass('hidden');
  });
  //loginModal
  $('.loginNav').on('click', function() {
    $('.login').toggleClass('hidden');
  });
  //prevent document default link actions
  $('#ptexts').on('click', 'a', function(event) {
    event.preventDefault();
  });
  // Button for creating a new Ptext
  $('#new-post-button').click(ptext.createPtext);
  //add click functionality to the ptexts
  $('#ptexts').on('click', '.expand', function(event) {
    event.preventDefault();
    $(this).parents().siblings('.media-body').children('.stexts').toggleClass('hidden');
  });

  //AJAX to delete ptext
  $('#ptexts').on('click', '#deletePtext', ptext.deletePtext);

  //create new Stext and render it in the DOM
  $('#ptexts').on('click', '.send-btn', stext.createStext);

  // vote function
  $('#ptexts').on('click', '#vote', stext.vote);

  //AJAX to delete ptext
  $('.row').on('click', '#deleteStext', stext.deleteStext);

  //send texts
  $('#ptexts').on('click', '#sendStext', stext.sendStext);

}

$(document).ready(function($) {
  init();
});
