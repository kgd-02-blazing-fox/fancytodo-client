const SERVER_PATH = 'http://localhost:3000'


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $.ajax({
    method: 'POST',
    url: 'http:localhost:3000/google-login',
    headers: {
      'google-token': id_token
    }
  })
    .done(response => {
      console.log(response, 'ini dari done')
    })
    .fail()
}
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: `${SERVER_PATH}/users/login/google`,
    headers: {
      id_token
    }
  })
    .done(response => {
      console.log('done')
      console.log(response)
      localStorage.setItem('token', response)
    })
    .fail(response => {
      console.log('fail', response)
    })
    .always(response => {
      console.log('always', response)
    })

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function showHome() {
  $('#home').show()
  $('#todos').hide()
  $('#resto').hide()
  $('#register').hide()
  $('#login').hide()
  $('#loading').hide()

}

function showTodos() {
  $('#todos').show()
  $('#home').hide()
  $('#resto').hide()
  $('#register').hide()
  $('#login').hide()
  $('#loading').hide()

}

function showResto() {
  $('#resto').show()
  $('#todos').hide()
  $('#home').hide()
  $('#register').hide()
  $('#login').hide()
  $('#loading').hide()

}

function showLogin() {
  $('#login').show()
  $('#home').hide()
  $('#todos').hide()
  $('#resto').hide()
  $('#register').hide()
  $('#loading').hide()
}

function showRegister() {
  $('#register').show()
  $('#login').hide()
  $('#home').hide()
  $('#todos').hide()
  $('#resto').hide()
  $('#loading').hide()
}





function login(event) {
  $.ajax({
    method: 'POST',
    url: `${SERVER_PATH}/users/login`,
    data: {
      email,
      password
    }
  })
    .done((response) => {
      console.log('done')
      console.log(response)
      localStorage.setItem('token', response)
    })
    .fail((xhr, status, error) => {
      console.log('fail')
      console.log(xhr, status, error)
    })
    .always((response) => {
      console.log('always')
      console.log(response)
    })
}

function register(event) {
  
}

function updateTodo(event) {
  
}

function updateStatusTodo(event) {
  
}

function logout(event) {
  localStorage.removeItem('token')
  showLogin()
  event.preventDefault()
}

$(document).ready(function () {
  if (!localStorage.getItem('token')) {
    showLogin()
  } else {
    showHome()
  }
  // showLogin()

  // showRegister()

  $('#login-form').on('submit', function (event) {
    event.preventDefault()

    $('#loading').show()
    const email = $('#email-login').val()
    const password = $('#password-login').val()

    $('#email-login').val('')
    $('#password-login').val('')

    // console.log(email, password)

    $.ajax({
      method: 'POST',
      url: `${SERVER_PATH}/login`,
      data: {
        email,
        password
      }
    })
      .done((response) => {
        console.log('done')
        console.log(response)
        localStorage.setItem('token', response.acces_token)
        showHome()
      })
      .fail((xhr, status, error) => {
        console.log('fail')
        console.log(xhr,status,error)
      })
      .always((response) => {
        console.log('always')
        console.log(response)
        $('#loading').hide()
      })

  })

  $('#register-form').on('submit', function (event) {
    event.preventDefault()

    $('#loading').show()
    const email = $('#email-register').val()
    const password = $('#password-register').val()

    $('#email-register').val('')
    $('#password-register').val('')

    // console.log(email, password)

    $.ajax({
      method: 'POST',
      url: `${SERVER_PATH}/register`,
      data: {
        email,
        password
      }
    })
      .done((response) => {
        console.log('done')
        console.log(response)
        showLogin()
      })
      .fail((xhr, status, error) => {
        console.log('fail')
        console.log(xhr,status,error)
      })
      .always((response) => {
        console.log('always')
        console.log(response)
        $('#loading').hide()
      })
    


    
  })

  $('#btnGoToRegisterPage').click(function (event) {
    event.preventDefault()
    showRegister()
  })

  $('#btnGoToLoginPage').click(function (event) {
    event.preventDefault()
    showLogin()
  })

  $('#btnGoToTodosPage').click(function (event) {
    event.preventDefault()
    showTodos()
  })

  $('#btnGoToRestoPage').click(function (event) {
    event.preventDefault()
    showResto()
  })

  $('#btnLogout').click(function (event) {
    event.preventDefault()
    localStorage.removeItem('token')
    showLogin()
  })


})

