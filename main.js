const baseUrl = 'http://localhost:3000'
$( document ).ready(function() {
  auth()
  $( '#myModal' ).on('shown', function() {
      $( '#title-error' ).empty()
      $( '#dueDate-error' ).empty()

  })
})

const logout = (event) => {
  event.preventDefault()
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  auth()
  $('#email-login').val('')
  $('#password-login').val('')
  $('#email-register').val('')
  $('#password-register').val('')
  $('#alert-login').empty()
}

const auth = () => {
  console.log(localStorage.acsessToken)
  if  (localStorage.access_token) {
      mainPageShow()
      $( '.register' ).hide()
      $( '.login' ).hide()

  } else {
      $( '.main-page' ).hide()
      $( '.register' ).hide()
      $( '.login' ).show()

  }
}

const mainPageShow = () => {
  $( '.main-page' ).show()
  readTask()
  readTime()
}

const toRegister = (event) => {
  event.preventDefault()
  $( '.login' ).hide()
  $( '.register' ).show()
}

const toLogin = (event) => {
  event.preventDefault()
  $( '.login' ).show()
  $( '.register' ).hide()
}

const resetModal = () => {
  $('#title-modal').val('')
  $('#description-modal').val('')
  $('#date-modal').val('')
}

