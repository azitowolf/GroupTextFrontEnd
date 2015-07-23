var currentToken;
var path = 'http://localhost:3000'
var auth = authIIFE;

function init(){
  //Check localstorage for a user token
  auth.session();
  //Populate all Primary texts and their Suggested texts
  getPtexts();
  //AJAX for creating user token on login
  $('#loginBtn').on('click', auth.login);
  //AJAX for registering a new user
  $('#register').on('click', auth.register);

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
}

$(document).ready(function($) {init()});
