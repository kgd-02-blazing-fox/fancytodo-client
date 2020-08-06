
function home() {
  // if (localStorage.getItem('access_token')) {
  //   showTodo()
  // } else {
    localStorage.removeItem('access_token')
    $('#home').slideDown("slow", function () { })
    $('#loginForm').hide()
    $('#registerForm').hide()
    $('#todosForm').hide()
    $('#navShowTodo').hide()
    $('#logoutNav').hide()
    $('#addTodoForm').hide()
  // }
}

function showLogin() {
  $('#home').hide()
  $('#loginForm').slideDown("slow", function () { })
  $('#registerForm').hide()
  $('#todosForm').hide()
  $('#logoutNav').hide()
  $('#navShowTodo').hide()
  $('#addTodoForm').hide()

}

function showRegister() {
  $('#home').hide()
  $('#loginForm').hide()
  $('#registerForm').slideDown("slow", function () { })
  $('#todosForm').hide()
  $('#logoutNav').hide()
  $('#navShowTodo').hide()
  $('#addTodoForm').hide()

}

function showTodo(event) {
  // event.preventDefault();

  $('#home').hide()
  $('#loginForm').hide()
  $('#loginNav').hide()
  $('#registerForm').hide()
  $('#registerNav').hide()
  $('#navShowTodo').hide()
  $('#addTodoForm').hide()
  $('#logoutNav').show()
  $('#todosForm').slideDown("slow", function () { })
}

function showAddTodo() {
  // localStorage.getItem('access_token')
  $('#home').hide()
  $('#loginForm').hide()
  $('#loginNav').hide()
  $('#registerForm').hide()
  $('#registerNav').hide()
  $('#navShowTodo').hide()
  $('#addTodoForm').slideDown("slow", function () { })
  $('#logoutNav').show()
  $('#todosForm').hide()
}

function showEditTodo() {
  $('#home').hide()
  $('#loginForm').hide()
  $('#loginNav').hide()
  $('#registerForm').hide()
  $('#registerNav').hide()
  $('#navShowTodo').hide()
  $('#addTodoForm').slideDown("slow", function () { })
  $('#logoutNav').show()
  $('#todosForm').hide()
}

function login(event) {
  event.preventDefault();

  const email = $('#emailLogin').val()
  const password = $('#passwordLogin').val()

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/login",
    data: {
      email,
      password
    }
  })
    .done(response => {
      console.log(response);
      localStorage.setItem('access_token', response.access_token)
      showTodo()
    })
    .fail(xhr => {
      console.log(xhr);
      $('#emailLogin').val('')
      $('#passwordLogin').val('')
    })
    .always(_ => {
      // console.log('LOGIN function triggered');
      $('#emailLogin').val('')
      $('#passwordLogin').val('')
    })
}

function register(event) {
  event.preventDefault();

  const name = $('#nameRegister').val()
  const email = $('#emailRegister').val()
  const password = $('#passwordRegister').val()

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/register",
    data: { name, email, password }
  })
    .done(response => {
      showLogin()
    })
    .fail(xhr => {
      console.log(xhr);
      $('#nameRegister').val('')
      $('#emailRegister').val('')
      $('#passwordRegister').val('')
    })
    .always(_ => {
      // console.log('LOGIN function triggered');
      $('#nameRegister').val('')
      $('#emailRegister').val('')
      $('#passwordRegister').val('')
    })
}

function logout() {
  localStorage.removeItem('access_token')
  signOut()
  home()
}

function fetchTodos() {
  const PATH = 'http://localhost:3000'
  $.ajax({
    method: 'GET',
    url: `${PATH}/todos`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      response.forEach(el => {
        // console.log(el)
        $('#todoList').append(`
        <tr>
          <td>${el.title}</td>
          <td>${el.description}</td>
          <td>${el.status}</td>
          <td>${el.Due_date}</td>
          <td>${el.advice}</td>
          <td><button id="editTodo" value="${el.id}">Edit</button> <button id="deleteTodo" value="${el.id}">Delete</button></td>
        </tr>
        `)
      })
    })
    .fail(xhr => {
      console.log(xhr);
    })
    .always(response => {
      console.log('TODO FETCH');
    })
}

function addTodos(event) {
  event.preventDefault();

  const title = $('#titleAddTodo').val()
  const description = $('#descriptionAddTodo').val()
  const status = $('#statusAddTodo').val()
  const Due_date = $('#duedateAddTodo').val()

  $.ajax({
    type: "POST",
    url: "http://localhost:3000/todos",
    data: { title, description, status, Due_date },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      showTodo()
    })
    .fail(xhr => {
      console.log(xhr);
      $('#titleAddTodo').val('')
      $('#descriptionAddTodo').val('')
      $('#statusAddTodo').val('')
      $('#duedateAddTodo').val('')
    })
    .always(_ => {
      $('#titleAddTodo').val('')
      $('#descriptionAddTodo').val('')
      $('#statusAddTodo').val('')
      $('#duedateAddTodo').val('')
    })
}

function editTodos() {
  const PATH = 'http://localhost:3000'
  $.ajax({
    method: 'PUT',
    url: `${PATH}/todos/:id`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {

    })
    .fail(xhr => {
      console.log(xhr);
    })
    .always(response => {
      console.log('TODO EDIT');
    })
}

function deleteTodo() {
  console.log('ngapain?');

  const PATH = 'http://localhost:3000'
  $.ajax({
    method: 'DELETE',
    url: `${PATH}/todos/:id`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      showTodo()
    })
    .fail(xhr => {
      console.log(xhr);
    })
    .always(response => {
      console.log('TODO DELETE');
    })
}


  function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/users/googleLogin',
      headers: {
        'google_token': id_token
      }
    })
    .done(response=>{
      localStorage.setItem('access_token', response.access_token)
      showTodo()
    })
    .fail(xhr=>{
      console.log('eror bang');
      console.log(xhr);
    })
  }

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}






$(document).ready(function () {
  if (localStorage.getItem('access_token')) {
    showTodo()
    fetchTodos()
    
    $('#logoutNav').on('click', logout)

    $('#addTodoButton').on('click', showAddTodo)
    $('tr#deleteTodo').on('click', deleteTodo)
    $('tr#editTodo').on('click', editTodos)
    
    $('#cancelAddTodoButton').on('click', showTodo)
    $('#addTodoForm').on('submit', addTodos)

  } else {
    localStorage.removeItem('access_token')
    home()

    $('#navHome').on('click', home)
    $('#loginLink').on('click', showLogin)
    $('#registerLink').on('click', showRegister)
    $('#navLogin').on('click', showLogin)
    $('#navRegister').on('click', showRegister)

    $('#loginForm').on('submit', login)
    $('#registerForm').on('submit', register)
    // $('#logoutNav').on('click', logout)
  }

});