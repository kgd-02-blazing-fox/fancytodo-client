"use strict"

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:"POST",
        url:`http://localhost:3000/login`,
        headers:{
            'google_token':id_token
        }
    })
    .done(result=>{
        localStorage.setItem("access_token", result.access_token)
        showHome()
        showTodo()})
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2
        .signOut()
}


function showLogin() {
    $("#container-login").show()
    $("#container-register").hide()
    $("#container-todo").hide()
    $("#nav-logout").hide()
    $("#nav-login").show()
    $("#nav-register").show()

    $("#login-email").val("")
    $("#login-password").val("")
}
function showRegister() {
    $("#container-login").hide()
    $("#container-register").show()
    $("#container-todo").hide()
    $("#nav-logout").hide()
    $("#nav-login").show()
    $("#nav-register").show()

    $("#register-firstname").val("")
    $("#register-lastname").val("")
    $("#register-email").val("")
    $("#register-password").val("")

}
function showTodo() {
    $("#col-todo-title").empty()
    $("#col-todo-description").empty()
    $("#col-todo-duedate").empty()
    $("#col-todo-option").empty()

    $("#todo-add-title").val("")
    $("#todo-add-description").val("")
    $("#todo-add-due_date").val("")
 
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: { "access_token": localStorage.getItem("access_token") }
    })
        .done(result => {
            if (!$("#todo-quote-text").text()) {
                $("#todo-quote-text").text(`${result.quote.quoteText}`)
                $("#todo-quote-author").text(`~${result.quote.quoteAuthor}`)
            }
            result.todos.forEach(dat => {
                //THIS NEEDS MAJOR REVISION!
                $("#col-todo-title").append(`${dat.title} <br>`)
                $("#col-todo-description").append(`${dat.description} <br>`)
                $("#col-todo-duedate").append(`${dat.due_date.split("T")[0]} <br>`)
                $("#col-todo-option").append("option <br>")
            })
        })
        .fail((xhr, status, error) => {
    
        })
        .always(result => {

        })
}
function showHome() {
    $("#container-login").hide()
    $("#container-register").hide()
    $("#container-todo").show()
    $("#nav-logout").show()
    $("#nav-login").hide()
    $("#nav-register").hide()
}


$(document).ready(() => {
    if (!localStorage.getItem("access_token")) {
        showLogin()
    } else {
        showHome()
        showTodo()
    }


    $("#nav-login").on("click", (event) => {
        event.preventDefault()
        showLogin()
    })
    $("#nav-register").on("click", (event) => {
        event.preventDefault()
        showRegister()
    })
    $("#nav-home").on("click", (event) => {
        event.preventDefault()
        if (localStorage.getItem("access_token")) {
            showHome()
            showTodo()
        } else {
            showLogin()
        }
    })
    $("#nav-logout").on("click", (event) => {
        event.preventDefault()
        localStorage.removeItem("access_token")
        signOut()
        $("#todo-quote-text").text(``)
        $("#todo-quote-author").text(``)
        showLogin()
    })
    $("#nav-project").on("click", (event) => {
        event.preventDefault()
        // showProject()
    })

    $("#submit-login").on("submit", (event) => {
        event.preventDefault()
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/login",
            data: {
                email: $("#login-email").val(),
                password: $("#login-password").val()
            }
        })
            .done(result => {
                localStorage.setItem("access_token", result.access_token)
                showHome()
                showTodo()
            })
            .fail((xhr, status, error) => { console.log("loginerror") })
            .always(result => { })
    })

    $("#submit-register").on("submit", (event) => {
        event.preventDefault()
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/register",
            data: {
                firstname: $("#register-firstname").val(),
                lastname: $("#register-lastname").val(),
                email: $("#register-email").val(),
                password: $("#register-password").val()
            }
        })
            .done(result => {
                localStorage.setItem("access_token", result.access_token)
                showHome()
                showTodo()
            })
            .fail((xhr, status, error) => { console.log("registererror") })
            .always(result => { })
    })
    $("#submit-todo-add").on("click", (event) => {
        event.preventDefault()
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/todos",
            data: {
                title: $('#todo-add-title').val(),
                description: $('#todo-add-description').val(),
                due_date: $('#todo-add-due_date').val()
            },
            headers: { "access_token": localStorage.getItem("access_token") }
        })
            .done(result => {showHome();showTodo()})
            .fail((xhr, status, error) => { showHome();showTodo() })
            .always(result => {})
            
    })
})