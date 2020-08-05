function home() {
  $('#home').slideDown( "slow", function() {})
  $('#loginForm').hide()
  $('#registerForm').hide()
  $('#todosForm').hide()
  $('#navShowTodo').hide()
}

function showLogin() {
  $('#home').hide()
  $('#loginForm').slideDown( "slow", function() {})
  $('#registerForm').hide()
  $('#todosForm').hide()
  $('#navShowTodo').hide()

}

function showRegister() {
  $('#home').hide()
  $('#loginForm').hide()
  $('#registerForm').slideDown( "slow", function() {})
  $('#todosForm').hide()
  $('#navShowTodo').hide()
}

function showTodo() {

}

$(document).ready(function () {
  home()

  $('#navHome').click(function (event) {
    home()
  })

  $('#loginLink').click(function (event) {
    showLogin()
  })

  $('#registerLink').click(function (event) {
    showRegister()
  })

  $('#navLogin').click(function (event) {
    showLogin()
  })

  $('#navRegister').click(function (event) {
    showRegister()
  })

});