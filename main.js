const PATH = 'http://localhost:3000'

function home() {
  // if (localStorage.getItem('access_token')) {
  //   showTodo()
  // } else {
  localStorage.removeItem('access_token')
  $('#home').slideDown("slow", function () { })
  $('#registerNav').show()
  $('#loginNav').show()

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

  // $('#logoutNav').show() //TESTING!!!!!
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

  $("#todoList").empty()
  fetchTodos()
  clearForm()
}

function showAddTodo(type) {
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
  if (type === 'edit') {
    $("#headerTodoForm").text('Edit Todo')
  } else {
    $("#headerTodoForm").text('Add Todo')
  }
}

function clearForm() {
  $('#titleAddTodo').val('')
  $('#descriptionAddTodo').val('')
  $('#statusAddTodo').val('')
  $('#duedateAddTodo').val('')
  $("#addTodoForm").removeAttr("idTodo")
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
      // fetchTodos()
      console.log(response, 'dari login mas');
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
      // $('#nameRegister').val('')
      // $('#emailRegister').val('')
      // $('#passwordRegister').val('')
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
  $("#todoList").empty()
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
          <td><button onclick="getTodoById(${el.id})">Edit</button>  <button onclick="deleteTodo(${el.id})">Delete</button></td>
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

/* <td>${el.advice}</td> */

function addTodos() {
  // event.preventDefault();

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
    })
    .always(_ => {
      $('#titleAddTodo').val('')
      $('#descriptionAddTodo').val('')
      $('#statusAddTodo').val('')
      $('#duedateAddTodo').val('')
    })
}

function getTodoById(idTodo) {
  $.ajax({
    method: 'GET',
    url: `${PATH}/todos/${idTodo}`,
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      // console.log(response);
      showAddTodo('edit')
      $("#addTodoForm").attr("idTodo", response.id)
      $('#titleAddTodo').val(response.title)
      $('#descriptionAddTodo').val(response.description)
      $('#statusAddTodo').val(response.status)
      $('#duedateAddTodo').val(response.Due_date)
    })
    .fail(xhr => {
      console.log(xhr);
    })
    .always(_ => {
      console.log("GET TODO BY ID");
    })
}

function editTodos() {

  const title = $('#titleAddTodo').val()
  const description = $('#descriptionAddTodo').val()
  const status = $('#statusAddTodo').val()
  const Due_date = $('#duedateAddTodo').val()
  const idTodo = $("#addTodoForm").attr("idTodo")

  console.log(idTodo);
  $.ajax({
    method: 'PUT',
    url: `${PATH}/todos/${idTodo}`,
    data: { title, description, status, Due_date },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      console.log('EDITED TODO');
      showTodo()
    })
    .fail(xhr => {
      console.log(xhr);
    })
    .always(response => {
      console.log('TODO EDIT');
    })
}

function deleteTodo(idTodo) {
  // console.log(idTodo, 'ini idTodo');

  $.ajax({
    method: 'DELETE',
    url: `${PATH}/todos/${idTodo}`,
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
      console.log('TODO DELETED');
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
    .done(response => {
      localStorage.setItem('access_token', response.access_token)
      showTodo()
    })
    .fail(xhr => {
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



//!!!!!! DOCUMENT READY

$(document).ready(function () {
  if (localStorage.getItem('access_token')) {
    showTodo()
  } else {
    localStorage.removeItem('access_token')
    home()
  }

  $('#logoutNav').on('click', logout)

  $('#addTodoButton').on('click', showAddTodo)
  $('#cancelAddTodoButton').on('click', showTodo)

  $('#addTodoForm').on('submit', function (event) {
    event.preventDefault()
    if ($("#headerTodoForm").text() === "Add Todo") {
      addTodos()
    } else {
      editTodos()
    }
    console.log($("#headerTodoForm").text())
  })

  $('#loginLink').on('click', showLogin)
  $('#registerLink').on('click', showRegister)
  $('#navHome').on('click', home)
  $('#navRegister').on('click', showRegister)
  $('#navLogin').on('click', showLogin)

  $('#loginForm').on('submit', login)
  $('#registerForm').on('submit', register)
  // $('#logoutNav').on('click', logout)

});