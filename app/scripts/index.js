var Backbone = require('backbone');
require('./router.js');

Backbone.history.start();

// var $ = require('jquery');
//
// $.ajaxSetup({
//   beforeSend: function(xhr){
//     xhr.setRequestHeader('X-Parse-Application-Id', 'tiygvl');
//     xhr.setRequestHeader('X-Parse-REST-API-Key', 'slumber');
//   }
// });
//
// var url = 'https://tiny-parse-server.herokuapp.com/classes/Rene'
// var userURL =
// $.ajax(url).then(function(data){
//   console.log(data);
// });
//
// $('#signup').on('submit', function(e){
//   e.preventDefault();
//
//   var data = {
//     'username': $('#email').val(),
//     'password': $('#password').val()
//   };
//   var url = 'https://tiny-parse-server.herokuapp.com/users';
//   $.post(url, data).then(function(response){
//     console.log(response);
//   });
// });
//
// $('#login').on('submit', function(e){
//   e.preventDefault();
//   var data = {
//     username: $('#email-login').val(),
//     password: $('#password-login').val()
//   };
//   var url = 'https://tiny-parse-server.herokuapp.com/login';
//
//   $.get(url+'?username='+data.username+'&password='+data.password).then(function(response){
//     console.log(response);
//   });
// });
