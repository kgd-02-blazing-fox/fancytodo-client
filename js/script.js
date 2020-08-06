const SERVER_PATH = 'http://localhost:3000'

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  // console.log(id_token)
  $.ajax({
    method: 'POST',
    url: `${SERVER_PATH}/login-google`,
    headers: {
      id_token
    }
  })
    .done(response => {
      console.log('done')
      console.log(response)
      localStorage.setItem('access_token', response.access_token)
      $('#navbar').show()
      showHome()
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
  $('#todo-update').hide()
  $('#todo-add').hide()
}
function showTodos() {
  $('#todos').show()
  $('#home').hide()
  $('#resto').hide()
  $('#register').hide()
  $('#login').hide()
  $('#loading').hide()
  $('#todo-update').hide()
  $('#todo-add').hide()
  fetchDataTodos()
}
function showTodoAdd() {
  $('#todo-add').show()
  $('#todos').hide()
  $('#home').hide()
  $('#resto').hide()
  $('#register').hide()
  $('#login').hide()
  $('#loading').hide()
  $('#todo-update').hide()
}
function showTodoUpdate(id) {
  $.ajax({
    method: 'GET',
    url: `${SERVER_PATH}/todos/${id}`,
    headers: {
      token: localStorage.getItem('access_token')
    }
  })
    .done((response) => {
      console.log('done')
      console.log(response)
      $('#todo-update').show()
      $('#update-todo-id').val(response.id)
      $('#update-todo-title').val(response.title)
      $('#update-todo-description').val(response.description)
      $('#update-todo-date').val(response.due_date)
      $('#update-todo-status').val(response.status)
    })
    .fail((xhr, status, error) => {
      console.log('fail')
      console.log(xhr, status, error)
    })
    .always((response) => {
      console.log('always')
      console.log(response)
      $('#todo-add').hide()
      $('#todos').hide()
      $('#home').hide()
      $('#resto').hide()
      $('#register').hide()
      $('#login').hide()
      $('#loading').hide()
    })



  
}
function showResto() {
  $('#resto').show()
  $('#todos').hide()
  $('#home').hide()
  $('#register').hide()
  $('#login').hide()
  $('#loading').hide()
  $('#todo-update').hide()
  $('#todo-add').hide()
}
function showLogin() {
  $('#login').show()
  $('#home').hide()
  $('#todos').hide()
  $('#resto').hide()
  $('#register').hide()
  $('#loading').hide()
  $('#todo-update').hide()
  $('#todo-add').hide()
  $('#navbar').hide()
}
function showRegister() {
  $('#register').show()
  $('#login').hide()
  $('#home').hide()
  $('#todos').hide()
  $('#resto').hide()
  $('#loading').hide()
  $('#todo-update').hide()
  $('#todo-add').hide()
  $('#navbar').hide()
}
function fetchDataTodos() {
  $('#list-todo').empty()
  $.ajax({
    method: 'GET',
    url: `${SERVER_PATH}/todos/`,
    headers: {
      token: localStorage.getItem('access_token')
    }
  })
    .done((response) => {
      console.log('done')
      console.log(response)
      response.forEach(todo => {
        if (todo.status === 'none') {
          $('#list-todo').append(`
          <tr id="update-${todo.id}" style="cursor:pointer;">
            <td><i style="color: yellow;" class="material-icons left">do_not_disturb_on</i></td>
            <td>${todo.title}</td>
            <td>${todo.due_date}</td>
          </tr>
          `)
        } else if (todo.status === 'done') {
          $('#list-todo').append(`
          <tr id="update-${todo.id}" style="cursor:pointer;">
            <td><i style="color: green;" class="material-icons left">beenhere</i></td>
            <td>${todo.title}</td>
            <td>${todo.due_date}</td>
          </tr>
          `)
        } else {
          $('#list-todo').append(`
          <tr id="update-${todo.id}" style="cursor:pointer;">
            <td><i style="color: red;" class="material-icons left">assignment_late</i></td>
            <td>${todo.title}</td>
            <td>${todo.due_date}</td>
          </tr>
          `)
        }
        

        $(`#update-${todo.id}`).on('click', function () {
          console.log(`show update-${todo.id}`)
          showTodoUpdate(todo.id)

        })
      })
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
{/* <li class="collection-item" style="text-align:left; cursor:pointer;">

  <div id="update-${todo.id}"><i style="color: yellow;" class="material-icons left">do_not_disturb_on</i>${todo.title}<a class="secondary-content">${todo.due_date}</a></div>
</li> */}
function fetchDataResto(entity_id) {
  $('#list-resto').empty()
  console.log('kota:' , entity_id)
  $.ajax({
    method: 'GET',
    url: `${SERVER_PATH}/resto/?entity_id=${entity_id}`
  })
    .done((response) => {
      console.log('done')
      console.log(response)
      response.forEach(resto => {
        if (resto.restaurant.thumb) {
          $('#list-resto').append(`
          <div class="col s6 m3">
            <div class="card">
              <div class="card-image">
                <img src="${resto.restaurant.thumb}">
                <span class="card-title">${resto.restaurant.name}</span>
                <a id="resto-${resto.restaurant.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
              </div>
              <div class="card-content" style="height:200px">
                <div class="pDetailResto">
                  <i class="material-icons">phone</i>
                  <p>${resto.restaurant.phone_numbers}</p>
                </div>
                <div class="pDetailResto">
                  <i class="material-icons">room</i>
                  <p>${resto.restaurant.location.address}</p>
                </div>
                <div class="pDetailResto" style="color: ${resto.restaurant.user_rating.rating_color};">
                  <i class="material-icons">star</i>
                  <p style="font-weight: bold; font-size: 20px;">${resto.restaurant.user_rating.aggregate_rating}</p>
                </div>
              </div>
            </div>
          </div>
          `)
          $(`#resto-${resto.restaurant.id}`).on('click', function (event) {
            event.preventDefault()
            showTodoAdd()
            $('#todo-title').val(`Mengunjungi restaurant ${resto.restaurant.name}`)
            $('#todo-description').val(`Lokasi: ${resto.restaurant.location.address}`)
          })
        }
      })
    })
    .fail((xhr, status, error) => {
      console.log('fail')
      console.log(xhr, status, error)
    })
    .always((response) => {
      console.log('always')
      console.log(response)
      $('#loading').hide()

    })
}

$(document).ready(function () {
  $('.datepicker').datepicker();

  if (!localStorage.getItem('access_token')) {
    showLogin()
  } else {
    $('#navbar').show()
    showHome()
  }

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
        localStorage.setItem('access_token', response.access_token)
        $('#navbar').show()
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

  $('#form-add-todo').on('submit', function (event) {
    event.preventDefault()

    $('#loading').show()
    const title = $('#todo-title').val()
    const description = $('#todo-description').val()
    const due_date = $('#todo-date').val() + 1
    const status = $('#todo-status').val()

    console.log(title, description, due_date, status)

    $.ajax({
      method: 'POST',
      url: `${SERVER_PATH}/todos/`,
      headers: {
        token: localStorage.getItem('access_token')
      },
      data: {
        title,
        description,
        status,
        due_date
      }
    })
      .done((response) => {
        console.log('done')
        console.log(response)
        showTodos()
      })
      .fail((xhr, status, error) => {
        console.log('fail')
        console.log(xhr, status, error)
      })
      .always((response) => {
        console.log('always')
        console.log(response)
        $('#loading').hide()
        $('#todo-title').val('')
        $('#todo-description').val('')
        $('#todo-date').val('')
      })
  })

  $('#form-update-todo').on('submit', function (event) {
    event.preventDefault()

    $('#loading').show()
    const id = $('#update-todo-id').val()
    const title = $('#update-todo-title').val()
    const description = $('#update-todo-description').val()
    const due_date = $('#update-todo-date').val()
    const status = $('#update-todo-status').val()
    // console.log(title, description, due_date)
    $.ajax({
      method: 'PUT',
      url: `${SERVER_PATH}/todos/${id}`,
      data: {
        title,
        description,
        status,
        due_date
      },
      headers: {
        token: localStorage.getItem('access_token')
      }
    })
      .done(response => {
        console.log('done')
        console.log(response)

        showTodos()

      })
      .fail((xhr, status, error) => {
        console.log('fail')
        console.log(xhr, status, error)
      }).always((response) => {
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
    localStorage.removeItem('access_token')
    signOut()
    showLogin()
  })

  $('#btnCancel').click(function (event) {
    event.preventDefault()
    showTodos()
  })

  $('#btnGoToAddTodo').click(function (event) {
    event.preventDefault()
    showTodoAdd()
    $('#todo-title').val('')
    $('#todo-description').val('')
    $('#todo-due_date').val('')

  })

  $('#btnDelete').click(function (event) {
    event.preventDefault()

    $('#loading').show()

    const id = $('#update-todo-id').val()
    $.ajax({
      method: 'DELETE',
      url: `${SERVER_PATH}/todos/${id}`,
      headers: {
        token: localStorage.getItem('access_token')
      }
    })
      .done(response => {
        // Response nya satu klo berhasil
        console.log('done')
        console.log(response)
        showTodos()
      })
      .fail((xhr, status, error) => {
        console.log('fail')
        console.log(response.error)
      })
      .always(response => {
        console.log('always')
        console.log(response)
        $('#loading').hide()

      })
  })

  $('#btnFetchRestoBandung').click(function (event) {
    event.preventDefault()
    console.log('bandung')
    $('#loading').show()
    fetchDataResto(11052)
  })
  $('#btnFetchRestoJakarta').click(function (event) {
    event.preventDefault()
    console.log('jakarta')

    $('#loading').show()
    fetchDataResto(74)
  })

})

