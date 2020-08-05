"use strict"

function showLogin() {
    $("#container-login").show()
    $("#container-register").hide()
    $("#container-todo").hide()
    $("#nav-logout").hide()
    $("#nav-login").show()
    $("#nav-register").show()
}
function showRegister() {
    $("#container-login").hide()
    $("#container-register").show()
    $("#container-todo").hide()
    $("#nav-logout").hide()
    $("#nav-login").show()
    $("#nav-register").show()
}
function showTodo() {
    $("#container-login").hide()
    $("#container-register").hide()
    $("#container-todo").show()
    $("#nav-logout").show()
    $("#nav-login").hide()
    $("#nav-register").hide()
    if(localStorage.getItem("access_token")) {
        $("#col-todo-title").empty()
        $("#col-todo-description").empty()
        $("#col-todo-duedate").empty()
        $("#col-todo-option").empty()
        $.ajax({
            method:"GET",
            url:"http://localhost:3000/todos",
            headers:{"access_token":localStorage.getItem("access_token")}
        })
        .done(result=>{
            console.log(result)
            result.forEach(dat=>{
                $("#col-todo-title").append(`${dat.title} <br>`)
                $("#col-todo-description").append(`${dat.description} <br>`)
                $("#col-todo-duedate").append(`${dat.due_date.split("T")[0]} <br>`)
                $("#col-todo-option").append("option <br>")
            })
        })
        .fail((xhr,status,error)=>{

        })
        .always(result=>{
            
        })
    } else {
        showLogin()
    }
}


$(document).ready(()=>{
    localStorage.removeItem("access_token")
    showLogin()
    $("#nav-login").on("click",(event)=>{
        event.preventDefault()
        showLogin()
    })
    $("#nav-register").on("click",(event)=>{
        event.preventDefault()
        showRegister()
    })
    $("#nav-todo").on("click",(event)=>{
        event.preventDefault()    
        showTodo()
    })
    $("#nav-logout").on("click",(event)=>{
        event.preventDefault()    
        localStorage.removeItem("access_token")
        showLogin()
    })
    $("#nav-project").on("click",(event)=>{
        event.preventDefault()    
        // showProject()
    })

    $("#submit-login").on("click",(event)=>{
        event.preventDefault()
        $.ajax({
            method:"POST",
            url:"http://localhost:3000/login",
            data:{
                email:$("#login-email").val(),
                password:$("#login-password").val()
            }
        })
        .done(result=>{
            localStorage.setItem("access_token",result.access_token)
            showTodo()
            })
        .fail((xhr,status,error)=>{console.log("loginerror")})
        .always(result=>{})
    })

    $("#submit-register").on("click",(event)=>{
        event.preventDefault()
        $.ajax({
            method:"POST",
            url:"http://localhost:3000/register",
            data:{
                firstname:$("#register-firstname").val(),
                lastname:$("#register-lastname").val(),
                email:$("#register-email").val(),
                password:$("#register-password").val()
            }
        })
        .done(result=>{
            showLogin()
            })
        .fail((xhr,status,error)=>{console.log("registererror")})
        .always(result=>{})
    })
    $("#submit-todo-add").on("click",(event)=>{
        event.preventDefault()
        console.log($('#todo-add-title').val())
        $.ajax({
            method:"POST",
            url:"http://localhost:3000/todos",
            data:{
                title:$('#todo-add-title').val(),
                description:$('#todo-add-description').val(),
                due_date:$('#todo-add-due_date').val()
            },
            headers:{"access_token":localStorage.getItem("access_token")}
        })
        .done(result=>showTodo())
        .fail((xhr,status,error)=>{showTodo()})
        .always(result=>{})
    })
})