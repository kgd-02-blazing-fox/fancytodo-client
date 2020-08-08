"use strict"

function onSignIn(googleUser) {
    $("#content-todo").empty()

    $("#todo-add-title").val("")
    $("#todo-add-description").val("")
    $("#todo-add-due_date").val("")
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

function tickSpecific(id,status) {
    $.ajax({
        method:"PUT",
        url:`http://localhost:3000/todos/${id}`,
        data: {
            status: status? false:true
        },
        headers: { "access_token": localStorage.getItem("access_token") }
    })
    .then(result=>{
        showTodo()
    })
}
function delSpecific(id) {
    if (confirm('Are you sure you want to delete that todo? only ticked todo can be deleted.')) {
        $.ajax({
            method:"DELETE",
            url:`http://localhost:3000/todos/${id}`,
            headers: { "access_token": localStorage.getItem("access_token") }
        })
        .then(result=>{
            showTodo()
        })
    }
}

function showTodo() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: { "access_token": localStorage.getItem("access_token") }
    })
        .done(result => {
            $("#content-todo").empty()

            $("#todo-add-title").val("")
            $("#todo-add-description").val("")
            $("#todo-add-due_date").val("")
 
            if (!$("#todo-quote-text").text()) {
                $("#todo-quote-text").text(`${result.quote.quoteText}`)
                $("#todo-quote-author").text(`~${result.quote.quoteAuthor}`)
            }
            result.todos.forEach(dat => {
            $("#content-todo").append(`
            <div class="row bg-white">
                <div class="col-sm-2 px-2 border border-right-0">
                ${dat.status?"<del>":""}${dat.title}${dat.status?"</del>":""}
                </div>
                <div class="col-sm-6 px-2 border border-right-0 border-left-0">
                ${dat.status?"<del>":""}${dat.description}${dat.status?"</del>":""}
                </div>
                <div class="col-sm-2 px-2 border border-left-0">
                ${dat.status?"<del>":""}${dat.due_date.split("T")[0]}${dat.status?"</del>":""}
                </div>
                <div class="col-sm-2 px-2 border text-center">
                <a href="" class="options" onclick="tickSpecific(${dat.id},${dat.status})">Tick</a> | <a href="" class="options" onclick=";delSpecific(${dat.id})">Delete</a>
                </div>
            </div>
            `)
            })
            $(".options").on("click",event=>event.preventDefault())
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
        $("#content-todo").empty()

        $("#todo-add-title").val("")
        $("#todo-add-description").val("")
        $("#todo-add-due_date").val("")
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
            .fail((xhr, status, error) => { })
            .always(result => {})
            
    })
})